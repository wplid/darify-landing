"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Check } from "lucide-react";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero() {
  const containerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitted

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduced: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduced } = context.conditions;

          const tl = gsap.timeline({
            defaults: { ease: "power3.out", duration: reduced ? 0.4 : 1 },
          });

          tl.from(".reveal", {
            opacity: 0,
            y: reduced ? 0 : 26,
            stagger: reduced ? 0 : 0.12,
          }).from(
            ".hero-canvas",
            { opacity: 0, scale: reduced ? 1 : 0.92, duration: reduced ? 0.4 : 1.4 },
            reduced ? undefined : "-=0.9"
          );
        }
      );

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    // No backend is wired up yet — this only confirms the UI state.
    // Point this at your waitlist provider of choice (see README).
    setStatus("submitted");
  }

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-background"
    >
      {/* Ambient glow blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] z-0 h-[560px] w-[560px] rounded-full bg-violet/25 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] z-0 h-[420px] w-[420px] rounded-full bg-blue/20 blur-[130px]"
      />
      <div aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 z-0" />

      {/* Nav */}
      <div className="reveal relative z-10 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Darify" width={34} height={34} className="h-8 w-8" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            Darify
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2">
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-blue-soft" />
          <span className="font-mono text-[11px] tracking-[0.2em] text-ink/70 uppercase">
            Coming Soon
          </span>
        </div>
      </div>

      {/* 3D scene layer — large, bleeding off the right edge */}
      <div className="hero-canvas pointer-events-none absolute inset-y-0 right-[-8%] left-[18%] z-0 md:left-[38%]">
        <Scene3D />
      </div>

      {/* Scrim so copy stays legible over the scene regardless of viewport */}
      <div
        aria-hidden="true"
        className="from-background via-background/85 pointer-events-none absolute inset-y-0 left-0 z-[1] w-full bg-gradient-to-r to-transparent md:w-3/4"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-20 md:px-12">
        <div className="max-w-xl">
          <p className="reveal font-mono text-xs tracking-[0.3em] text-blue-soft uppercase">
            Real estate · Reimagined
          </p>

          <h1 className="reveal text-balance mt-5 font-display text-[13vw] leading-[0.98] font-semibold tracking-tight text-ink sm:text-6xl md:text-7xl">
            The Future of Real Estate
            <span className="mt-1 block bg-gradient-to-r from-blue-soft via-blue to-violet bg-clip-text text-transparent">
              &amp; Booking Is Coming.
            </span>
          </h1>

          <p className="reveal mt-6 max-w-md text-base leading-relaxed text-ink/65 md:text-lg">
            Darify brings peer-to-peer property bookings, a secure digital
            wallet, and self-executing smart contracts into one seamless,
            cloud-based platform. Be first through the door.
          </p>

          <form onSubmit={handleSubmit} className="reveal mt-8 max-w-md">
            {status === "submitted" ? (
              <div className="shadow-glow-blue flex items-center gap-3 rounded-full border border-blue/30 bg-surface px-5 py-4">
                <Check className="h-5 w-5 shrink-0 text-blue-soft" aria-hidden="true" />
                <span className="text-sm text-ink/90">
                  You&apos;re on the list — we&apos;ll be in touch.
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-full border border-white/10 bg-surface px-5 py-4 text-sm text-ink placeholder:text-ink/35 focus-visible:border-blue-soft/60"
                />
                <button
                  type="submit"
                  className="shadow-glow-blue group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue to-violet px-6 py-4 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Notify Me
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="reveal relative z-10 flex justify-center pb-8">
        <div className="animate-float-slow flex flex-col items-center gap-2 text-ink/40">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-ink/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
