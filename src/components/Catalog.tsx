"use client";
import { useState } from "react";
import { miga, picadas, tortas, presentations, type Plan } from "@/data/romaData";
import { wa, money } from "@/lib/whatsapp";

const tabs = ["Sándwiches de miga", "Picadas", "Tortas saladas"] as const;
type Tab = (typeof tabs)[number];

const btn = "inline-flex items-center rounded-full border border-forest px-4 py-2 text-sm font-medium text-forest transition hover:bg-forest hover:text-cream";

function Plans({ plans, kind }: { plans: Plan[]; kind: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((p) => (
        <article key={p.name} className="flex flex-col rounded-2xl bg-cream-card p-6 ring-1 ring-olive/20">
          <h3 className="font-display text-2xl">{p.name}</h3>
          <p className="mt-1 text-sm text-olive">{p.serves}</p>
          <p className="mt-3 flex-1 text-ink-soft">{p.detail}</p>
          <p className="mt-4 font-medium">{money(p.price)}</p>
          <a className={`${btn} mt-4 w-fit`} href={wa(`Hola Roma Sandwich! Quiero consultar por ${kind}: ${p.name} (${p.serves}).`)} target="_blank" rel="noopener noreferrer">
            Consultar por WhatsApp
          </a>
        </article>
      ))}
    </div>
  );
}

export default function Catalog() {
  const [tab, setTab] = useState<Tab>("Sándwiches de miga");
  const [qty, setQty] = useState(presentations[1].qty);
  const pres = presentations.find((p) => p.qty === qty)!;

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${tab === t ? "bg-forest text-cream" : "bg-cream-card text-forest ring-1 ring-olive/30 hover:ring-forest"}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8" role="tabpanel">
        {tab === "Sándwiches de miga" && (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="text-sm text-ink-soft">Presentación</span>
              {presentations.map((p) => (
                <button key={p.qty} onClick={() => setQty(p.qty)} aria-pressed={qty === p.qty}
                  className={`rounded-full px-4 py-1.5 text-sm transition ${qty === p.qty ? "bg-olive text-cream" : "ring-1 ring-olive/40 text-olive hover:bg-olive/10"}`}>
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
                          <span className="whitespace-nowrap text-sm text-olive">{money(i.pricePerUnit === null ? null : i.pricePerUnit * pres.qty)}</span>
                        </div>
                        <p className="text-sm text-ink-soft">{i.description}</p>
                        <a className="mt-1 inline-block text-sm text-forest underline underline-offset-4"
                          href={wa(`Hola Roma Sandwich! Quiero pedir sándwiches de miga: ${i.name}, ${pres.label}.`)} target="_blank" rel="noopener noreferrer">
                          Pedir {pres.label.toLowerCase()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
        {tab === "Picadas" && <Plans plans={picadas} kind="picadas" />}
        {tab === "Tortas saladas" && <Plans plans={tortas} kind="tortas saladas" />}
      </div>
    </div>
  );
}
