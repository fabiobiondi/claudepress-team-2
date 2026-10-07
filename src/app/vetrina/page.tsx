// Client component: Input vuole onChange e Button onClick, che una pagina
// server non può passare; in più i campi di prova tengono il loro stato.
"use client";

import { useState, type ReactNode } from "react";
import { ROUTES } from "@/contracts/blog";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { PostCard } from "@/components/ui/PostCard";
import { StatusBadge } from "@/components/ui/StatusBadge";

const samplePosts = [
  {
    title: "Il contratto prima del codice",
    excerpt: "Perché in un team di tre conviene mettersi d'accordo sui tipi prima di scrivere una riga.",
    author: "Fabio Biondi",
    date: "2026-09-14T09:30:00.000Z",
    slug: "il-contratto-prima-del-codice",
  },
  {
    title: "Server component di default",
    excerpt: "Quando serve davvero \"use client\" e quando è solo un'abitudine.",
    author: "Giulia Verdi",
    date: "2026-10-02T16:00:00.000Z",
    slug: "server-component-di-default",
  },
];

function Section({ name, children }: { name: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-mono text-sm font-semibold text-neutral-500">{name}</h2>
      {children}
    </section>
  );
}

export default function ShowcasePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <main className="mx-auto max-w-2xl space-y-12 px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Vetrina dei componenti</h1>

      <Section name="PostCard">
        {samplePosts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            author={post.author}
            date={post.date}
            href={ROUTES.post(post.slug)}
          />
        ))}
      </Section>

      <Section name="StatusBadge">
        <div className="flex gap-3">
          <StatusBadge status="published" />
          <StatusBadge status="draft" />
        </div>
      </Section>

      <Section name="Button">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" onClick={() => console.log("primary")}>
            Salva
          </Button>
          <Button variant="secondary" onClick={() => console.log("secondary")}>
            Annulla
          </Button>
          <Button variant="danger" onClick={() => console.log("danger")}>
            Elimina
          </Button>
          <Button disabled>Disabilitato</Button>
        </div>
      </Section>

      <Section name="Field + Input">
        <Field label="Titolo" htmlFor="showcase-title">
          <Input
            id="showcase-title"
            name="title"
            value={title}
            onChange={setTitle}
            placeholder="Il titolo del post"
          />
        </Field>
        <Field label="Contenuto" htmlFor="showcase-content">
          <Input
            id="showcase-content"
            name="content"
            value={content}
            onChange={setContent}
            placeholder="Scrivi qui il testo del post"
            multiline
          />
        </Field>
        <Field
          label="Autore"
          htmlFor="showcase-author"
          error="L'autore non può essere vuoto"
        >
          <Input
            id="showcase-author"
            name="author"
            value={author}
            onChange={setAuthor}
            invalid
          />
        </Field>
      </Section>

      <Section name="EmptyState">
        <EmptyState
          title="Nessun post pubblicato"
          description="Quando pubblichi il primo post, comparirà qui."
        />
        <EmptyState title="Nessun risultato" />
      </Section>
    </main>
  );
}
