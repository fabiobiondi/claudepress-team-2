import Link from "next/link";
import { ROUTES } from "@/contracts/blog";
import { EmptyState } from "@/components/ui/EmptyState";

export default function PostNotFound() {
  return (
    <div className="space-y-6">
      <EmptyState
        title="Questo articolo non esiste"
        description="Forse il link è sbagliato, oppure l'articolo non è più pubblicato."
      />
      <p className="text-center">
        <Link href={ROUTES.home} className="pencil-underline font-medium">
          Torna agli articoli
        </Link>
      </p>
    </div>
  );
}
