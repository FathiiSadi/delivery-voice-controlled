import { useMemo, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Icon from '../components/Icon'
import Breadcrumb from '../components/Breadcrumb'
import MenuItemDialog from '../components/MenuItemDialog'
import { RESTAURANTS } from '../data/restaurants'
import { MENU_BY_RESTAURANT } from '../data/menus'
import { useCart } from '../context/CartContext'
import { useLocale, pickLocale } from '../context/LocaleContext'

const ALL_CATEGORY = '__all__'

export default function RestaurantDetail() {
  const { id } = useParams()
  const { t, locale } = useLocale()
  const { addItem } = useCart()
  const restaurant = RESTAURANTS.find((r) => r.id === id)
  const menu = MENU_BY_RESTAURANT[id] || {}
  const categories = Object.keys(menu)
  const [activeCat, setActiveCat] = useState(ALL_CATEGORY)
  const [query, setQuery] = useState('')
  const [openItem, setOpenItem] = useState(null)

  if (!restaurant) return <Navigate to="/restaurants" replace />

  const name = pickLocale(restaurant, locale, 'name')
  const delivery = pickLocale(restaurant, locale, 'delivery')
  const offer = pickLocale(restaurant, locale, 'offer')

  const allItems = useMemo(
    () => categories.flatMap((c) => menu[c].map((item) => ({ ...item, _cat: c }))),
    [categories, menu],
  )

  const bestSellers = useMemo(() => {
    const popular = menu.Popular ?? []
    const fallback = categories
      .filter((c) => c !== 'Popular')
      .flatMap((c) => menu[c].slice(0, 1))
    return [...popular, ...fallback].slice(0, 8)
  }, [menu, categories])

  const visibleByCat = useMemo(() => {
    const cats = activeCat === ALL_CATEGORY ? categories : [activeCat]
    return cats.map((c) => {
      const items = menu[c].filter((i) =>
        query.trim() ? i.name.toLowerCase().includes(query.trim().toLowerCase()) : true,
      )
      return { category: c, items }
    }).filter((g) => g.items.length > 0)
  }, [activeCat, categories, menu, query])

  const handleOpenItem = (item) => setOpenItem(item)
  const handleDialogAdd = (composite) => addItem(composite, restaurant.id, name)

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white border-b border-gray-100">
        <div className="w-full px-6 md:px-12 py-6 md:py-8 space-y-5">
          <Breadcrumb
            items={[
              { label: t('breadcrumbHome'), to: '/' },
              { label: t('breadcrumbRestaurants'), to: '/restaurants' },
              { label: name },
            ]}
          />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex-1 min-w-0 md:text-end">
              <span className="inline-block bg-snoonu text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                {offer}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-charcoal leading-tight">{name}</h1>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse lg:items-center gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 flex-1 justify-end">
              <InfoCell label={t('deliveryTime')} value={delivery} />
              <Divider />
              <InfoCell label={t('distance')} value="$$$" />
              <Divider />
              <InfoCell label={t('rating')} value={restaurant.rating} />
              <Divider />
              <InfoCell
                label={t('workingHours')}
                value={
                  <span>
                    <span className="text-snoonu font-bold">{locale === 'ar' ? 'مفتوح' : 'Open'}</span>{' '}
                    {locale === 'ar' ? 'حتى 12:00 صباحاً' : 'until 12:00 AM'}
                  </span>
                }
              />
              <Divider />
              <button className="flex items-center gap-1 text-sm font-semibold text-charcoal hover:text-snoonu">
                {t('more')}
                <Icon name="chevron-down" className="text-xs" />
              </button>
            </div>

            <div className="lg:max-w-xs w-full">
              <div className="relative">
                <Icon name="search" className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`${t('searchIn')} ${name}`}
                  className="w-full bg-gray-100 hover:bg-gray-50 focus:bg-white border border-transparent focus:border-snoonu/40 rounded-full ps-10 pe-4 py-2.5 text-sm outline-none transition"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {bestSellers.length > 0 && (
        <section className="w-full px-6 md:px-12 py-8">
          <div className="bg-white/70 ring-1 ring-gray-200 rounded-3xl p-5 md:p-7">
            <h2 className="text-xl md:text-2xl font-extrabold text-charcoal mb-4 md:text-end">
              {t('bestSellers')}
            </h2>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
              {bestSellers.map((item) => (
                <BestSellerCard key={item.id} item={item} onAdd={() => handleOpenItem(item)} t={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="w-full px-6 md:px-12 sticky top-28 z-20 bg-gray-50/95 backdrop-blur py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <CategoryPill
            label={t('all')}
            active={activeCat === ALL_CATEGORY}
            onClick={() => setActiveCat(ALL_CATEGORY)}
          />
          {categories.map((c) => (
            <CategoryPill
              key={c}
              label={c}
              active={activeCat === c}
              onClick={() => setActiveCat(c)}
            />
          ))}
        </div>
      </section>

      <section className="w-full px-6 md:px-12 pb-16 space-y-10">
        {visibleByCat.map((group) => (
          <div key={group.category}>
            <h3 className="text-xl md:text-2xl font-extrabold text-charcoal mb-4 md:text-end">
              {activeCat === ALL_CATEGORY ? group.category : t('all')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              {group.items.map((item) => (
                <MenuGridCard key={item.id} item={item} onAdd={() => handleOpenItem(item)} t={t} />
              ))}
            </div>
          </div>
        ))}
        {visibleByCat.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            {locale === 'ar' ? 'لا توجد نتائج' : 'No results'}
          </div>
        )}
      </section>

      {openItem && (
        <MenuItemDialog
          item={openItem}
          restaurant={restaurant}
          onAdd={handleDialogAdd}
          onClose={() => setOpenItem(null)}
        />
      )}
    </div>
  )
}

function InfoCell({ label, value }) {
  return (
    <div className="text-end leading-tight">
      <div className="text-[11px] uppercase tracking-wider text-gray-500">{label}</div>
      <div className="text-sm font-bold text-charcoal mt-0.5">{value}</div>
    </div>
  )
}

function Divider() {
  return <span className="hidden md:inline-block h-8 w-px bg-gray-200" />
}

function CategoryPill({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-sm font-semibold rounded-full px-4 py-2 transition shrink-0 ring-1 ${
        active
          ? 'bg-charcoal text-white ring-charcoal'
          : 'bg-white text-charcoal ring-gray-200 hover:ring-snoonu/40 hover:text-snoonu'
      }`}
    >
      {label}
    </button>
  )
}

function BestSellerCard({ item, onAdd, t }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shrink-0 w-44 md:w-48 ring-1 ring-gray-100 flex flex-col">
      <div className="aspect-square bg-gray-100">
        {item.img ? (
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-snoonu text-3xl">
            <Icon name="utensils" />
          </div>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col gap-2 md:text-end">
        <div className="text-sm font-bold text-charcoal">QAR {item.price}</div>
        <div className="text-xs text-gray-600 line-clamp-2 min-h-[2rem]">{item.name}</div>
        <button
          type="button"
          onClick={onAdd}
          className="mt-1 w-full text-xs font-semibold border border-gray-200 hover:border-snoonu hover:text-snoonu rounded-lg py-1.5 transition"
        >
          {t('addToCart')}
        </button>
      </div>
    </div>
  )
}

function MenuGridCard({ item, onAdd, t }) {
  return (
    <div className="bg-white rounded-2xl ring-1 ring-gray-100 hover:shadow-md transition flex overflow-hidden">
      <div className="flex-1 min-w-0 p-4 md:p-5 flex flex-col md:text-end">
        <h4 className="font-bold text-charcoal">{item.name}</h4>
        <p className="text-xs md:text-sm text-gray-500 mt-1 line-clamp-3 flex-1">{item.desc}</p>
        <div className="mt-3 flex items-center justify-between gap-3 md:flex-row-reverse">
          <div className="text-sm font-bold text-charcoal">QAR {item.price}</div>
          <button
            type="button"
            onClick={onAdd}
            className="text-xs md:text-sm font-semibold border border-gray-200 hover:border-snoonu hover:text-snoonu rounded-lg px-4 py-1.5 transition"
          >
            {t('addToCart')}
          </button>
        </div>
      </div>
      <div className="w-28 md:w-36 bg-gray-100 shrink-0">
        {item.img ? (
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-snoonu text-3xl">
            <Icon name="utensils" />
          </div>
        )}
      </div>
    </div>
  )
}
