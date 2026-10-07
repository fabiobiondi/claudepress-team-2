import Link from "next/link";
import type { PostCardProps } from "@/contracts/blog";

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function PostCard({ title, excerpt, author, date, href }: PostCardProps) {
  return (
    <article className="group relative py-6">
      <h2 className="font-serif text-2xl leading-snug font-semibold tracking-tight text-ink">
        <Link
          href={href}
          className="after:absolute after:inset-0 group-hover:pencil-underline focus-visible:pencil-underline"
        >
          {title}
        </Link>
      </h2>
      {excerpt && (
        <p className="mt-2 max-w-prose font-serif text-lg leading-relaxed text-graphite">
          {excerpt}
        </p>
      )}
      <p className="mt-3 text-sm text-graphite">
        <span className="font-medium text-ink">{author}</span>,{" "}
        <time dateTime={date}>{dateFormatter.format(new Date(date))}</time>
      </p>
    </article>
  );
}
