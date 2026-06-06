import { useEffect, useMemo, useState } from 'react'
import Icon from './Icon'
import { useLocale, pickLocale } from '../context/LocaleContext'

export default function MenuItemDialog({ item, restaurant, onAdd, onClose }) {
  const { t, locale, isRTL } = useLocale()
  const [selected, setSelected] = useState({}) // groupIdx -> Set<optionId>
  const [qty, setQty] = useState(1)
  const [instructions, setInstructions] = useState('')

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const addons = item.addons ?? []
  const itemName = item.name
  const itemDesc = (locale === 'ar' && item.descAr) ? item.descAr : item.desc

  const toggleOption = (groupIdx, optionId) => {
    setSelected((s) => {
      const cur = new Set(s[groupIdx] ?? [])
      cur.has(optionId) ? cur.delete(optionId) : cur.add(optionId)
      return { ...s, [groupIdx]: cur }
    })
  }

  const addonsTotal = useMemo(() => {
    return addons.reduce((sum, group, i) => {
      const picked = selected[i] ?? new Set()
      return sum + group.options
        .filter((o) => picked.has(o.id))
        .reduce((s, o) => s + o.price, 0)
    }, 0)
  }, [addons, selected])

  const lineTotal = (item.price + addonsTotal) * qty

  const handleAdd = () => {
    const picked = []
    addons.forEach((g, i) => {
      const set = selected[i] ?? new Set()
      g.options.forEach((o) => {
        if (set.has(o.id)) picked.push(o.id)
      })
    })
    const compositeId = picked.length ? `${item.id}::${picked.join('+')}` : item.id
    const composite = {
      id: compositeId,
      name: itemName,
      price: item.price + addonsTotal,
    }
    for (let i = 0; i < qty; i++) onAdd(composite)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
        aria-label="Close"
      />

      <div className="relative w-full md:max-w-5xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl max-h-[95vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition"
            aria-label="Close"
          >
            <Icon name="x" size={20} />
          </button>
          <div className="flex items-center gap-3">
            <span className="font-bold text-charcoal">{pickLocale(restaurant, locale, 'name')}</span>
            {restaurant.banner && (
              <img
                src={restaurant.banner}
                alt=""
                className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-200"
              />
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-charcoal hover:text-snoonu transition"
              aria-label="Back"
            >
              <Icon name={isRTL ? 'chevron-right' : 'chevron-left'} size={22} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="md:order-2 p-4 md:p-6">
              <div className="aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
                {item.img ? (
                  <img src={item.img} alt={itemName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-snoonu">
                    <Icon name="utensils" size={48} />
                  </div>
                )}
              </div>
            </div>

            <div className="md:order-1 p-4 md:p-6 space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-charcoal">{itemName}</h2>
                {itemDesc && <p className="text-sm text-gray-500 mt-1">{itemDesc}</p>}
              </div>

              {addons.map((group, gi) => (
                <AddonGroup
                  key={gi}
                  group={group}
                  selected={selected[gi] ?? new Set()}
                  onToggle={(optionId) => toggleOption(gi, optionId)}
                />
              ))}

              <InstructionsField value={instructions} onChange={setInstructions} />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 p-3 md:p-4 flex items-stretch gap-3">
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 bg-snoonu hover:bg-snoonu-dark text-white font-bold rounded-2xl px-5 py-3 flex items-center justify-between transition shadow-sm"
          >
            <span>QAR {lineTotal}</span>
            <span>{locale === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}</span>
          </button>
          <div className="bg-gray-100 rounded-2xl flex items-center px-2 gap-2">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-9 h-9 rounded-full bg-white text-charcoal hover:text-snoonu flex items-center justify-center transition"
              aria-label="Decrease"
            >
              <Icon name="minus" size={16} />
            </button>
            <span className="min-w-[24px] text-center font-bold text-charcoal">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="w-9 h-9 rounded-full bg-white text-charcoal hover:text-snoonu flex items-center justify-center transition"
              aria-label="Increase"
            >
              <Icon name="plus" size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddonGroup({ group, selected, onToggle }) {
  const { locale } = useLocale()
  const title = locale === 'ar' ? group.titleAr : group.title
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 md:justify-end">
        <span className="text-xs font-semibold text-gray-400">
          {group.required ? (locale === 'ar' ? 'إلزامي' : 'Required') : (locale === 'ar' ? 'اختياري' : 'Optional')}
        </span>
        <h3 className="text-base font-extrabold text-charcoal">{title}</h3>
      </div>
      <ul className="divide-y divide-gray-100 border-y border-gray-100">
        {group.options.map((o) => {
          const isOn = selected.has(o.id)
          const label = locale === 'ar' ? o.labelAr : o.label
          return (
            <li key={o.id}>
              <label className="flex items-center justify-between py-3 cursor-pointer">
                <span className="w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center transition group-data-[on]:bg-snoonu">
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => onToggle(o.id)}
                    className="sr-only"
                  />
                  {isOn && (
                    <span className="w-3 h-3 bg-snoonu rounded-[2px]" />
                  )}
                </span>
                <span className="flex-1 mx-3 md:text-end text-sm text-charcoal">
                  {label}
                  <span className="text-gray-400 text-xs mx-2">+{o.price} QAR</span>
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function InstructionsField({ value, onChange }) {
  const { locale } = useLocale()
  const max = 200
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 md:justify-end">
        <span className="text-xs font-semibold text-gray-400">
          {locale === 'ar' ? 'اختياري' : 'Optional'}
        </span>
        <h3 className="text-base font-extrabold text-charcoal">
          {locale === 'ar' ? 'تعليمات اضافية' : 'Special Instructions'}
        </h3>
      </div>
      <div className="relative">
        <textarea
          rows={3}
          value={value}
          maxLength={max}
          onChange={(e) => onChange(e.target.value)}
          placeholder={locale === 'ar' ? 'ضع أي تعليمات إضافية للمطعم' : 'Any special instructions for the restaurant'}
          className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm outline-none resize-none focus:bg-white focus:ring-2 focus:ring-snoonu/30 transition"
        />
        <span className="absolute top-2 start-3 text-[11px] text-gray-400">
          {value.length}/{max}
        </span>
      </div>
    </div>
  )
}
