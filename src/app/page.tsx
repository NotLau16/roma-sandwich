import Image from "next/image";
import Catalog from "@/components/Catalog";
import Catering from "@/components/Catering";
import Reveal from "@/components/Reveal";
import { business, hours, socialChannels, whyUs } from "@/data/romaData";
import { wa } from "@/lib/whatsapp";

const wrap = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const cta =
  "inline-flex items-center rounded-full bg-forest px-6 py-3 font-medium text-cream transition hover:bg-forest-deep";

const photos = [
  {
    label: "Triples de miga",
    src: "/img/triples.jpg",
    alt: "Triples de miga artesanales en tabla de madera dentro del local",
  },
  {
    label: "Tablas y picadas",
    src: "/img/picadas.jpg",
    alt: "Tabla de picada artesanal con fiambres, quesos y aceitunas",
  },
  {
    label: "Tortas saladas",
    src: "/img/tortas.jpg",
    alt: "Torta salada artesanal decorada con jamón, queso y aceitunas",
  },
];

const cateringPillars = [
  {
    title: "Propuestas personalizadas",
    text: "Combiná sándwiches de miga, tradicionales, línea gourmet, tablas y tortas saladas según tu evento.",
  },
  {
    title: "Elaboración fresca en el día",
    text: "Preparamos cada pedido artesanalmente en nuestra fábrica para garantizar calidad y presentación.",
  },
  {
    title: "Coordinación anticipada (72 hs)",
    text: "Reservá con un mínimo de 3 días de anticipación para asegurar disponibilidad y puntualidad.",
  },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.2.2-.3.2-.6.1a6.7 6.7 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5.3-.5c.1-.2 0-.3 0-.5l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7a11.3 11.3 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1.1.1-1.2-.1-.1-.2-.2-.5-.3Z" />
    </svg>
  );
}

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
          <a
            href="#redes"
            className="rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream transition hover:bg-forest-deep"
          >
            Redes
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
            <h1 className="font-display text-3xl font-semibold leading-tight text-forest sm:text-5xl">
              Para los días largos, las ganas de algo rico y los brindis que vienen
            </h1>
            <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">
              A veces es un antojo de mediodía, a veces una picada que salva la noche y otras una mesa llena para celebrar. En Montevideo 712 armamos cada pedido con amor y calidez para acompañarte en cada etapa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className={cta}
                href={wa("Hola Roma Sandwich! Quiero hacer un pedido.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Hacer pedido por WhatsApp
              </a>
              <a
                className="inline-flex items-center rounded-full border border-forest px-6 py-3 font-medium text-forest hover:bg-forest hover:text-cream"
                href="#productos"
              >
                Ver catálogo
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {photos.map((p, i) => (
              <figure
                key={p.label}
                className={`relative flex items-end overflow-hidden rounded-2xl bg-forest p-4 text-cream ${
                  i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  quality={95}
                  priority={i === 0}
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 560px" : "(max-width: 768px) 50vw, 275px"}
                  className="object-cover object-center"
                />
                <figcaption className="relative z-10 rounded-full bg-forest/85 px-3 py-1 text-sm backdrop-blur-sm">
                  {p.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="productos" className="scroll-mt-16 bg-cream-card py-16">
          <div className={wrap}>
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">
                  Nuestros productos
                </h2>
                <p className="mt-2 max-w-2xl text-ink-soft">
                  Tocá cada categoría para desplegar las opciones, sumalas a tu carrito y pedí tu presupuesto por WhatsApp.
                </p>
              </div>
              <Image
                src="/img/mascota-productos.png"
                alt="Mascota de Roma Sandwich guiñando y señalando el menú"
                width={254}
                height={281}
                unoptimized
                className="h-20 w-auto shrink-0 object-contain drop-shadow-sm sm:h-28"
              />
            </div>
            <Catalog />
          </div>
        </section>

        <section id="catering" className="relative scroll-mt-16 overflow-hidden bg-forest py-20 text-cream">
          <Image
            src="/img/mascota.png"
            alt=""
            aria-hidden="true"
            width={520}
            height={520}
            className="pointer-events-none absolute -bottom-16 -left-16 z-0 h-80 w-80 -rotate-6 select-none object-contain opacity-[0.07] lg:h-[28rem] lg:w-[28rem]"
          />
          <div className={`${wrap} relative z-10 grid items-start gap-12 lg:grid-cols-12`}>
            <div className="lg:col-span-5">
              <span className="inline-flex items-center rounded-full border border-cream/25 bg-cream/10 px-3.5 py-1 text-xs font-medium uppercase tracking-widest text-cream/90">
                Servicio exclusivo · Eventos y empresas
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
                Catering artesanal para tus eventos
              </h2>
              <p className="mt-5 leading-relaxed text-cream/80">
                Eventos corporativos, celebraciones familiares y reuniones especiales. Diseñamos
                propuestas a medida con elaboración en el día, presentación cuidada y atención
                directa para que solo te ocupes de disfrutar.
              </p>

              <dl className="mt-8 space-y-5 border-t border-cream/15 pt-6">
                {cateringPillars.map((pillar) => (
                  <div key={pillar.title} className="border-l-2 border-olive-light pl-4">
                    <dt className="font-display text-lg font-medium text-cream">{pillar.title}</dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-cream/75">{pillar.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="lg:col-span-7">
              <Reveal>
                <Catering />
              </Reveal>
            </div>
          </div>
        </section>

        <section className={`${wrap} py-16`}>
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">
                ¿Por qué elegir Roma Sandwich?
              </h2>
              <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {whyUs.map((w) => (
                  <Reveal key={w.title} className="border-l-2 border-olive-light pl-5">
                    <h3 className="font-display text-xl text-forest">{w.title}</h3>
                    <p className="mt-1 text-ink-soft">{w.text}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal className="flex justify-center lg:col-span-4">
              <Image
                src="/img/mascota-pensando.png"
                alt="Mascota de Roma Sandwich pensativa"
                width={209}
                height={280}
                unoptimized
                className="h-52 w-auto object-contain drop-shadow-md sm:h-64"
              />
            </Reveal>
          </div>
        </section>

        <section id="ubicacion" className="scroll-mt-16 bg-cream-card py-16">
          <div className={`${wrap} grid gap-10 md:grid-cols-2`}>
            <div>
              <h2 className="font-display text-3xl font-semibold text-forest sm:text-4xl">
                Ubicación y horarios
              </h2>
              <p className="mt-4 text-lg">{business.address}</p>
              <a
                className={`${cta} mt-4`}
                href={business.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
              </a>
              <dl className="mt-8 divide-y divide-olive/20">
                {hours.rows.map((r) => (
                  <div key={r.day} className="flex justify-between py-2.5">
                    <dt className="font-medium text-ink">{r.day}</dt>
                    <dd className={r.time === "Cerrado" ? "font-medium text-olive" : "text-ink-soft"}>
                      {r.time}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-ink-soft">{hours.note}</p>
              <p className="mt-2 text-sm text-ink-soft">{hours.delivery}</p>
            </div>
            <iframe
              title="Mapa de Roma Sandwich"
              src={business.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full rounded-2xl border-0 md:h-full md:min-h-96"
            />
          </div>
        </section>

        <section id="redes" className="scroll-mt-16 bg-cream py-16">
          <div className={wrap}>
            <div className="space-y-4">
              {socialChannels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between gap-8 rounded-3xl border border-forest/15 bg-cream-card p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-forest/35 hover:shadow-md md:flex-row md:items-center md:p-10"
                >
                  <div className="flex items-start gap-5">
                    <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forest text-cream shadow-sm transition group-hover:scale-105">
                      <InstagramIcon />
                    </span>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-widest text-olive">
                        {channel.name} oficial
                      </span>
                      <h2 className="mt-1 font-display text-3xl font-semibold text-forest sm:text-4xl">
                        {channel.handle}
                      </h2>
                      <p className="mt-2 max-w-xl text-base leading-relaxed text-ink-soft">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-cream shadow-sm transition group-hover:bg-forest-deep md:self-center">
                    <span>Seguir en {channel.name}</span>
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-forest pb-24 pt-10 text-cream sm:pb-14">
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
            <div className="mt-3 flex flex-wrap gap-5 text-sm underline underline-offset-4">
              <a href={business.instagram} target="_blank" rel="noopener noreferrer">
                Instagram {business.handle}
              </a>
              <a href={wa("Hola Roma Sandwich!")} target="_blank" rel="noopener noreferrer">
                WhatsApp {business.phoneDisplay}
              </a>
            </div>
          </div>
          <p className="text-xs text-cream/60">Desarrollado por STL — Soluciones Tecnológicas Lautaro</p>
        </div>
      </footer>

      <a
        href={wa("Hola Roma Sandwich! Quiero hacer una consulta.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        title="Escribir por WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 transition hover:scale-105 hover:bg-[#1EBE5D]"
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}
