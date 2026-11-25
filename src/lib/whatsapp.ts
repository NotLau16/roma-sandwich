import { business } from "@/data/romaData";
export const wa = (msg: string) => `https://wa.me/${business.phone}?text=${encodeURIComponent(msg)}`;
export const money = (n: number | null) =>
  n === null ? "Consultar precio" : new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
