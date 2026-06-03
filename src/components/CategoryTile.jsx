import { Link } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext'

export default function CategoryTile({ category }) {
  const { locale } = useLocale()
  const label = locale === 'ar' ? category.labelAr : category.label

  const Inner = (
    <div className="group h-full bg-gray-100 hover:bg-gray-50 rounded-2xl p-3 md:p-4 flex flex-col items-center justify-between transition border border-transparent hover:border-snoonu/20 hover:shadow-sm">
      <div className="flex-1 flex items-center justify-center w-full">
        <img
          src={category.img}
          alt={label}
          className="max-h-20 md:max-h-24 w-auto object-contain mix-blend-multiply group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
      </div>
      <div className="mt-2 text-xs md:text-sm font-semibold text-charcoal text-center leading-tight">
        {label}
      </div>
    </div>
  )

  return category.path ? (
    <Link to={category.path} className="block h-full">{Inner}</Link>
  ) : (
    <div className="h-full">{Inner}</div>
  )
}
