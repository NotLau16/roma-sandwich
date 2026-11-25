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

export const cateringServices = ["Sándwiches de miga", "Picadas", "Tortas saladas", "Mesa salada completa"];
export const cateringEvents = ["Cumpleaños", "Oficina o reunión", "Evento familiar", "Otro"];

export const whyUs = [
  { title: "Elaboración artesanal y fresca", text: "Hacemos todo en nuestra fábrica, cada día." },
  { title: "Variedad en un solo lugar", text: "Miga, picadas, tortas saladas y catering." },
  { title: "Atención directa por WhatsApp", text: "Hablás con quien arma tu pedido." },
  { title: "Retiro y envíos en Córdoba", text: "Pasá por Montevideo 712 o coordinamos la entrega." },
];
