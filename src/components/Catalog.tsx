"use client";
import { useState } from "react";
import {
  traditionalBreads,
  traditionalNote,
  traditionalGroups,
  traditionalExtras,
  gourmetBreads,
  gourmetVeggies,
  gourmetItems,
  gourmetExtras,
  migaPresentations,
  migaNote,
  migaGroups,
  migaExtras,
  combosNote,
  specialCombos,
  picadas,
  tortas,
  type Plan,
  type ExtraOption,
} from "@/data/romaData";
import { wa, money } from "@/lib/whatsapp";

type DisplayItem = {
  name: string;
  price: number;
  waMessage: string;
  subtext?: string;
};

type DisplayGroup = {
  category: string;
  items: DisplayItem[];
};

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

const sumExtras = (extras: ExtraOption[], selectedIds: string[]) =>
  extras.reduce((total, extra) => (selectedIds.includes(extra.id) ? total + extra.price : total), 0);

const formatExtrasSuffix = (extras: ExtraOption[], selectedIds: string[]) => {
  const chosen = extras.filter((e) => selectedIds.includes(e.id)).map((e) => e.shortLabel);
  return chosen.length ? ` + ${chosen.join(" + ")}` : "";
};

const minPrice = (prices: number[]) => Math.min(...prices);

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

function ItemRow({ name, price, waMessage, subtext }: DisplayItem) {
  return (
    <li className="flex items-center justify-between gap-3 py-2.5">
      <div className="min-w-0">
        <p className="text-sm font-medium text-ink sm:text-base">{name}</p>
        {subtext && <p className="text-xs text-ink-soft">{subtext}</p>}
      </div>
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-sm font-semibold tabular-nums text-olive sm:text-base">
          {money(price)}
        </span>
        <a
          href={wa(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-forest/30 px-3 py-1 text-xs font-medium text-forest transition hover:border-forest hover:bg-forest hover:text-cream"
        >
          Pedir
        </a>
      </div>
    </li>
  );
}

function CategoryAccordionList({ groups }: { groups: DisplayGroup[] }) {
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  return (
    <div className="grid items-start gap-3 md:grid-cols-2">
      {groups.map((group) => {
        const isOpen = openCategories.includes(group.category);
        const lowest = minPrice(group.items.map((item) => item.price));
        return (
          <Accordion
            key={group.category}
            title={group.category}
            meta={`${group.items.length} opciones · Desde ${money(lowest)}`}
            open={isOpen}
            onToggle={() => setOpenCategories((prev) => toggleInList(prev, group.category))}
            variant="category"
          >
            <ul className="divide-y divide-olive/15">
              {group.items.map((item) => (
                <ItemRow key={item.name} {...item} />
              ))}
            </ul>
          </Accordion>
        );
      })}
    </div>
  );
}

function ExtrasBanner({
  title,
  extras,
  selectedIds,
  onToggle,
}: {
  title: string;
  extras: ExtraOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div className="mb-5 rounded-xl bg-cream-card p-3.5 ring-1 ring-olive/20">
      <p className="text-xs font-medium text-ink-soft">
        <span className="text-forest">{title}</span> · Opcional para sumar a tu pedido:
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {extras.map((extra) => {
          const active = selectedIds.includes(extra.id);
          return (
            <button
              key={extra.id}
              type="button"
              onClick={() => onToggle(extra.id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                active
                  ? "bg-forest text-cream"
                  : "bg-cream text-ink ring-1 ring-olive/25 hover:ring-forest"
              }`}
            >
              <span>{active ? "✓" : "+"}</span>
              <span>
                {extra.shortLabel} ({money(extra.price)})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MigaCatalog() {
  const [combos, setCombos] = useState<number>(migaPresentations[0].combos);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const pres = migaPresentations.find((p) => p.combos === combos)!;
  const extrasPerCombo = sumExtras(migaExtras, selectedExtras);
  const extrasText = formatExtrasSuffix(migaExtras, selectedExtras);

  const groups: DisplayGroup[] = migaGroups.map((group) => ({
    category: group.category,
    items: group.items.map((item) => {
      const price = (item.price + extrasPerCombo) * pres.combos;
      return {
        name: item.name,
        price,
        waMessage: `Hola Roma Sandwich! Quiero pedir Sándwiches de Miga: ${item.name} — ${pres.label}${extrasText} (${money(price)}).`,
        subtext: extrasPerCombo > 0 || pres.combos > 1 ? `${money(item.price)} c/3 uni` : undefined,
      };
    }),
  }));

  return (
    <div>
      <p className="mb-4 text-sm text-ink-soft">{migaNote}</p>
      <div className="mb-4 flex flex-wrap items-center gap-2">
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

      <ExtrasBanner
        title="Adicionales (c/3 uni)"
        extras={migaExtras}
        selectedIds={selectedExtras}
        onToggle={(id) => setSelectedExtras((prev) => toggleInList(prev, id))}
      />

      <CategoryAccordionList groups={groups} />
    </div>
  );
}

function TraditionalCatalog() {
  const [bread, setBread] = useState<(typeof traditionalBreads)[number]["id"]>("Pan Francés");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const extrasTotal = sumExtras(traditionalExtras, selectedExtras);
  const extrasText = formatExtrasSuffix(traditionalExtras, selectedExtras);

  const groups: DisplayGroup[] = traditionalGroups.map((group) => ({
    category: group.category,
    items: group.items.map((item) => {
      const basePrice = bread === "Pan Francés" ? item.priceFrench : item.pricePebete;
      const price = basePrice + extrasTotal;
      return {
        name: item.name,
        price,
        waMessage: `Hola Roma Sandwich! Quiero pedir un Sándwich Tradicional: ${item.name} en ${bread}${extrasText} (${money(price)}).`,
        subtext: extrasTotal > 0 ? `Base ${money(basePrice)}` : undefined,
      };
    }),
  }));

  return (
    <div>
      <p className="mb-4 text-sm text-ink-soft">{traditionalNote}</p>
      <div className="mb-4 flex flex-wrap items-center gap-2">
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

      <ExtrasBanner
        title="Adicionales"
        extras={traditionalExtras}
        selectedIds={selectedExtras}
        onToggle={(id) => setSelectedExtras((prev) => toggleInList(prev, id))}
      />

      <CategoryAccordionList groups={groups} />
    </div>
  );
}

function GourmetCatalog() {
  const [bread, setBread] = useState<(typeof gourmetBreads)[number]["id"]>("Pan Ciabatta");
  const [selectedVeggies, setSelectedVeggies] = useState<string[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const extrasTotal = sumExtras(gourmetExtras, selectedExtras);
  const extrasText = formatExtrasSuffix(gourmetExtras, selectedExtras);

  const toggleVeggie = (veggie: string) => {
    setSelectedVeggies((prev) => {
      if (prev.includes(veggie)) return prev.filter((v) => v !== veggie);
      return prev.length >= 2 ? [...prev.slice(1), veggie] : [...prev, veggie];
    });
  };

  return (
    <div>
      <p className="mb-4 text-sm text-ink-soft">
        Mismo valor en Pan Ciabatta y Pan Focaccia.{" "}
        <strong className="font-medium text-forest">
          Verduras a elección: {gourmetVeggies.join(", ")}.
        </strong>
      </p>

      <div className="mb-4 space-y-2.5">
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

      <ExtrasBanner
        title="Adicionales"
        extras={gourmetExtras}
        selectedIds={selectedExtras}
        onToggle={(id) => setSelectedExtras((prev) => toggleInList(prev, id))}
      />

      <ul className="divide-y divide-olive/15 rounded-xl bg-cream-card px-4 py-1 ring-1 ring-olive/20">
        {gourmetItems.map((item) => {
          const basePrice = bread === "Pan Ciabatta" ? item.priceCiabatta : item.priceFocaccia;
          const price = basePrice + extrasTotal;
          const allowsVeggies = item.name.toLowerCase().includes("verduras");
          const veggiesText =
            allowsVeggies && selectedVeggies.length > 0
              ? ` (Verduras: ${selectedVeggies.join(" y ")})`
              : "";
          return (
            <ItemRow
              key={item.name}
              name={item.name}
              price={price}
              waMessage={`Hola Roma Sandwich! Quiero pedir Línea Gourmet: ${item.name} en ${bread}${veggiesText}${extrasText} (${money(price)}).`}
              subtext={extrasTotal > 0 ? `Base ${money(basePrice)}` : undefined}
            />
          );
        })}
      </ul>
    </div>
  );
}

function PlansList({
  plans,
  kind,
  note,
  cols = 3,
}: {
  plans: Plan[];
  kind: string;
  note?: string;
  cols?: 2 | 3;
}) {
  return (
    <div>
      {note && <p className="mb-4 text-sm text-ink-soft">{note}</p>}
      <div className={`grid gap-3 ${cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {plans.map((p) => {
          const hasPrice = p.price !== null;
          const msg = hasPrice
            ? `Hola Roma Sandwich! Quiero pedir el ${p.name} (${money(p.price)}).`
            : `Hola Roma Sandwich! Quiero consultar por ${kind}: ${p.name} (${p.serves}).`;
          return (
            <article
              key={p.name}
              className="flex flex-col rounded-xl bg-cream-card p-4 ring-1 ring-olive/20"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="font-display text-xl text-forest">{p.name}</h4>
                {hasPrice && (
                  <span className="whitespace-nowrap font-semibold text-olive">
                    {money(p.price)}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs font-medium text-olive">{p.serves}</p>
              <p className="mt-2 flex-1 text-sm text-ink-soft">{p.detail}</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                {!hasPrice && <span className="text-sm font-medium text-olive">{money(p.price)}</span>}
                <a
                  href={wa(msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-forest/30 px-3.5 py-1 text-xs font-medium text-forest transition hover:border-forest hover:bg-forest hover:text-cream"
                >
                  {hasPrice ? "Pedir por WhatsApp" : "Consultar"}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

const sections = [
  {
    id: "miga",
    title: "Sándwiches de Miga (Combos de 3 Unidades)",
    meta: `${migaGroups.length} variedades base · Desde ${money(
      minPrice(migaGroups.flatMap((g) => g.items.map((i) => i.price))),
    )}`,
    render: () => <MigaCatalog />,
  },
  {
    id: "tradicionales",
    title: "Sándwiches Tradicionales (Pan Francés / Pebete)",
    meta: `${traditionalGroups.length} variedades base · Desde ${money(
      minPrice(traditionalGroups.flatMap((g) => g.items.map((i) => i.priceFrench))),
    )}`,
    render: () => <TraditionalCatalog />,
  },
  {
    id: "gourmet",
    title: "Línea Gourmet (Pan Ciabatta y Pan Focaccia)",
    meta: `${gourmetItems.length} combinaciones · Desde ${money(
      minPrice(gourmetItems.map((i) => i.priceCiabatta)),
    )}`,
    render: () => <GourmetCatalog />,
  },
  {
    id: "combos",
    title: "Combos Especiales",
    meta: `${specialCombos.length} combos con bebida incluida · Desde ${money(
      minPrice(specialCombos.map((c) => c.price ?? 0)),
    )}`,
    render: () => (
      <PlansList plans={specialCombos} kind="combos especiales" note={combosNote} cols={2} />
    ),
  },
  {
    id: "picadas",
    title: "Picadas",
    meta: "Tablas para 4, 6 y 8 personas · Consultar precio",
    render: () => <PlansList plans={picadas} kind="picadas" />,
  },
  {
    id: "tortas",
    title: "Tortas Saladas",
    meta: "Chica (6 a 8 porciones) y Grande (12 a 16 porciones) · Consultar precio",
    render: () => <PlansList plans={tortas} kind="tortas saladas" cols={2} />,
  },
] as const;

export default function Catalog() {
  const [openSections, setOpenSections] = useState<string[]>([]);

  return (
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
  );
}
