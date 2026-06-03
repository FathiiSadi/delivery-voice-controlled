import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { useCart } from '../context/CartContext'
import { useLocale } from '../context/LocaleContext'

export default function Cart() {
  const { items, setQty, subtotal, deliveryFee, serviceFee, total } = useCart()
  const { t } = useLocale()

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-40 h-40 mx-auto bg-red-50 rounded-full flex items-center justify-center text-snoonu mb-6">
          <Icon name="shopping-bag" className="text-6xl" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold">{t('cartEmpty')}</h2>
        <p className="text-gray-500 mt-2">{t('cartEmptyDesc')}</p>
        <Link
          to="/restaurants"
          className="inline-block mt-6 bg-snoonu hover:bg-snoonu-dark text-white font-semibold rounded-full px-6 py-3 transition shadow"
        >
          {t('goToRestaurants')}
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full px-6 md:px-12 py-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal hover:text-snoonu transition mb-4"
      >
        <Icon name="arrow-left" className="rtl:rotate-180" /> {t('continueShopping')}
      </Link>
      <h2 className="text-2xl md:text-3xl font-extrabold mb-6">{t('yourCart')}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-red-50 text-snoonu flex items-center justify-center shrink-0">
                <Icon name="utensils-crossed" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-charcoal truncate">{item.name}</div>
                <div className="text-xs text-gray-500">{item.restaurantName}</div>
                <div className="text-sm text-gray-600 mt-1">QAR {item.price} {t('each')}</div>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-full px-1 py-1">
                <button
                  onClick={() => setQty(item.id, item.qty - 1)}
                  className="w-8 h-8 rounded-full bg-white text-snoonu border border-gray-200 hover:bg-snoonu hover:text-white transition"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="min-w-[24px] text-center font-bold text-charcoal">{item.qty}</span>
                <button
                  onClick={() => setQty(item.id, item.qty + 1)}
                  className="w-8 h-8 rounded-full bg-snoonu text-white hover:bg-snoonu-dark transition"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
              <div className="text-end shrink-0 w-24">
                <div className="text-xs text-gray-500">{t('subtotal')}</div>
                <div className="font-bold text-charcoal">QAR {item.price * item.qty}</div>
              </div>
            </div>
          ))}
        </div>

        <aside>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:sticky lg:top-40">
            <h3 className="font-bold text-lg mb-4">{t('orderSummary')}</h3>
            <dl className="space-y-2 text-sm">
              <SummaryRow label={t('subtotal')} value={`QAR ${subtotal}`} />
              <SummaryRow label={t('deliveryFee')} value={`QAR ${deliveryFee}`} />
              <SummaryRow label={t('serviceFee')} value={`QAR ${serviceFee}`} />
              <div className="border-t border-gray-100 my-3" />
              <SummaryRow label={t('total')} value={`QAR ${total}`} bold />
            </dl>
            <button
              onClick={() => alert(t('orderPlaced'))}
              className="mt-5 w-full bg-snoonu hover:bg-snoonu-dark text-white font-bold rounded-2xl py-3.5 transition shadow"
            >
              {t('proceed')}
            </button>
            <p className="text-[11px] text-gray-400 mt-3 text-center">{t('mockNote')}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function SummaryRow({ label, value, bold }) {
  return (
    <div className={`flex items-center justify-between ${bold ? 'text-base font-extrabold text-charcoal' : 'text-gray-600'}`}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
