import { Link, NavLink, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { useCart } from '../context/CartContext'
import { useLocale } from '../context/LocaleContext'
import { SERVICES } from '../data/services'

export default function Header() {
  const { count } = useCart()
  const { t, locale, toggle, isRTL } = useLocale()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="w-full px-4 md:px-10 h-16 flex items-center gap-3 md:gap-4">
        <Link to="/" className="shrink-0 flex items-center" aria-label="Snoonu">
          <img
            src={locale === 'ar' ? '/snoonu-logo-ar.png' : '/snoonu-logo-en.png'}
            alt="Snoonu"
            className={locale === 'ar' ? 'h-9 md:h-11 w-auto' : 'h-7 md:h-9 w-auto'}
          />
        </Link>

        <button className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-snoonu transition">
          <Icon name="menu" />
          {t('menu')}
        </button>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="flex items-center bg-gray-100 hover:bg-gray-50 focus-within:bg-white border border-transparent focus-within:border-snoonu/40 rounded-full px-1 transition">
            <button className="hidden md:flex items-center gap-1 text-xs font-semibold text-gray-600 px-3 py-2 border-e border-gray-300">
              {t('allCategories')}
              <Icon name="chevron-down" className="text-[10px]" />
            </button>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
            />
            <button className="w-9 h-9 rounded-full bg-snoonu text-white flex items-center justify-center mx-0.5 hover:bg-snoonu-dark transition">
              <Icon name="search" />
            </button>
          </div>
        </div>

        {/* Sign in (mock, no logic) */}
        <button className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-snoonu transition">
          <Icon name="user" />
          {t('signIn')}
        </button>

        {/* Cart */}
        <button
          onClick={() => navigate('/cart')}
          className="relative inline-flex items-center gap-2 bg-snoonu hover:bg-snoonu-dark text-white px-3 md:px-4 py-2.5 rounded-full text-sm font-semibold transition shadow-sm"
        >
          <Icon name="shopping-bag" />
          <span className="hidden sm:inline">{t('cart')}</span>
          <span className="bg-white text-snoonu rounded-full min-w-[22px] h-[22px] inline-flex items-center justify-center text-xs font-bold px-1.5">
            {count}
          </span>
        </button>
      </div>

      {/* Sub-row: service tabs + location + language */}
      <div className="border-t border-gray-100 bg-white">
        <div className="w-full px-4 md:px-10 h-12 flex items-center gap-6">
          <nav className="flex items-center gap-2 md:gap-5 overflow-x-auto no-scrollbar flex-1">
            {SERVICES.map((s) => (
              <NavLink
                key={s.id}
                to={s.path}
                className={({ isActive }) =>
                  `text-sm font-semibold whitespace-nowrap transition py-1 border-b-2 ${
                    isActive && s.path !== '/' ? 'text-snoonu border-snoonu' : 'text-charcoal/70 border-transparent hover:text-snoonu'
                  }`
                }
              >
                {locale === 'ar' ? s.labelAr : s.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-1 text-sm font-semibold text-charcoal">
            <Icon name="map-pin" className="text-snoonu" />
            {t('city')}
          </div>

          <button
            onClick={toggle}
            className="text-sm font-bold text-charcoal hover:text-snoonu transition px-2 py-1 rounded"
            aria-label="Toggle language"
          >
            {locale === 'ar' ? 'En' : 'ع'}
          </button>
        </div>
      </div>
    </header>
  )
}
