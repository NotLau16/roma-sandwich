// Única fuente de verdad: productos, precios, horarios y contacto.
// price / pricePerUnit en null = se muestra "Consultar". Cargá valores en ARS.

export const business = {
  name: "Roma Sandwich",
  handle: "@roma.sandwich",
  instagram: "https://www.instagram.com/roma.sandwich/",
  phone: "5493517526818",
  phoneDisplay: "+54 9 3517 52-6818",
  address: "Montevideo 712, X5000AXJ Córdoba, Argentina",
  mapsEmbed: "https://www.google.com/maps?q=Montevideo+712,+X5000AXJ+C%C3%B3rdoba,+Argentina&output=embed",
  mapsLink: "https://www.google.com/maps/dir/?api=1&destination=Montevideo+712,+X5000AXJ+C%C3%B3rdoba,+Argentina",
  tagline: "Sandwichería y fábrica de sándwiches de miga, y mucho más. Todo elaborado con productos de calidad y, sobre todo, con mucho amor.",
};

// Editá acá los horarios (se muestran tal cual en la web).
export const hours = {
  note: "Horarios a confirmar. Escribinos por WhatsApp para pedidos y delivery.",
  rows: [
    { day: "Lunes a viernes", time: "A confirmar" },
    { day: "Sábados", time: "A confirmar" },
    { day: "Domingos y feriados", time: "A confirmar" },
  ],
  delivery: "Retiro por Montevideo 712 y envíos en Córdoba, a coordinar por WhatsApp.",
};

export type Item = { name: string; description: string; pricePerUnit: number | null };
export type Group = { title: string; items: Item[] };

export const presentations = [
  { label: "Unidad", qty: 1 },
  { label: "6 unidades", qty: 6 },
  { label: "12 unidades", qty: 12 },
  { label: "24 unidades", qty: 24 },
];

// Los sabores son de ejemplo: reemplazalos por la carta real.
export const miga: Group[] = [
  { title: "Clásicos", items: [
    { name: "Jamón y queso", description: "El de siempre, en pan de miga fresco.", pricePerUnit: null },
    { name: "Tomate y queso", description: "Fresco y liviano.", pricePerUnit: null },
    { name: "Huevo y lechuga", description: "Cremoso, con crocancia.", pricePerUnit: null },
  ]},
  { title: "Especiales", items: [
    { name: "Jamón crudo y rúcula", description: "Con queso cremoso.", pricePerUnit: null },
    { name: "Pollo y verdeo", description: "Relleno casero.", pricePerUnit: null },
    { name: "Roquefort y nuez", description: "Para los que buscan algo distinto.", pricePerUnit: null },
  ]},
  { title: "Tostados", items: [
    { name: "Tostado de jamón y queso", description: "Calentito, de pan lactal.", pricePerUnit: null },
    { name: "Tostado completo", description: "Jamón, queso, tomate y huevo.", pricePerUnit: null },
  ]},
];

export type Plan = { name: string; serves: string; detail: string; price: number | null };
export const picadas: Plan[] = [
  { name: "Picada para 4", serves: "4 personas", detail: "Fiambres, quesos y acompañamientos de la casa.", price: null },
  { name: "Picada para 6", serves: "6 personas", detail: "Más variedad de fiambres y quesos, con acompañamientos.", price: null },
  { name: "Picada para 8", serves: "8 personas", detail: "Tabla grande para mesas compartidas.", price: null },
];
export const tortas: Plan[] = [
  { name: "Torta salada chica", serves: "6 a 8 porciones", detail: "Ideal para una reunión chica.", price: null },
  { name: "Torta salada grande", serves: "12 a 16 porciones", detail: "Para cumpleaños y mesas saladas.", price: null },
];

export type TraditionalItem = { name: string; priceFrench: number; pricePebete: number };
export type TraditionalGroup = { category: string; items: TraditionalItem[] };
export type ExtraOption = { id: string; label: string; shortLabel: string; price: number };
export type GourmetItem = { name: string; priceCiabatta: number; priceFocaccia: number };

export const traditionalBreads = [
  { id: "Pan Francés", label: "Pan Francés (alargado)" },
  { id: "Pan Pebete", label: "Pan Pebete (redondo)" },
] as const;

export const traditionalNote =
  "Opciones elaboradas en el momento con dos variedades de pan (alargado / redondo) al mismo valor por unidad.";

export const traditionalGroups: TraditionalGroup[] = [
  {
    category: "Paleta",
    items: [
      { name: "Paleta y Queso", priceFrench: 2000, pricePebete: 2000 },
      { name: "Paleta y Verduras", priceFrench: 2000, pricePebete: 2000 },
      { name: "Paleta y un Agregado Especial", priceFrench: 3000, pricePebete: 3000 },
      { name: "Paleta y dos Agregados Especiales", priceFrench: 3500, pricePebete: 3500 },
    ],
  },
  {
    category: "Salame",
    items: [
      { name: "Salame y Queso", priceFrench: 2500, pricePebete: 2500 },
      { name: "Salame y Verduras", priceFrench: 2500, pricePebete: 2500 },
      { name: "Salame y un Agregado Especial", priceFrench: 3500, pricePebete: 3500 },
      { name: "Salame y dos Agregados Especiales", priceFrench: 4000, pricePebete: 4000 },
    ],
  },
  {
    category: "Jamón Cocido",
    items: [
      { name: "Jamón Cocido y Queso", priceFrench: 2500, pricePebete: 2500 },
      { name: "Jamón Cocido y Verduras", priceFrench: 2500, pricePebete: 2500 },
      { name: "Jamón Cocido y un Agregado Especial", priceFrench: 3500, pricePebete: 3500 },
      { name: "Jamón Cocido y dos Agregados Especiales", priceFrench: 4000, pricePebete: 4000 },
    ],
  },
  {
    category: "Jamón Crudo",
    items: [
      { name: "Jamón Crudo y Queso", priceFrench: 4000, pricePebete: 4000 },
      { name: "Jamón Crudo y Verduras", priceFrench: 4000, pricePebete: 4000 },
      { name: "Jamón Crudo / Salame y un Agregado Especial", priceFrench: 5000, pricePebete: 5000 },
      { name: "Jamón Crudo / Salame y dos Agregados Especiales", priceFrench: 5500, pricePebete: 5500 },
    ],
  },
  {
    category: "Bondiola",
    items: [
      { name: "Bondiola y Queso", priceFrench: 4000, pricePebete: 4000 },
      { name: "Bondiola y Verduras", priceFrench: 4000, pricePebete: 4000 },
      { name: "Bondiola y un Agregado Especial", priceFrench: 5000, pricePebete: 5000 },
      { name: "Bondiola y dos Agregados Especiales", priceFrench: 5500, pricePebete: 5500 },
    ],
  },
  {
    category: "Lomo Horneado",
    items: [
      { name: "Lomo Horneado y Queso", priceFrench: 4000, pricePebete: 4000 },
      { name: "Lomo Horneado y Verduras", priceFrench: 4000, pricePebete: 4000 },
      { name: "Lomo Horneado y un Agregado Especial", priceFrench: 5000, pricePebete: 5000 },
      { name: "Lomo Horneado y dos Agregados Especiales", priceFrench: 5500, pricePebete: 5500 },
    ],
  },
  {
    category: "Ternera",
    items: [
      { name: "Ternera y Queso", priceFrench: 4000, pricePebete: 4000 },
      { name: "Ternera y Verduras", priceFrench: 4000, pricePebete: 4000 },
      { name: "Ternera y un Agregado Especial", priceFrench: 5000, pricePebete: 5000 },
      { name: "Ternera y dos Agregados Especiales", priceFrench: 5500, pricePebete: 5500 },
    ],
  },
  {
    category: "Vegetariano",
    items: [
      { name: "Doble Queso", priceFrench: 2500, pricePebete: 2500 },
      { name: "Queso y Verduras", priceFrench: 2500, pricePebete: 2500 },
      { name: "Queso y un Agregado Especial", priceFrench: 3500, pricePebete: 3500 },
      { name: "Queso y dos Agregados Especiales", priceFrench: 4000, pricePebete: 4000 },
    ],
  },
];

export const traditionalExtras: ExtraOption[] = [
  { id: "extra-queso", label: "Sumale Extra Queso", shortLabel: "Extra Queso", price: 700 },
  { id: "verdura", label: "Sumale una Verdura", shortLabel: "Una Verdura", price: 700 },
  { id: "agregado-especial", label: "Sumale un Agregado Especial", shortLabel: "Agregado Especial", price: 1500 },
];

export const gourmetBreads = [
  { id: "Pan Ciabatta", label: "Pan Ciabatta" },
  { id: "Pan Focaccia", label: "Pan Focaccia" },
] as const;

export const gourmetVeggies = ["Tomate", "Huevo", "Lechuga", "Aceituna", "Zanahoria"] as const;

export const gourmetNote = "Verduras a elección: Tomate, Huevo, Lechuga, Aceituna y Zanahoria.";

export const gourmetItems: GourmetItem[] = [
  { name: "Jamón Cocido, Queso y dos Verduras", priceCiabatta: 8000, priceFocaccia: 8000 },
  { name: "Salame, Queso y dos Verduras a elección", priceCiabatta: 8000, priceFocaccia: 8000 },
  { name: "Doble Queso y dos Verduras a elección", priceCiabatta: 8000, priceFocaccia: 8000 },
  { name: "Ternera, Queso y dos Verduras a elección", priceCiabatta: 9500, priceFocaccia: 9500 },
  { name: "Bondiola, Queso y dos Verduras a elección", priceCiabatta: 9500, priceFocaccia: 9500 },
  { name: "Doble Queso, Tomate, Roquefort y Nueces", priceCiabatta: 10500, priceFocaccia: 10500 },
  { name: "Jamón Crudo, Rúcula, Tomate y Nueces", priceCiabatta: 11500, priceFocaccia: 11500 },
  { name: "Ternera, Morrones, Huevo y Aceitunas", priceCiabatta: 11500, priceFocaccia: 11500 },
];

export const gourmetExtras: ExtraOption[] = [
  { id: "extra-queso", label: "Sumale Extra Queso", shortLabel: "Extra Queso", price: 1000 },
  { id: "verdura", label: "Sumale una Verdura", shortLabel: "Una Verdura", price: 1000 },
  { id: "agregado-especial", label: "Sumale un Agregado Especial", shortLabel: "Agregado Especial", price: 2000 },
];

export const cateringServices = [
  "Sándwiches de miga",
  "Sándwiches Tradicionales (Pan Francés / Pebete)",
  "Línea Gourmet (Pan Ciabatta / Focaccia)",
  "Picadas",
  "Tortas saladas",
  "Mesa salada completa",
];
export const cateringEvents = ["Cumpleaños", "Oficina o reunión", "Evento familiar", "Otro"];

export const whyUs = [
  { title: "Elaboración artesanal y fresca", text: "Hacemos todo en nuestra fábrica, cada día." },
  { title: "Variedad en un solo lugar", text: "Miga, tradicionales, ciabatta, focaccia, picadas, tortas saladas y catering." },
  { title: "Atención directa por WhatsApp", text: "Hablás con quien arma tu pedido." },
  { title: "Retiro y envíos en Córdoba", text: "Pasá por Montevideo 712 o coordinamos la entrega." },
];
