import Icon from './Icon'
import { FILTER_CHIPS } from '../data/cuisines'
import { useLocale } from '../context/LocaleContext'

export default function FilterChips({ active, onToggle }) {
  const { locale } = useLocale()
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_CHIPS.map((f) => {
        const isOn = active.has(f.id)
        return (
          <button
            key={f.id}
            onClick={() => onToggle(f.id)}
            className={`inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold rounded-full px-6 py-4 border transition ${
              isOn
                ? 'bg-snoonu text-white border-snoonu'
                : 'bg-white text-charcoal border-gray-200 hover:border-snoonu/40'
            }`}
          >
            <Icon name={f.icon} className={isOn ? 'text-white' : 'text-snoonu'} />
            {locale === 'ar' ? f.labelAr : f.label}
          </button>
        )
      })}
    </div>
  )
}
