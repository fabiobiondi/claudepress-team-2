// Client component: serve onClick per chiamare la DELETE e uno stato per
// disabilitare il bottone e mostrare l'errore mentre la richiesta è in corso.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES, type ApiError } from "@/contracts/blog";
import { Button } from "@/components/ui/Button";

type DeletePostButtonProps = {
  id: string;
};

export function DeletePostButton({ id }: DeletePostButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setPending(true);
    setError(null);

    const response = await fetch(API_ROUTES.post(id), { method: "DELETE" }).catch(() => null);

    if (!response) {
      setError("Impossibile contattare il server");
      setPending(false);
      return;
    }

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as ApiError | null;
      setError(body?.error.message ?? "Eliminazione non riuscita");
      setPending(false);
      return;
    }

    router.refresh();
  }

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <Button variant="danger" disabled={pending} onClick={handleDelete}>
        {pending ? "Elimino…" : "Elimina"}
      </Button>
      {error && (
        <span role="alert" className="text-xs text-pencil-red">
          {error}
        </span>
      )}
    </span>
  );
}
