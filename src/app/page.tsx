import { API_ROUTES, ROUTES, apiUrl, type Post } from "@/contracts/blog";
import { EmptyState } from "@/components/ui/EmptyState";
import { PostCard } from "@/components/ui/PostCard";

async function loadPublishedPosts(): Promise<Post[] | null> {
  try {
    const res = await fetch(apiUrl(API_ROUTES.publishedPosts), { cache: "no-store" });
    if (!res.ok) return null;
    const posts: Post[] = await res.json();
    return posts.toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const posts = await loadPublishedPosts();

  return (
    <div>
      <h1 className="font-serif text-4xl font-semibold tracking-tight">Articoli</h1>

      <div className="mt-8">
        {posts === null ? (
          <p role="alert" className="text-pencil-red">
            Non è stato possibile caricare gli articoli. Ricarica la pagina tra qualche
            istante.
          </p>
        ) : posts.length === 0 ? (
          <EmptyState
            title="Nessun articolo pubblicato"
            description="Quando un articolo viene pubblicato dal backoffice, compare qui."
          />
        ) : (
          <ul className="divide-y divide-rule">
            {posts.map((post) => (
              <li key={post.id}>
                <PostCard
                  title={post.title}
                  excerpt={post.excerpt}
                  author={post.author}
                  date={post.createdAt}
                  href={ROUTES.post(post.slug)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
