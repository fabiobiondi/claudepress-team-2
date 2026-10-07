import Link from "next/link";
import clsx from "clsx";
import {
  API_ROUTES,
  ROUTES,
  apiUrl,
  postInputSchema,
  type Post,
  type PostStatus,
} from "@/contracts/blog";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DeletePostButton } from "@/app/admin/posts/_list/DeletePostButton";
import { StatusToggle } from "@/app/admin/posts/_list/StatusToggle";

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

async function getPosts(): Promise<Post[]> {
  const response = await fetch(apiUrl(API_ROUTES.posts), { cache: "no-store" });
  if (!response.ok) throw new Error(`Caricamento dei post fallito (${response.status})`);
  return response.json();
}

const filters: { label: string; status: PostStatus | null }[] = [
  { label: "Tutti", status: null },
  { label: "Bozze", status: "draft" },
  { label: "Pubblicati", status: "published" },
];

type AdminPostsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminPostsPage({ searchParams }: AdminPostsPageProps) {
  // Un valore diverso da draft o published (o assente) vuol dire nessun filtro.
  const parsedStatus = postInputSchema.shape.status.safeParse((await searchParams).status);
  const activeStatus = parsedStatus.success ? parsedStatus.data : null;

  const posts = await getPosts();
  const visible = activeStatus ? posts.filter((post) => post.status === activeStatus) : posts;
  // Decisione di progetto (CLAUDE.md): l'elenco del backoffice è ordinato per titolo.
  const sorted = visible.toSorted((a, b) => a.title.localeCompare(b.title, "it"));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink">Post</h1>
        <Link
          href={ROUTES.adminPostNew}
          className="inline-flex items-center rounded-sm border border-pencil-blue bg-pencil-blue px-4 py-2 text-sm font-medium text-on-pencil hover:opacity-90"
        >
          Nuovo post
        </Link>
      </div>

      <nav aria-label="Filtra per stato" className="flex gap-2">
        {filters.map((filter) => {
          const active = filter.status === activeStatus;
          return (
            <Link
              key={filter.label}
              href={
                filter.status
                  ? { pathname: ROUTES.adminPosts, query: { status: filter.status } }
                  : ROUTES.adminPosts
              }
              aria-current={active ? "page" : undefined}
              className={clsx(
                "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                active
                  ? "border-pencil-blue bg-pencil-blue text-on-pencil"
                  : "border-rule bg-surface text-graphite hover:border-graphite hover:text-ink",
              )}
            >
              {filter.label}
            </Link>
          );
        })}
      </nav>

      {sorted.length === 0 ? (
        activeStatus ? (
          <EmptyState
            title={activeStatus === "draft" ? "Nessuna bozza" : "Nessun post pubblicato"}
            description="Prova a cambiare filtro o a mostrare tutti i post."
          />
        ) : (
          <EmptyState
            title="Nessun post"
            description="Non c'è ancora niente da correggere. Comincia scrivendo il primo post."
          />
        )
      ) : (
        <div className="overflow-x-auto rounded-md border border-rule bg-surface">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-rule text-xs uppercase tracking-wider text-graphite">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Titolo</th>
                <th scope="col" className="px-4 py-3 font-medium">Autore</th>
                <th scope="col" className="px-4 py-3 font-medium">Ultima modifica</th>
                <th scope="col" className="px-4 py-3 font-medium">Stato</th>
                <th scope="col" className="px-4 py-3 font-medium">
                  <span className="sr-only">Azioni</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {sorted.map((post) => (
                <tr key={post.id} className="align-middle">
                  <td className="px-4 py-3 font-serif text-base font-semibold text-ink">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 text-graphite">{post.author}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-graphite">
                    <time dateTime={post.updatedAt}>
                      {dateFormatter.format(new Date(post.updatedAt))}
                    </time>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={post.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={ROUTES.adminPost(post.id)}
                        className="font-medium text-pencil-blue hover:pencil-underline focus-visible:pencil-underline"
                      >
                        Modifica
                      </Link>
                      <StatusToggle id={post.id} status={post.status} />
                      <DeletePostButton id={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
