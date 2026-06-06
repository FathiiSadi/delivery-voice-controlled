import { useLocale } from '../context/LocaleContext'

export default function Footer() {
  const { locale } = useLocale()
  const isAr = locale === 'ar'

  const cols = [
    {
      title: isAr ? 'الشركة' : 'Company',
      links: isAr ? ['عن سنونو', 'الوظائف', 'الصحافة'] : ['About', 'Careers', 'Press'],
    },
    {
      title: isAr ? 'لك' : 'For You',
      links: isAr ? ['مطاعم', 'بقالة', 'صيدلية'] : ['Restaurants', 'Grocery', 'Pharmacy'],
    },
    {
      title: isAr ? 'المساعدة' : 'Help',
      links: isAr ? ['الدعم', 'الشروط', 'الخصوصية'] : ['Support', 'Terms', 'Privacy'],
    },
  ]

  return (
    <footer className="bg-charcoal text-gray-300 mt-16">
      <div className="w-full px-6 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <img
            src={isAr ? '/snoonu-logo-ar.png' : '/snoonu-logo-en.png'}
            alt="Snoonu"
            className={`${isAr ? 'h-10' : 'h-8'} w-auto mb-3 brightness-0 invert`}
          />
          <p className="text-gray-400 text-xs leading-relaxed">
            {isAr
              ? 'شريكك اليومي للتوصيل في قطر — طعام، بقالة وأكثر.'
              : "Qatar's everyday delivery partner — food, groceries and more."}
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="font-semibold text-white mb-3">{c.title}</div>
            <ul className="space-y-2 text-xs">
              {c.links.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © 2026 Snoonu — By Fathi Al-sadi.
      </div>
    </footer>
  )
}
