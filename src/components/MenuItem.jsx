import Icon from './Icon'

export default function MenuItem({ item, onAdd, currency = 'QAR' }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition">
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-charcoal">{item.name}</h4>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.desc}</p>
        <div className="mt-3 font-bold text-charcoal">{currency} {item.price}</div>
      </div>
      {item.img && (
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}
      <button
        onClick={onAdd}
        className="shrink-0 w-10 h-10 rounded-full bg-snoonu hover:bg-snoonu-dark text-white flex items-center justify-center shadow-md transition"
        aria-label={`Add ${item.name}`}
      >
        <Icon name="plus" />
      </button>
    </div>
  )
}
