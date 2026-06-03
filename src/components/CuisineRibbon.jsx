import { useRef } from 'react'
import Icon from './Icon'
import { CUISINES } from '../data/cuisines'
import { useLocale } from '../context/LocaleContext'

export default function CuisineRibbon({ activeId, onSelect }) {
  const scrollerRef = useRef(null)
  const { locale, isRTL } = useLocale()

  const scroll = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = el.clientWidth * 0.7
    const sign = isRTL ? -1 : 1
    el.scrollBy({ left: sign * dir * amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scroll(-1)}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 start-2 w-12 h-12 rounded-full bg-white shadow-lg ring-1 ring-gray-200 text-charcoal hover:text-snoonu hover:shadow-xl transition items-center justify-center"
        aria-label="Previous"
      >
        <Icon name={isRTL ? 'chevron-right' : 'chevron-left'} className="text-lg" />
      </button>

      <div
        ref={scrollerRef}
        className="flex gap-5 md:gap-7 overflow-x-auto no-scrollbar px-2 md:px-16 py-2 scroll-smooth"
      >
        {CUISINES.map((c) => {
          const isActive = c.id === activeId
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect?.(c.id)}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <div
                className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 transition ${
                  isActive ? 'border-snoonu shadow-md' : 'border-transparent group-hover:border-snoonu/50'
                } ${c.highlight ? 'bg-snoonu' : 'bg-gray-100'}`}
              >
                {c.highlight ? (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <Icon name="badge-percent" className="text-3xl" />
                  </div>
                ) : (
                  <img src={c.img} alt="" className="w-full h-full object-cover" />
                )}
              </div>
              <div className={`text-xs md:text-sm font-semibold ${isActive ? 'text-snoonu' : 'text-charcoal'}`}>
                {locale === 'ar' ? c.labelAr : c.label}
              </div>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => scroll(1)}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 end-2 w-12 h-12 rounded-full bg-white shadow-lg ring-1 ring-gray-200 text-charcoal hover:text-snoonu hover:shadow-xl transition items-center justify-center"
        aria-label="Next"
      >
        <Icon name={isRTL ? 'chevron-left' : 'chevron-right'} className="text-lg" />
      </button>

    </div>
  )
}
