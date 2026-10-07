import { notFound } from "next/navigation";
import { PostForm } from "@/app/admin/_components/PostForm";
import { API_ROUTES, apiUrl, type Post } from "@/contracts/blog";

export default async function EditPostPage({ params }: PageProps<"/admin/posts/[id]">) {
  const { id } = await params;
  const response = await fetch(apiUrl(API_ROUTES.post(id)), { cache: "no-store" });

  if (response.status === 404) notFound();
  if (!response.ok) throw new Error("Impossibile caricare il post.");

  const post = (await response.json()) as Post;

  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl font-semibold text-ink">Modifica post</h1>
      <PostForm
        postId={post.id}
        initialValues={{
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          status: post.status,
        }}
      />
    </div>
  );
}
