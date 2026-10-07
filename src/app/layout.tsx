import type { Metadata } from "next";
import { Literata, Schibsted_Grotesk } from "next/font/google";
import Link from "next/link";
import { ROUTES } from "@/contracts/blog";
import "./globals.css";

const literata = Literata({ subsets: ["latin"], variable: "--font-literata" });
const schibsted = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-schibsted" });

export const metadata: Metadata = {
  title: "ClaudePress",
  description: "Un blog con il suo CMS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${literata.variable} ${schibsted.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <header className="border-b border-rule bg-surface">
          <div className="mx-auto flex max-w-3xl items-baseline justify-between gap-6 px-4 py-5 sm:px-6">
            <Link
              href={ROUTES.home}
              className="pencil-underline font-serif text-2xl font-semibold tracking-tight"
            >
              ClaudePress
            </Link>
            <nav className="flex gap-5 text-sm text-graphite">
              <Link href={ROUTES.home} className="hover:text-ink">
                Blog
              </Link>
              <Link href={ROUTES.adminPosts} className="hover:text-ink">
                Backoffice
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
          {children}
        </main>
      </body>
    </html>
  );
}
