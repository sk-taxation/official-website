"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { SplitText } from "./Reveal";
import { Counter } from "./Counter";
import { HeroIllustration } from "./HeroIllustration";

const stats = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 200, suffix: "+", label: "Clients Advised" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

/**
 * The hero follows the theme: a light mint wash over the photo in light mode
 * (the client asked for a light-coloured site), a deep teal treatment in dark
 * mode. All colours come from theme tokens, so both renditions stay on-brand.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const yIllustration = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-24 pb-12 sm:pt-28">
      {/* LIGHT hero backdrop: designed bright scene, no photo */}
      <div aria-hidden className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-cream to-cream-dark/60" />
        {/* fine dot grid for texture */}
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--line)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_75%_75%_at_50%_30%,black_30%,transparent_100%)]" />
      </div>
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: yBg }}
        className="pointer-events-none absolute inset-0 dark:hidden"
      >
        {/* bright gold + teal glows */}
        <div className="absolute -top-44 right-[-8%] h-[540px] w-[540px] rounded-full bg-gold/25 blur-3xl" />
        <div className="absolute top-40 right-[24%] h-[320px] w-[320px] rounded-full bg-teal/20 blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-10%] h-[460px] w-[460px] rounded-full bg-teal/10 blur-3xl" />
        {/* brand dial rings behind the cards */}
        <svg
          viewBox="0 0 200 200"
          fill="none"
          className="absolute -right-24 top-10 h-[520px] w-[520px] text-ink/[0.06]"
        >
          <circle cx="100" cy="100" r="96" stroke="currentColor" strokeDasharray="2 5" />
          <circle cx="100" cy="100" r="72" stroke="currentColor" />
          <circle cx="100" cy="100" r="48" stroke="currentColor" strokeDasharray="1 4" />
        </svg>
        <svg
          viewBox="0 0 200 200"
          fill="none"
          className="animate-spin-slow absolute -right-24 top-10 h-[520px] w-[520px] text-gold/25"
        >
          <circle cx="100" cy="100" r="84" stroke="currentColor" strokeDasharray="1 10" />
        </svg>
      </motion.div>

      {/* DARK hero backdrop: accounting photo under the deep teal treatment */}
      <motion.div
        style={reduce ? undefined : { y: yBg }}
        className="absolute inset-x-0 -inset-y-[8%] hidden dark:block"
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/hero-bg.jpg`}
          alt="Tax documents, a calculator and a pen on an accountant's desk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[30%_55%]"
        />
        <div className="absolute inset-0 bg-(--hero-overlay)" />
        {/* Left scrim keeps the headline readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-(--hero-scrim) via-(--hero-scrim-mid) to-transparent" />
      </motion.div>

      {/* Gold + teal glows (dark mode) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute -top-40 right-[-12%] h-[480px] w-[480px] rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute bottom-[-25%] left-[-12%] h-[420px] w-[420px] rounded-full bg-teal/15 blur-3xl" />
      </div>

      <motion.div
        style={reduce ? undefined : { opacity }}
        className="relative mx-auto grid max-w-6xl items-start gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-gold"
          >
            <span className="h-px w-10 bg-gold" />
            Tax Advisers &amp; Consultants
          </motion.p>

          <h1 className="font-serif text-[2.5rem] leading-[1.06] font-medium text-ink sm:text-5xl xl:text-[3.6rem]">
            <SplitText text="Clarity in every number." delay={0.2} />
            <br />
            <SplitText text="Confidence in every" delay={0.5} />{" "}
            <em className="text-gold not-italic">
              <SplitText text="decision." delay={0.8} />
            </em>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-6 max-w-xl leading-relaxed text-muted"
          >
            SK Taxation guides businesses and individuals through tax planning,
            compliance and financial strategy, with personalised advice that
            protects your wealth and keeps you ahead of every deadline.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold tracking-wide text-cream"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#1d2a26]">
                Book a Consultation
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gold transition-transform duration-400 ease-out group-hover:translate-x-0" />
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-wide text-ink"
            >
              Explore Services
              <span className="inline-block text-gold transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.35 }}
            className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-6 transition-colors duration-500"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-medium text-ink">
                  <Counter to={stat.value} />
                  <span className="text-gold">{stat.suffix}</span>
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* On laptops the cards start on the headline's line, not the kicker's */}
        <motion.div style={reduce ? undefined : { y: yIllustration }} className="lg:pt-9">
          <HeroIllustration />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to the About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-ink/25 pt-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-gold" />
        </motion.span>
      </motion.a>
    </section>
  );
}
