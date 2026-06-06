import { useRef } from 'react'
import Icon from '../components/Icon'
import CategoryTile from '../components/CategoryTile'
import PromoBanner from '../components/PromoBanner'
import ProductCard from '../components/ProductCard'
import TrendyCategories from '../components/TrendyCategories'
import EventBanner from '../components/EventBanner'
import { CATEGORIES, HERO_PROMOS } from '../data/categories'
import { FOR_YOU_PRODUCTS, OFFER_PRODUCTS } from '../data/products'
import { EVENT_BANNERS } from '../data/eventBanners'
import { useLocale } from '../context/LocaleContext'

export default function Home() {
  const { locale, isRTL } = useLocale()
  const eventScrollerRef = useRef(null)

  const scrollEvents = (dir) => {
    const el = eventScrollerRef.current
    if (!el) return
    const amount = el.clientWidth * 0.7
    const sign = isRTL ? -1 : 1
    el.scrollBy({ left: sign * dir * amount, behavior: 'smooth' })
  }

  return (
    <div className="w-full px-4 md:px-10 py-6 space-y-10">
      <section className="grid grid-cols-12 gap-3 md:gap-4">
        <div className="col-span-12 lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 grid-rows-2 gap-3 md:gap-4">
          {CATEGORIES.map((c) => (
            <CategoryTile key={c.id} category={c} />
          ))}
        </div>
        <div className="col-span-12 lg:col-span-3 grid grid-cols-1 gap-3 md:gap-4">
          {HERO_PROMOS.map((p) => (
            <PromoBanner key={p.id} promo={p} />
          ))}
        </div>
      </section>

      <div className="flex items-center justify-center">
        <div className="inline-flex items-center gap-2 bg-charcoal text-white rounded-full px-5 py-2.5 shadow-sm">
          <Icon name="sparkles" size={16} />
          <span className="text-sm font-bold">{locale === 'ar' ? 'لك' : 'For You'}</span>
        </div>
      </div>

      <section className="grid grid-cols-12 gap-4 md:gap-5">
        <div className="col-span-12 lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
          {FOR_YOU_PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="col-span-12 lg:col-span-3">
          <TrendyCategories />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl md:text-2xl font-extrabold">
            {locale === 'ar' ? 'العروض والفعاليات' : 'Offers & Events'}
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollEvents(-1)}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm hover:text-snoonu transition flex items-center justify-center"
              aria-label="Previous"
            >
              <Icon name={isRTL ? 'chevron-right' : 'chevron-left'} size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollEvents(1)}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm hover:text-snoonu transition flex items-center justify-center"
              aria-label="Next"
            >
              <Icon name={isRTL ? 'chevron-left' : 'chevron-right'} size={16} />
            </button>
          </div>
        </div>
        <div
          ref={eventScrollerRef}
          className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-1"
        >
          {EVENT_BANNERS.map((b) => (
            <EventBanner key={b.id} banner={b} />
          ))}
        </div>
      </section>

      <section>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
          {OFFER_PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
