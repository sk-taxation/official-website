"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Frosted-glass card shell. --hero-glass is near-white in light mode and a
   faint white film in dark mode, so the cards read correctly over both hero
   treatments; text and accents come from theme tokens. */
const CARD =
  "rounded-2xl border border-line bg-(--hero-glass) shadow-[0_28px_60px_-28px_rgba(4,38,32,0.35)] backdrop-blur-xl transition-colors duration-500";

/**
 * Glass dashboard composition for the hero: a deliberate, aligned grid
 * (main analytics card + ring card + compliance card), no overlaps.
 */
export function HeroIllustration() {
  const reduce = useReducedMotion();

  const float = (duration: number, distance = 7) =>
    reduce
      ? undefined
      : {
          y: [0, -distance, 0],
          transition: { duration, repeat: Infinity, ease: "easeInOut" as const },
        };

  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <div className="mx-auto w-full max-w-[470px]">
      <div className="grid grid-cols-5 items-start gap-4">
        {/* Main analytics card */}
        <motion.div {...entrance(0.55)} className="col-span-3">
          <motion.div animate={float(6.2)} className={`${CARD} p-5`}>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
                Tax Overview, FY 2025/26
              </p>
              <span className="h-2 w-2 shrink-0 rounded-full bg-teal" />
            </div>

            <p className="mt-4 font-serif text-[2.6rem] leading-none font-medium text-ink">
              98.2<span className="text-xl text-gold">%</span>
            </p>
            <p className="mt-1.5 text-sm text-muted">Returns filed on time</p>

            <svg viewBox="0 0 240 72" fill="none" className="mt-4 h-14 w-full" aria-hidden>
              <defs>
                <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M2 58 C30 52 42 60 62 48 S98 20 122 30 S164 44 186 26 S224 10 238 8 V72 H2 Z"
                fill="url(#spark-fill)"
              />
              <path
                d="M2 58 C30 52 42 60 62 48 S98 20 122 30 S164 44 186 26 S224 10 238 8"
                stroke="var(--gold)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="238" cy="8" r="4" fill="var(--gold)" stroke="var(--surface)" strokeWidth="2" />
            </svg>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-3.5">
              <p className="text-xs text-muted">Effective tax rate</p>
              <p className="text-sm font-semibold text-teal">↓ 6.4 pts</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right column: savings ring + compliance calendar, stacked */}
        <div className="col-span-2 grid gap-4">
          <motion.div {...entrance(0.75)}>
            <motion.div animate={float(7.2, 9)} className={`${CARD} p-4`}>
              <div className="relative mx-auto h-20 w-20">
                <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden>
                  <circle cx="40" cy="40" r="33" stroke="var(--line)" strokeWidth="7" fill="none" />
                  <circle
                    cx="40"
                    cy="40"
                    r="33"
                    stroke="var(--gold)"
                    strokeWidth="7"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray="157 207.3"
                  />
                </svg>
                <p className="absolute inset-0 flex items-center justify-center font-serif text-xl font-medium text-ink">
                  24<span className="text-xs text-gold">%</span>
                </p>
              </div>
              <p className="mt-2.5 text-center text-[11px] leading-relaxed text-muted">
                Average saving through tax planning
              </p>
            </motion.div>
          </motion.div>

          <motion.div {...entrance(0.95)}>
            <motion.div animate={float(5.4, 6)} className={`${CARD} p-4`}>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                Compliance
              </p>
              <ul className="mt-2.5 space-y-2">
                {[
                  { label: "VAT return", status: "Filed", teal: true },
                  { label: "Income tax", status: "Filed", teal: true },
                  { label: "EPF / ETF", status: "Due 15th", teal: false },
                ].map((row) => (
                  <li key={row.label} className="flex items-center justify-between gap-2">
                    <span className="text-xs text-ink-soft">{row.label}</span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        row.teal ? "bg-teal/15 text-teal" : "bg-gold/15 text-gold"
                      }`}
                    >
                      {row.teal ? "✓ " : ""}
                      {row.status}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
