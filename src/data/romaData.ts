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

export type MigaItem = { name: string; price: number };
export type MigaGroup = { category: string; items: MigaItem[] };

export const migaPresentations = [
  { label: "1 combo (3 unidades)", shortLabel: "1 combo (3 uni)", combos: 1 },
  { label: "2 combos (6 unidades)", shortLabel: "2 combos (6 uni)", combos: 2 },
  { label: "4 combos (12 unidades)", shortLabel: "4 combos (12 uni)", combos: 4 },
  { label: "8 combos (24 unidades)", shortLabel: "8 combos (24 uni)", combos: 8 },
] as const;

export const migaNote = "Presentación en combos de 3 unidades según variedad base y combinaciones.";

const miga12 = (
  base: string,
  classic: number,
  mid: number,
  gourmet: number,
  quesoRucula: number,
  cereza: number,
): MigaItem[] => [
  { name: `${base} y Queso`, price: classic },
  { name: `${base} y Verduras`, price: classic },
  { name: `${base} y Pickles`, price: classic },
  { name: `${base} y Choclo`, price: mid },
  { name: `${base}, Morrones, Huevo y Aceituna`, price: gourmet },
  { name: `${base} y Ananá`, price: mid },
  { name: `${base} y Palmito con Salsa Golf`, price: mid },
  { name: `${base}, Rúcula, Huevo y Tomate`, price: gourmet },
  { name: `${base}, Queso y Rúcula`, price: quesoRucula },
  { name: `${base}, Ananá y Cereza`, price: cereza },
  { name: `${base} y Roquefort`, price: mid },
  { name: `${base} y Champiñón`, price: mid },
];

export const migaGroups: MigaGroup[] = [
  { category: "Jamón Cocido", items: miga12("Jamón Cocido", 7200, 9700, 10700, 10700, 12300) },
  { category: "Paleta", items: miga12("Paleta", 6200, 8700, 10700, 9700, 11700) },
  { category: "Salame", items: miga12("Salame", 7200, 9700, 10700, 10700, 12300) },
  { category: "Ternera", items: miga12("Ternera", 11200, 13700, 14700, 14700, 16200) },
  { category: "Pollo", items: miga12("Pollo", 11200, 13700, 14700, 14700, 16200) },
  { category: "Bondiola", items: miga12("Bondiola", 11200, 13700, 14700, 14700, 16200) },
  { category: "Jamón Crudo", items: miga12("Jamón Crudo", 11200, 13700, 14700, 14700, 16200) },
  { category: "Lomo Horneado", items: miga12("Lomo Horneado", 11200, 13700, 14700, 14700, 16200) },
  {
    category: "Vegetarianos",
    items: [
      { name: "Doble Queso", price: 7700 },
      { name: "Queso y Verduras", price: 7200 },
      { name: "Queso y Pickles", price: 7200 },
      { name: "Queso y Choclo", price: 9700 },
      { name: "Queso, Morrones, Huevo y Aceituna", price: 10700 },
      { name: "Queso, Rúcula, Huevo y Tomate", price: 10700 },
      { name: "Queso y Ananá", price: 9700 },
      { name: "Queso, Ananá y Cereza", price: 12200 },
      { name: "Queso y Roquefort", price: 9700 },
      { name: "Queso Roquefort y una Verdura a elección", price: 10700 },
    ],
  },
  {
    category: "Atún",
    items: [
      { name: "Atún y Queso", price: 11200 },
      { name: "Atún y Verduras", price: 11200 },
      { name: "Atún y Pickles", price: 11200 },
      { name: "Atún, Pickles y dos Verduras a elección", price: 12200 },
      { name: "Atún, Morrones, Huevo y Aceituna", price: 14700 },
      { name: "Queso, Rúcula, Huevo y Tomate (Línea Atún)", price: 14700 },
    ],
  },
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

export const combosNote =
  "Opciones promocionales con bebida incluida para compartir o resolver el almuerzo y la merienda.";

export const specialCombos: Plan[] = [
  {
    name: "Combo Clásico 1",
    serves: "1 docena + Coca-Cola 1.5 L",
    detail:
      "1 docena de sándwiches de miga triangular de paleta y queso o paleta y verdura + Coca-Cola de 1.5 litros.",
    price: 25500,
  },
  {
    name: "Combo Clásico 2",
    serves: "1 docena + Coca-Cola 1.5 L",
    detail:
      "1 docena de sándwiches de miga triangular de jamón cocido y queso o jamón cocido y verdura + Coca-Cola de 1.5 litros.",
    price: 28500,
  },
  {
    name: "Combo Familiar 1",
    serves: "2 docenas + Coca-Cola 1.5 L",
    detail:
      "2 docenas de sándwiches de miga triangular de paleta y queso o paleta y verdura + Coca-Cola de 1.5 litros.",
    price: 47000,
  },
  {
    name: "Combo Familiar 2",
    serves: "2 docenas + Coca-Cola 1.5 L",
    detail:
      "2 docenas de sándwiches de miga triangular de jamón cocido y queso o jamón cocido y verdura + Coca-Cola de 1.5 litros.",
    price: 53000,
  },
  {
    name: "Combo Break 1",
    serves: "Individual + lata de Coca-Cola",
    detail:
      "Tortuguita o pebete de jamón cocido o salame con queso y dos verduras a elección + lata de Coca-Cola.",
    price: 6200,
  },
  {
    name: "Combo Break 2",
    serves: "Individual + lata de Coca-Cola",
    detail:
      "Tortuguita o pebete de lomo horneado, bondiola, jamón crudo o ternera con queso y dos verduras a elección + lata de Coca-Cola.",
    price: 7700,
  },
];

export const cateringServices = [
  "Sándwiches de miga",
  "Sándwiches Tradicionales (Pan Francés / Pebete)",
  "Línea Gourmet (Pan Ciabatta / Focaccia)",
  "Combos Especiales",
  "Picadas",
  "Tortas saladas",
  "Mesa salada completa",
];
export const cateringEvents = ["Cumpleaños", "Oficina o reunión", "Evento familiar", "Otro"];

export const whyUs = [
  { title: "Elaboración artesanal y fresca", text: "Hacemos todo en nuestra fábrica, cada día." },
  {
    title: "Variedad en un solo lugar",
    text: "Miga, tradicionales, ciabatta, focaccia, combos, picadas, tortas saladas y catering.",
  },
  { title: "Atención directa por WhatsApp", text: "Hablás con quien arma tu pedido." },
  { title: "Retiro y envíos en Córdoba", text: "Pasá por Montevideo 712 o coordinamos la entrega." },
];
