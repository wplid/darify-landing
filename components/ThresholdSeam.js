"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ThresholdSeam() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const captionRef = useRef(null);

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

          gsap.set(pathRef.current, { strokeDasharray: 1000, strokeDashoffset: reduced ? 0 : 1000 });
          gsap.set(captionRef.current, { autoAlpha: reduced ? 1 : 0 });

          if (reduced) return;

          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          })
            .to(pathRef.current, { strokeDashoffset: 0, ease: "none" })
            .to(captionRef.current, { autoAlpha: 1, duration: 0.3 }, "-=0.3");
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-hidden="true"
      className="relative flex h-[40vh] items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4">
        <svg
          viewBox="0 0 200 260"
          className="h-24 w-auto md:h-32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={pathRef}
            d="M20 250 L20 60 L100 20 L180 60 L180 250"
            stroke="#f0a93e"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          ref={captionRef}
          className="font-mono text-xs tracking-[0.3em] text-gold/80 uppercase"
        >
          Entering Darify
        </span>
      </div>
    </section>
  );
}
