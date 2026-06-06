import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import CuisineRibbon from '../components/CuisineRibbon'
import FilterChips from '../components/FilterChips'
import RestaurantCard from '../components/RestaurantCard'
import { RESTAURANTS } from '../data/restaurants'
import { useLocale } from '../context/LocaleContext'

export default function Restaurants() {
  const { t } = useLocale()
  const [activeCuisine, setActiveCuisine] = useState('offers')
  const [activeFilters, setActiveFilters] = useState(new Set())

  const toggleFilter = (id) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="w-full px-6 md:px-12 py-8 space-y-10">
      <Breadcrumb
        items={[
          { label: t('breadcrumbHome'), to: '/' },
          { label: t('breadcrumbRestaurants') },
        ]}
      />

      <header className=" space-y-3 max-w-3xl">
        <h1 className="font-arabic-heavy text-4xl md:text-[64px] md:leading-[1.1] tracking-tight mb-5">{t('restaurants')}</h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">{t('restaurantsLead')}</p>
      </header>

      <CuisineRibbon activeId={activeCuisine} onSelect={setActiveCuisine} />

      <div className="flex">
        <FilterChips active={activeFilters} onToggle={toggleFilter} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {RESTAURANTS.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} />
        ))}
      </div>
    </div>
  )
}
