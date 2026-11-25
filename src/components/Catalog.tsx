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
  miga,
  picadas,
  tortas,
  presentations,
  type Plan,
  type ExtraOption,
} from "@/data/romaData";
import { wa, money } from "@/lib/whatsapp";

const tabs = [
  "Sándwiches Tradicionales",
  "Línea Gourmet",
  "Sándwiches de miga",
  "Picadas",
  "Tortas saladas",
] as const;
type Tab = (typeof tabs)[number];

const btn =
  "inline-flex items-center rounded-full border border-forest px-4 py-2 text-sm font-medium text-forest transition hover:bg-forest hover:text-cream";

const pill = (active: boolean) =>
  `rounded-full px-4 py-1.5 text-sm transition ${
    active ? "bg-olive text-cream" : "ring-1 ring-olive/40 text-olive hover:bg-olive/10"
  }`;

const toggleInList = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

const sumExtras = (extras: ExtraOption[], selectedIds: string[]) =>
  extras.reduce((total, extra) => (selectedIds.includes(extra.id) ? total + extra.price : total), 0);

const formatExtrasSuffix = (extras: ExtraOption[], selectedIds: string[]) => {
  const chosen = extras.filter((e) => selectedIds.includes(e.id)).map((e) => e.shortLabel);
  return chosen.length ? ` + ${chosen.join(" + ")}` : "";
};

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
    <div className="mt-8 rounded-2xl border-l-4 border-forest bg-cream p-5 ring-1 ring-olive/20">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="font-display text-lg font-semibold text-forest">{title}</h4>
        <span className="text-xs text-ink-soft">Opcional: tocá para sumar a tu pedido por WhatsApp</span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {extras.map((extra) => {
          const active = selectedIds.includes(extra.id);
          return (
            <button
              key={extra.id}
              type="button"
              onClick={() => onToggle(extra.id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition ${
                active
                  ? "bg-forest text-cream shadow-sm"
                  : "bg-cream-card text-ink ring-1 ring-olive/30 hover:ring-forest"
              }`}
            >
              <span>{active ? "✓" : "+"}</span>
              <span>
                {extra.label}: <strong>{money(extra.price)}</strong>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TraditionalCatalog() {
  const [bread, setBread] = useState<(typeof traditionalBreads)[number]["id"]>("Pan Francés");
  const [categoryFilter, setCategoryFilter] = useState<string>("Todas");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  const categories = ["Todas", ...traditionalGroups.map((g) => g.category)];
  const visibleGroups =
    categoryFilter === "Todas"
      ? traditionalGroups
      : traditionalGroups.filter((g) => g.category === categoryFilter);

  const extrasTotal = sumExtras(traditionalExtras, selectedExtras);
  const extrasText = formatExtrasSuffix(traditionalExtras, selectedExtras);

  return (
    <div>
      <div className="mb-6">
        <h3 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
          Sándwiches Tradicionales (Pan Francés / Pebete)
        </h3>
        <p className="mt-2 max-w-3xl text-ink-soft">{traditionalNote}</p>
      </div>

      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-sm font-medium text-ink-soft">Tipo de pan:</span>
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

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-ink-soft">Categoría:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              aria-pressed={categoryFilter === cat}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition sm:text-sm ${
                categoryFilter === cat
                  ? "bg-forest text-cream"
                  : "bg-cream text-forest ring-1 ring-olive/30 hover:ring-forest"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {visibleGroups.map((group) => (
          <article
            key={group.category}
            className="rounded-2xl bg-cream p-5 ring-1 ring-olive/20 sm:p-6"
          >
            <div className="flex items-baseline justify-between gap-2 border-b border-olive/30 pb-2.5">
              <h4 className="font-display text-2xl text-forest">{group.category}</h4>
              <span className="text-xs font-medium text-olive">Pan Francés / Pebete</span>
            </div>
            <ul className="divide-y divide-olive/15">
              {group.items.map((item) => {
                const basePrice = bread === "Pan Francés" ? item.priceFrench : item.pricePebete;
                const finalPrice = basePrice + extrasTotal;
                const msg = `Hola Roma Sandwich! Quiero pedir un Sándwich Tradicional: ${item.name} en ${bread}${extrasText} (${money(finalPrice)}).`;

                return (
                  <li key={item.name} className="py-3.5">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-medium text-ink">{item.name}</span>
                      <span className="whitespace-nowrap font-semibold text-olive">
                        {money(finalPrice)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <a
                        className="text-sm text-forest underline underline-offset-4 hover:text-olive"
                        href={wa(msg)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Pedir en {bread}
                        {extrasText}
                      </a>
                      {extrasTotal > 0 && (
                        <span className="text-xs text-ink-soft">Base {money(basePrice)}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      <ExtrasBanner
        title="Adicionales para Sándwiches Tradicionales"
        extras={traditionalExtras}
        selectedIds={selectedExtras}
        onToggle={(id) => setSelectedExtras((prev) => toggleInList(prev, id))}
      />
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
      <div className="mb-6">
        <h3 className="font-display text-2xl font-semibold text-forest sm:text-3xl">
          Línea Gourmet: Pan Ciabatta y Pan Focaccia
        </h3>
        <p className="mt-2 text-ink-soft">
          Mismo valor en Pan Ciabatta y Pan Focaccia.{" "}
          <strong className="font-medium text-forest">
            Verduras a elección: {gourmetVeggies.join(", ")}.
          </strong>
        </p>
      </div>

      <div className="mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-sm font-medium text-ink-soft">Tipo de pan:</span>
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
          <span className="text-sm font-medium text-ink-soft">
            Verduras a elección (opcional, hasta 2):
          </span>
          {gourmetVeggies.map((veggie) => {
            const active = selectedVeggies.includes(veggie);
            return (
              <button
                key={veggie}
                type="button"
                onClick={() => toggleVeggie(veggie)}
                aria-pressed={active}
                className={`rounded-full px-3.5 py-1 text-xs font-medium transition sm:text-sm ${
                  active
                    ? "bg-forest text-cream"
                    : "bg-cream text-forest ring-1 ring-olive/30 hover:ring-forest"
                }`}
              >
                {active ? `✓ ${veggie}` : veggie}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {gourmetItems.map((item) => {
          const basePrice = bread === "Pan Ciabatta" ? item.priceCiabatta : item.priceFocaccia;
          const finalPrice = basePrice + extrasTotal;
          const allowsVeggies = item.name.toLowerCase().includes("verduras");
          const veggiesText =
            allowsVeggies && selectedVeggies.length > 0
              ? ` (Verduras: ${selectedVeggies.join(" y ")})`
              : "";
          const msg = `Hola Roma Sandwich! Quiero pedir Línea Gourmet: ${item.name} en ${bread}${veggiesText}${extrasText} (${money(finalPrice)}).`;

          return (
            <article
              key={item.name}
              className="flex flex-col justify-between rounded-2xl bg-cream p-5 ring-1 ring-olive/20"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display text-xl text-forest">{item.name}</h4>
                  <span className="whitespace-nowrap text-lg font-semibold text-olive">
                    {money(finalPrice)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-ink-soft">
                  Disponible en Pan Ciabatta y Pan Focaccia
                  {extrasTotal > 0 ? ` · Base ${money(basePrice)}` : ""}
                </p>
              </div>
              <a
                className={`${btn} mt-4 w-fit`}
                href={wa(msg)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir en {bread}
                {veggiesText}
                {extrasText}
              </a>
            </article>
          );
        })}
      </div>

      <ExtrasBanner
        title="Adicionales para Ciabatta y Focaccia"
        extras={gourmetExtras}
        selectedIds={selectedExtras}
        onToggle={(id) => setSelectedExtras((prev) => toggleInList(prev, id))}
      />
    </div>
  );
}

function MigaCatalog() {
  const [qty, setQty] = useState(presentations[1].qty);
  const pres = presentations.find((p) => p.qty === qty)!;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <span className="text-sm text-ink-soft">Presentación</span>
        {presentations.map((p) => (
          <button
            key={p.qty}
            type="button"
            onClick={() => setQty(p.qty)}
            aria-pressed={qty === p.qty}
            className={pill(qty === p.qty)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {miga.map((g) => (
          <div key={g.title}>
            <h3 className="border-b border-olive/30 pb-2 font-display text-2xl">{g.title}</h3>
            <ul className="divide-y divide-olive/15">
              {g.items.map((i) => (
                <li key={i.name} className="py-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-medium">{i.name}</span>
                    <span className="whitespace-nowrap text-sm text-olive">
                      {money(i.pricePerUnit === null ? null : i.pricePerUnit * pres.qty)}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft">{i.description}</p>
                  <a
                    className="mt-1 inline-block text-sm text-forest underline underline-offset-4"
                    href={wa(`Hola Roma Sandwich! Quiero pedir sándwiches de miga: ${i.name}, ${pres.label}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Pedir {pres.label.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

function Plans({ plans, kind }: { plans: Plan[]; kind: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((p) => (
        <article key={p.name} className="flex flex-col rounded-2xl bg-cream p-6 ring-1 ring-olive/20">
          <h3 className="font-display text-2xl">{p.name}</h3>
          <p className="mt-1 text-sm text-olive">{p.serves}</p>
          <p className="mt-3 flex-1 text-ink-soft">{p.detail}</p>
          <p className="mt-4 font-medium">{money(p.price)}</p>
          <a
            className={`${btn} mt-4 w-fit`}
            href={wa(`Hola Roma Sandwich! Quiero consultar por ${kind}: ${p.name} (${p.serves}).`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp
          </a>
        </article>
      ))}
    </div>
  );
}

export default function Catalog() {
  const [tab, setTab] = useState<Tab>("Sándwiches Tradicionales");

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              tab === t
                ? "bg-forest text-cream"
                : "bg-cream text-forest ring-1 ring-olive/30 hover:ring-forest"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8" role="tabpanel">
        {tab === "Sándwiches Tradicionales" && <TraditionalCatalog />}
        {tab === "Línea Gourmet" && <GourmetCatalog />}
        {tab === "Sándwiches de miga" && <MigaCatalog />}
        {tab === "Picadas" && <Plans plans={picadas} kind="picadas" />}
        {tab === "Tortas saladas" && <Plans plans={tortas} kind="tortas saladas" />}
      </div>
    </div>
  );
}
