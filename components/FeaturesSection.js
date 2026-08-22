"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FileCheck2, Repeat, Wallet } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Subscribing to the OS-level motion preference via useSyncExternalStore
// (rather than useState+useEffect) keeps this in sync with React's render
// cycle without an extra setState-in-effect render pass, and its
// server-snapshot keeps server and first-paint client markup identical.
function subscribeToReducedMotion(callback) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

const FEATURES = [
  {
    icon: Repeat,
    eyebrow: "Booking",
    title: "Instant P2P Bookings",
    description:
      "Connect directly with property owners and renters. Real-time, secure bookings, with no middlemen slowing things down.",
  },
  {
    icon: Wallet,
    eyebrow: "Payments",
    title: "Integrated Digital Wallet",
    description:
      "Handle payments, deposits, and payouts from one secure, built-in wallet — no more juggling third-party apps.",
  },
  {
    icon: FileCheck2,
    eyebrow: "Agreements",
    title: "Automated Smart Contracts",
    description:
      "Lease agreements that execute themselves: transparent, tamper-proof terms that are secured from day one.",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const panelRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const panels = panelRefs.current.filter(Boolean);
      if (panels.length === 0) return;

      gsap.set(panels, { autoAlpha: 0, y: 32 });
      gsap.set(panels[0], { autoAlpha: 1, y: 0 });

      const activeRef = { current: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * (FEATURES.length + 0.5)}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              FEATURES.length - 1,
              Math.floor(self.progress * FEATURES.length)
            );
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActiveIndex(idx);
            }
          },
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        tl.to(panels[i - 1], { autoAlpha: 0, y: -32, duration: 0.5 }).to(
          panel,
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "<"
        );
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  if (prefersReducedMotion) {
    return (
      <section className="bg-background px-6 py-24 md:px-12">
        <div className="mx-auto flex max-w-3xl flex-col gap-16">
          {FEATURES.map((feature) => (
            <FeatureContent key={feature.title} feature={feature} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="bg-background relative h-screen overflow-hidden">
      <div className="mx-auto flex h-full max-w-3xl items-center px-6 md:px-12">
        <div className="relative w-full">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              ref={(el) => (panelRefs.current[i] = el)}
              className="absolute inset-0 flex items-center"
            >
              <FeatureContent feature={feature} />
            </div>
          ))}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 gap-3">
        {FEATURES.map((feature, i) => (
          <span
            key={feature.title}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === activeIndex ? "bg-blue-soft w-8" : "w-1.5 bg-white/15"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureContent({ feature }) {
  const Icon = feature.icon;
  return (
    <div className="max-w-lg">
      <div className="border-blue-soft/25 bg-surface mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border">
        <Icon className="text-blue-soft h-5 w-5" aria-hidden="true" />
      </div>
      <p className="text-violet font-mono text-xs tracking-[0.3em] uppercase">
        {feature.eyebrow}
      </p>
      <h3 className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        {feature.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-ink/60 md:text-lg">
        {feature.description}
      </p>
    </div>
  );
}
