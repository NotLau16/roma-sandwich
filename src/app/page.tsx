import Image from "next/image";
import Catalog from "@/components/Catalog";
import Catering from "@/components/Catering";
import Reveal from "@/components/Reveal";
import { business, hours, whyUs } from "@/data/romaData";
import { wa } from "@/lib/whatsapp";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const cta = "inline-flex items-center rounded-full bg-forest px-6 py-3 font-medium text-cream transition hover:bg-forest-deep";

const photos = [
  { label: "Triples de miga", src: "/img/triples.jpg" },
  { label: "Tablas y picadas", src: "/img/picadas.jpg" },
  { label: "Tortas saladas", src: "/img/tortas.jpg" },
];

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-olive/20 bg-cream/90 backdrop-blur">
        <nav className={`${wrap} flex items-center justify-between py-3`} aria-label="Principal">
          <a href="#" className="flex items-center gap-3 font-display text-2xl font-semibold text-forest">
            <Image
              src="/img/logo.jpg"
              alt="Logo Roma Sandwich"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover shadow-sm ring-1 ring-forest/10"
              priority
            />
            <span>Roma Sandwich</span>
          </a>
          <div className="hidden gap-7 text-sm md:flex">
            <a href="#productos" className="hover:text-olive">Productos</a>
            <a href="#catering" className="hover:text-olive">Catering y Eventos</a>
            <a href="#ubicacion" className="hover:text-olive">Ubicación y Horarios</a>
          </div>
          <a href={wa("Hola Roma Sandwich! Quiero hacer un pedido.")} target="_blank" rel="noopener noreferrer" className="rounded-full bg-forest px-4 py-2 text-sm font-medium text-cream hover:bg-forest-deep">
            Pedir por WhatsApp
          </a>
        </nav>
      </header>

      <main>
        <section className={`${wrap} grid items-center gap-10 py-14 md:grid-cols-2 md:py-20`}>
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-forest/15 bg-cream px-3 py-1 text-sm text-forest">
              <Image
                src="/img/logo.jpg"
                alt="Logo Roma Sandwich"
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover"
              />
              <span className="font-medium">Fábrica artesanal en Córdoba</span>
            </div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-forest sm:text-6xl">
              Sándwiches de miga artesanales, hechos hoy en Córdoba
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
              Sándwiches de miga, picadas, tortas saladas y catering para tus eventos. Elaborados en nuestra fábrica de Montevideo 712, con productos de calidad y mucho amor.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className={cta} href={wa("Hola Roma Sandwich! Quiero hacer un pedido.")} target="_blank" rel="noopener noreferrer">Hacer pedido por WhatsApp</a>
              <a className="inline-flex items-center rounded-full border border-forest px-6 py-3 font-medium text-forest hover:bg-forest hover:text-cream" href="#productos">Ver catálogo</a>
            </div>
          </div>
          {/* Reemplazá los fondos por fotos reales: guardalas en /public/img con estos nombres. */}
          <div className="grid grid-cols-2 gap-3">
            {photos.map((p, i) => (
              <figure key={p.label} className={`relative flex min-h-40 items-end overflow-hidden rounded-2xl bg-forest bg-cover bg-center p-4 text-cream ${i === 0 ? "col-span-2 min-h-56" : ""}`} style={{ backgroundImage: `url(${p.src})` }}>
                <figcaption className="rounded-full bg-forest/80 px-3 py-1 text-sm">{p.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="productos" className="scroll-mt-16 bg-cream-card py-16">
          <div className={wrap}>
            <h2 className="mb-8 font-display text-3xl font-semibold text-forest sm:text-4xl">Nuestros productos</h2>
            <Reveal><Catalog /></Reveal>
          </div>
        </section>

        <section id="catering" className="scroll-mt-16 bg-forest py-16 text-cream">
          <div className={`${wrap} grid gap-10 md:grid-cols-2`}>
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Catering para eventos</h2>
              <p className="mt-4 max-w-prose leading-relaxed text-cream/80">
                Cumpleaños, oficinas y reuniones. Contanos cuántos son y qué necesitás: armamos el mensaje y te cotizamos por WhatsApp.
              </p>
            </div>
            <Reveal><Catering /></Reveal>
          </div>
        </section>

        <section className={`${wrap} py-16`}>
          <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">¿Por qué elegir Roma Sandwich?</h2>
          <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {whyUs.map((w) => (
              <Reveal key={w.title} className="border-l-2 border-olive-light pl-5">
                <h3 className="font-display text-xl text-forest">{w.title}</h3>
                <p className="mt-1 text-ink-soft">{w.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="ubicacion" className="scroll-mt-16 bg-cream-card py-16">
          <div className={`${wrap} grid gap-10 md:grid-cols-2`}>
            <div>
              <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">Ubicación y horarios</h2>
              <p className="mt-4 text-lg">{business.address}</p>
              <a className={`${cta} mt-4`} href={business.mapsLink} target="_blank" rel="noopener noreferrer">Cómo llegar</a>
              <dl className="mt-8 divide-y divide-olive/20">
                {hours.rows.map((r) => (
                  <div key={r.day} className="flex justify-between py-2"><dt>{r.day}</dt><dd className="text-ink-soft">{r.time}</dd></div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-ink-soft">{hours.note}</p>
              <p className="mt-2 text-sm text-ink-soft">{hours.delivery}</p>
            </div>
            <iframe title="Mapa de Roma Sandwich" src={business.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-80 w-full rounded-2xl border-0 md:h-full md:min-h-96" />
          </div>
        </section>
      </main>

      <footer className="bg-forest py-10 text-cream">
        <div className={`${wrap} flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/img/logo.jpg"
                alt="Logo Roma Sandwich"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border border-cream/20 object-cover"
              />
              <p className="font-display text-2xl">Roma Sandwich</p>
            </div>
            <p className="mt-2 text-sm text-cream/80">Montevideo 712, Córdoba</p>
            <div className="mt-3 flex gap-5 text-sm underline underline-offset-4">
              <a href={business.instagram} target="_blank" rel="noopener noreferrer">{business.handle}</a>
              <a href={wa("Hola Roma Sandwich!")} target="_blank" rel="noopener noreferrer">WhatsApp {business.phoneDisplay}</a>
            </div>
          </div>
          <p className="text-xs text-cream/60">Desarrollado por STL — Soluciones Tecnológicas Lautaro</p>
        </div>
      </footer>
    </>
  );
}
