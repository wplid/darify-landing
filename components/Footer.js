"use client";

import Image from "next/image";

const SOCIALS = [
  {
    name: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.6L4.4 22H1.3l8.2-9.3L1 2h7l4.9 6zM17.6 20h1.9L7.5 4H5.4z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7.5" cy="7.5" r="1.4" />
        <rect x="6.3" y="10.5" width="2.4" height="7.5" />
        <path d="M11.5 10.5h2.3v1.2c.5-.8 1.5-1.4 2.7-1.4 2.1 0 3.3 1.3 3.3 3.7v4h-2.4v-3.6c0-1.1-.4-1.9-1.5-1.9-.9 0-1.4.6-1.6 1.1-.1.2-.1.5-.1.8v3.6h-2.4z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Darify" width={26} height={26} className="h-6 w-6 opacity-80" />
          <span className="font-display text-sm font-medium tracking-tight text-ink/80">
            Darify
          </span>
        </div>

        <div className="flex items-center gap-4">
          {SOCIALS.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink/50 transition-colors duration-300 hover:border-blue-soft/40 hover:text-blue-soft"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <p className="font-mono text-xs tracking-wide text-ink/35">
          © {new Date().getFullYear()} Darify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
