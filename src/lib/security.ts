const UNSAFE_CTRL_KEEP_NEWLINES_RE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const UNSAFE_CTRL_SINGLE_LINE_RE = /[\u0000-\u001F\u007F]/g;
const ALLOWED_EXTERNAL_PROTOCOLS = new Set(["https:", "tel:", "mailto:"]);
const TEL_TARGET_RE = /^\+?[0-9][0-9\s().-]{4,24}$/;
const EMAIL_TARGET_RE = /^[^\s@/?#<>"'\\]+@[^\s@/?#<>"'\\]+\.[^\s@/?#<>"'\\]{2,}$/;

/**
 * Normaliza texto ingresado por usuarios o almacenado localmente eliminando
 * caracteres de control ASCII potencialmente peligrosos y aplicando un límite máximo.
 */
export function sanitizePlainText(
  value: unknown,
  options: { maxLength: number; preserveNewlines?: boolean } = { maxLength: 300 },
): string {
  if (typeof value !== "string") return "";

  const preserveNewlines = options.preserveNewlines ?? false;
  const normalized = preserveNewlines
    ? value.replace(/\r\n?/g, "\n").replace(UNSAFE_CTRL_KEEP_NEWLINES_RE, "")
    : value.replace(UNSAFE_CTRL_SINGLE_LINE_RE, " ");

  return normalized.slice(0, options.maxLength);
}

/**
 * Valida que una URL externa utilice únicamente `https:`, `tel:` o `mailto:`,
 * rechazando `javascript:`, `data:`, rutas relativas o credenciales embebidas.
 */
export function safeExternalUrl(rawUrl: string | null | undefined, fallback = "#"): string {
  if (typeof rawUrl !== "string") return fallback;

  const trimmed = rawUrl.trim();
  if (!trimmed || UNSAFE_CTRL_SINGLE_LINE_RE.test(trimmed)) return fallback;
  if (trimmed.startsWith("/") || trimmed.startsWith("\\")) return fallback;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return fallback;
  }

  if (!ALLOWED_EXTERNAL_PROTOCOLS.has(parsed.protocol)) {
    return fallback;
  }

  if (parsed.protocol === "https:") {
    if (!parsed.hostname || parsed.username || parsed.password) {
      return fallback;
    }
    return parsed.toString();
  }

  if (parsed.protocol === "tel:") {
    const target = parsed.pathname.trim();
    if (!TEL_TARGET_RE.test(target) || parsed.search || parsed.hash) {
      return fallback;
    }
    return `tel:${target.replace(/[^\d+]/g, "")}`;
  }

  const email = parsed.pathname.trim();
  if (!EMAIL_TARGET_RE.test(email) || parsed.search || parsed.hash) {
    return fallback;
  }
  return `mailto:${email}`;
}

/**
 * Valida URLs de iframes embebidos exigiendo HTTPS, sin credenciales
 * y pertenecientes exclusivamente a la lista blanca de hosts permitidos.
 */
export function safeEmbedUrl(
  rawUrl: string | null | undefined,
  allowedHosts: readonly string[] = ["www.google.com", "maps.google.com"],
): string | undefined {
  if (typeof rawUrl !== "string") return undefined;

  const trimmed = rawUrl.trim();
  if (!trimmed || UNSAFE_CTRL_SINGLE_LINE_RE.test(trimmed)) return undefined;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return undefined;
  }

  if (
    parsed.protocol !== "https:" ||
    parsed.username ||
    parsed.password ||
    !allowedHosts.includes(parsed.hostname.toLowerCase()) ||
    !parsed.pathname.startsWith("/maps")
  ) {
    return undefined;
  }

  return parsed.toString();
}
