import { Link } from 'react-router-dom'
import Icon from './Icon'
import { useLocale, pickLocale } from '../context/LocaleContext'

export default function RestaurantCard({ restaurant }) {
  const { locale } = useLocale()
  const name = pickLocale(restaurant, locale, 'name')
  const tags = (locale === 'ar' ? restaurant.tagsAr : restaurant.tags) ?? restaurant.tags
  const delivery = pickLocale(restaurant, locale, 'delivery')
  const offer = pickLocale(restaurant, locale, 'offer')

  return (
    <Link
      to={`/restaurants/${restaurant.id}`}
      className="block text-start bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition group"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={restaurant.banner}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-3 start-3 bg-snoonu text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
          {offer}
        </div>
        <div className="absolute bottom-3 start-3 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Icon name="bike" />
          {delivery}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-bold text-charcoal">{name}</h4>
          <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 shrink-0">
            <Icon name="star" />
            {restaurant.rating}
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-1 line-clamp-1">
          {tags.join(locale === 'ar' ? '، ' : ' • ')}
        </div>
      </div>
    </Link>
  )
}
