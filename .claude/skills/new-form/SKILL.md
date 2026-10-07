---
name: new-form
description: Crea il form del post per creazione (POST) e modifica (PATCH), con Field, Input e Button condivisi e validazione dal contratto. Trigger: nuovo form, il form di creazione, il modulo del post, form di modifica.
---

# Nuovo form del post

1. Controlla che esistano `src/components/ui/Field.tsx`, `Input.tsx` e `Button.tsx`.
   **Se ne manca uno, fermati e dillo**: non sostituirlo con markup a mano.
2. Crea il form in `src/app/admin/_components/`. Prima riga `"use client"`, poi un
   commento che dice perché (stato dei campi, errori, invio).
3. Props: `postId?: string` e `initialValues?: Partial<PostInput>`. Con `postId`
   fa PATCH su `API_ROUTES.post(postId)`, senza fa POST su `API_ROUTES.posts`.
   Path relativo, niente `apiUrl`: nel browser va bene.
4. Ogni campo è `<Field>` con dentro `<Input>`; `content` con `multiline`. Lo stato
   (`draft`/`published`) con due `<Button type="button">`. **Mai** `<input>`,
   `<textarea>` o `<button>` scritti a mano: escono dall'identità visiva.
5. Al submit valida con `postInputSchema.safeParse`. Se fallisce, da
   `error.issues` prendi il primo messaggio per `path[0]`. Mai controlli a mano.
6. Gli errori stanno in uno stato `Record<string, string>` e vanno nel `Field`
   del campo (`error`) e nell'`Input` (`invalid`). **Mai in cima alla pagina.**
7. Se la risposta è un `ApiError` con `code: "validation_error"`, metti
   `error.fields` nello stesso stato: finiscono negli stessi `Field`.
   Altri errori: `error.message` accanto al bottone.
8. Durante l'invio il bottone di submit è `disabled`: niente doppio invio.
9. Se va a buon fine, `router.push(ROUTES.adminPosts)` e `router.refresh()`.
10. Testi in **italiano**, nomi in inglese. Alla fine `npm run check`, esito in una riga.

Tocca **solo** il file del form. Se serve altro, dillo invece di farlo.
