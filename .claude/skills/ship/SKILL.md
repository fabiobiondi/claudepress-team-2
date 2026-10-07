---
name: ship
description: Porta il lavoro finito da locale a remoto in un colpo. Lancia npm run check e si ferma se fallisce, committa con un messaggio scritto leggendo il diff, poi fa push sul branch corrente. Trigger:manda su, pusha il lavoro, chiudi il pezzo.
allowed-tools: Read, Grep, Bash(git:*), Bash(npm run:*)
---

# Dal locale al remoto

1. Lancia `npm run check`. **Se fallisce ti fermi qui**: riporta l'errore così
   com'è, non committare e non sistemare al volo.
2. Guarda `git status --short` e `git diff`. Se c'è già qualcosa in staging,
   committa solo quello. Altrimenti aggiungi i file per nome, mai `git add -A`.
   Se non c'è niente da committare, salta al passo 4.
3. Committa con una riga in inglese, in formato conventional commit (`feat:`,
   `fix:`, `docs:`, `refactor:`, `test:`, `chore:`), che dice cosa cambia per
   chi usa il progetto. Se il diff contiene due cose scollegate, fermati e
   proponi due commit. Niente note su chi l'ha scritto, se il repo non le usa.
4. Leggi il branch con `git branch --show-current` e lancia
   `git push -u origin <branch>`.
5. Se il push viene rifiutato, **non forzare**: niente `--force`, niente
   rebase. Riporta l'errore com'è e fermati.
6. Chiudi con due righe: il messaggio di commit usato e il branch su cui hai
   pushato.
