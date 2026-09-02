import { Category, Product, Banner } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    "id": "cat-spices",
    "nameBn": "মশলা ও মিক্স",
    "nameEn": "Spices & Mixes",
    "slug": "spices",
    "descriptionBn": "Authentic spices and recipe mixes for your kitchen.",
    "imageUrl": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80",
    "isActive": true
  },
  {
    "id": "cat-personalcare",
    "nameBn": "পার্সোনাল কেয়ার",
    "nameEn": "Personal Care",
    "slug": "personal-care",
    "descriptionBn": "Skincare, oral care, and hygiene products.",
    "imageUrl": "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80",
    "isActive": true
  },
  {
    "id": "cat-snacks-noodles",
    "nameBn": "স্ন্যাপস ও নুডুলস",
    "nameEn": "Snacks & Noodles",
    "slug": "snacks",
    "descriptionBn": "Instant noodles, chocolates, and savory snacks.",
    "imageUrl": "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80",
    "isActive": true
  },
  {
    "id": "cat-beverages",
    "nameBn": "পানীয়",
    "nameEn": "Beverages",
    "slug": "beverages",
    "descriptionBn": "Coffee, tea, and refreshing drinks.",
    "imageUrl": "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80",
    "isActive": true
  },
  {
    "id": "cat-household",
    "nameBn": "গৃহস্থালী",
    "nameEn": "Household",
    "slug": "household",
    "descriptionBn": "Cleaning, air fresheners, and pest control.",
    "imageUrl": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80",
    "isActive": true
  },
  {
    "id": "cat-pantry",
    "nameBn": "প্যান্ট্রি",
    "nameEn": "Pantry",
    "slug": "pantry",
    "descriptionBn": "Honey, sweets, and everyday grocery items.",
    "imageUrl": "https://images.unsplash.com/photo-1606859191214-25806e8e2423?auto=format&fit=crop&q=80",
    "isActive": true
  },
  {
    "id": "cat-fresh",
    "nameBn": "ফ্রেশ পণ্য",
    "nameEn": "Fresh Produce",
    "slug": "fresh",
    "descriptionBn": "Fresh vegetables, meat, and local delicacies.",
    "imageUrl": "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&q=80",
    "isActive": true
  },
  {
    "id": "cat-others",
    "nameBn": "অন্যান্য",
    "nameEn": "Others",
    "slug": "others",
    "descriptionBn": "Miscellaneous items and services.",
    "imageUrl": "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80",
    "isActive": true
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "prod-1",
    "categoryId": "cat-beverages",
    "nameBn": "AMA Brazilian Coffee Blend",
    "nameEn": "AMA Brazilian Coffee Blend",
    "slug": "ama-brazilian-coffee-blend",
    "descriptionBn": "High quality AMA Brazilian Coffee Blend.",
    "descriptionEn": "High quality AMA Brazilian Coffee Blend.",
    "price": 450,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/753531286_122139674061070246_7485531564036318518_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/753531286_122139674061070246_7485531564036318518_n.jpg"
    ]
  },
  {
    "id": "prod-2",
    "categoryId": "cat-beverages",
    "nameBn": "Marks Active School Milk Powder",
    "nameEn": "Marks Active School Milk Powder",
    "slug": "marks-active-school-milk-powder",
    "descriptionBn": "High quality Marks Active School Milk Powder.",
    "descriptionEn": "High quality Marks Active School Milk Powder.",
    "price": 650,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/753164101_122139705393070246_1594145333383540653_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/753164101_122139705393070246_1594145333383540653_n.jpg"
    ]
  },
  {
    "id": "prod-3",
    "categoryId": "cat-pantry",
    "nameBn": "Mishti Doi (Fortified)",
    "nameEn": "Mishti Doi (Fortified)",
    "slug": "mishti-doi-fortified-",
    "descriptionBn": "High quality Mishti Doi (Fortified).",
    "descriptionEn": "High quality Mishti Doi (Fortified).",
    "price": 220,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/752642917_122139754431070246_1632129087018989415_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/752642917_122139754431070246_1632129087018989415_n.jpg"
    ]
  },
  {
    "id": "prod-4",
    "categoryId": "cat-household",
    "nameBn": "Odonil Neem Air Freshener",
    "nameEn": "Odonil Neem Air Freshener",
    "slug": "odonil-neem-air-freshener",
    "descriptionBn": "High quality Odonil Neem Air Freshener.",
    "descriptionEn": "High quality Odonil Neem Air Freshener.",
    "price": 150,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/754970906_122139791871070246_6006667176257446369_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/754970906_122139791871070246_6006667176257446369_n.jpg"
    ]
  },
  {
    "id": "prod-5",
    "categoryId": "cat-beverages",
    "nameBn": "Cafe Latte Mix",
    "nameEn": "Cafe Latte Mix",
    "slug": "cafe-latte-mix",
    "descriptionBn": "High quality Cafe Latte Mix.",
    "descriptionEn": "High quality Cafe Latte Mix.",
    "price": 320,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/752341464_122139839427070246_1267000780661940674_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/752341464_122139839427070246_1267000780661940674_n.jpg"
    ]
  },
  {
    "id": "prod-6",
    "categoryId": "cat-personalcare",
    "nameBn": "Lotus Kids Toothbrush",
    "nameEn": "Lotus Kids Toothbrush",
    "slug": "lotus-kids-toothbrush",
    "descriptionBn": "High quality Lotus Kids Toothbrush.",
    "descriptionEn": "High quality Lotus Kids Toothbrush.",
    "price": 80,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/756343881_122139913245070246_1829084738666696181_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/756343881_122139913245070246_1829084738666696181_n.jpg"
    ]
  },
  {
    "id": "prod-7",
    "categoryId": "cat-personalcare",
    "nameBn": "Revive Perfect Skin Sunblock",
    "nameEn": "Revive Perfect Skin Sunblock",
    "slug": "revive-perfect-skin-sunblock",
    "descriptionBn": "High quality Revive Perfect Skin Sunblock.",
    "descriptionEn": "High quality Revive Perfect Skin Sunblock.",
    "price": 290,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/754872508_122139874209070246_6854730613437448402_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/754872508_122139874209070246_6854730613437448402_n.jpg"
    ]
  },
  {
    "id": "prod-8",
    "categoryId": "cat-personalcare",
    "nameBn": "Sensodyne Fresh Mint (120 Tk Free)",
    "nameEn": "Sensodyne Fresh Mint (120 Tk Free)",
    "slug": "sensodyne-fresh-mint-120-tk-free-",
    "descriptionBn": "High quality Sensodyne Fresh Mint (120 Tk Free).",
    "descriptionEn": "High quality Sensodyne Fresh Mint (120 Tk Free).",
    "price": 350,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/753170046_122139841779070246_7979056271866648903_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/753170046_122139841779070246_7979056271866648903_n.jpg"
    ]
  },
  {
    "id": "prod-9",
    "categoryId": "cat-personalcare",
    "nameBn": "Himalaya Brightening Facewash",
    "nameEn": "Himalaya Brightening Facewash",
    "slug": "himalaya-brightening-facewash",
    "descriptionBn": "High quality Himalaya Brightening Facewash.",
    "descriptionEn": "High quality Himalaya Brightening Facewash.",
    "price": 260,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/757523946_122139942945070246_6121451023247029091_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/757523946_122139942945070246_6121451023247029091_n.jpg"
    ]
  },
  {
    "id": "prod-10",
    "categoryId": "cat-snacks-noodles",
    "nameBn": "Ovaltine Chocolate Cookies",
    "nameEn": "Ovaltine Chocolate Cookies",
    "slug": "ovaltine-chocolate-cookies",
    "descriptionBn": "High quality Ovaltine Chocolate Cookies.",
    "descriptionEn": "High quality Ovaltine Chocolate Cookies.",
    "price": 180,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/752881054_122139917463070246_1522162125636913737_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/752881054_122139917463070246_1522162125636913737_n.jpg"
    ]
  },
  {
    "id": "prod-11",
    "categoryId": "cat-personalcare",
    "nameBn": "Assorted Handwashes",
    "nameEn": "Assorted Handwashes",
    "slug": "assorted-handwashes",
    "descriptionBn": "High quality Assorted Handwashes.",
    "descriptionEn": "High quality Assorted Handwashes.",
    "price": 200,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/759017195_122140078167070246_8446269911901122649_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/759017195_122140078167070246_8446269911901122649_n.jpg"
    ]
  },
  {
    "id": "prod-12",
    "categoryId": "cat-personalcare",
    "nameBn": "Kool Smooth Shave Foam",
    "nameEn": "Kool Smooth Shave Foam",
    "slug": "kool-smooth-shave-foam",
    "descriptionBn": "High quality Kool Smooth Shave Foam.",
    "descriptionEn": "High quality Kool Smooth Shave Foam.",
    "price": 280,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/757331459_122139981219070246_3584592908939962857_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/757331459_122139981219070246_3584592908939962857_n.jpg"
    ]
  },
  {
    "id": "prod-13",
    "categoryId": "cat-household",
    "nameBn": "Hit Anti Roach Gel",
    "nameEn": "Hit Anti Roach Gel",
    "slug": "hit-anti-roach-gel",
    "descriptionBn": "High quality Hit Anti Roach Gel.",
    "descriptionEn": "High quality Hit Anti Roach Gel.",
    "price": 310,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/756526428_122140111221070246_4349517978841904098_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/756526428_122140111221070246_4349517978841904098_n.jpg"
    ]
  },
  {
    "id": "prod-14",
    "categoryId": "cat-spices",
    "nameBn": "Radhuni Kachchi Biryani Masala",
    "nameEn": "Radhuni Kachchi Biryani Masala",
    "slug": "radhuni-kachchi-biryani-masala",
    "descriptionBn": "High quality Radhuni Kachchi Biryani Masala.",
    "descriptionEn": "High quality Radhuni Kachchi Biryani Masala.",
    "price": 75,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/757000123_122140157997070246_7524954257705282312_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/757000123_122140157997070246_7524954257705282312_n.jpg"
    ]
  },
  {
    "id": "prod-15",
    "categoryId": "cat-spices",
    "nameBn": "Radhuni Chui Jhal Mangsho Masala",
    "nameEn": "Radhuni Chui Jhal Mangsho Masala",
    "slug": "radhuni-chui-jhal-mangsho-masala",
    "descriptionBn": "High quality Radhuni Chui Jhal Mangsho Masala.",
    "descriptionEn": "High quality Radhuni Chui Jhal Mangsho Masala.",
    "price": 65,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/756800636_122140158039070246_669511560679969021_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/756800636_122140158039070246_669511560679969021_n.jpg"
    ]
  },
  {
    "id": "prod-16",
    "categoryId": "cat-spices",
    "nameBn": "Radhuni Hash er Mangsho Masala",
    "nameEn": "Radhuni Hash er Mangsho Masala",
    "slug": "radhuni-hash-er-mangsho-masala",
    "descriptionBn": "High quality Radhuni Hash er Mangsho Masala.",
    "descriptionEn": "High quality Radhuni Hash er Mangsho Masala.",
    "price": 65,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/759188671_122140158081070246_8413095959929927061_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/759188671_122140158081070246_8413095959929927061_n.jpg"
    ]
  },
  {
    "id": "prod-17",
    "categoryId": "cat-spices",
    "nameBn": "Radhuni Borhani Masala",
    "nameEn": "Radhuni Borhani Masala",
    "slug": "radhuni-borhani-masala",
    "descriptionBn": "High quality Radhuni Borhani Masala.",
    "descriptionEn": "High quality Radhuni Borhani Masala.",
    "price": 55,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/758765311_122140158165070246_6174250793429818585_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/758765311_122140158165070246_6174250793429818585_n.jpg"
    ]
  },
  {
    "id": "prod-18",
    "categoryId": "cat-spices",
    "nameBn": "Radhuni Roast Masala",
    "nameEn": "Radhuni Roast Masala",
    "slug": "radhuni-roast-masala",
    "descriptionBn": "High quality Radhuni Roast Masala.",
    "descriptionEn": "High quality Radhuni Roast Masala.",
    "price": 60,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/756343965_122140158123070246_1862088514245902581_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/756343965_122140158123070246_1862088514245902581_n.jpg"
    ]
  },
  {
    "id": "prod-19",
    "categoryId": "cat-spices",
    "nameBn": "Radhuni Firni Mix",
    "nameEn": "Radhuni Firni Mix",
    "slug": "radhuni-firni-mix",
    "descriptionBn": "High quality Radhuni Firni Mix.",
    "descriptionEn": "High quality Radhuni Firni Mix.",
    "price": 90,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/757305380_122140159449070246_1493374795206139892_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/757305380_122140159449070246_1493374795206139892_n.jpg"
    ]
  },
  {
    "id": "prod-20",
    "categoryId": "cat-spices",
    "nameBn": "Radhuni Kheer Mix",
    "nameEn": "Radhuni Kheer Mix",
    "slug": "radhuni-kheer-mix",
    "descriptionBn": "High quality Radhuni Kheer Mix.",
    "descriptionEn": "High quality Radhuni Kheer Mix.",
    "price": 90,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/757128279_122140159407070246_9025205960879896036_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/757128279_122140159407070246_9025205960879896036_n.jpg"
    ]
  },
  {
    "id": "prod-21",
    "categoryId": "cat-spices",
    "nameBn": "Radhuni Gorur Mangsho Masala",
    "nameEn": "Radhuni Gorur Mangsho Masala",
    "slug": "radhuni-gorur-mangsho-masala",
    "descriptionBn": "High quality Radhuni Gorur Mangsho Masala.",
    "descriptionEn": "High quality Radhuni Gorur Mangsho Masala.",
    "price": 70,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/757398929_122140159533070246_4589150826697943961_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/757398929_122140159533070246_4589150826697943961_n.jpg"
    ]
  },
  {
    "id": "prod-22",
    "categoryId": "cat-spices",
    "nameBn": "Radhuni Macher Masala",
    "nameEn": "Radhuni Macher Masala",
    "slug": "radhuni-macher-masala",
    "descriptionBn": "High quality Radhuni Macher Masala.",
    "descriptionEn": "High quality Radhuni Macher Masala.",
    "price": 65,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/757186306_122140159491070246_6498013112149407911_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/757186306_122140159491070246_6498013112149407911_n.jpg"
    ]
  },
  {
    "id": "prod-23",
    "categoryId": "cat-spices",
    "nameBn": "Radhuni Chat Masala",
    "nameEn": "Radhuni Chat Masala",
    "slug": "radhuni-chat-masala",
    "descriptionBn": "High quality Radhuni Chat Masala.",
    "descriptionEn": "High quality Radhuni Chat Masala.",
    "price": 50,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/758126081_122140159575070246_5781687555635984591_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/758126081_122140159575070246_5781687555635984591_n.jpg"
    ]
  },
  {
    "id": "prod-24",
    "categoryId": "cat-household",
    "nameBn": "Good Knight Liquid Repellent",
    "nameEn": "Good Knight Liquid Repellent",
    "slug": "good-knight-liquid-repellent",
    "descriptionBn": "High quality Good Knight Liquid Repellent.",
    "descriptionEn": "High quality Good Knight Liquid Repellent.",
    "price": 190,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/757533575_122140243215070246_4543143476478123556_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/757533575_122140243215070246_4543143476478123556_n.jpg"
    ]
  },
  {
    "id": "prod-25",
    "categoryId": "cat-others",
    "nameBn": "Bkash Agent Services",
    "nameEn": "Bkash Agent Services",
    "slug": "bkash-agent-services",
    "descriptionBn": "High quality Bkash Agent Services.",
    "descriptionEn": "High quality Bkash Agent Services.",
    "price": 0,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/757010723_122140196187070246_1499025831112205311_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/757010723_122140196187070246_1499025831112205311_n.jpg"
    ]
  },
  {
    "id": "prod-26",
    "categoryId": "cat-pantry",
    "nameBn": "Dabur Honey (Pure)",
    "nameEn": "Dabur Honey (Pure)",
    "slug": "dabur-honey-pure-",
    "descriptionBn": "High quality Dabur Honey (Pure).",
    "descriptionEn": "High quality Dabur Honey (Pure).",
    "price": 350,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/758831029_122140284897070246_3023618232047806503_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/758831029_122140284897070246_3023618232047806503_n.jpg"
    ]
  },
  {
    "id": "prod-27",
    "categoryId": "cat-others",
    "nameBn": "Skipping Rope",
    "nameEn": "Skipping Rope",
    "slug": "skipping-rope",
    "descriptionBn": "High quality Skipping Rope.",
    "descriptionEn": "High quality Skipping Rope.",
    "price": 120,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/758690972_122140319733070246_2629558057864508372_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/758690972_122140319733070246_2629558057864508372_n.jpg"
    ]
  },
  {
    "id": "prod-28",
    "categoryId": "cat-household",
    "nameBn": "ACI Aerosol Insect Spray",
    "nameEn": "ACI Aerosol Insect Spray",
    "slug": "aci-aerosol-insect-spray",
    "descriptionBn": "High quality ACI Aerosol Insect Spray.",
    "descriptionEn": "High quality ACI Aerosol Insect Spray.",
    "price": 420,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/761596607_122140487997070246_9136306626245350587_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/761596607_122140487997070246_9136306626245350587_n.jpg"
    ]
  },
  {
    "id": "prod-29",
    "categoryId": "cat-household",
    "nameBn": "Angelic Fresh Room Freshener",
    "nameEn": "Angelic Fresh Room Freshener",
    "slug": "angelic-fresh-room-freshener",
    "descriptionBn": "High quality Angelic Fresh Room Freshener.",
    "descriptionEn": "High quality Angelic Fresh Room Freshener.",
    "price": 280,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/761318808_122140573449070246_632113360652497137_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/761318808_122140573449070246_632113360652497137_n.jpg"
    ]
  },
  {
    "id": "prod-30",
    "categoryId": "cat-personalcare",
    "nameBn": "Sensodyne Rapid Relief",
    "nameEn": "Sensodyne Rapid Relief",
    "slug": "sensodyne-rapid-relief",
    "descriptionBn": "High quality Sensodyne Rapid Relief.",
    "descriptionEn": "High quality Sensodyne Rapid Relief.",
    "price": 390,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/759860703_122140454709070246_3301993433966694010_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/759860703_122140454709070246_3301993433966694010_n.jpg"
    ]
  },
  {
    "id": "prod-31",
    "categoryId": "cat-snacks-noodles",
    "nameBn": "Korean Ramen Spicy Chicken",
    "nameEn": "Korean Ramen Spicy Chicken",
    "slug": "korean-ramen-spicy-chicken",
    "descriptionBn": "High quality Korean Ramen Spicy Chicken.",
    "descriptionEn": "High quality Korean Ramen Spicy Chicken.",
    "price": 180,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/767455940_122140851429070246_5496240660417994344_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/767455940_122140851429070246_5496240660417994344_n.jpg"
    ]
  },
  {
    "id": "prod-32",
    "categoryId": "cat-snacks-noodles",
    "nameBn": "Mr Noodles Hot Chicken 2X",
    "nameEn": "Mr Noodles Hot Chicken 2X",
    "slug": "mr-noodles-hot-chicken-2x",
    "descriptionBn": "High quality Mr Noodles Hot Chicken 2X.",
    "descriptionEn": "High quality Mr Noodles Hot Chicken 2X.",
    "price": 35,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/764752233_122140926879070246_6489069615307357250_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/764752233_122140926879070246_6489069615307357250_n.jpg"
    ]
  },
  {
    "id": "prod-33",
    "categoryId": "cat-snacks-noodles",
    "nameBn": "Mr Noodles Cheese Ramen",
    "nameEn": "Mr Noodles Cheese Ramen",
    "slug": "mr-noodles-cheese-ramen",
    "descriptionBn": "High quality Mr Noodles Cheese Ramen.",
    "descriptionEn": "High quality Mr Noodles Cheese Ramen.",
    "price": 35,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/764953709_122140926975070246_3385626179538277513_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/764953709_122140926975070246_3385626179538277513_n.jpg"
    ]
  },
  {
    "id": "prod-34",
    "categoryId": "cat-pantry",
    "nameBn": "Drutho Bazar Pure Honey",
    "nameEn": "Drutho Bazar Pure Honey",
    "slug": "drutho-bazar-pure-honey",
    "descriptionBn": "High quality Drutho Bazar Pure Honey.",
    "descriptionEn": "High quality Drutho Bazar Pure Honey.",
    "price": 450,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/764938160_122141028207070246_8935187743493284111_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/764938160_122141028207070246_8935187743493284111_n.jpg"
    ]
  },
  {
    "id": "prod-35",
    "categoryId": "cat-snacks-noodles",
    "nameBn": "Mr Noodles Cardoobaa",
    "nameEn": "Mr Noodles Cardoobaa",
    "slug": "mr-noodles-cardoobaa",
    "descriptionBn": "High quality Mr Noodles Cardoobaa.",
    "descriptionEn": "High quality Mr Noodles Cardoobaa.",
    "price": 40,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/764800607_122140926933070246_4954893027146056343_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/764800607_122140926933070246_4954893027146056343_n.jpg"
    ]
  },
  {
    "id": "prod-36",
    "categoryId": "cat-snacks-noodles",
    "nameBn": "KitKat Chocolate Box",
    "nameEn": "KitKat Chocolate Box",
    "slug": "kitkat-chocolate-box",
    "descriptionBn": "High quality KitKat Chocolate Box.",
    "descriptionEn": "High quality KitKat Chocolate Box.",
    "price": 450,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/771983662_122141320071070246_267191912495842145_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/771983662_122141320071070246_267191912495842145_n.jpg"
    ]
  },
  {
    "id": "prod-37",
    "categoryId": "cat-personalcare",
    "nameBn": "Ligion Henna Powder",
    "nameEn": "Ligion Henna Powder",
    "slug": "ligion-henna-powder",
    "descriptionBn": "High quality Ligion Henna Powder.",
    "descriptionEn": "High quality Ligion Henna Powder.",
    "price": 130,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/771589408_122141382045070246_7037711934798801716_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/771589408_122141382045070246_7037711934798801716_n.jpg"
    ]
  },
  {
    "id": "prod-38",
    "categoryId": "cat-personalcare",
    "nameBn": "Cute Perfume (Big Boss)",
    "nameEn": "Cute Perfume (Big Boss)",
    "slug": "cute-perfume-big-boss-",
    "descriptionBn": "High quality Cute Perfume (Big Boss).",
    "descriptionEn": "High quality Cute Perfume (Big Boss).",
    "price": 550,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/775357781_122141656749070246_3202711882183062868_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/775357781_122141656749070246_3202711882183062868_n.jpg"
    ]
  },
  {
    "id": "prod-39",
    "categoryId": "cat-snacks-noodles",
    "nameBn": "Fondalo Chocolate Bar",
    "nameEn": "Fondalo Chocolate Bar",
    "slug": "fondalo-chocolate-bar",
    "descriptionBn": "High quality Fondalo Chocolate Bar.",
    "descriptionEn": "High quality Fondalo Chocolate Bar.",
    "price": 110,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/782489469_122142509493070246_967319072104469680_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/782489469_122142509493070246_967319072104469680_n.jpg"
    ]
  },
  {
    "id": "prod-40",
    "categoryId": "cat-personalcare",
    "nameBn": "Cute Romance Perfume",
    "nameEn": "Cute Romance Perfume",
    "slug": "cute-romance-perfume",
    "descriptionBn": "High quality Cute Romance Perfume.",
    "descriptionEn": "High quality Cute Romance Perfume.",
    "price": 490,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/781293024_122142260919070246_9222787361717269269_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/781293024_122142260919070246_9222787361717269269_n.jpg"
    ]
  },
  {
    "id": "prod-41",
    "categoryId": "cat-others",
    "nameBn": "BD Cricket Celebration Special",
    "nameEn": "BD Cricket Celebration Special",
    "slug": "bd-cricket-celebration-special",
    "descriptionBn": "High quality BD Cricket Celebration Special.",
    "descriptionEn": "High quality BD Cricket Celebration Special.",
    "price": 0,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/774157155_122141826993070246_3760887511983073906_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/774157155_122141826993070246_3760887511983073906_n.jpg"
    ]
  },
  {
    "id": "prod-42",
    "categoryId": "cat-beverages",
    "nameBn": "Coca-Cola 2 Liter (Free Glass)",
    "nameEn": "Coca-Cola 2 Liter (Free Glass)",
    "slug": "coca-cola-2-liter-free-glass-",
    "descriptionBn": "High quality Coca-Cola 2 Liter (Free Glass).",
    "descriptionEn": "High quality Coca-Cola 2 Liter (Free Glass).",
    "price": 140,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/787306662_122142824847070246_4101887932998721416_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/787306662_122142824847070246_4101887932998721416_n.jpg"
    ]
  },
  {
    "id": "prod-43",
    "categoryId": "cat-personalcare",
    "nameBn": "Himalaya Vitamin C Range",
    "nameEn": "Himalaya Vitamin C Range",
    "slug": "himalaya-vitamin-c-range",
    "descriptionBn": "High quality Himalaya Vitamin C Range.",
    "descriptionEn": "High quality Himalaya Vitamin C Range.",
    "price": 450,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/785233926_122142948105070246_1264174450863139920_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/785233926_122142948105070246_1264174450863139920_n.jpg"
    ]
  },
  {
    "id": "prod-44",
    "categoryId": "cat-personalcare",
    "nameBn": "Godrej Magic Handwash Sachet",
    "nameEn": "Godrej Magic Handwash Sachet",
    "slug": "godrej-magic-handwash-sachet",
    "descriptionBn": "High quality Godrej Magic Handwash Sachet.",
    "descriptionEn": "High quality Godrej Magic Handwash Sachet.",
    "price": 30,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/789594341_122143048977070246_4521327315183420003_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/789594341_122143048977070246_4521327315183420003_n.jpg"
    ]
  },
  {
    "id": "prod-45",
    "categoryId": "cat-personalcare",
    "nameBn": "Godrej Magic Handwash Powder",
    "nameEn": "Godrej Magic Handwash Powder",
    "slug": "godrej-magic-handwash-powder",
    "descriptionBn": "High quality Godrej Magic Handwash Powder.",
    "descriptionEn": "High quality Godrej Magic Handwash Powder.",
    "price": 30,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/788000750_122143049241070246_1251403667850714587_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/788000750_122143049241070246_1251403667850714587_n.jpg"
    ]
  },
  {
    "id": "prod-46",
    "categoryId": "cat-snacks-noodles",
    "nameBn": "Mixed Chanachur",
    "nameEn": "Mixed Chanachur",
    "slug": "mixed-chanachur",
    "descriptionBn": "High quality Mixed Chanachur.",
    "descriptionEn": "High quality Mixed Chanachur.",
    "price": 80,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/785200644_122142959235070246_3188814452471790632_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/785200644_122142959235070246_3188814452471790632_n.jpg"
    ]
  },
  {
    "id": "prod-47",
    "categoryId": "cat-snacks-noodles",
    "nameBn": "Kazi Farms Plain Chocolate Cake",
    "nameEn": "Kazi Farms Plain Chocolate Cake",
    "slug": "kazi-farms-plain-chocolate-cake",
    "descriptionBn": "High quality Kazi Farms Plain Chocolate Cake.",
    "descriptionEn": "High quality Kazi Farms Plain Chocolate Cake.",
    "price": 150,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/790225912_122143067073070246_4472233862691506876_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/790225912_122143067073070246_4472233862691506876_n.jpg"
    ]
  },
  {
    "id": "prod-48",
    "categoryId": "cat-fresh",
    "nameBn": "Fresh Green Chilies (Kacha Morich)",
    "nameEn": "Fresh Green Chilies (Kacha Morich)",
    "slug": "fresh-green-chilies-kacha-morich-",
    "descriptionBn": "High quality Fresh Green Chilies (Kacha Morich).",
    "descriptionEn": "High quality Fresh Green Chilies (Kacha Morich).",
    "price": 40,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/750424165_122272387310327751_3045449900528211708_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/750424165_122272387310327751_3045449900528211708_n.jpg"
    ]
  },
  {
    "id": "prod-49",
    "categoryId": "cat-fresh",
    "nameBn": "Raw Chicken Meat",
    "nameEn": "Raw Chicken Meat",
    "slug": "raw-chicken-meat",
    "descriptionBn": "High quality Raw Chicken Meat.",
    "descriptionEn": "High quality Raw Chicken Meat.",
    "price": 260,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/749184166_122272385966327751_8168059198378831452_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/749184166_122272385966327751_8168059198378831452_n.jpg"
    ]
  },
  {
    "id": "prod-50",
    "categoryId": "cat-fresh",
    "nameBn": "Fresh Bamboo Shoots",
    "nameEn": "Fresh Bamboo Shoots",
    "slug": "fresh-bamboo-shoots",
    "descriptionBn": "High quality Fresh Bamboo Shoots.",
    "descriptionEn": "High quality Fresh Bamboo Shoots.",
    "price": 120,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/750016274_122272386968327751_923835086214127790_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/750016274_122272386968327751_923835086214127790_n.jpg"
    ]
  },
  {
    "id": "prod-51",
    "categoryId": "cat-fresh",
    "nameBn": "Local Bamboo Shoots",
    "nameEn": "Local Bamboo Shoots",
    "slug": "local-bamboo-shoots",
    "descriptionBn": "High quality Local Bamboo Shoots.",
    "descriptionEn": "High quality Local Bamboo Shoots.",
    "price": 110,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/748419187_122272386926327751_5414161145729477422_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/748419187_122272386926327751_5414161145729477422_n.jpg"
    ]
  },
  {
    "id": "prod-52",
    "categoryId": "cat-fresh",
    "nameBn": "Fresh Snails (Shamuk)",
    "nameEn": "Fresh Snails (Shamuk)",
    "slug": "fresh-snails-shamuk-",
    "descriptionBn": "High quality Fresh Snails (Shamuk).",
    "descriptionEn": "High quality Fresh Snails (Shamuk).",
    "price": 90,
    "stockQuantity": 100,
    "unit": "পিস",
    "brand": "Generic",
    "isActive": true,
    "imageUrl": "/assets/748534240_122272385948327751_4190460544705925328_n.jpg",
    "rating": 4.5,
    "reviewCount": 12,
    "galleryImages": [
      "/assets/748534240_122272385948327751_4190460544705925328_n.jpg"
    ]
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    "id": "banner-1",
    "titleBn": "সবচেয়ে ফ্রেশ মুদি আইটেম",
    "subtitleBn": "খাঁটি মানের শতভাগ নিশ্চয়তা, সরাসরি আপনার দরজায়",
    "ctaTextBn": "শপিং শুরু করুন",
    "imageUrl": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80",
    "isActive": true
  },
  {
    "id": "banner-2",
    "titleBn": "আপনার রোজকার স্পাইস",
    "subtitleBn": "সেরা স্বাদের আসল মশলায় রান্না হোক আরও মজাদার",
    "ctaTextBn": "মশলা দেখুন",
    "imageUrl": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80",
    "isActive": true
  },
  {
    "id": "banner-3",
    "titleBn": "সেরা পার্সোনাল কেয়ার সামগ্রী",
    "subtitleBn": "ত্বক ও স্বাস্থ্যের যত্নে সেরা ব্র্যান্ডের পন্য",
    "ctaTextBn": "অফার দেখুন",
    "imageUrl": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80",
    "isActive": true
  },
  {
    "id": "banner-4",
    "titleBn": "সুপারমার্কেট এখন হাতের মুঠোয়",
    "subtitleBn": "প্রয়োজনীয় সব কিছু এক ক্লিকে",
    "ctaTextBn": "ব্রাউজ করুন",
    "imageUrl": "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80",
    "isActive": true
  }
];

export const INITIAL_COUPONS: any[] = [];
export const INITIAL_DELIVERY_ZONES: any[] = [];
export const INITIAL_REVIEWS: any[] = [];
export const INITIAL_ORDERS: any[] = [];
