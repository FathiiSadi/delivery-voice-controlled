import { useLocale } from '../context/LocaleContext'

export default function PromoBanner({ promo, size = 'sm' }) {
  const { locale, isRTL } = useLocale()
  const title = locale === 'ar' ? promo.titleAr : promo.title
  const title2 = locale === 'ar' ? promo.titleAr2 : promo.titleLine2
  const discount = locale === 'ar' ? promo.discountAr : promo.discount
  const cta = locale === 'ar' ? promo.ctaAr : promo.cta

  return (
    <button
      type="button"
      className="group relative w-full h-full overflow-hidden rounded-2xl text-start shadow-sm hover:shadow-md transition"
      style={{ background: promo.bg }}
    >
      <div className="relative z-10 p-4 md:p-5 h-full flex flex-col justify-between min-h-[8.5rem]">
        <div>
          <div className="text-white font-extrabold leading-[1.05] tracking-tight text-xl md:text-2xl drop-shadow-sm">
            {title}
            <br />
            {title2}
          </div>
          {discount ? (
            <div
              className="mt-2 inline-flex items-center gap-1 text-[10px] md:text-[11px] font-extrabold uppercase rounded-md px-1.5 py-0.5"
              style={{ background: promo.accent, color: '#111827' }}
            >
              {discount}
            </div>
          ) : null}
        </div>
        {cta ? (
          <span
            className="self-start inline-flex items-center gap-1.5 text-[11px] md:text-xs font-bold px-3 py-1.5 rounded-md mt-3 shadow-sm"
            style={{
              background: promo.ctaBg ?? '#ef4444',
              color: promo.ctaTextDark ? '#111827' : '#ffffff',
            }}
          >
            {cta}
          </span>
        ) : null}
      </div>

      {promo.image ? (
        <img
          src={promo.image}
          alt=""
          className={`pointer-events-none absolute bottom-0 ${isRTL ? 'left-0' : 'right-0'} w-[55%] max-h-[90%] object-contain object-bottom opacity-90 group-hover:scale-105 transition duration-500`}
          loading="lazy"
        />
      ) : null}
    </button>
  )
}
