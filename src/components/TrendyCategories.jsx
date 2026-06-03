import Icon from './Icon'
import { useLocale } from '../context/LocaleContext'
import { TRENDY_CATEGORIES } from '../data/categories'

export default function TrendyCategories() {
  const { locale, isRTL } = useLocale()
  return (
    <aside className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5 h-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-charcoal">
          <Icon name="sparkles" size={16} />
        </span>
        <h3 className="font-bold text-sm md:text-base">
          {locale === 'ar' ? 'فئات رائجة' : 'Trendy categories'}
        </h3>
      </div>
      <ul className="space-y-2">
        {TRENDY_CATEGORIES.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              className="w-full flex items-center justify-between gap-3 bg-gray-50 hover:bg-gray-100 rounded-xl p-2.5 transition text-start"
            >
              <span className="flex items-center gap-3 min-w-0">
                <span className="shrink-0 w-9 h-9 rounded-lg overflow-hidden bg-white border border-gray-100">
                  <img
                    src={c.img}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </span>
                <span className="text-xs md:text-sm font-semibold text-charcoal line-clamp-1">
                  {locale === 'ar' ? c.labelAr : c.label}
                </span>
              </span>
              <span className="text-gray-400 shrink-0">
                <Icon name={isRTL ? 'chevron-left' : 'chevron-right'} size={16} />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
