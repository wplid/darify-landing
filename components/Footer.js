"use client";

import Image from "next/image";

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/darifyapp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/darify.app/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@darify.app",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M16.5 3c.3 1.9 1.4 3.3 3.3 3.6v2.6c-1.2.1-2.3-.2-3.4-.8v5.8c0 3.2-2.4 5.4-5.4 5.4-2.9 0-5.1-2-5.1-4.7 0-2.8 2.3-4.8 5-4.5v2.7c-.4-.1-.8-.2-1.2-.2-1.2 0-2 .8-2 2 0 1.2.9 2 2.1 2 1.4 0 2.4-1.1 2.4-2.8V3z" />
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
