import { PostForm } from "@/app/admin/_components/PostForm";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-8 font-serif text-3xl font-semibold text-ink">Nuovo post</h1>
      <PostForm />
    </div>
  );
}
