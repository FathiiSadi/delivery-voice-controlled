import { Link } from 'react-router-dom'
import Icon from './Icon'
import { useLocale } from '../context/LocaleContext'

export default function Breadcrumb({ items }) {
  const { isRTL } = useLocale()
  const sep = isRTL ? 'chevron-left' : 'chevron-right'
  return (
    <nav className="text-xs md:text-sm text-gray-500 flex items-center gap-1.5 flex-wrap">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="inline-flex items-center gap-1.5">
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-snoonu transition">{item.label}</Link>
            ) : (
              <span className={isLast ? 'text-charcoal font-semibold' : ''}>{item.label}</span>
            )}
            {!isLast && <Icon name={sep} className="text-[10px] text-gray-400" />}
          </span>
        )
      })}
    </nav>
  )
}
