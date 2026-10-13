import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useInView, type Variants } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import hero from "@/assets/golden-sunset-villa.jpg";
import bluehour from "@/assets/villa-sunset-publication.jpg";
import bowl from "@/assets/bronze-bowl-publication.jpg";
import arch from "@/assets/stone-arch-publication.jpg";
import logo from "@/assets/laamri-logo.png";

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
    <section className="relative h-[90svh] min-h-[600px] overflow-hidden">
      <img
        src={hero}
        alt="Mediterranean villa at sunset with an infinity pool and olive tree"
        className="ken-burns absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="absolute left-6 top-8 md:left-12 md:top-10">
        <img src={logo} alt="Laamri Studio" width={72} height={64} className="h-16 w-18 object-contain object-left" />
      </div>
      <p className="label absolute right-6 top-9 md:right-12 md:top-11">Est. 2026</p>

      <div className="relative flex h-full items-center px-6 md:px-12 lg:px-24">
        <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
          <motion.p variants={fade} custom={d(0)} initial="hidden" animate="show" className="label text-ivory">
            A Cinematic Atelier
          </motion.p>
          <motion.h1
            variants={fade}
            custom={d(1)}
            initial="hidden"
            animate="show"
            className="title-display hero-title mt-6 text-[40px] text-ivory md:text-[64px]"
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
            className="mx-auto mt-6 max-w-[480px] text-xl italic leading-[1.6] text-ivory md:mx-0"
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
     <section className="flex items-center bg-emerald px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[680px] text-center">
        <Reveal>
          <Label>Manifesto</Label>
          <span className="rule mx-auto mt-6" />
        </Reveal>
        <div className="mt-10 space-y-5">
          {manifesto.map((l, i) => (
            <Reveal key={i} delay={0.15 * (i + 1)}>
              <p className="text-2xl font-light leading-[1.6] text-gold md:text-[32px]">{l}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.9}>
          <p className="mt-8 text-lg italic text-paper">— Laamri Studio</p>
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

function ImageBlock({ src, alt, h, crop }: { src: string; alt: string; h: string; crop: "villa" | "bowl" | "studio" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`editorial-image editorial-image--${crop} relative w-full overflow-hidden ${h}`}
    >
      <img src={src} alt={alt} loading="lazy" className="ken-burns absolute inset-0 h-full w-full object-cover object-center" />
    </motion.div>
  );
}

const movements = ["First", "Second", "Third", "Fourth"];

function Movement({ i }: { i: number }) {
  const item = items[i];
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  if (!item) return null;
  const [t, d] = item;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="grid items-center gap-6 px-6 py-12 md:grid-cols-2 md:px-0 md:py-16"
    >
      <span className="title-display text-center text-[120px] leading-none text-gold/80 md:pl-[60px] md:text-left md:text-[220px]">
        0{i + 1}
      </span>
      <div className="mx-auto w-full max-w-[440px] text-center md:mx-0 md:text-left">
        <p className="label tracking-[0.3em]">{movements[i]} Movement</p>
        <h3 className="mt-6 text-[32px] uppercase leading-tight tracking-[0.1em] text-gold">{t}</h3>
        <p className="mt-6 text-lg leading-[1.8] text-paper">{d}</p>
        <span className="mx-auto mt-8 block h-px w-20 bg-gold/40 md:mx-0" />
      </div>
    </motion.div>
  );
}

const Divider = () => <span className="block h-[2px] w-full bg-gold/10" />;

function Campaign() {
  return (
    <section>
      <div className="flex items-center px-6 py-16 md:px-12 md:py-20 lg:px-24">
        <Reveal className="mx-auto w-full max-w-6xl">
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
      </div>
      <div className="mx-auto max-w-6xl md:px-12">
        <Divider />
        <Movement i={0} />
        <Divider />
        <Movement i={1} />
      </div>
      <ImageBlock src={bowl} alt="Bronze bowl of still water in golden light" h="h-[50vh]" crop="bowl" />
      <div className="mx-auto max-w-6xl md:px-12">
        <Movement i={2} />
        <Divider />
        <Movement i={3} />
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
    <section className="flex items-center bg-ivory px-6 py-16 text-ink md:py-20">
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
        <div className="mt-12 grid gap-8 md:grid-cols-4 md:gap-0">
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
    <section className="flex items-center px-6 py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1000px] text-center">
        <Reveal>
          <Label>Geographies</Label>
        </Reveal>
        <div className="mt-10 flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          {cities.map(([c, s], i) => (
            <Reveal key={c} delay={0.2 * i}>
              <p className="font-serif text-5xl font-light italic text-gold">{c}</p>
              <p className="label mt-4 text-[10px] tracking-[0.3em]">{s}</p>
            </Reveal>
          ))}
        </div>
        <span className="mt-10 block h-px w-full bg-gold/30" />
        <Reveal delay={0.6}>
          <p className="mt-10 text-base italic text-paper">
            For three to four brokers at a time. Our atelier runs quiet, with limited capacity by design.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const quote = ["We don't produce content.", "We compose the story a specific buyer", "is meant to fall into."];

function Signature() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  return (
    <section ref={ref} className="relative flex items-center bg-emerald px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[760px] text-center">
        <span className="rule mx-auto" />
        <blockquote className="mt-8 text-[28px] font-light italic leading-[1.5] text-gold md:text-[36px]">
          {quote.map((l, i) => (
            <motion.span
              key={i}
              className="block"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 * i }}
            >
              {l}
            </motion.span>
          ))}
        </blockquote>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 1.1 }}
          className="mt-10 text-base text-paper"
        >
          — Laamri Studio
        </motion.p>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-px bg-gold/20" />
    </section>
  );
}

type Inquiry = { name: string; email: string; agency?: string; market: string; message: string };

function Field({ label, error, children }: { label: string; error?: string | undefined; children: ReactNode }) {
  return (
    <label className="block text-left">
      <span className="label mb-2 block text-[10px] tracking-[0.25em]">{label}</span>
      {children}
      {error &&
        (error === "Required" ? (
          <span className="mt-2 block font-sans text-[10px] uppercase tracking-[0.2em] text-sage">{error}</span>
        ) : (
          <span className="mt-2 block font-serif text-sm italic text-gold/70">{error}</span>
        ))}
    </label>
  );
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maeqbonz";

function Contact() {
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inquiry>();

  const onSubmit = async (data: Inquiry) => {
    setFailed(false);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          agency: data.agency ?? "",
          market: data.market,
          message: data.message,
        }),
      });
      if (res.ok) setSent(true);
      else setFailed(true);
    } catch {
      setFailed(true);
    }
  };

  const hl = (bad: boolean) => (bad ? "field !border-gold" : "field");

  return (
    <section className="flex items-center bg-emerald px-6 py-16 md:py-20">
      <div className="mx-auto w-full max-w-[520px] text-center">
        <Reveal>
          <Label>Private Inquiries</Label>
          <span className="rule mx-auto mt-6" />
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          {sent ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="py-10 text-center font-serif text-2xl italic text-gold"
            >
              Your inquiry has been received. Laamri Studio will respond within forty-eight hours.
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              <Field label="Your Name" error={errors.name?.message}>
                <input className={hl(!!errors.name)} {...register("name", { required: "Required" })} />
              </Field>
              <Field label="Your Email" error={errors.email?.message}>
                <input
                  type="email"
                  className={hl(!!errors.email)}
                  {...register("email", {
                    required: "Required",
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address." },
                  })}
                />
              </Field>
              <Field label="Agency or Brokerage">
                <input className="field" {...register("agency")} />
              </Field>
              <Field label="Which Market" error={errors.market?.message}>
                <select className={hl(!!errors.market)} defaultValue="" {...register("market", { required: "Required" })}>
                  <option value="" disabled>Select</option>
                  <option>Dubai</option>
                  <option>Marbella</option>
                  <option>Lisbon</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Your Message" error={errors.message?.message}>
                <textarea
                  rows={5}
                  className={`${hl(!!errors.message)} resize-none`}
                  placeholder="Tell us about the property or portfolio you'd like us to consider."
                  {...register("message", { required: "Required" })}
                />
              </Field>
              <button type="submit" disabled={isSubmitting} className="btn-gold">
                {isSubmitting ? "Sending..." : "Request Access →"}
              </button>
              {failed && (
                <p className="text-center font-serif text-sm italic text-gold/70">
                  Something went wrong. Please write to hello@laamri.com.
                </p>
              )}
            </form>
          )}
          {!sent && <p className="mt-6 text-sm italic text-paper">We respond to every inquiry within forty-eight hours.</p>}
          <p className="label mt-10 tracking-[0.3em]">By Invitation</p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="flex h-20 items-center justify-center gap-6 border-t border-gold/10 px-6">
      <span className="text-sm text-gold">Laamri Studio</span>
      <span className="h-5 w-px bg-gold/60" />
      <span className="label text-[10px]">2026</span>
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
      <ImageBlock src={bluehour} alt="Mediterranean villa overlooking the sea at sunset" h="h-[55vh]" crop="villa" />
      <Campaign />
      <Method />
      <ImageBlock src={arch} alt="Stone archway opening onto the sea at golden hour" h="h-[55vh]" crop="studio" />
      <Geographies />
      <Signature />
      <Contact />
      <Footer />
    </motion.main>
  );
}
