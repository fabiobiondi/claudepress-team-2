---
name: new-page
description: Crea una pagina del sito pubblico che carica i dati dalle API del contratto e gestisce dati, vuoto, errore e 404. Trigger: nuova pagina, crea la home, la pagina del post, aggiungi una rotta pubblica.
---

# Nuova pagina del sito pubblico

Ricevi la rotta, per esempio `/` o `/posts/[slug]`.

1. Controlla che la rotta sia in `ROUTES` di `src/contracts/blog.ts` e l'endpoint
   in `API_ROUTES`. **Se manca, fermati e dillo**: il contratto non si modifica.
2. Crea `src/app/<rotta>/page.tsx`, solo nell'area del sito pubblico.
3. Server component `async`: **niente `"use client"`**, niente hook. I parametri
   dinamici con `PageProps<'/posts/[slug]'>` e `await props.params`.
4. Carica i dati con `fetch(apiUrl(API_ROUTES.x), { cache: "no-store" })`, tutto
   importato da `@/contracts/blog`. Mai un path relativo, mai un URL a mano.
5. Gestisci **tre casi**, tutti e tre:
   - dati presenti → renderli con i componenti di `@/components/ui/`;
   - elenco vuoto → `<EmptyState>` con titolo in italiano;
   - fetch fallita (eccezione o `!res.ok`) → un messaggio d'errore in italiano.
6. Risorsa singola con risposta 404 → `notFound()` da `next/navigation`.
   **Mai `return null`.**
7. Link interni sempre da `ROUTES`, mai scritti a mano. Import solo con `@/`.
8. Testi visibili in **italiano**, nomi in inglese. Solo classi Tailwind.
9. Alla fine esegui `npm run check` e riporta l'esito in una riga.

Tocca **solo** il file della pagina. Se serve un componente che non c'è o un
file di un'altra area, dillo invece di farlo.
