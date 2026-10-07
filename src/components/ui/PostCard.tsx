import Link from "next/link";
import type { PostCardProps } from "@/contracts/blog";

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function PostCard({ title, excerpt, author, date, href }: PostCardProps) {
  return (
    <article className="group relative rounded-lg border border-neutral-200 p-6 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600">
      <h2 className="text-xl font-semibold tracking-tight">
        <Link
          href={href}
          className="after:absolute after:inset-0 focus-visible:outline-none group-focus-within:underline"
        >
          {title}
        </Link>
      </h2>
      {excerpt && (
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">{excerpt}</p>
      )}
      <p className="mt-4 text-sm text-neutral-500">
        di <span className="font-medium text-foreground">{author}</span>
        {" · "}
        <time dateTime={date}>{dateFormatter.format(new Date(date))}</time>
      </p>
    </article>
  );
}
