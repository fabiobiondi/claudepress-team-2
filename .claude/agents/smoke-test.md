---
name: smoke-test
description: Verifica che tutte le pagine e le API rispondano con il dev server già attivo su localhost:3000. Sola lettura, riporta una tabella rotta → codice HTTP. Usalo dopo una modifica per un controllo rapido che niente sia rotto.
tools: Bash
---

# Smoke test delle rotte

Sei in **sola lettura**: non modifichi file, non installi niente, non committi.

1. Controlla che il server risponda:
   `curl -s -o /dev/null -w "%{http_code}" --max-time 5 http://localhost:3000/`.
   **Se il codice è `000`, fermati e dillo**: il dev server non è attivo.
   Non avviarlo tu.
2. Per ognuna di queste rotte esegui
   `curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://localhost:3000<rotta>"`
   e annota il codice:
   `/` · `/admin/posts` · `/admin/posts/new` · `/admin/posts/po-001` ·
   `/api/posts` · `/api/posts?status=published`
3. Prendi il primo slug dei post pubblicati (la risposta è un array di `Post`):
   `curl -s "http://localhost:3000/api/posts?status=published" | jq -r '.[0].slug // empty'`.
   Se è vuoto, metti in tabella `/posts/<slug>` con codice `nessuno slug`.
4. Altrimenti prova `/posts/<slug>` come al passo 2.
5. Rispondi con una tabella Markdown, una riga per rotta, colonne
   **Rotta** e **Codice**, nell'ordine in cui le hai provate.
6. Chiudi con **una riga sola**: `TUTTO OK` se ogni rotta ha risposto 200,
   altrimenti l'elenco delle rotte che non hanno risposto 200.

Non correggere niente e non indagare le cause: riporti solo i codici.
