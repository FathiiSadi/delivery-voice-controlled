import { createContext, useContext, useEffect, useState } from 'react'

const LocaleContext = createContext(null)

const STRINGS = {
  en: {
    deliverTo: 'Deliver to',
    city: 'Doha, Qatar',
    searchPlaceholder: 'Search for restaurants or products',
    allCategories: 'All Categories',
    menu: 'Menu',
    signIn: 'Sign In',
    cart: 'Cart',
    home: 'Home',
    restaurants: 'Restaurants & Cafés',
    restaurantsLead:
      'Discover the largest selection of global and local restaurants in Qatar. We bring you the best online delivery service — order now and enjoy your favourite meals fast.',
    backToHome: 'Back to Home',
    breadcrumbHome: 'Home',
    breadcrumbRestaurants: 'Restaurants',
    popularNearYou: 'Popular Near You',
    specialOffers: 'Special Offers',
    seeAll: 'See all',
    whatLookingFor: 'What are you looking for?',
    yourCart: 'Your Cart',
    cartEmpty: 'Your cart is empty',
    cartEmptyDesc: 'Browse restaurants and add your favourite dishes to get started.',
    goToRestaurants: 'Go to Restaurants',
    continueShopping: 'Continue Shopping',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    serviceFee: 'Service Fee',
    total: 'Total',
    proceed: 'Proceed to Mock Checkout',
    mockNote: 'This is a UI prototype — no real order is placed.',
    orderPlaced: 'Mock Order Placed Successfully!',
    each: 'each',
    aboutPlace: 'About this place',
    hours: 'Hours',
    delivery: 'Delivery',
    offer: 'Offer',
    ratings: 'ratings',
    bestSellers: 'Best Sellers',
    addToCart: 'Add',
    deliveryTime: 'Delivery Time',
    distance: 'Distance',
    rating: 'Rating',
    workingHours: 'Working Hours',
    openUntil: 'Open until 12:00 AM',
    more: 'More',
    all: 'All',
    searchIn: 'Search in',
  },
  ar: {
    deliverTo: 'التوصيل إلى',
    city: 'الدوحة، قطر',
    searchPlaceholder: 'ابحث عن متاجر أو منتجات',
    allCategories: 'جميع الأقسام',
    menu: 'القائمة',
    signIn: 'تسجيل الدخول',
    cart: 'السلة',
    home: 'الرئيسية',
    restaurants: 'مطاعم ومقاهي',
    restaurantsLead:
      'اكتشف اكبر قائمة مطاعم عالمية ومحلية في قطر، نجلب لك الطعام المفضل لديك مع أفضل خدمة توصيل اونلاين، لدى سنونو كل ما تبحث عنه، اطلب الآن واستمتع بوجباتك المفضلة بأسرع وقت',
    backToHome: 'العودة للرئيسية',
    breadcrumbHome: 'الصفحة الرئيسية',
    breadcrumbRestaurants: 'مطاعم',
    popularNearYou: 'الأكثر شهرة بالقرب منك',
    specialOffers: 'عروض خاصة',
    seeAll: 'عرض الكل',
    whatLookingFor: 'عن ماذا تبحث؟',
    yourCart: 'سلتك',
    cartEmpty: 'سلتك فارغة',
    cartEmptyDesc: 'تصفح المطاعم وأضف أطباقك المفضلة للبدء.',
    goToRestaurants: 'تصفح المطاعم',
    continueShopping: 'مواصلة التسوق',
    orderSummary: 'ملخص الطلب',
    subtotal: 'المجموع الفرعي',
    deliveryFee: 'رسوم التوصيل',
    serviceFee: 'رسوم الخدمة',
    total: 'الإجمالي',
    proceed: 'إتمام الطلب التجريبي',
    mockNote: 'هذه واجهة تجريبية — لا يتم تنفيذ طلب حقيقي.',
    orderPlaced: 'تم تنفيذ الطلب التجريبي بنجاح!',
    each: 'للقطعة',
    aboutPlace: 'عن هذا المكان',
    hours: 'ساعات العمل',
    delivery: 'التوصيل',
    offer: 'العرض',
    ratings: 'تقييم',
    bestSellers: 'الأفضل مبيعًا',
    addToCart: 'إضافة',
    deliveryTime: 'وقت التوصيل',
    distance: 'المسافة',
    rating: 'التقييم',
    workingHours: 'ساعات العمل',
    openUntil: 'مفتوح حتى 12:00 صباحاً',
    more: 'المزيد',
    all: 'الكل',
    searchIn: 'ابحث في',
  },
}

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState('ar')

  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.setAttribute('dir', dir)
    document.documentElement.setAttribute('lang', locale)
  }, [locale])

  const t = (key) => STRINGS[locale][key] ?? key
  const isRTL = locale === 'ar'
  const toggle = () => setLocale((l) => (l === 'ar' ? 'en' : 'ar'))

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggle, t, isRTL }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = () => {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider')
  return ctx
}

export const pickLocale = (item, locale, key) => {
  const arKey = key + 'Ar'
  if (locale === 'ar' && item[arKey] != null) return item[arKey]
  return item[key]
}
