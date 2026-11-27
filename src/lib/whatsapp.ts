import { business } from "@/data/romaData";
import { safeExternalUrl, sanitizePlainText } from "@/lib/security";

const WHATSAPP_PHONE_RE = /^\d{8,15}$/;
const MAX_WHATSAPP_MESSAGE_LENGTH = 1500;

function normalizeWhatsAppPhone(rawPhone: string): string | null {
  const digits = rawPhone.replace(/\D/g, "");
  return WHATSAPP_PHONE_RE.test(digits) ? digits : null;
}

/**
 * Construye de forma segura un enlace `https://wa.me/...` validando el teléfono
 * de destino, saneando el texto y verificando el protocolo resultante.
 */
export const wa = (msg: string): string => {
  const cleanPhone = normalizeWhatsAppPhone(business.phone);
  if (!cleanPhone) return "#";

  const cleanMessage = sanitizePlainText(msg, {
    maxLength: MAX_WHATSAPP_MESSAGE_LENGTH,
    preserveNewlines: true,
  }).trim();

  const url = new URL(`https://wa.me/${cleanPhone}`);
  if (cleanMessage) {
    url.search = `?text=${encodeURIComponent(cleanMessage)}`;
  }

  return safeExternalUrl(url.toString());
};

export const money = (n: number | null) =>
  n === null
    ? "Consultar precio"
    : new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
      }).format(n);
