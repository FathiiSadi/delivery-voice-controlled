// Common addon groups — referenced from any menu item via spread
const DRINK_ADDONS = {
  title: 'Drink',
  titleAr: 'إضافات - مشروب',
  required: false,
  options: [
    { id: 'pepsi', label: 'Pepsi', labelAr: 'بيبسي', price: 3 },
    { id: 'dew', label: 'Mtn Dew', labelAr: 'ديو', price: 3 },
    { id: '7up', label: '7Up', labelAr: 'سفن اب', price: 3 },
    { id: 'kinza', label: 'Kinza Cola', labelAr: 'كينزا كولا', price: 3 },
  ],
}

const JUICE_PICK = {
  title: 'Choose a Juice',
  titleAr: 'إختيارك من المشروب',
  required: false,
  options: [
    { id: 'orange', label: 'Orange Juice', labelAr: 'عصير برتقال', price: 8 },
    { id: 'watermelon', label: 'Watermelon Juice', labelAr: 'عصير بطيخ', price: 8 },
    { id: 'lavan', label: 'Lavan Juice', labelAr: 'عصير لفان', price: 16 },
  ],
}

const SIDE_ADDONS = {
  title: 'Add a Side',
  titleAr: 'إضافات - أطباق جانبية',
  required: false,
  options: [
    { id: 'fries', label: 'Crispy Fries', labelAr: 'بطاطا مقلية', price: 12 },
    { id: 'rings', label: 'Onion Rings', labelAr: 'حلقات بصل', price: 14 },
    { id: 'wedges', label: 'Potato Wedges', labelAr: 'بطاطا ودجز', price: 14 },
  ],
}

const SAUCE_ADDONS = {
  title: 'Extra Sauce',
  titleAr: 'صلصة إضافية',
  required: false,
  options: [
    { id: 'garlic', label: 'Garlic Sauce', labelAr: 'صلصة ثوم', price: 2 },
    { id: 'spicy', label: 'Spicy Sauce', labelAr: 'صلصة حارة', price: 2 },
    { id: 'tahini', label: 'Tahini', labelAr: 'طحينة', price: 2 },
  ],
}

// Image bank
const IMG = {
  karak: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&q=80',
  saffronKarak: 'https://images.unsplash.com/photo-1684084373817-e51c7f7ab041?q=80&w=600',
  cheeseToast: 'https://images.unsplash.com/photo-1528736235302-52922df5c122?w=600&q=80',
  eggCheese: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80',
  chickenSandwich: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80',
  burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
  burgerWrap: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
  manakish: 'https://images.unsplash.com/photo-1732223229355-95a1433404bf?q=80&w=600',
  zaatar: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=600&q=80',
  shawarma: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&q=80',
  halloumi: 'https://plus.unsplash.com/premium_photo-1673590981810-894dadc93a6d?q=80&w=600',
  lemonade: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&q=80',
  adana: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&q=80',
  shish: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  iskender: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80',
  lahmacun: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
  ayran: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=600&q=80',
  fattoush: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
  mutabal: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&q=80',
  hummus: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&q=80',
  mixedGrill: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  kunafa: 'https://plus.unsplash.com/premium_photo-1699555728731-70a9bf22526a?q=80&w=600',
  baklava: 'https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=600&q=80',
  layali: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80',
  tamarind: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=600&q=80',
  falafel: 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=600&q=80',
  foul: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&q=80',
  vegBox: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80',
  mandi: 'https://plus.unsplash.com/premium_photo-1726718443105-6f363d9b3ba7?q=80&w=600',
  tabouleh: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80',
  dosa: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=600&q=80',
  thali: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80',
  idli: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80',
  chai: 'https://images.unsplash.com/photo-1683533698664-12ee473e8c9d?q=80&w=600',
  classic: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80',
  truffle: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80',
  loadedFries: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80',
  pistachioKarak: 'https://images.unsplash.com/photo-1770282184778-f474bd3a379a?q=80&w=600',
  arabicCoffee: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
  maamoul: 'https://images.unsplash.com/photo-1598110750624-207050c4f28c?w=600&q=80',
  beefShawarma: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=600&q=80',
  shawarmaBox: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80',
  garlicFries: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80',
}

export const MENU_BY_RESTAURANT = {
  'tea-time': {
    Popular: [
      { id: 'tt-p1', name: 'Karak Special', desc: 'Strong, milky tea with cardamom and saffron.', price: 6, img: IMG.karak, addons: [SIDE_ADDONS] },
      { id: 'tt-p2', name: 'Chicken Sandwich', desc: 'Grilled chicken, lettuce, tomato, garlic sauce.', price: 18, img: IMG.chickenSandwich, addons: [DRINK_ADDONS, SAUCE_ADDONS] },
    ],
    Sandwiches: [
      { id: 'tt-s1', name: 'Cheese Toast', desc: 'Melted cheese on toasted bread.', price: 14, img: IMG.cheeseToast, addons: [DRINK_ADDONS] },
      { id: 'tt-s2', name: 'Egg & Cheese', desc: 'Classic morning sandwich.', price: 16, img: IMG.eggCheese, addons: [DRINK_ADDONS] },
    ],
    Drinks: [
      { id: 'tt-d1', name: 'Saffron Karak', desc: 'House-special saffron karak.', price: 7, img: IMG.saffronKarak },
      { id: 'tt-d2', name: 'Mint Tea', desc: 'Fresh mint with green tea.', price: 8, img: IMG.chai },
    ],
  },
  'karak-mqanes': {
    Popular: [
      { id: 'km-p1', name: 'Mqanes Burger', desc: 'House beef patty, signature sauce.', price: 24, img: IMG.burger, addons: [DRINK_ADDONS, JUICE_PICK, SIDE_ADDONS] },
      { id: 'km-p2', name: 'Zinger Wrap', descAr: 'صوص دجاج زنجر مع بطاطا مقلية وشرائح جبن', desc: 'Zinger chicken sauce wrap with fries and cheese.', price: 15, img: IMG.burgerWrap, addons: [DRINK_ADDONS, JUICE_PICK] },
      { id: 'km-p3', name: 'Karak Mqanes Tea', desc: 'The original house karak.', price: 6, img: IMG.karak },
    ],
    Sandwiches: [
      { id: 'km-s1', name: 'Chicken Mqanes', desc: 'Grilled chicken sandwich, special bread.', price: 22, img: IMG.chickenSandwich, addons: [DRINK_ADDONS, SAUCE_ADDONS] },
    ],
    Drinks: [
      { id: 'km-d1', name: 'Pistachio Karak', desc: 'Karak with pistachio cream.', price: 9, img: IMG.pistachioKarak },
    ],
  },
  'saj-express': {
    Popular: [
      { id: 'se-p1', name: 'Cheese Manakish', desc: 'Akkawi cheese on hot saj bread.', price: 16, img: IMG.manakish, addons: [DRINK_ADDONS] },
      { id: 'se-p2', name: 'Zaatar Saj', desc: 'Wild thyme, sumac, olive oil, fresh-baked.', price: 12, img: IMG.zaatar, addons: [DRINK_ADDONS] },
    ],
    Wraps: [
      { id: 'se-w1', name: 'Chicken Shawarma Wrap', desc: 'Marinated chicken, garlic sauce, pickles.', price: 22, img: IMG.shawarma, addons: [DRINK_ADDONS, SIDE_ADDONS, SAUCE_ADDONS] },
      { id: 'se-w2', name: 'Halloumi Wrap', desc: 'Grilled halloumi, tomato, mint.', price: 20, img: IMG.halloumi, addons: [DRINK_ADDONS] },
    ],
    Drinks: [
      { id: 'se-d1', name: 'Fresh Lemon Mint', desc: 'House-pressed lemonade with mint.', price: 12, img: IMG.lemonade },
    ],
  },
  'turkey-central': {
    Popular: [
      { id: 'tc-p1', name: 'Adana Kebab Plate', desc: 'Spicy minced lamb, lavash, salad, rice.', price: 58, img: IMG.adana, addons: [DRINK_ADDONS, SAUCE_ADDONS] },
      { id: 'tc-p2', name: 'Chicken Shish', desc: 'Marinated chicken skewers, charcoal-grilled.', price: 48, img: IMG.shish, addons: [DRINK_ADDONS] },
    ],
    Grills: [
      { id: 'tc-g1', name: 'Lamb Iskender', desc: 'Sliced lamb, tomato sauce, yogurt, bread.', price: 62, img: IMG.iskender, addons: [DRINK_ADDONS] },
    ],
    Sides: [
      { id: 'tc-s1', name: 'Lahmacun', desc: 'Thin Turkish flatbread with spiced meat.', price: 22, img: IMG.lahmacun },
    ],
    Drinks: [
      { id: 'tc-d1', name: 'Ayran', desc: 'Salted yogurt drink.', price: 8, img: IMG.ayran },
    ],
  },
  damasca: {
    Popular: [
      { id: 'dm-p1', name: 'Damascene Shawarma', desc: 'Tender beef, pickles, garlic, tahini.', price: 28, img: IMG.beefShawarma, addons: [DRINK_ADDONS, SIDE_ADDONS, SAUCE_ADDONS] },
      { id: 'dm-p2', name: 'Fattoush Salad', desc: 'Crisp veg, crispy bread, sumac, lemon.', price: 22, img: IMG.fattoush },
    ],
    Mezze: [
      { id: 'dm-m1', name: 'Mutabal', desc: 'Smoked aubergine, tahini, pomegranate.', price: 18, img: IMG.mutabal },
      { id: 'dm-m2', name: 'Hummus Beiruti', desc: 'Hummus, parsley, chili, olive oil.', price: 18, img: IMG.hummus },
    ],
    Grills: [
      { id: 'dm-g1', name: 'Mixed Grill', desc: 'Shish tawook, kofta, lamb skewers.', price: 72, img: IMG.mixedGrill, addons: [DRINK_ADDONS, SIDE_ADDONS] },
    ],
  },
  'halab-sweets': {
    Popular: [
      { id: 'hs-p1', name: 'Kunafa Nabulsia', desc: 'Stretchy cheese, semolina, sugar syrup.', price: 32, img: IMG.kunafa },
      { id: 'hs-p2', name: 'Baklava Mix (500g)', desc: 'Assorted pistachio and walnut baklava.', price: 75, img: IMG.baklava },
    ],
    Cakes: [
      { id: 'hs-c1', name: 'Layali Lubnan', desc: 'Semolina pudding, cream, pistachio.', price: 22, img: IMG.layali },
    ],
    Drinks: [
      { id: 'hs-d1', name: 'Tamarind Juice', desc: 'Traditional cold-pressed tamarind.', price: 10, img: IMG.tamarind },
    ],
  },
  'falafel-king': {
    Popular: [
      { id: 'fk-p1', name: 'Falafel Sandwich', desc: 'Crispy falafel, tahini, salad, pickles.', price: 14, img: IMG.falafel, addons: [DRINK_ADDONS, SAUCE_ADDONS] },
      { id: 'fk-p2', name: 'Hummus Plate', desc: 'Hummus, olive oil, warm pita.', price: 16, img: IMG.hummus },
    ],
    Breakfast: [
      { id: 'fk-b1', name: 'Foul Medames', desc: 'Slow-cooked fava beans, lemon, garlic.', price: 14, img: IMG.foul },
    ],
    Vegetarian: [
      { id: 'fk-v1', name: 'Vegan Mezze Box', desc: 'Hummus, mutabal, falafel, tabouleh.', price: 38, img: IMG.vegBox },
    ],
  },
  'arabian-grill': {
    Popular: [
      { id: 'ag-p1', name: 'Mixed Grill', desc: 'Kofta, shish tawook, lamb chops.', price: 78, img: IMG.mixedGrill, addons: [DRINK_ADDONS, SIDE_ADDONS] },
      { id: 'ag-p2', name: 'Lamb Mandi', desc: 'Slow-cooked lamb on aromatic rice.', price: 65, img: IMG.mandi, addons: [DRINK_ADDONS] },
    ],
    Mezze: [
      { id: 'ag-m1', name: 'Hummus', desc: 'Chickpea, tahini, lemon, olive oil.', price: 18, img: IMG.hummus },
      { id: 'ag-m2', name: 'Tabouleh', desc: 'Parsley, tomato, bulgur, lemon.', price: 16, img: IMG.tabouleh },
    ],
    Drinks: [
      { id: 'ag-d1', name: 'Fresh Mint Lemonade', desc: 'Cooling and refreshing.', price: 14, img: IMG.lemonade },
    ],
  },
  'dosa-corner': {
    Popular: [
      { id: 'dc-p1', name: 'Masala Dosa', desc: 'Crispy crepe with spiced potato filling.', price: 24, img: IMG.dosa, addons: [DRINK_ADDONS] },
      { id: 'dc-p2', name: 'Veggie Thali', desc: 'Assorted curries, rice, bread, dessert.', price: 42, img: IMG.thali, addons: [DRINK_ADDONS] },
    ],
    Breakfast: [
      { id: 'dc-b1', name: 'Idli Sambar', desc: 'Steamed rice cakes with lentil broth.', price: 18, img: IMG.idli },
    ],
    Drinks: [
      { id: 'dc-d1', name: 'Masala Chai', desc: 'Spiced Indian tea.', price: 8, img: IMG.chai },
    ],
  },
  'marmar-burger': {
    Popular: [
      { id: 'mb-p1', name: 'Marmar Classic', desc: 'House patty, cheddar, pickles, special sauce.', price: 36, img: IMG.classic, addons: [DRINK_ADDONS, SIDE_ADDONS, SAUCE_ADDONS] },
      { id: 'mb-p2', name: 'Double Truffle', desc: 'Two patties, truffle mayo, gruyère.', price: 52, img: IMG.truffle, addons: [DRINK_ADDONS, SIDE_ADDONS] },
    ],
    Sides: [
      { id: 'mb-s1', name: 'Loaded Fries', desc: 'Cheese, beef, jalapeño, ranch.', price: 24, img: IMG.loadedFries },
    ],
    Drinks: [
      { id: 'mb-d1', name: 'House Lemonade', desc: 'Lightly sweet, freshly pressed.', price: 12, img: IMG.lemonade },
    ],
  },
  'karak-ink': {
    Popular: [
      { id: 'ki-p1', name: 'Saffron Karak', desc: 'Premium saffron threads, evaporated milk.', price: 9, img: IMG.saffronKarak },
      { id: 'ki-p2', name: 'Pistachio Karak', desc: 'Pistachio cream, cardamom.', price: 11, img: IMG.pistachioKarak },
    ],
    Coffee: [
      { id: 'ki-c1', name: 'Arabic Coffee', desc: 'Cardamom-spiced light roast.', price: 10, img: IMG.arabicCoffee },
    ],
    Sweets: [
      { id: 'ki-s1', name: 'Date Maamoul', desc: 'Buttery semolina pastry, date filling.', price: 8, img: IMG.maamoul },
    ],
  },
  'shawarma-time': {
    Popular: [
      { id: 'st-p1', name: 'Chicken Shawarma', desc: 'Wrapped or plate, garlic sauce.', price: 18, img: IMG.shawarma, addons: [DRINK_ADDONS, SIDE_ADDONS, SAUCE_ADDONS] },
      { id: 'st-p2', name: 'Beef Shawarma', desc: 'Tender beef, tahini, pickles.', price: 22, img: IMG.beefShawarma, addons: [DRINK_ADDONS, SIDE_ADDONS] },
    ],
    Platters: [
      { id: 'st-pl1', name: 'Family Shawarma Box', desc: '6 wraps, fries, drinks.', price: 95, img: IMG.shawarmaBox },
    ],
    Sides: [
      { id: 'st-s1', name: 'Garlic Fries', desc: 'Crispy fries tossed in garlic.', price: 14, img: IMG.garlicFries },
    ],
  },
}
