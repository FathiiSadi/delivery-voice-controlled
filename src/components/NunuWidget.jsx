import { useState, useRef, useEffect } from 'react'
import { RESTAURANTS } from '../data/restaurants'
import { MENU_BY_RESTAURANT } from '../data/menus'
import { useCart } from '../context/CartContext'
import { useLocale, pickLocale } from '../context/LocaleContext'
import './NunuWidget.css'

const hasArabic = (text) => /[؀-ۿ]/.test(text || '')


function scrubStrayLatin(message) {
  if (!message || !hasArabic(message)) return message
  return message
    .replace(/\s*\/\s*[A-Za-z]+/g, '') 
    .replace(/\s{2,}/g, ' ')
    .trim()
}


function flattenMenu(restaurantId) {
  const sections = MENU_BY_RESTAURANT[restaurantId] || {}
  return Object.values(sections).flat()
}

// Cap how much chat history we resend each turn. The cart snapshot is injected
// separately, so older turns add little value but a lot of tokens.
const MAX_HISTORY_MESSAGES = 8


const RESTAURANT_CATALOG = RESTAURANTS.map((r) => ({
  id: r.id,
  name: r.name,
  nameAr: r.nameAr,
  tags: r.tags,
  tagsAr: r.tagsAr,
}))

const MENU_CATALOG = Object.fromEntries(
  RESTAURANTS.map((r) => [
    r.id,
    flattenMenu(r.id).map((item) => ({ name: item.name, price: item.price })),
  ]),
)

const SYSTEM_PROMPT = `You are Nunu 🍔, a friendly voice assistant for Snoonu (a Qatar food delivery app).
You help users find restaurants, browse menus, and build their order through casual conversation.

LANGUAGE: Detect whether the user spoke English or Arabic and reply in the SAME language.
- If the user speaks Arabic, write the "message" field in Arabic (Modern Standard or Gulf dialect, casual).
- When mentioning restaurants in an Arabic reply, prefer the Arabic name (nameAr). When mentioning items, use the English item name from the catalog (we don't have Arabic item names).
- The JSON keys, the action values, the search keyword, the restaurantId, and the itemNames stay in English/Latin — only the "message" field changes language.

KEEP REPLIES SHORT — max 2 sentences. Warm and casual.

ALWAYS respond with valid JSON only, no markdown, no extra text. Schema:
{
  "message": "your short reply (max 2 sentences)",
  "action": "find_restaurants" | "show_menu" | "add_to_cart" | "remove_from_cart" | "clear_cart" | "checkout" | "none",
  "search": "burger" | "pizza" | "shawarma" | "karak" | ... | null,
  "restaurantId": "<id from catalog>" | null,
  "itemNames": ["exact item name", ...] | null,
  "quantities": [number, ...] | null,
  "needsResponse": true | false
}

Set needsResponse=true whenever your message contains a question (so the mic re-opens automatically).
Set needsResponse=false ONLY when the conversation is naturally complete (after checkout or "thanks/bye").

CONVERSATION FLOW:
1. User asks for ANYTHING edible or drinkable → action="find_restaurants", set search to the keyword (e.g. "burger", "pizza", "drink", "karak", "coffee", "shawarma", "dessert", "sweets", "kebab", "wrap", "manakish", "falafel"). Mention 2-3 options in the message. needsResponse=true.
2. User picks a restaurant → action="show_menu", set restaurantId. Mention 2-3 items with prices in QAR. needsResponse=true.
3. User picks items → action="add_to_cart", set restaurantId and itemNames (exact names from the catalog). Ask if they want anything else. needsResponse=true.
4. User wants to REMOVE / DELETE / TAKE OUT specific items (e.g. "remove the burger", "delete the karak", "I changed my mind about the fries", "احذف البرجر", "شيل الكرك") → action="remove_from_cart", set itemNames to the cart item names to remove (match from CURRENT CART below). Confirm what was removed. needsResponse=true.
   QUANTITY: if the user says HOW MANY to remove (e.g. "remove one burger", "take out 2 karaks", "شيل وحدة برجر", "احذف اثنين كرك"), set "quantities" to a parallel array (same order as itemNames) with the number to remove for each. If they don't say a number, or they say "remove the burger" / "remove all" / "كلهم", leave quantities=null (which removes the whole line). Example: itemNames=["Marmar Classic"], quantities=[1] removes just one unit.
5. User wants to EMPTY the whole cart (e.g. "clear my cart", "start over", "remove everything", "فاضي السلة") → action="clear_cart". needsResponse=true.
6. User is done → action="checkout", needsResponse=false. Tell them their cart is ready.
7. Chitchat / greetings / unclear / short input → action="none", give a warm 1-sentence reply AND ask a fun clarifying question (e.g. "Hey! What are you craving — something savory or sweet?"). needsResponse=true.

CRITICAL RULES:
- NEVER reply "I didn't catch that" or "I don't understand" — always offer 2-3 concrete food suggestions or ask what they're craving.
- If the user says just a single word like "hello", "hi", "yes", "ok" → greet them and suggest popular categories (burgers, karak, shawarma, pizza, tea).
- If you can't map their request to a category, GUESS based on context and suggest the closest match. Better to offer something than to ask vaguely.
- Match Arabic words too: "برجر"=burger, "كرك"=karak, "شاورما"=shawarma, "بيتزا"=pizza, "حلى"=dessert, "قهوة"=coffee.

EXAMPLES — copy this pattern exactly:

User: "I want something to drink"
Output: {"message":"I've got some great spots for drinks! Want karak from Tea Time, Karak Ink, or Karak Mqanes?","action":"find_restaurants","search":"drink","restaurantId":null,"itemNames":null,"needsResponse":true}

User: "I want a burger"
Output: {"message":"Nice! How about Marmar Burger or Karak Mqanes?","action":"find_restaurants","search":"burger","restaurantId":null,"itemNames":null,"needsResponse":true}

User: "Something sweet"
Output: {"message":"Halab Sweets has amazing kunafa and baklava — want me to show you?","action":"find_restaurants","search":"sweet","restaurantId":null,"itemNames":null,"needsResponse":true}

User: "That's it, thanks"
Output: {"message":"Awesome, your cart is ready to checkout! Enjoy 🍔","action":"checkout","search":null,"restaurantId":null,"itemNames":null,"needsResponse":false}

User: "actually remove the karak" (cart has "Karak Special")
Output: {"message":"Done — took the Karak Special off your order. Anything else?","action":"remove_from_cart","search":null,"restaurantId":null,"itemNames":["Karak Special"],"quantities":null,"needsResponse":true}

User: "remove just one Marmar Classic" (cart has 3x "Marmar Classic")
Output: {"message":"Sure — removed one Marmar Classic, you've got 2 left. Anything else?","action":"remove_from_cart","search":null,"restaurantId":null,"itemNames":["Marmar Classic"],"quantities":[1],"needsResponse":true}

User: "شيل وحدة كرك" (cart has 2x "Karak Special")
Output: {"message":"تمام، شلت وحدة كرك، باقي عندك وحدة. تبغي شي ثاني؟","action":"remove_from_cart","search":null,"restaurantId":null,"itemNames":["Karak Special"],"quantities":[1],"needsResponse":true}

User: "احذف البرجر" (cart has "Mqanes Burger")
Output: {"message":"تم! شلت مرمر برجر من الطلب، تبغي شي ثاني؟","action":"remove_from_cart","search":null,"restaurantId":null,"itemNames":["Mqanes Burger"],"needsResponse":true}

User: "clear my cart"
Output: {"message":"All cleared! Wanna start fresh — what are you craving?","action":"clear_cart","search":null,"restaurantId":null,"itemNames":null,"needsResponse":true}

User: "أريد برجر"
Output: {"message":"تمام! تحب من مرمر برجر ولا كرك مقانيص؟","action":"find_restaurants","search":"burger","restaurantId":null,"itemNames":null,"needsResponse":true}

User: "أبغى شي أشربه"
Output: {"message":"عندي كرك من وقت الشاي أو كرك إنك أو كرك مقانيص، شو تختار؟","action":"find_restaurants","search":"drink","restaurantId":null,"itemNames":null,"needsResponse":true}

User: "مرمر"
Output: {"message":"اختيار حلو! عندهم Marmar Classic بـ36 ريال أو Double Truffle بـ52 ريال، شو تحب؟","action":"show_menu","search":null,"restaurantId":"marmar-burger","itemNames":null,"needsResponse":true}

RESTAURANT CATALOG (id, name, tags):
${JSON.stringify(RESTAURANT_CATALOG)}

MENUS (by restaurant id, item name + price in QAR):
${JSON.stringify(MENU_CATALOG)}

Use EXACT ids and EXACT item names from the catalog above. Do not invent items.`

export default function NunuWidget() {
  // 'idle' | 'listening' | 'thinking' | 'responding'
  const [state, setState] = useState('idle')
  const [transcript, setTranscript] = useState('')
  const [reply, setReply] = useState('')
  const [restaurantResults, setRestaurantResults] = useState([])
  const [menuResults, setMenuResults] = useState(null) // { restaurant, items }
  const [cartConfirm, setCartConfirm] = useState(null) // { restaurant, items }
  const [removedConfirm, setRemovedConfirm] = useState(null) // { items }

  const recognitionRef = useRef(null)
  const transcriptRef = useRef('')
  const cancelledRef = useRef(false)
  const conversationRef = useRef([]) // OpenAI-style messages history

  const { items: cartItems, addItem, setQty, clear: clearCart } = useCart()
  const cartRef = useRef(cartItems)
  useEffect(() => { cartRef.current = cartItems }, [cartItems])
  const { locale } = useLocale()
  const localeRef = useRef(locale)
  useEffect(() => { localeRef.current = locale }, [locale])

  useEffect(() => {
    transcriptRef.current = transcript
  }, [transcript])

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return

    const rec = new SR()
    rec.continuous = false
    rec.interimResults = true
    rec.lang = localeRef.current === 'ar' ? 'ar-SA' : 'en-US'

    rec.onresult = (e) => {
      const text = Array.from(e.results).map((r) => r[0].transcript).join('')
      setTranscript(text)
    }

    rec.onerror = (e) => {
      if (cancelledRef.current) return
      if (e?.error === 'no-speech' || e?.error === 'aborted') {
        const msg = localeRef.current === 'ar'
          ? 'ما سمعتك، جرب مرة ثانية!'
          : "I didn't hear you, give it another try!"
        setReply(msg)
        setState('responding')
        speak(msg, () => startListening())
        return
      }
      setState('idle')
    }

    rec.onend = () => {
      if (cancelledRef.current) {
        cancelledRef.current = false
        return
      }
      const finalText = transcriptRef.current.trim()
      if (finalText) {
        askLLM(finalText)
      } else {
        const msg = localeRef.current === 'ar'
          ? 'ما سمعتك، جرب مرة ثانية!'
          : "I didn't hear you, give it another try!"
        setReply(msg)
        setState('responding')
        speak(msg, () => startListening())
      }
    }

    recognitionRef.current = rec
    return () => rec.abort()
  }, [])

  function startListening({ fresh = false } = {}) {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in this browser. Try Chrome.')
      return
    }
    if (fresh) {
      conversationRef.current = []
      setReply('')
      setRestaurantResults([])
      setMenuResults(null)
      setCartConfirm(null)
      setRemovedConfirm(null)
    }
    setTranscript('')
    cancelledRef.current = false
    // Refresh language on every activation in case the user switched locale
    recognitionRef.current.lang = localeRef.current === 'ar' ? 'ar-SA' : 'en-US'
    setState('listening')
    try {
      recognitionRef.current.start()
    } catch {
      // already running — safe to ignore
    }
  }

  function cancelListening() {
    cancelledRef.current = true
    recognitionRef.current?.stop()
    window.speechSynthesis?.cancel()
    setState('idle')
  }

  function endConversation() {
    window.speechSynthesis?.cancel()
    setState('idle')
    setReply('')
    setRestaurantResults([])
    setMenuResults(null)
    setCartConfirm(null)
    setRemovedConfirm(null)
    conversationRef.current = []
  }

  function buildCartContext() {
    const cart = cartRef.current
    if (!cart || cart.length === 0) return '\n\nCURRENT CART: empty.'
    const lines = cart.map((i) => `- ${i.qty}x "${i.name}" (${i.price} QAR, restaurantId=${i.restaurantId})`).join('\n')
    return `\n\nCURRENT CART (read-only context for this turn):\n${lines}\n\nWhen the user wants to remove items, use action="remove_from_cart" with itemNames matching the EXACT names above.`
  }

  async function callGroqOnce(apiKey, model) {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        max_tokens: 400,
        temperature: 0.4,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT + buildCartContext() },
          // Only send the last few turns — older context isn't needed to build
          // an order and just burns tokens against the rate limit.
          ...conversationRef.current.slice(-MAX_HISTORY_MESSAGES),
        ],
      }),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')

      console.error(`[Nunu] Groq ${res.status} on ${model}:`, body)
      throw new Error(`groq_${res.status}`)
    }
    const data = await res.json()
    return data?.choices?.[0]?.message?.content ?? ''
  }

  async function callGroq(apiKey) {
    try {
      return await callGroqOnce(apiKey, 'llama-3.3-70b-versatile')
    } catch {
      return await callGroqOnce(apiKey, 'llama-3.1-8b-instant')
    }
  }

  async function askLLM(text) {
    setState('thinking')
    conversationRef.current.push({ role: 'user', content: text })

    const apiKey = import.meta.env.VITE_GROQ_API_KEY
    if (!apiKey) {
      setReply('Missing VITE_GROQ_API_KEY — add it to your .env file.')
      setState('responding')
      return
    }

    try {
      let raw = await callGroq(apiKey)
      let parsed = parseReply(raw, text)
 
      if (parsed._fallback) {
        raw = await callGroq(apiKey)
        parsed = parseReply(raw, text)
      }

      conversationRef.current.push({ role: 'assistant', content: raw })
      handleAction(parsed)
    } catch (err) {
      console.error('[Nunu] LLM call failed:', err)
      const msg = localeRef.current === 'ar'
        ? 'في مشكلة بالاتصال، جرب مرة ثانية!'
        : 'Connection hiccup — mind trying that again?'
      handleAction({ message: msg, action: 'none', needsResponse: true })
    }
  }

  function parseReply(raw, userText = '') {
    let obj = null
    try { obj = JSON.parse(raw) } catch { /* try loose */ }
    if (!obj) {
      try {
        const match = raw.match(/\{[\s\S]*\}/)
        if (match) obj = JSON.parse(match[0])
      } catch { /* fall through */ }
    }

    if (obj && typeof obj === 'object' && typeof obj.message === 'string' && obj.message.trim()) {
      return {
        message: scrubStrayLatin(obj.message),
        action: obj.action || 'none',
        search: obj.search ?? null,
        restaurantId: obj.restaurantId ?? null,
        itemNames: obj.itemNames ?? null,
        quantities: Array.isArray(obj.quantities) ? obj.quantities : null,
        needsResponse: obj.needsResponse !== false,
        _fallback: false,
      }
    }

    return {
      message: (raw?.trim() && !raw.trim().startsWith('{')) ? raw.trim() : friendlyFallback(userText),
      action: 'none',
      needsResponse: true,
      _fallback: true,
    }
  }

  function friendlyFallback(userText) {
    const isAr = localeRef.current === 'ar' || hasArabic(userText)
    return isAr
      ? 'تمام، شو تحب تطلب اليوم؟ برجر، شاورما، بيتزا، ولا شاي؟'
      : "Got it! What are you in the mood for — burgers, shawarma, pizza, or karak?"
  }

  function handleAction(parsed) {
    const { message, action, search, restaurantId, itemNames, quantities } = parsed
    // Defensive: small models sometimes forget needsResponse. If the reply ends with a question, the mic should re-open regardless of the flag.
    const needsResponse = parsed.needsResponse || /[?؟]\s*$/.test(message || '')
    setReply(message)
    setRestaurantResults([])
    setMenuResults(null)
    setCartConfirm(null)
    setRemovedConfirm(null)

    if (action === 'find_restaurants' && search) {
      setRestaurantResults(findRestaurants(search))
    } else if (action === 'show_menu' && restaurantId) {
      const restaurant = RESTAURANTS.find((r) => r.id === restaurantId)
      if (restaurant) {
        setMenuResults({ restaurant, items: flattenMenu(restaurantId) })
      }
    } else if (action === 'add_to_cart' && restaurantId && itemNames?.length) {
      const restaurant = RESTAURANTS.find((r) => r.id === restaurantId)
      if (restaurant) {
        const added = []
        for (const name of itemNames) {
          const item = findItem(restaurantId, name)
          if (item) {
            addItem(item, restaurant.id, restaurant.name)
            added.push(item)
          }
        }
        if (added.length) setCartConfirm({ restaurant, items: added })
      }
    } else if (action === 'remove_from_cart' && itemNames?.length) {
      const removed = []
      itemNames.forEach((name, i) => {
        const cartItem = findCartItem(cartRef.current, name)
        if (!cartItem) return
        // How many units to remove: a positive number the user asked for, else the whole line.
        const askedQty = Number(quantities?.[i])
        const removeQty = Number.isFinite(askedQty) && askedQty > 0
          ? Math.min(askedQty, cartItem.qty)
          : cartItem.qty
        setQty(cartItem.id, cartItem.qty - removeQty)

        const menuItem = flattenMenu(cartItem.restaurantId).find((m) => m.id === cartItem.id)
        removed.push({
          ...cartItem,
          qty: removeQty, // show how many were taken off, not the original line qty
          img: menuItem?.img,
          desc: menuItem?.desc,
          descAr: menuItem?.descAr,
        })
      })
      if (removed.length) setRemovedConfirm({ items: removed })
    } else if (action === 'clear_cart') {
      const snapshot = cartRef.current.map((c) => {
        const menuItem = flattenMenu(c.restaurantId).find((m) => m.id === c.id)
        return { ...c, img: menuItem?.img, desc: menuItem?.desc, descAr: menuItem?.descAr }
      })
      clearCart()
      if (snapshot.length) setRemovedConfirm({ items: snapshot })
    }

    setState('responding')
    speak(message, () => {
      if (needsResponse) startListening()
    })
  }

  function speak(text, onEnd) {
    if (!window.speechSynthesis) {
      onEnd?.()
      return
    }
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = hasArabic(text) ? 'ar-SA' : 'en-US'
    utter.rate = 1.05
    utter.onend = () => onEnd?.()
    utter.onerror = () => onEnd?.()
    window.speechSynthesis.speak(utter)
  }

  if (state === 'idle') {
    return (
      <button
        className="nunu-fab"
        onClick={() => startListening({ fresh: true })}
        aria-label="Talk to Nunu"
      >
        <MicIcon />
      </button>
    )
  }

  return (
    <div className="nunu-wrap">
      {restaurantResults.length > 0 && (
        <div className="nunu-cards">
          {restaurantResults.map((r) => {
            const tags = pickLocale(r, locale, 'tags') || r.tags || []
            return (
              <div key={r.id} className="nunu-restaurant">
                <img src={r.banner} alt="" className="nunu-restaurant-img" />
                <div className="nunu-restaurant-info">
                  <div className="nunu-restaurant-name">{pickLocale(r, locale, 'name')}</div>
                  <div className="nunu-restaurant-meta">
                    {tags.slice(0, 2).join(' · ')} · {pickLocale(r, locale, 'delivery')}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {menuResults && (
        <div className="nunu-cards">
          <div className="nunu-section-title">{pickLocale(menuResults.restaurant, locale, 'name')}</div>
          {menuResults.items.slice(0, 6).map((item) => (
            <div key={item.id} className="nunu-menu-item">
              <span className="nunu-item-name">{item.name}</span>
              <span className="nunu-item-price">{item.price} QAR</span>
            </div>
          ))}
        </div>
      )}

      {cartConfirm && (
        <div className="nunu-cards nunu-cart-confirm">
          <div className="nunu-section-title">
            {locale === 'ar' ? '✓ تمت الإضافة للسلة' : '✓ Added to cart'}
          </div>
          {cartConfirm.items.map((item) => {
            const desc = pickLocale(item, locale, 'desc') || item.desc
            return (
              <div key={item.id} className="nunu-cart-item">
                {item.img && (
                  <img src={item.img} alt="" className="nunu-cart-item-img" />
                )}
                <div className="nunu-cart-item-info">
                  <div className="nunu-cart-item-name">{item.name}</div>
                  {desc && <div className="nunu-cart-item-desc">{desc}</div>}
                  <div className="nunu-cart-item-price">{item.price} QAR</div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {removedConfirm && (
        <div className="nunu-cards nunu-cart-removed">
          <div className="nunu-section-title">
            {locale === 'ar' ? '✕ تمت الإزالة من السلة' : '✕ Removed from cart'}
          </div>
          {removedConfirm.items.map((item) => {
            const desc = pickLocale(item, locale, 'desc') || item.desc
            return (
              <div key={item.id} className="nunu-cart-item">
                {item.img && (
                  <img src={item.img} alt="" className="nunu-cart-item-img" />
                )}
                <div className="nunu-cart-item-info">
                  <div className="nunu-cart-item-name">{item.name}</div>
                  {desc && <div className="nunu-cart-item-desc">{desc}</div>}
                  <div className="nunu-cart-item-price">{item.price} QAR</div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {reply && (state === 'responding' || state === 'thinking' || state === 'listening') && (
        <div className="nunu-bubble">
          <div className="nunu-bubble-header">
            <span className="nunu-avatar">🍔</span>
            <span>Nunu</span>
          </div>
          <div className="nunu-bubble-text">{reply}</div>
        </div>
      )}

      {state === 'listening' && (
        <div className="nunu-card">
          <div className="nunu-waves">
            <span /><span /><span /><span /><span />
          </div>
          <div className="nunu-transcript">{transcript || 'Listening...'}</div>
          <button
            className="nunu-cancel"
            onClick={cancelListening}
            aria-label="Cancel"
          >
            ✕
          </button>
        </div>
      )}

      {state === 'thinking' && (
        <div className="nunu-card">
          <div className="nunu-dots"><span /><span /><span /></div>
          <div className="nunu-transcript">Thinking...</div>
        </div>
      )}

      {state === 'responding' && (
        <button
          className="nunu-button-small"
          onClick={endConversation}
          aria-label="Done"
        >
          ✕
        </button>
      )}
    </div>
  )
}

// ---- Helpers ----
function findRestaurants(query) {
  const q = query.toLowerCase().trim()
  return RESTAURANTS.filter((r) => {
    const haystack = [
      r.name,
      r.nameAr,
      ...(r.tags || []),
      ...(r.tagsAr || []),
    ].filter(Boolean).map((s) => s.toLowerCase())
    return haystack.some((s) => s.includes(q))
  }).slice(0, 4)
}

function findItem(restaurantId, name) {
  const items = flattenMenu(restaurantId)
  const target = name.toLowerCase().trim()
  return (
    items.find((i) => i.name.toLowerCase() === target) ||
    items.find((i) => i.name.toLowerCase().includes(target)) ||
    items.find((i) => target.includes(i.name.toLowerCase()))
  )
}

// Match a name (LLM-supplied) against the user's actual cart contents.
function findCartItem(cart, name) {
  const target = (name || '').toLowerCase().trim()
  if (!target) return null
  return (
    cart.find((c) => c.name.toLowerCase() === target) ||
    cart.find((c) => c.name.toLowerCase().includes(target)) ||
    cart.find((c) => target.includes(c.name.toLowerCase()))
  )
}

function MicIcon() {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  )
}
