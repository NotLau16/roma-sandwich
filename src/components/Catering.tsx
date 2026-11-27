"use client";
import { useEffect, useState } from "react";
import { cateringServices, cateringEvents } from "@/data/romaData";
import { sanitizePlainText } from "@/lib/security";
import { wa } from "@/lib/whatsapp";

const MIN_GUESTS = 6;
const MAX_GUESTS = 10000;
const MAX_NOTES_LENGTH = 400;
const DIGITS_ONLY_RE = /^\d+$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const isValidCalendarIsoDate = (value: string): boolean => {
  if (!ISO_DATE_RE.test(value)) return false;
  const [yStr, mStr, dStr] = value.split("-");
  const y = Number(yStr);
  const m = Number(mStr);
  const d = Number(dStr);
  const check = new Date(y, m - 1, d);
  return check.getFullYear() === y && check.getMonth() === m - 1 && check.getDate() === d;
};

const field =
  "mt-1.5 w-full rounded-xl border border-cream/25 bg-cream/10 px-4 py-3 text-sm text-cream placeholder:text-cream/45 transition focus:border-cream/70 focus:bg-cream/15 focus:outline-none";

const labelTitle = "block text-xs font-medium uppercase tracking-wider text-cream/75";

const addLocalDaysISO = (days: number) => {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + days);
  const y = target.getFullYear();
  const m = String(target.getMonth() + 1).padStart(2, "0");
  const d = String(target.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const formatDateEs = (isoDate: string) => {
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

export default function Catering() {
  const [event, setEvent] = useState(cateringEvents[0]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [minDate, setMinDate] = useState("");
  const [triedSubmit, setTriedSubmit] = useState(false);

  useEffect(() => {
    setMinDate(addLocalDaysISO(3));
  }, []);

  const toggleService = (service: string) => {
    if (!cateringServices.includes(service)) return;
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service],
    );
  };

  const guestsTrimmed = guests.trim();
  const parsedGuests = DIGITS_ONLY_RE.test(guestsTrimmed) ? Number(guestsTrimmed) : NaN;
  const guestsValid =
    guestsTrimmed !== "" &&
    Number.isSafeInteger(parsedGuests) &&
    parsedGuests >= MIN_GUESTS &&
    parsedGuests <= MAX_GUESTS;

  const dateTrimmed = date.trim();
  const dateFormatValid = isValidCalendarIsoDate(dateTrimmed);
  const dateValid = dateFormatValid && minDate !== "" && dateTrimmed >= minDate;

  const servicesValid = selectedServices.length > 0;
  const canSubmit = guestsValid && dateValid && servicesValid;

  const guestsError =
    guestsTrimmed === ""
      ? "Ingresá la cantidad aproximada de invitados."
      : !Number.isSafeInteger(parsedGuests) || parsedGuests < MIN_GUESTS
        ? "El servicio de catering requiere más de 5 invitados (mínimo 6)."
        : parsedGuests > MAX_GUESTS
          ? "Para eventos de más de 10.000 invitados, consultanos directamente por WhatsApp."
          : null;

  const dateError =
    dateTrimmed === ""
      ? "Seleccioná la fecha estimada del evento."
      : !dateFormatValid
        ? "Ingresá una fecha válida."
        : minDate && dateTrimmed < minDate
          ? `Requiere al menos 3 días de anticipación (desde el ${formatDateEs(minDate)}).`
          : null;

  const servicesError =
    selectedServices.length === 0 ? "Elegí al menos un servicio para cotizar." : null;

  const safeEvent = cateringEvents.includes(event) ? event : cateringEvents[0];
  const cleanNotes = sanitizePlainText(notes, {
    maxLength: MAX_NOTES_LENGTH,
    preserveNewlines: true,
  }).trim();
  const msg = [
    "Hola Roma Sandwich! Quisiera solicitar una cotización formal de Catering para Eventos.",
    `• Tipo de evento: ${safeEvent}`,
    `• Invitados aproximados: ${parsedGuests} personas`,
    `• Fecha del evento: ${formatDateEs(dateTrimmed)}`,
    `• Servicios de interés: ${selectedServices.join(", ")}`,
    ...(cleanNotes ? [`• Observaciones: ${cleanNotes}`] : []),
  ].join("\n");

  return (
    <div className="rounded-3xl border border-cream/20 bg-forest-deep/75 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
      <div className="mb-6 border-b border-cream/15 pb-4">
        <h3 className="font-display text-2xl font-semibold text-cream">
          Solicitar propuesta a medida
        </h3>
        <p className="mt-1 text-sm text-cream/75">
          Completá los detalles del evento para preparar tu presupuesto personalizado.
        </p>
      </div>

      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelTitle}>
            Tipo de evento
            <select
              className={`${field} [color-scheme:dark]`}
              value={safeEvent}
              onChange={(e) => {
                if (cateringEvents.includes(e.target.value)) setEvent(e.target.value);
              }}
            >
              {cateringEvents.map((o) => (
                <option key={o} value={o} className="bg-forest text-cream">
                  {o}
                </option>
              ))}
            </select>
          </label>

          <label className={labelTitle}>
            Invitados aproximados
            <input
              type="number"
              min={MIN_GUESTS}
              max={MAX_GUESTS}
              step={1}
              inputMode="numeric"
              placeholder="Ej: 25 (más de 5)"
              className={field}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
            {(triedSubmit || guestsTrimmed !== "") && guestsError ? (
              <span className="mt-1.5 block text-xs font-normal normal-case tracking-normal text-amber-200">
                {guestsError}
              </span>
            ) : (
              <span className="mt-1.5 block text-xs font-normal normal-case tracking-normal text-cream/60">
                Mínimo más de 5 invitados
              </span>
            )}
          </label>
        </div>

        <label className={labelTitle}>
          Fecha del evento
          <input
            type="date"
            min={minDate || undefined}
            className={`${field} [color-scheme:dark]`}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {(triedSubmit || date !== "") && dateError ? (
            <span className="mt-1.5 block text-xs font-normal normal-case tracking-normal text-amber-200">
              {dateError}
            </span>
          ) : (
            <span className="mt-1.5 block text-xs font-normal normal-case tracking-normal text-cream/60">
              Reservas con un mínimo de 3 días de anticipación
              {minDate ? ` (a partir del ${formatDateEs(minDate)})` : ""}.
            </span>
          )}
        </label>

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className={labelTitle}>Servicios de interés</span>
            <span className="text-xs text-cream/65">Podés elegir todos los que desees</span>
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {cateringServices.map((service) => {
              const active = selectedServices.includes(service);
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => toggleService(service)}
                  aria-pressed={active}
                  className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-xs font-medium transition sm:text-sm ${
                    active
                      ? "border-cream bg-cream text-forest shadow-sm"
                      : "border-cream/25 bg-cream/5 text-cream/90 hover:border-cream/50 hover:bg-cream/10"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] ${
                      active
                        ? "border-forest bg-forest text-cream"
                        : "border-cream/40 text-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>{service}</span>
                </button>
              );
            })}
          </div>
          {triedSubmit && servicesError && (
            <span className="mt-1.5 block text-xs text-amber-200">{servicesError}</span>
          )}
        </div>

        <label className={labelTitle}>
          Detalles adicionales (opcional)
          <textarea
            rows={2}
            maxLength={MAX_NOTES_LENGTH}
            placeholder="Horario estimado, modalidad (envío o retiro) o preferencias especiales..."
            className={field}
            value={notes}
            onChange={(e) =>
              setNotes(
                sanitizePlainText(e.target.value, {
                  maxLength: MAX_NOTES_LENGTH,
                  preserveNewlines: true,
                }),
              )
            }
          />
        </label>

        {canSubmit ? (
          <a
            href={wa(msg)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-cream px-6 py-3.5 text-center text-sm font-semibold text-forest shadow-lg transition hover:bg-white"
          >
            Solicitar cotización formal por WhatsApp
          </a>
        ) : (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setTriedSubmit(true)}
              aria-disabled="true"
              className="w-full cursor-not-allowed rounded-full border border-cream/30 bg-cream/15 px-6 py-3.5 text-center text-sm font-semibold text-cream/60 transition hover:bg-cream/20"
            >
              Solicitar cotización formal por WhatsApp
            </button>
            {triedSubmit && (
              <p className="text-center text-xs text-amber-200">
                Completá los campos obligatorios (más de 5 invitados, fecha válida y al menos un servicio) para habilitar el envío.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
