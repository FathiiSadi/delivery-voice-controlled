import Icon from './Icon'
import { useLocale } from '../context/LocaleContext'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { locale } = useLocale()
  const { addItem } = useCart()
  const name = locale === 'ar' ? product.nameAr : product.name
  const hasDiscount = !!product.oldPrice

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(
      { id: product.id, name, price: product.price },
      product.id,
      name,
    )
  }

  return (
    <div className="group flex flex-col bg-white">
      <div className="relative bg-gray-100 rounded-2xl aspect-square overflow-hidden">
        <img
          src={product.img}
          alt={name}
          className="w-full h-full object-contain p-3 mix-blend-multiply group-hover:scale-[1.03] transition duration-300"
          loading="lazy"
        />
        <button
          type="button"
          className="absolute top-2 end-2 w-7 h-7 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-snoonu flex items-center justify-center shadow-sm transition"
          aria-label="Wishlist"
        >
          <Icon name="heart" size={14} />
        </button>
        <button
          type="button"
          onClick={handleAdd}
          className="absolute bottom-2 end-2 w-9 h-9 rounded-full bg-white text-charcoal hover:bg-snoonu hover:text-white flex items-center justify-center shadow-md transition"
          aria-label="Add to cart"
        >
          <Icon name="plus" size={16} />
        </button>
      </div>

      <div className="pt-3 px-1">
        <div className="flex items-baseline gap-2">
          <div className={`font-bold text-sm md:text-base ${hasDiscount ? 'text-snoonu' : 'text-charcoal'}`}>
            {formatPrice(product.price)} QR
          </div>
        </div>
        {hasDiscount ? (
          <div className="text-xs text-gray-400 line-through mt-0.5">
            {formatPrice(product.oldPrice)} QR
          </div>
        ) : null}

        <div className="text-xs md:text-sm text-charcoal/90 mt-1 line-clamp-2 leading-snug min-h-[2.4em]">
          {name}
        </div>

        <div className="mt-2 flex items-center gap-1 text-xs">
          <span className="font-semibold text-charcoal">{product.rating?.toFixed(1)}</span>
          <Stars rating={product.rating} />
          <span className="text-gray-400">({product.reviews})</span>
        </div>

        {product.discount ? (
          <div className="mt-2 inline-block bg-red-50 text-snoonu text-[11px] font-bold px-2 py-0.5 rounded">
            -{product.discount}%
          </div>
        ) : null}
      </div>
    </div>
  )
}

function formatPrice(n) {
  if (Number.isInteger(n)) return n.toLocaleString()
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function Stars({ rating = 0 }) {
  const pct = Math.max(0, Math.min(5, rating)) / 5
  return (
    <span className="relative inline-flex">
      <span className="text-gray-300 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" size={12} />
        ))}
      </span>
      <span className="absolute inset-0 overflow-hidden text-amber-400 flex" style={{ width: `${pct * 100}%` }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" size={12} />
        ))}
      </span>
    </span>
  )
}
