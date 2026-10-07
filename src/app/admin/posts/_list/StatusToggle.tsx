// Client component: serve onClick per chiamare la PATCH e uno stato per
// disabilitare il bottone e mostrare l'errore mentre la richiesta è in corso.
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_ROUTES, type ApiError, type PostPatch, type PostStatus } from "@/contracts/blog";
import { Button } from "@/components/ui/Button";

type StatusToggleProps = {
  id: string;
  status: PostStatus;
};

export function StatusToggle({ id, status }: StatusToggleProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleToggle() {
    setPending(true);
    setError(null);

    const patch: PostPatch = { status: status === "draft" ? "published" : "draft" };
    const response = await fetch(API_ROUTES.post(id), {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
    }).catch(() => null);

    if (!response) {
      setError("Impossibile contattare il server");
      setPending(false);
      return;
    }

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as ApiError | null;
      setError(body?.error.message ?? "Cambio di stato non riuscito");
      setPending(false);
      return;
    }

    router.refresh();
    setPending(false);
  }

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <Button variant="secondary" disabled={pending} onClick={handleToggle}>
        {status === "draft" ? "Pubblica" : "Riporta in bozza"}
      </Button>
      {error && (
        <span role="alert" className="text-xs text-pencil-red">
          {error}
        </span>
      )}
    </span>
  );
}
