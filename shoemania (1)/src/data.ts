export type Brand = 'Nike' | 'Adidas' | 'New Balance' | 'ASICS' | 'Puma' | 'Vans' | 'Converse' | 'Reebok';

export interface Product {
  id: string;
  brand: Brand;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  trending?: boolean;
  featured?: boolean;
  hueRotate?: number;
}

export const products: Product[] = [
  {
    id: 'n1',
    brand: 'Nike',
    name: 'Air Force 1 \'07',
    price: 115,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    category: 'Men\'s Shoes',
    isNew: true,
    trending: true,
    hueRotate: 0
  },
  {
    id: 'n2',
    brand: 'Nike',
    name: 'Air Max 90',
    price: 130,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800',
    category: 'Women\'s Shoes',
    featured: true,
    hueRotate: 0
  },
  {
    id: 'n3',
    brand: 'Nike',
    name: 'ZoomX Vaporfly',
    price: 250,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800',
    category: 'Running Shoes',
    isNew: true,
    hueRotate: 0
  },
  {
    id: 'n4',
    brand: 'Nike',
    name: 'Dunk Low Retro',
    price: 110,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
    category: 'Men\'s Shoes',
    trending: true,
    hueRotate: 0
  },
  {
    id: 'n5',
    brand: 'Nike',
    name: 'Air Jordan 1 Retro',
    price: 180,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=800',
    category: 'Men\'s Shoes',
    featured: true,
    hueRotate: 0
  },
  {
    id: 'n6',
    brand: 'Nike',
    name: 'Blazer Mid \'77',
    price: 105,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    category: 'Women\'s Shoes',
    hueRotate: 0
  },
  {
    id: 'n7',
    brand: 'Nike',
    name: 'React Infinity Run',
    price: 160,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    category: 'Running Shoes',
    isNew: true,
    hueRotate: 0
  },
  {
    id: 'n8',
    brand: 'Nike',
    name: 'Air Max 270',
    price: 160,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    category: 'Men\'s Shoes',
    trending: true,
    hueRotate: 0
  },
  {
    id: 'a1',
    brand: 'Adidas',
    name: 'Ultraboost Light',
    price: 190,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    category: 'Running Shoes',
    isNew: true,
    trending: true,
    hueRotate: 0
  },
  {
    id: 'a2',
    brand: 'Adidas',
    name: 'Stan Smith',
    price: 100,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800',
    category: 'Originals',
    featured: true,
    hueRotate: 0
  },
  {
    id: 'a3',
    brand: 'Adidas',
    name: 'NMD_R1 V2',
    price: 150,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800',
    category: 'Originals',
    trending: true,
    hueRotate: 0
  },
  {
    id: 'a4',
    brand: 'Adidas',
    name: 'Superstar Classic',
    price: 100,
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&q=80&w=800',
    category: 'Originals',
    hueRotate: 0
  },
  {
    id: 'a5',
    brand: 'Adidas',
    name: 'Samba OG',
    price: 100,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800',
    category: 'Originals',
    trending: true,
    featured: true,
    hueRotate: 0
  },
  {
    id: 'a6',
    brand: 'Adidas',
    name: 'Gazelle',
    price: 100,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
    category: 'Originals',
    isNew: true,
    hueRotate: 0
  },
  {
    id: 'a7',
    brand: 'Adidas',
    name: 'Yeezy Boost 350',
    price: 230,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800',
    category: 'Originals',
    trending: true,
    hueRotate: 0
  },
  {
    id: 'a8',
    brand: 'Adidas',
    name: 'Forum Low',
    price: 110,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800',
    category: 'Originals',
    hueRotate: 0
  },
  {
    id: 'nb1',
    brand: 'New Balance',
    name: '990v6 Core',
    price: 200,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    trending: true,
    featured: true,
    hueRotate: 0
  },
  {
    id: 'nb2',
    brand: 'New Balance',
    name: '550 Vintage',
    price: 110,
    image: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    isNew: true,
    hueRotate: 0
  },
  {
    id: 'nb3',
    brand: 'New Balance',
    name: '2002R Protection Pack',
    price: 150,
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    hueRotate: 0
  },
  {
    id: 'nb4',
    brand: 'New Balance',
    name: '9060',
    price: 150,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    trending: true,
    hueRotate: 0
  },
  {
    id: 'nb5',
    brand: 'New Balance',
    name: 'Fresh Foam X',
    price: 165,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    category: 'Running',
    isNew: true,
    hueRotate: 90
  },
  {
    id: 'nb6',
    brand: 'New Balance',
    name: '327',
    price: 100,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    featured: true,
    hueRotate: 180
  },
  {
    id: 'nb7',
    brand: 'New Balance',
    name: '1906R',
    price: 155,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    trending: true,
    hueRotate: 270
  },
  {
    id: 'nb8',
    brand: 'New Balance',
    name: 'XC72',
    price: 120,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    hueRotate: 90
  },
  {
    id: 'as1',
    brand: 'ASICS',
    name: 'GEL-Kayano 30',
    price: 160,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=800',
    category: 'Running Shoes',
    trending: true,
    hueRotate: 180
  },
  {
    id: 'as2',
    brand: 'ASICS',
    name: 'GEL-Nimbus 25',
    price: 160,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    category: 'Running Shoes',
    featured: true,
    hueRotate: 270
  },
  {
    id: 'as3',
    brand: 'ASICS',
    name: 'Novablast 4',
    price: 140,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
    category: 'Running Shoes',
    isNew: true,
    hueRotate: 90
  },
  {
    id: 'as4',
    brand: 'ASICS',
    name: 'GEL-1130',
    price: 95,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    trending: true,
    hueRotate: 180
  },
  {
    id: 'as5',
    brand: 'ASICS',
    name: 'Superblast',
    price: 200,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
    category: 'Running Shoes',
    isNew: true,
    hueRotate: 270
  },
  {
    id: 'as6',
    brand: 'ASICS',
    name: 'GEL-NYC',
    price: 130,
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    featured: true,
    hueRotate: 90
  },
  {
    id: 'as7',
    brand: 'ASICS',
    name: 'GT-2000 12',
    price: 140,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
    category: 'Running Shoes',
    hueRotate: 180
  },
  {
    id: 'as8',
    brand: 'ASICS',
    name: 'Metaspeed Sky',
    price: 250,
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&q=80&w=800',
    category: 'Running Shoes',
    trending: true,
    hueRotate: 270
  },
  {
    id: 'p1',
    brand: 'Puma',
    name: 'RS-X3 Puzzle',
    price: 110,
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    trending: true,
    hueRotate: 90
  },
  {
    id: 'p2',
    brand: 'Puma',
    name: 'Suede Classic',
    price: 70,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
    category: 'Originals',
    featured: true,
    hueRotate: 180
  },
  {
    id: 'p3',
    brand: 'Puma',
    name: 'MB.02',
    price: 130,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800',
    category: 'Basketball Shoes',
    isNew: true,
    hueRotate: 270
  },
  {
    id: 'p4',
    brand: 'Puma',
    name: 'Velocity Nitro 3',
    price: 130,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800',
    category: 'Running',
    trending: true,
    hueRotate: 90
  },
  {
    id: 'p5',
    brand: 'Puma',
    name: 'Palermo',
    price: 90,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    category: 'Originals',
    featured: true,
    hueRotate: 180
  },
  {
    id: 'p6',
    brand: 'Puma',
    name: 'Slipstream',
    price: 85,
    image: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&q=80&w=800',
    category: 'Originals',
    isNew: true,
    hueRotate: 270
  },
  {
    id: 'p7',
    brand: 'Puma',
    name: 'Deviate Nitro 2',
    price: 160,
    image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800',
    category: 'Running',
    hueRotate: 90
  },
  {
    id: 'p8',
    brand: 'Puma',
    name: 'All-Pro Nitro',
    price: 130,
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800',
    category: 'Basketball Shoes',
    trending: true,
    hueRotate: 180
  },
  {
    id: 'v1',
    brand: 'Vans',
    name: 'Old Skool',
    price: 70,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
    category: 'Skate',
    trending: true,
    hueRotate: 270
  },
  {
    id: 'v2',
    brand: 'Vans',
    name: 'Sk8-Hi',
    price: 80,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800',
    category: 'Skate',
    hueRotate: 0
  },
  {
    id: 'c1',
    brand: 'Converse',
    name: 'Chuck Taylor All Star',
    price: 65,
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    featured: true,
    hueRotate: 90
  },
  {
    id: 'c2',
    brand: 'Converse',
    name: 'Run Star Hike',
    price: 110,
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800',
    category: 'Lifestyle',
    trending: true,
    hueRotate: 180
  },
  {
    id: 'r1',
    brand: 'Reebok',
    name: 'Club C 85',
    price: 75,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    category: 'Classics',
    isNew: true,
    hueRotate: 0
  },
  {
    id: 'r2',
    brand: 'Reebok',
    name: 'Classic Leather',
    price: 80,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800',
    category: 'Classics',
    featured: true,
    hueRotate: 90
  }
];
