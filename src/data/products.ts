import type { Product } from '../types';

const sizes = {
  name: 'Tamaño',
  required: true,
  choices: [
    { label: 'Mini' },
    { label: '10 porciones', price: 6000 },
    { label: '15 porciones', price: 12000 },
    { label: '20 porciones', price: 18500 },
    { label: '30 porciones', price: 31000 },
  ],
};

const flavors = {
  name: 'Sabor',
  required: true,
  choices: [
    { label: 'Chocolate' },
    { label: 'Vainilla' },
    { label: 'Red Velvet', price: 1500 },
    { label: 'Limón' },
    { label: 'Oreo', price: 1000 },
    { label: 'Dulce de leche' },
  ],
};

const fillings = {
  name: 'Relleno',
  required: true,
  choices: [
    { label: 'Dulce de leche' },
    { label: 'Ganache de chocolate', price: 1200 },
    { label: 'Crema Oreo', price: 1200 },
    { label: 'Frutos rojos', price: 1800 },
    { label: 'Crema de limón' },
    { label: 'Mousse de chocolate', price: 1500 },
  ],
};

const extras = [
  { label: 'Frutas', price: 2200 },
  { label: 'Macarons', price: 3500 },
  { label: 'Chocolates', price: 1800 },
  { label: 'Topper personalizado', price: 1600 },
  { label: 'Flores aptas para pastelería', price: 2900 },
  { label: 'Decoración temática', price: 4200 },
  { label: 'Caja premium', price: 1700 },
  { label: 'Velas', price: 700 },
];

const img = (filename: string) =>
  `${import.meta.env.BASE_URL}images/products/${filename}`;

export const products: Product[] = [
  {
    id: 'chocotorta',
    name: 'Chocotorta artesanal',
    description:
      'Capas generosas de galletitas de chocolate, crema y dulce de leche.',
    price: 28000,
    category: 'Tortas clásicas',
    image: img('chocotorta.webp'),
    alt: 'Chocotorta artesanal con terminación de chocolate',
    available: true,
    leadDays: 3,
    options: [sizes],
    extras,
  },
  {
    id: 'matilda',
    name: 'Torta Matilda',
    description:
      'Bizcochuelo intenso, ganache sedosa y chocolate en cada capa.',
    price: 32000,
    category: 'Tortas clásicas',
    image: img('matilda.webp'),
    alt: 'Torta Matilda de chocolate con ganache',
    available: true,
    leadDays: 3,
    options: [sizes, fillings],
    extras,
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet',
    description:
      'Miga aterciopelada, crema suave y una presentación elegante.',
    price: 33000,
    category: 'Tortas clásicas',
    image: img('red-velvet.webp'),
    alt: 'Torta Red Velvet decorada delicadamente',
    available: true,
    leadDays: 3,
    options: [sizes],
    extras,
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake de frutos rojos',
    description:
      'Cremoso, fresco y terminado con frutos rojos de estación.',
    price: 29500,
    category: 'Tortas clásicas',
    image: img('cheesecake.webp'),
    alt: 'Cheesecake con frutos rojos frescos',
    available: true,
    leadDays: 3,
    options: [sizes],
    extras,
  },
  {
    id: 'lemon-pie',
    name: 'Lemon Pie',
    description:
      'Base crocante, crema de limón y merengue italiano tostado.',
    price: 25000,
    category: 'Tortas clásicas',
    image: img('lemon-pie.webp'),
    alt: 'Lemon pie con merengue italiano',
    available: true,
    leadDays: 3,
    options: [sizes],
    extras,
  },
  {
    id: 'minimal',
    name: 'Torta personalizada minimalista',
    description:
      'Diseño a medida para celebrar con una estética sutil y personal.',
    price: 35000,
    category: 'Personalizadas',
    image: img('minimal.webp'),
    alt: 'Torta personalizada minimalista en tonos rosa y crema',
    available: true,
    leadDays: 7,
    custom: true,
    options: [sizes, flavors, fillings],
    extras,
  },
  {
    id: 'theme',
    name: 'Torta temática de cumpleaños',
    description:
      'Una torta pensada para tu evento, temática y paleta preferida.',
    price: 43000,
    category: 'Personalizadas',
    image: img('theme.webp'),
    alt: 'Torta temática de cumpleaños elegante',
    available: true,
    leadDays: 7,
    custom: true,
    options: [sizes, flavors, fillings],
    extras,
  },
  {
    id: 'event',
    name: 'Torta premium para eventos',
    description:
      'Pieza protagonista para celebraciones con terminaciones especiales.',
    price: 65000,
    category: 'Personalizadas',
    image: img('event.webp'),
    alt: 'Torta premium para evento sobre pedestal',
    available: true,
    leadDays: 14,
    custom: true,
    options: [sizes, flavors, fillings],
    extras,
  },
  {
    id: 'bento',
    name: 'Bento cake',
    description:
      'Una pequeña torta para regalar, compartir o decir algo especial.',
    price: 14500,
    category: 'Porciones',
    image: img('bento.webp'),
    alt: 'Bento cake personalizada en caja',
    available: true,
    leadDays: 2,
    options: [
      {
        name: 'Sabor',
        required: true,
        choices: flavors.choices.slice(0, 4),
      },
    ],
    extras: [
      { label: 'Mensaje escrito', price: 500 },
      { label: 'Velas', price: 700 },
    ],
  },
  {
    id: 'mini',
    name: 'Mini torta para dos',
    description:
      'Dos porciones de una torta delicada, hecha para compartir.',
    price: 18000,
    category: 'Porciones',
    image: img('mini.webp'),
    alt: 'Mini torta para dos con frutos rojos',
    available: true,
    leadDays: 2,
    options: [flavors, fillings],
    extras: [
      { label: 'Frutas', price: 1500 },
      { label: 'Velas', price: 700 },
    ],
  },
  {
    id: 'box',
    name: 'Box merienda boutique',
    description:
      'Selección de dulces, infusión y detalles para regalar.',
    price: 30000,
    category: 'Boxes',
    image: img('box.png'),
    alt: 'Box merienda boutique con variedad de pastelería artesanal',
    available: true,
    leadDays: 2,
    options: [
      {
        name: 'Infusión',
        required: true,
        choices: [
          { label: 'Té en hebras' },
          { label: 'Café de especialidad' },
        ],
      },
    ],
    extras: [
      { label: 'Tarjeta con mensaje', price: 500 },
      { label: 'Caja premium', price: 1700 },
    ],
  },
  {
    id: 'cookie',
    name: 'Cookie rellena',
    description:
      'Cookie de chocolate con centro cremoso y bordes tiernos.',
    price: 4200,
    category: 'Individuales',
    image: img('cookie.png'),
    alt: 'Cookies de chocolate rellenas apiladas',
    available: true,
    leadDays: 2,
    options: [
      {
        name: 'Relleno',
        required: true,
        choices: [
          { label: 'Dulce de leche' },
          { label: 'Crema Oreo' },
          { label: 'Ganache' },
        ],
      },
    ],
  },
  {
    id: 'cupcake',
    name: 'Cupcake decorado',
    description:
      'Bizcocho suave, crema y decoración en la paleta que elijas.',
    price: 3800,
    category: 'Individuales',
    image: img('cupcake.png'),
    alt: 'Cupcake de vainilla con crema y confites pastel',
    available: true,
    leadDays: 2,
    options: [flavors],
    extras: [{ label: 'Topper personalizado', price: 600 }],
  },
];