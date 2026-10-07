import Link from "next/link";
import { API_ROUTES, ROUTES, apiUrl, type Post } from "@/contracts/blog";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DeletePostButton } from "@/app/admin/posts/_list/DeletePostButton";

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

export default async function AdminPostsPage() {
  const posts = await getPosts();
  // Decisione di progetto (CLAUDE.md): l'elenco del backoffice è ordinato per titolo.
  const sorted = posts.toSorted((a, b) => a.title.localeCompare(b.title, "it"));

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

      {sorted.length === 0 ? (
        <EmptyState
          title="Nessun post"
          description="Non c'è ancora niente da correggere. Comincia scrivendo il primo post."
        />
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
