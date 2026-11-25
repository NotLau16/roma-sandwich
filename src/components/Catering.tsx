"use client";
import { useState } from "react";
import { cateringServices, cateringEvents } from "@/data/romaData";
import { wa } from "@/lib/whatsapp";

const field = "w-full rounded-xl border border-cream/30 bg-cream/10 px-4 py-3 text-cream placeholder:text-cream/50";

export default function Catering() {
  const [guests, setGuests] = useState(20);
  const [service, setService] = useState(cateringServices[0]);
  const [event, setEvent] = useState(cateringEvents[0]);
  const [date, setDate] = useState("");

  const msg = `Hola Roma Sandwich! Quiero cotizar catering.\nEvento: ${event}\nInvitados aprox.: ${guests}\nServicio: ${service}${date ? `\nFecha: ${date}` : ""}`;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="text-sm">Tipo de evento
        <select className={`${field} mt-1`} value={event} onChange={(e) => setEvent(e.target.value)}>
          {cateringEvents.map((o) => <option key={o} className="text-ink">{o}</option>)}
        </select>
      </label>
      <label className="text-sm">Servicio
        <select className={`${field} mt-1`} value={service} onChange={(e) => setService(e.target.value)}>
          {cateringServices.map((o) => <option key={o} className="text-ink">{o}</option>)}
        </select>
      </label>
      <label className="text-sm">Invitados aproximados
        <input type="number" min={5} step={5} className={`${field} mt-1`} value={guests} onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))} />
      </label>
      <label className="text-sm">Fecha (opcional)
        <input type="text" placeholder="Ej: sábado 12 de diciembre" className={`${field} mt-1`} value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <a href={wa(msg)} target="_blank" rel="noopener noreferrer"
        className="sm:col-span-2 rounded-full bg-cream px-6 py-3 text-center font-medium text-forest transition hover:bg-white">
        Pedir cotización por WhatsApp
      </a>
    </div>
  );
}
