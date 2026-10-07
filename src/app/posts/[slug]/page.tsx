import Link from "next/link";
import { notFound } from "next/navigation";
import { API_ROUTES, ROUTES, apiUrl, type Post } from "@/contracts/blog";

type PostResult =
  | { kind: "found"; post: Post }
  | { kind: "not_found" }
  | { kind: "error" };

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

async function loadPost(slug: string): Promise<PostResult> {
  try {
    const res = await fetch(apiUrl(API_ROUTES.postBySlug(slug)), { cache: "no-store" });
    if (res.status === 404) return { kind: "not_found" };
    if (!res.ok) return { kind: "error" };
    const post: Post = await res.json();
    return { kind: "found", post };
  } catch {
    return { kind: "error" };
  }
}

export default async function PostPage(props: PageProps<"/posts/[slug]">) {
  const { slug } = await props.params;
  const result = await loadPost(slug);

  // Una bozza non è pubblica: per il sito è come se non esistesse.
  if (result.kind === "not_found" || (result.kind === "found" && result.post.status !== "published")) {
    notFound();
  }

  if (result.kind === "error") {
    return (
      <p role="alert" className="text-pencil-red">
        Non è stato possibile caricare l&apos;articolo. Ricarica la pagina tra qualche istante.
      </p>
    );
  }

  const { post } = result;
  const paragraphs = post.content.split(/\n\s*\n/);

  return (
    <article>
      <Link href={ROUTES.home} className="text-sm text-graphite hover:text-ink">
        Tutti gli articoli
      </Link>

      <h1 className="mt-6 font-serif text-4xl leading-tight font-semibold tracking-tight text-balance">
        {post.title}
      </h1>
      <p className="mt-4 text-sm text-graphite">
        <span className="font-medium text-ink">{post.author}</span>,{" "}
        <time dateTime={post.createdAt}>{dateFormatter.format(new Date(post.createdAt))}</time>
      </p>

      <div className="mt-10 max-w-prose space-y-6 font-serif text-lg leading-loose">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
