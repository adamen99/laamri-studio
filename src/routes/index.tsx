import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import hero from "@/assets/hero-villa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laamri Studio — A Cinematic Atelier for Rare Homes" },
      {
        name: "description",
        content:
          "Laamri Studio composes cinematic campaigns for discerning brokers in Dubai, Marbella and Lisbon.",
      },
      { property: "og:title", content: "Laamri Studio — A Cinematic Atelier" },
      {
        property: "og:description",
        content: "Not every property deserves the same story. Private inquiries by invitation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ease = [0.42, 0, 0.58, 1] as const;

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease, delay: i },
  }),
};

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      variants={fade}
      custom={delay}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`label ${className}`}>{children}</p>;
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setHover(!!(e.target as HTMLElement).closest("a"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  if (!enabled) return null;
  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 rounded-full bg-gold"
      animate={{ x: pos.x - 4, y: pos.y - 4, scale: hover ? 2.5 : 1, opacity: hover ? 0.6 : 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      style={{ width: 8, height: 8 }}
    />
  );
}

function ScrollIndicator() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="fixed right-0 top-0 z-40 h-screen w-px bg-gold/10">
      <motion.div className="h-full w-full origin-top bg-gold" style={{ scaleY: scrollYProgress }} />
    </div>
  );
}

function Hero() {
  const d = (i: number) => 0.4 + i * 0.2;
  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden">
      <img
        src={hero}
        alt="Mediterranean villa at sunset with an infinity pool and olive tree"
        width={1920}
        height={1088}
        className="ken-burns absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="absolute left-6 top-8 md:left-12 md:top-10">
        <span className="font-serif text-2xl font-light text-gold">L</span>
        <span className="mt-1 block h-px w-10 bg-gold" />
      </div>
      <p className="label absolute right-6 top-9 md:right-12 md:top-11">Est. 2026</p>

      <div className="relative flex h-full items-center px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <motion.p variants={fade} custom={d(0)} initial="hidden" animate="show" className="label tracking-[0.3em]">
            A Cinematic Atelier
          </motion.p>
          <motion.h1
            variants={fade}
            custom={d(1)}
            initial="hidden"
            animate="show"
            className="title-display mt-8 text-[44px] text-gold md:text-[72px]"
          >
            Not every property
            <br />
            deserves the same story.
          </motion.h1>
          <motion.p
            variants={fade}
            custom={d(2)}
            initial="hidden"
            animate="show"
            className="mx-auto mt-8 max-w-[480px] text-xl italic leading-[1.6] text-paper md:mx-0"
          >
            We produce the visual signature that helps discerning brokers move rare homes to the right buyers.
          </motion.p>
        </div>
      </div>

      <motion.div
        variants={fade}
        custom={d(3)}
        initial="hidden"
        animate="show"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4"
      >
        <span className="label">Scroll</span>
        <span className="scroll-pulse block h-14 w-px bg-sage" />
      </motion.div>
    </section>
  );
}

const manifesto = [
  "Most luxury property today is sold in the same language.",
  "The same drone shot. The same lo-fi piano. The same voice-over.",
  "A rare home, presented as if it were any other.",
  "We think a rare home deserves a language of its own.",
];

function Manifesto() {
  return (
    <section className="flex min-h-[70vh] items-center bg-emerald px-6 py-32">
      <div className="mx-auto max-w-[680px] text-center">
        <Reveal>
          <Label>Manifesto</Label>
          <span className="rule mx-auto mt-6" />
        </Reveal>
        <div className="mt-14 space-y-8">
          {manifesto.map((l, i) => (
            <Reveal key={i} delay={0.15 * (i + 1)}>
              <p className="text-2xl font-light leading-[1.6] text-gold md:text-[32px]">{l}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.9}>
          <p className="mt-14 text-lg italic text-paper">— Laamri Studio</p>
        </Reveal>
      </div>
    </section>
  );
}

const items = [
  ["Signature Film", "One cinematic film, sixty to ninety seconds, composed around the property's single most emotionally irreplaceable quality."],
  ["Short Form Series", "Four to six short films, chapters of the same visual language, released weekly across platforms."],
  ["Private Microsite", "A private web experience, built for one property, shared discreetly with qualified buyers via WhatsApp or email."],
  ["Portfolio Activation", "Two to four additional listings activated monthly with content derived from the same visual world."],
];

function Campaign() {
  return (
    <section className="flex min-h-[90vh] items-center px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto grid w-full max-w-6xl gap-20 md:grid-cols-2 md:gap-16">
        <Reveal>
          <Label>Our Work</Label>
          <span className="rule mt-6" />
          <h2 className="title-display mt-10 text-4xl text-gold md:text-[56px]">
            The Monthly
            <br />
            Property Campaign
          </h2>
          <p className="mt-10 max-w-[420px] text-lg leading-[1.7] text-paper">
            Each month, Laamri Studio takes one of your exceptional listings and builds an entire cinematic campaign
            around it — while keeping the rest of your portfolio active with content composed in the same visual
            language.
          </p>
          <div className="label mt-12 flex items-center gap-5 tracking-[0.25em]">
            <span>Dubai</span>
            <span className="h-3 w-px bg-sage/50" />
            <span>Marbella</span>
            <span className="h-3 w-px bg-sage/50" />
            <span>Lisbon</span>
          </div>
        </Reveal>
        <div>
          {items.map(([t, d], i) => (
            <Reveal key={t} delay={0.1 * i}>
              <div className={`flex gap-8 py-8 ${i ? "border-t border-gold/20" : ""}`}>
                <span className="w-16 shrink-0 font-serif text-5xl font-light leading-none text-gold">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="text-[22px] uppercase tracking-[0.1em] text-gold">{t}</h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-paper">{d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const method = [
  ["I", "Property", "We study the house. Not from a listing. From satellite view, from the broker's words, from the neighbourhood's rhythm."],
  ["II", "Positioning", "We find what makes it emotionally irreplaceable. Not six bedrooms. A reason to desire."],
  ["III", "Story", "We write the narrative. The single idea the campaign returns to, in every frame, every caption, every microsite line."],
  ["IV", "World", "We compose the visual world — film, editorial content, private microsite, distribution across the broker's channels."],
];

function Method() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ivory px-6 py-32 text-ink">
      <div className="mx-auto max-w-[900px] text-center">
        <Reveal>
          <Label className="text-ink">The Method</Label>
          <span className="rule mx-auto mt-6 bg-ink" />
          <h2 className="title-display mt-10 text-[32px] md:text-5xl">
            Property. Positioning.
            <br />
            Story. World.
          </h2>
        </Reveal>
        <div className="mt-20 grid gap-12 md:grid-cols-4 md:gap-0">
          {method.map(([n, t, d], i) => (
            <Reveal key={n} delay={0.15 * i} className={`px-6 ${i ? "md:border-l md:border-ink/15" : ""}`}>
              <p className="font-serif text-[32px] font-light">{n}</p>
              <h3 className="mt-4 text-xl uppercase tracking-[0.1em]">{t}</h3>
              <p className="mt-4 text-sm leading-[1.6] text-ink/70">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const cities = [
  ["Dubai", "United Arab Emirates"],
  ["Marbella", "Costa del Sol · Spain"],
  ["Lisbon", "Portugal"],
];

function Geographies() {
  return (
    <section className="flex min-h-[50vh] items-center px-6 py-32">
      <div className="mx-auto w-full max-w-[1000px] text-center">
        <Reveal>
          <Label>Geographies</Label>
        </Reveal>
        <div className="mt-16 flex flex-col items-center justify-between gap-12 md:flex-row md:items-end">
          {cities.map(([c, s], i) => (
            <Reveal key={c} delay={0.2 * i}>
              <p className="font-serif text-5xl font-light italic text-gold">{c}</p>
              <p className="label mt-4 text-[10px] tracking-[0.3em]">{s}</p>
            </Reveal>
          ))}
        </div>
        <span className="mt-16 block h-px w-full bg-gold/30" />
        <Reveal delay={0.6}>
          <p className="mt-10 text-base italic text-paper">
            For three to four brokers at a time. Our atelier runs quiet, with limited capacity by design.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="flex min-h-[60vh] items-center bg-emerald px-6 py-32">
      <div className="mx-auto text-center">
        <Reveal>
          <Label>Private Inquiries</Label>
          <span className="rule mx-auto mt-6" />
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="title-display mt-10 text-[40px] italic text-gold md:text-[56px]">Request access.</h2>
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mt-6 text-lg text-paper">For brokers who refuse to look like everyone else.</p>
        </Reveal>
        <Reveal delay={0.6}>
          <a
            href="mailto:hello@laamri.com?subject=Private%20inquiry%20%E2%80%94%20Laamri%20Studio"
            className="cta-link group mt-14 inline-flex items-center gap-3 text-sm"
          >
            Write to Laamri Studio
            <span className="inline-block transition-transform duration-300 ease-in-out group-hover:translate-x-1.5">
              →
            </span>
          </a>
          <p className="label mt-10 tracking-[0.3em]">By Invitation</p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex h-[100px] items-center justify-center gap-6 border-t border-gold/10 px-6">
      <span className="text-sm text-gold">Laamri Studio</span>
      <span className="h-5 w-px bg-gold/60" />
      <span className="label text-[10px]">Composed in Tangier · 2026</span>
    </footer>
  );
}

function Index() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="custom-cursor bg-background"
    >
      <Cursor />
      <ScrollIndicator />
      <Hero />
      <Manifesto />
      <Campaign />
      <Method />
      <Geographies />
      <Contact />
      <Footer />
    </motion.main>
  );
}
