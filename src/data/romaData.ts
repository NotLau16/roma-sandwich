// Única fuente de verdad: productos, precios, horarios y contacto.
// price en null = sin precio publicado (se consulta presupuesto por WhatsApp). Cargá valores en ARS cuando estén definidos.

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

export type MigaItem = { name: string; price: number | null };
export type MigaGroup = { category: string; items: MigaItem[] };

export const migaPresentations = [
  { label: "1 combo (3 unidades)", shortLabel: "1 combo (3 uni)", combos: 1 },
  { label: "2 combos (6 unidades)", shortLabel: "2 combos (6 uni)", combos: 2 },
  { label: "4 combos (12 unidades)", shortLabel: "4 combos (12 uni)", combos: 4 },
  { label: "8 combos (24 unidades)", shortLabel: "8 combos (24 uni)", combos: 8 },
] as const;

export const migaNote = "Presentación en combos de 3 unidades según variedad base y combinaciones.";

const miga12 = (base: string): MigaItem[] => [
  { name: `${base} y Queso`, price: null },
  { name: `${base} y Verduras`, price: null },
  { name: `${base} y Pickles`, price: null },
  { name: `${base} y Choclo`, price: null },
  { name: `${base}, Morrones, Huevo y Aceituna`, price: null },
  { name: `${base} y Ananá`, price: null },
  { name: `${base} y Palmito con Salsa Golf`, price: null },
  { name: `${base}, Rúcula, Huevo y Tomate`, price: null },
  { name: `${base}, Queso y Rúcula`, price: null },
  { name: `${base}, Ananá y Cereza`, price: null },
  { name: `${base} y Roquefort`, price: null },
  { name: `${base} y Champiñón`, price: null },
];

export const migaGroups: MigaGroup[] = [
  { category: "Jamón Cocido", items: miga12("Jamón Cocido") },
  { category: "Paleta", items: miga12("Paleta") },
  { category: "Salame", items: miga12("Salame") },
  { category: "Ternera", items: miga12("Ternera") },
  { category: "Pollo", items: miga12("Pollo") },
  { category: "Bondiola", items: miga12("Bondiola") },
  { category: "Jamón Crudo", items: miga12("Jamón Crudo") },
  { category: "Lomo Horneado", items: miga12("Lomo Horneado") },
  {
    category: "Vegetarianos",
    items: [
      { name: "Doble Queso", price: null },
      { name: "Queso y Verduras", price: null },
      { name: "Queso y Pickles", price: null },
      { name: "Queso y Choclo", price: null },
      { name: "Queso, Morrones, Huevo y Aceituna", price: null },
      { name: "Queso, Rúcula, Huevo y Tomate", price: null },
      { name: "Queso y Ananá", price: null },
      { name: "Queso, Ananá y Cereza", price: null },
      { name: "Queso y Roquefort", price: null },
      { name: "Queso Roquefort y una Verdura a elección", price: null },
    ],
  },
  {
    category: "Atún",
    items: [
      { name: "Atún y Queso", price: null },
      { name: "Atún y Verduras", price: null },
      { name: "Atún y Pickles", price: null },
      { name: "Atún, Pickles y dos Verduras a elección", price: null },
      { name: "Atún, Morrones, Huevo y Aceituna", price: null },
      { name: "Queso, Rúcula, Huevo y Tomate (Línea Atún)", price: null },
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

export type TraditionalItem = { name: string; priceFrench: number | null; pricePebete: number | null };
export type TraditionalGroup = { category: string; items: TraditionalItem[] };
export type GourmetItem = { name: string; priceCiabatta: number | null; priceFocaccia: number | null };

export const traditionalBreads = [
  { id: "Pan Francés", label: "Pan Francés (alargado)" },
  { id: "Pan Pebete", label: "Pan Pebete (redondo)" },
] as const;

export const traditionalNote =
  "Opciones elaboradas en el momento con dos variedades de pan (alargado / redondo).";

const traditional4 = (base: string, specialBase = base): TraditionalItem[] => [
  { name: `${base} y Queso`, priceFrench: null, pricePebete: null },
  { name: `${base} y Verduras`, priceFrench: null, pricePebete: null },
  { name: `${specialBase} y un Agregado Especial`, priceFrench: null, pricePebete: null },
  { name: `${specialBase} y dos Agregados Especiales`, priceFrench: null, pricePebete: null },
];

export const traditionalGroups: TraditionalGroup[] = [
  { category: "Paleta", items: traditional4("Paleta") },
  { category: "Salame", items: traditional4("Salame") },
  { category: "Jamón Cocido", items: traditional4("Jamón Cocido") },
  { category: "Jamón Crudo", items: traditional4("Jamón Crudo", "Jamón Crudo / Salame") },
  { category: "Bondiola", items: traditional4("Bondiola") },
  { category: "Lomo Horneado", items: traditional4("Lomo Horneado") },
  { category: "Ternera", items: traditional4("Ternera") },
  {
    category: "Vegetariano",
    items: [
      { name: "Doble Queso", priceFrench: null, pricePebete: null },
      { name: "Queso y Verduras", priceFrench: null, pricePebete: null },
      { name: "Queso y un Agregado Especial", priceFrench: null, pricePebete: null },
      { name: "Queso y dos Agregados Especiales", priceFrench: null, pricePebete: null },
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
  { name: "Jamón Cocido, Queso y dos Verduras", priceCiabatta: null, priceFocaccia: null },
  { name: "Salame, Queso y dos Verduras a elección", priceCiabatta: null, priceFocaccia: null },
  { name: "Doble Queso y dos Verduras a elección", priceCiabatta: null, priceFocaccia: null },
  { name: "Ternera, Queso y dos Verduras a elección", priceCiabatta: null, priceFocaccia: null },
  { name: "Bondiola, Queso y dos Verduras a elección", priceCiabatta: null, priceFocaccia: null },
  { name: "Doble Queso, Tomate, Roquefort y Nueces", priceCiabatta: null, priceFocaccia: null },
  { name: "Jamón Crudo, Rúcula, Tomate y Nueces", priceCiabatta: null, priceFocaccia: null },
  { name: "Ternera, Morrones, Huevo y Aceitunas", priceCiabatta: null, priceFocaccia: null },
];

export const combosNote =
  "Opciones promocionales con bebida incluida para compartir o resolver el almuerzo y la merienda.";

export const specialCombos: Plan[] = [
  {
    name: "Combo Clásico 1",
    serves: "1 docena + Coca-Cola 1.5 L",
    detail:
      "1 docena de sándwiches de miga triangular de paleta y queso o paleta y verdura + Coca-Cola de 1.5 litros.",
    price: null,
  },
  {
    name: "Combo Clásico 2",
    serves: "1 docena + Coca-Cola 1.5 L",
    detail:
      "1 docena de sándwiches de miga triangular de jamón cocido y queso o jamón cocido y verdura + Coca-Cola de 1.5 litros.",
    price: null,
  },
  {
    name: "Combo Familiar 1",
    serves: "2 docenas + Coca-Cola 1.5 L",
    detail:
      "2 docenas de sándwiches de miga triangular de paleta y queso o paleta y verdura + Coca-Cola de 1.5 litros.",
    price: null,
  },
  {
    name: "Combo Familiar 2",
    serves: "2 docenas + Coca-Cola 1.5 L",
    detail:
      "2 docenas de sándwiches de miga triangular de jamón cocido y queso o jamón cocido y verdura + Coca-Cola de 1.5 litros.",
    price: null,
  },
  {
    name: "Combo Break 1",
    serves: "Individual + lata de Coca-Cola",
    detail:
      "Tortuguita o pebete de jamón cocido o salame con queso y dos verduras a elección + lata de Coca-Cola.",
    price: null,
  },
  {
    name: "Combo Break 2",
    serves: "Individual + lata de Coca-Cola",
    detail:
      "Tortuguita o pebete de lomo horneado, bondiola, jamón crudo o ternera con queso y dos verduras a elección + lata de Coca-Cola.",
    price: null,
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
