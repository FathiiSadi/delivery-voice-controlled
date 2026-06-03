import { useLocale } from '../context/LocaleContext'

export default function EventBanner({ banner }) {
  const { locale, isRTL } = useLocale()
  const title = locale === 'ar' ? banner.titleAr : banner.title
  const title2 = locale === 'ar' ? banner.titleAr2 : banner.titleLine2
  const sub = locale === 'ar' ? banner.subTitleAr : banner.subTitle
  const badge = locale === 'ar' ? banner.badgeAr : banner.badge

  return (
    <button
      type="button"
      className="group relative shrink-0 w-[230px] md:w-[260px] h-[140px] md:h-[150px] rounded-2xl overflow-hidden text-start shadow-sm hover:shadow-md transition"
      style={{ background: banner.bg }}
    >
      <div className="relative z-10 p-3.5 md:p-4 h-full flex flex-col justify-between">
        <div>
          <div className="text-white font-extrabold leading-[1.05] tracking-tight text-lg md:text-xl drop-shadow">
            {title}
            <br />
            {title2}
          </div>
          {sub ? (
            <div className="mt-1 text-white text-[10px] md:text-[11px] font-semibold leading-tight whitespace-pre-line opacity-95">
              {sub}
            </div>
          ) : null}
          {badge ? (
            <div
              className="mt-2 inline-block text-[10px] font-extrabold rounded-md px-1.5 py-0.5"
              style={{ background: banner.accent, color: '#111827' }}
            >
              {badge}
            </div>
          ) : null}
        </div>
        {banner.pillLabel ? (
          <div className="self-start inline-block bg-snoonu text-white text-[10px] font-bold rounded-md px-2 py-0.5">
            {banner.pillLabel}
          </div>
        ) : null}
      </div>

      {banner.img ? (
        <img
          src={banner.img}
          alt=""
          className={`pointer-events-none absolute bottom-0 ${isRTL ? 'left-0' : 'right-0'} w-[55%] h-[80%] object-cover object-bottom opacity-80 mix-blend-screen`}
          loading="lazy"
        />
      ) : null}
    </button>
  )
}
