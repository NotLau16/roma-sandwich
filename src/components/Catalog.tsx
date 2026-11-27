"use client";
import { useEffect, useState } from "react";
import {
  traditionalBreads,
  traditionalNote,
  traditionalGroups,
  gourmetBreads,
  gourmetVeggies,
  gourmetItems,
  migaPresentations,
  migaNote,
  migaGroups,
  combosNote,
  specialCombos,
  picadas,
  tortas,
  type Plan,
} from "@/data/romaData";
import { sanitizePlainText } from "@/lib/security";
import { wa, money } from "@/lib/whatsapp";

type CartItem = {
  id: string;
  section: string;
  name: string;
  variant?: string;
  quantity: number;
  unitKind: "combo-miga" | "unit";
};

type DisplayItem = {
  id: string;
  section: string;
  name: string;
  variant?: string;
  price: number | null;
  unitKind: "combo-miga" | "unit";
  initialQuantity?: number;
  addLabel?: string;
  subtext?: string;
};

type DisplayGroup = {
  category: string;
  items: DisplayItem[];
};

type CartActions = {
  getQuantity: (id: string) => number;
  addItem: (item: Omit<CartItem, "quantity">, amount?: number) => void;
  setQuantity: (id: string, nextQty: number) => void;
};

const STORAGE_KEY = "roma-sandwich-cart-v1";
const MAX_CART_ITEMS = 50;
const MAX_ITEM_QUANTITY = 200;
const MAX_CART_NOTE_LENGTH = 300;
const MAX_CART_FIELD_LENGTH = 160;
const MAX_STORED_CART_BYTES = 20_000;
const BLOCKED_OBJECT_KEYS = new Set(["__proto__", "constructor", "prototype"]);

const clampCartQuantity = (value: number): number =>
  Number.isFinite(value) ? Math.min(MAX_ITEM_QUANTITY, Math.max(0, Math.trunc(value))) : 0;

function parseStoredCart(raw: string): { items: CartItem[]; note: string } | null {
  if (!raw || raw.length > MAX_STORED_CART_BYTES) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null;
  }

  const record = parsed as Record<string, unknown>;
  const deduped = new Map<string, CartItem>();

  if (Array.isArray(record.items)) {
    for (const entry of record.items) {
      if (deduped.size >= MAX_CART_ITEMS) break;
      if (typeof entry !== "object" || entry === null || Array.isArray(entry)) continue;

      const candidate = entry as Record<string, unknown>;
      const id = sanitizePlainText(candidate.id, { maxLength: MAX_CART_FIELD_LENGTH }).trim();
      const section = sanitizePlainText(candidate.section, { maxLength: MAX_CART_FIELD_LENGTH }).trim();
      const name = sanitizePlainText(candidate.name, { maxLength: MAX_CART_FIELD_LENGTH }).trim();
      const variant = sanitizePlainText(candidate.variant, { maxLength: MAX_CART_FIELD_LENGTH }).trim();
      const unitKind = candidate.unitKind;
      const rawQty = candidate.quantity;

      if (
        !id ||
        BLOCKED_OBJECT_KEYS.has(id) ||
        !section ||
        !name ||
        (unitKind !== "combo-miga" && unitKind !== "unit") ||
        typeof rawQty !== "number" ||
        !Number.isInteger(rawQty) ||
        rawQty < 1
      ) {
        continue;
      }

      const quantity = clampCartQuantity(rawQty);
      if (quantity < 1) continue;

      deduped.set(id, {
        id,
        section,
        name,
        ...(variant ? { variant } : {}),
        quantity,
        unitKind,
      });
    }
  }

  const note = sanitizePlainText(record.note, {
    maxLength: MAX_CART_NOTE_LENGTH,
    preserveNewlines: true,
  });

  return { items: Array.from(deduped.values()), note };
}

const pill = (active: boolean) =>
  `rounded-full px-3.5 py-1 text-xs font-medium transition sm:text-sm ${
    active ? "bg-olive text-cream" : "bg-cream-card text-olive ring-1 ring-olive/30 hover:ring-olive"
  }`;

const filterChip = (active: boolean) =>
  `rounded-full px-3 py-1 text-xs font-medium transition ${
    active ? "bg-forest text-cream" : "bg-cream-card text-forest ring-1 ring-olive/30 hover:ring-forest"
  }`;

const toggleInList = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

const formatCartLine = (item: CartItem) => {
  if (item.unitKind === "combo-miga") {
    const comboWord = item.quantity === 1 ? "combo" : "combos";
    return `• ${item.quantity} ${comboWord} (${item.quantity * 3} uni) — ${item.name} (${item.section})`;
  }
  const variantText = item.variant ? ` (${item.variant})` : "";
  return `• ${item.quantity}x ${item.name}${variantText} — ${item.section}`;
};

const buildCartWhatsAppMessage = (cart: CartItem[], note: string) => {
  const lines = cart.map(formatCartLine).join("\n");
  const cleanNote = note.trim();
  const noteBlock = cleanNote ? `\n\nAclaración: ${cleanNote}` : "";
  return `Hola Roma Sandwich! Quiero pedir presupuesto por el siguiente pedido:\n\n${lines}${noteBlock}\n\n¿Me pasás el presupuesto total? ¡Gracias!`;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className={`h-5 w-5 shrink-0 text-forest transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Accordion({
  title,
  meta,
  open,
  onToggle,
  variant = "section",
  children,
}: {
  title: string;
  meta: string;
  open: boolean;
  onToggle: () => void;
  variant?: "section" | "category";
  children: React.ReactNode;
}) {
  const isSection = variant === "section";
  return (
    <div
      className={`overflow-hidden rounded-2xl transition ${
        isSection
          ? "bg-cream ring-1 ring-olive/25"
          : "bg-cream-card ring-1 ring-olive/20"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-4 text-left transition hover:bg-olive/5 ${
          isSection ? "px-5 py-4 sm:px-6 sm:py-5" : "px-4 py-3.5"
        }`}
      >
        <div className="min-w-0">
          <span
            className={`block font-display text-forest ${
              isSection ? "text-xl font-semibold sm:text-2xl" : "text-lg font-medium"
            }`}
          >
            {title}
          </span>
          <span className="mt-0.5 block text-xs text-ink-soft sm:text-sm">{meta}</span>
        </div>
        <Chevron open={open} />
      </button>
      {open && (
        <div
          className={`border-t border-olive/15 ${
            isSection ? "px-5 py-5 sm:px-6" : "px-4 py-2"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function QuantityControl({
  name,
  quantity,
  addLabel = "+ Agregar",
  onAdd,
  onChange,
}: {
  name: string;
  quantity: number;
  addLabel?: string;
  onAdd: () => void;
  onChange: (nextQty: number) => void;
}) {
  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className="shrink-0 rounded-full border border-forest/30 px-3 py-1 text-xs font-medium text-forest transition hover:border-forest hover:bg-forest hover:text-cream"
      >
        {addLabel}
      </button>
    );
  }

  return (
    <div className="inline-flex shrink-0 items-center rounded-full bg-forest text-cream shadow-sm">
      <button
        type="button"
        aria-label={`Quitar uno de ${name}`}
        onClick={() => onChange(quantity - 1)}
        className="px-2.5 py-1 text-xs font-semibold transition hover:opacity-80"
      >
        −
      </button>
      <span className="min-w-[1.5rem] text-center text-xs font-semibold tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        aria-label={`Sumar uno a ${name}`}
        onClick={() => onChange(quantity + 1)}
        className="px-2.5 py-1 text-xs font-semibold transition hover:opacity-80"
      >
        +
      </button>
    </div>
  );
}

function ItemRow({ item, cart }: { item: DisplayItem; cart: CartActions }) {
  const qty = cart.getQuantity(item.id);
  const migaSubtext =
    item.unitKind === "combo-miga" && qty > 0 ? `${qty} ${qty === 1 ? "combo" : "combos"} (${qty * 3} uni)` : undefined;
  const displaySubtext = migaSubtext ?? item.subtext;

  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink sm:text-base">{item.name}</p>
        {displaySubtext && <p className="text-xs text-olive">{displaySubtext}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        {item.price !== null && (
          <span className="text-sm font-semibold tabular-nums text-olive sm:text-base">
            {money(item.price)}
          </span>
        )}
        <QuantityControl
          name={item.name}
          quantity={qty}
          addLabel={item.addLabel}
          onAdd={() =>
            cart.addItem(
              {
                id: item.id,
                section: item.section,
                name: item.name,
                variant: item.variant,
                unitKind: item.unitKind,
              },
              item.initialQuantity ?? 1,
            )
          }
          onChange={(nextQty) => cart.setQuantity(item.id, nextQty)}
        />
      </div>
    </li>
  );
}

function CategoryAccordionList({ groups, cart }: { groups: DisplayGroup[]; cart: CartActions }) {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  return (
    <div className="grid items-start gap-3 md:grid-cols-2">
      {groups.map((group) => {
        const isOpen = openCategories.includes(group.category);
        const totalInGroup = group.items.reduce((acc, i) => acc + cart.getQuantity(i.id), 0);
        const meta =
          totalInGroup > 0
            ? `${group.items.length} variedades · ${totalInGroup} en tu pedido`
            : `${group.items.length} variedades`;

        return (
          <Accordion
            key={group.category}
            title={group.category}
            meta={meta}
            open={isOpen}
            onToggle={() => setOpenCategories((prev) => toggleInList(prev, group.category))}
            variant="category"
          >
            <ul className="divide-y divide-olive/15">
              {group.items.map((item) => (
                <ItemRow key={item.id} item={item} cart={cart} />
              ))}
            </ul>
          </Accordion>
        );
      })}
    </div>
  );
}

function MigaCatalog({ cart }: { cart: CartActions }) {
  const [combos, setCombos] = useState<number>(migaPresentations[0].combos);
  const pres = migaPresentations.find((p) => p.combos === combos)!;

  const groups: DisplayGroup[] = migaGroups.map((group) => ({
    category: group.category,
    items: group.items.map((item) => ({
      id: `miga::${item.name}`,
      section: "Sándwiches de Miga",
      name: item.name,
      price: item.price === null ? null : item.price * pres.combos,
      unitKind: "combo-miga",
      initialQuantity: pres.combos,
      addLabel: pres.combos === 1 ? "+ Agregar" : `+ Agregar (${pres.combos})`,
    })),
  }));

  return (
    <div>
      <p className="mb-4 text-sm text-ink-soft">{migaNote}</p>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-ink-soft sm:text-sm">Presentación:</span>
        {migaPresentations.map((p) => (
          <button
            key={p.combos}
            type="button"
            onClick={() => setCombos(p.combos)}
            aria-pressed={combos === p.combos}
            className={pill(combos === p.combos)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <CategoryAccordionList groups={groups} cart={cart} />
    </div>
  );
}

function TraditionalCatalog({ cart }: { cart: CartActions }) {
  const [bread, setBread] = useState<(typeof traditionalBreads)[number]["id"]>("Pan Árabe");

  const groups: DisplayGroup[] = traditionalGroups.map((group) => ({
    category: group.category,
    items: group.items.map((item) => ({
      id: `trad::${item.name}::${bread}`,
      section: "Sándwich Tradicional",
      name: item.name,
      variant: bread,
      price: bread === "Pan Árabe" ? item.priceArabe : item.pricePebete,
      unitKind: "unit",
    })),
  }));

  return (
    <div>
      <p className="mb-4 text-sm text-ink-soft">{traditionalNote}</p>
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-ink-soft sm:text-sm">Tipo de pan:</span>
        {traditionalBreads.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setBread(b.id)}
            aria-pressed={bread === b.id}
            className={pill(bread === b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>

      <CategoryAccordionList groups={groups} cart={cart} />
    </div>
  );
}

function GourmetCatalog({ cart }: { cart: CartActions }) {
  const [bread, setBread] = useState<(typeof gourmetBreads)[number]["id"]>("Pan Ciabatta");
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([]);

  const toggleVeggie = (veggie: string) => {
    setSelectedVeggies((prev) => {
      if (prev.includes(veggie)) return prev.filter((v) => v !== veggie);
      return prev.length >= 2 ? [...prev.slice(1), veggie] : [...prev, veggie];
    });
  };

  return (
    <div>
      <p className="mb-4 text-sm text-ink-soft">
        Disponible en Pan Ciabatta y Pan Focaccia.{" "}
        <strong className="font-medium text-forest">
          Verduras a elección: {gourmetVeggies.join(", ")}.
        </strong>
      </p>

      <div className="mb-5 space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-soft sm:text-sm">Tipo de pan:</span>
          {gourmetBreads.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => setBread(b.id)}
              aria-pressed={bread === b.id}
              className={pill(bread === b.id)}
            >
              {b.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-soft sm:text-sm">
            Verduras (opcional, hasta 2):
          </span>
          {gourmetVeggies.map((veggie) => {
            const active = selectedVeggies.includes(veggie);
            return (
              <button
                key={veggie}
                type="button"
                onClick={() => toggleVeggie(veggie)}
                aria-pressed={active}
                className={filterChip(active)}
              >
                {active ? `✓ ${veggie}` : veggie}
              </button>
            );
          })}
        </div>
      </div>

      <ul className="divide-y divide-olive/15 rounded-xl bg-cream-card px-4 py-1 ring-1 ring-olive/20">
        {gourmetItems.map((item) => {
          const allowsVeggies = item.name.toLowerCase().includes("verduras");
          const veggies = allowsVeggies && selectedVeggies.length > 0 ? selectedVeggies.join(" y ") : "";
          const variant = veggies ? `${bread} · Verduras: ${veggies}` : bread;
          const displayItem: DisplayItem = {
            id: `gourmet::${item.name}::${variant}`,
            section: "Línea Gourmet",
            name: item.name,
            variant,
            price: bread === "Pan Ciabatta" ? item.priceCiabatta : item.priceFocaccia,
            unitKind: "unit",
          };
          return <ItemRow key={displayItem.id} item={displayItem} cart={cart} />;
        })}
      </ul>
    </div>
  );
}

function PlansList({
  plans,
  sectionTitle,
  idPrefix,
  note,
  cols = 3,
  cart,
}: {
  plans: Plan[];
  sectionTitle: string;
  idPrefix: string;
  note?: string;
  cols?: 2 | 3;
  cart: CartActions;
}) {
  return (
    <div>
      {note && <p className="mb-4 text-sm text-ink-soft">{note}</p>}
      <div className={`grid gap-3 ${cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {plans.map((p) => {
          const id = `${idPrefix}::${p.name}`;
          const qty = cart.getQuantity(id);
          return (
            <article
              key={p.name}
              className="flex flex-col rounded-xl bg-cream-card p-4 ring-1 ring-olive/20"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="font-display text-xl text-forest">{p.name}</h4>
                {p.price !== null && (
                  <span className="whitespace-nowrap font-semibold text-olive">
                    {money(p.price)}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs font-medium text-olive">{p.serves}</p>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{p.detail}</p>
              <div className="mt-3 flex items-center justify-end">
                <QuantityControl
                  name={p.name}
                  quantity={qty}
                  addLabel="+ Agregar al pedido"
                  onAdd={() =>
                    cart.addItem({
                      id,
                      section: sectionTitle,
                      name: p.name,
                      variant: p.serves,
                      unitKind: "unit",
                    })
                  }
                  onChange={(nextQty) => cart.setQuantity(id, nextQty)}
                />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function CartDrawer({
  open,
  onClose,
  items,
  note,
  onNoteChange,
  onQuantityChange,
  onClear,
}: {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  note: string;
  onNoteChange: (value: string) => void;
  onQuantityChange: (id: string, nextQty: number) => void;
  onClear: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const waHref = wa(buildCartWhatsAppMessage(items, note));

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-ink/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Tu pedido"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex h-full w-full max-w-md flex-col bg-cream-card shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-olive/20 px-5 py-4">
          <div>
            <h3 className="font-display text-2xl font-semibold text-forest">Tu pedido</h3>
            <p className="text-xs text-ink-soft">
              Enviá tu lista por WhatsApp para recibir el presupuesto.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="rounded-full p-1.5 text-ink-soft transition hover:bg-olive/10 hover:text-forest"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-12 text-center text-sm text-ink-soft">
              Todavía no agregaste productos. Elegí del catálogo para armar tu pedido.
            </p>
          ) : (
            <>
              <ul className="divide-y divide-olive/15">
                {items.map((item) => (
                  <li key={item.id} className="flex items-start justify-between gap-3 py-3.5">
                    <div className="min-w-0">
                      <span className="text-xs font-medium text-olive">{item.section}</span>
                      <p className="font-medium text-ink">{item.name}</p>
                      {item.unitKind === "combo-miga" ? (
                        <p className="text-xs text-ink-soft">
                          {item.quantity} {item.quantity === 1 ? "combo" : "combos"} ({item.quantity * 3} unidades)
                        </p>
                      ) : (
                        item.variant && <p className="text-xs text-ink-soft">{item.variant}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <QuantityControl
                        name={item.name}
                        quantity={item.quantity}
                        onAdd={() => onQuantityChange(item.id, 1)}
                        onChange={(nextQty) => onQuantityChange(item.id, nextQty)}
                      />
                      <button
                        type="button"
                        onClick={() => onQuantityChange(item.id, 0)}
                        className="text-xs text-ink-soft underline underline-offset-2 hover:text-ink"
                      >
                        Quitar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <label className="mt-5 block text-xs font-medium text-ink-soft">
                Aclaración opcional
                <textarea
                  rows={2}
                  maxLength={MAX_CART_NOTE_LENGTH}
                  value={note}
                  onChange={(e) =>
                    onNoteChange(
                      sanitizePlainText(e.target.value, {
                        maxLength: MAX_CART_NOTE_LENGTH,
                        preserveNewlines: true,
                      }),
                    )
                  }
                  placeholder="Ej: Para el sábado al mediodía, retiro en el local..."
                  className="mt-1.5 w-full rounded-xl border border-olive/30 bg-cream px-3 py-2 text-sm text-ink placeholder:text-ink-soft/60"
                />
              </label>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="space-y-2 border-t border-olive/20 bg-cream px-5 py-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-forest px-5 py-3 text-center text-sm font-semibold text-cream transition hover:bg-forest-deep"
            >
              Pedir presupuesto por WhatsApp
            </a>
            <button
              type="button"
              onClick={onClear}
              className="block w-full py-1 text-center text-xs text-ink-soft underline underline-offset-4 hover:text-ink"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Catalog() {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [note, setNote] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = parseStoredCart(saved);
        if (parsed) {
          setCartItems(parsed.items);
          setNote(parsed.note);
        } else {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      // Ignoramos errores de almacenamiento local en navegación restringida.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: cartItems, note }));
    } catch {
      // Sin persistencia cuando el navegador bloquea storage.
    }
  }, [cartItems, note, hydrated]);

  const cart: CartActions = {
    getQuantity: (id) => cartItems.find((item) => item.id === id)?.quantity ?? 0,
    addItem: (newItem, amount = 1) =>
      setCartItems((prev) => {
        const delta = clampCartQuantity(amount);
        if (delta <= 0) return prev;
        const existing = prev.find((item) => item.id === newItem.id);
        if (existing) {
          const nextQty = clampCartQuantity(existing.quantity + delta);
          return prev.map((item) =>
            item.id === newItem.id ? { ...item, quantity: nextQty } : item,
          );
        }
        if (prev.length >= MAX_CART_ITEMS) return prev;
        return [...prev, { ...newItem, quantity: delta }];
      }),
    setQuantity: (id, nextQty) =>
      setCartItems((prev) => {
        const bounded = clampCartQuantity(nextQty);
        return bounded <= 0
          ? prev.filter((item) => item.id !== id)
          : prev.map((item) => (item.id === id ? { ...item, quantity: bounded } : item));
      }),
  };

  const totalSelections = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const sections = [
    {
      id: "miga",
      title: "Sándwiches de Miga (Combos de 3 Unidades)",
      meta: `${migaGroups.length} variedades base · Combos de 3 unidades`,
      render: () => <MigaCatalog cart={cart} />,
    },
    {
      id: "tradicionales",
      title: "Sándwiches Tradicionales (Pan Árabe / Pebete)",
      meta: `${traditionalGroups.length} variedades base · Pan Árabe o Pebete`,
      render: () => <TraditionalCatalog cart={cart} />,
    },
    {
      id: "gourmet",
      title: "Línea Gourmet (Pan Ciabatta y Pan Focaccia)",
      meta: `${gourmetItems.length} combinaciones · Pan Ciabatta o Focaccia`,
      render: () => <GourmetCatalog cart={cart} />,
    },
    {
      id: "combos",
      title: "Combos Especiales",
      meta: `${specialCombos.length} combos con bebida incluida`,
      render: () => (
        <PlansList
          plans={specialCombos}
          sectionTitle="Combos Especiales"
          idPrefix="combo"
          note={combosNote}
          cols={2}
          cart={cart}
        />
      ),
    },
    {
      id: "picadas",
      title: "Picadas",
      meta: "Tablas para 4, 6 y 8 personas",
      render: () => (
        <PlansList
          plans={picadas}
          sectionTitle="Picadas"
          idPrefix="picada"
          cart={cart}
        />
      ),
    },
    {
      id: "tortas",
      title: "Tortas Saladas",
      meta: "Chica (6 a 8 porciones) y Grande (12 a 16 porciones)",
      render: () => (
        <PlansList
          plans={tortas}
          sectionTitle="Tortas Saladas"
          idPrefix="torta"
          cols={2}
          cart={cart}
        />
      ),
    },
  ];

  return (
    <>
      {cartItems.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-forest px-4 py-3 text-cream">
          <p className="text-sm font-medium">
            Tu pedido: {cartItems.length} {cartItems.length === 1 ? "producto" : "productos"} ({totalSelections} {totalSelections === 1 ? "ítem" : "ítems"})
          </p>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-full bg-cream px-4 py-1.5 text-xs font-semibold text-forest transition hover:bg-white"
          >
            Ver carrito y presupuestar
          </button>
        </div>
      )}

      <div className="space-y-3">
        {sections.map((section) => (
          <Accordion
            key={section.id}
            title={section.title}
            meta={section.meta}
            open={openSections.includes(section.id)}
            onToggle={() => setOpenSections((prev) => toggleInList(prev, section.id))}
            variant="section"
          >
            {section.render()}
          </Accordion>
        ))}
      </div>

      {cartItems.length > 0 && !drawerOpen && (
        <div className="fixed bottom-5 left-4 z-40 sm:left-6">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex items-center gap-2.5 rounded-full bg-forest px-4 py-2.5 text-sm font-medium text-cream shadow-xl ring-1 ring-cream/25 transition hover:bg-forest-deep"
          >
            <span>
              Carrito ({cartItems.length})
            </span>
            <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-forest">
              Ver pedido
            </span>
          </button>
        </div>
      )}

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={cartItems}
        note={note}
        onNoteChange={setNote}
        onQuantityChange={cart.setQuantity}
        onClear={() => setCartItems([])}
      />
    </>
  );
}
