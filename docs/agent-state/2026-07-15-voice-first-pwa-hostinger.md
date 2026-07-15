# Agent State - 2026-07-15 - Voice First and PWA Hostinger

## Pedido do usuario

A crianca entende progresso, recompensa e avatar, mas prefere falar o que deseja fazer em vez de clicar. Melhorar voz, tom teatral e reacoes do mestre; preparar PWA mobile para hospedar na Hostinger; depois focar em conteudo e aprendizado.

## O que foi alterado

- O bloco de acao livre/voz subiu para antes das opcoes.
- O botao principal da crianca virou `Falar acao`.
- As opcoes continuam na tela, mas agora funcionam mais como sugestoes narradas pelo mestre.
- O narrador passou a abrir a fala com `Mestre narrando`.
- A fala das opcoes foi ajustada para soar como escolhas de aventura.
- Criada funcao `masterReaction()` com reacoes teatrais por tipo de acao/progresso.
- A fala por `speechSynthesis` recebeu ritmo mais calmo, pitch levemente diferente para opcoes e pausas maiores entre blocos.
- Criado PWA:
  - `manifest.webmanifest`
  - `sw.js`
  - `assets/icons/icon.svg`
  - `assets/icons/icon-192.png`
  - `assets/icons/icon-512.png`
- `app.js` registra o service worker quando disponivel.
- `server.js` serve `.webmanifest` com MIME correto.
- `npm run sync:public` agora copia manifest, service worker e icones.
- `docs/HOSTINGER_DEPLOY.md` foi atualizado com notas de PWA, HTTPS e microfone.

## Arquivos alterados

- `prototype/index.html`
- `prototype/app.js`
- `prototype/styles.css`
- `prototype/manifest.webmanifest`
- `prototype/sw.js`
- `prototype/assets/icons/icon.svg`
- `prototype/assets/icons/icon-192.png`
- `prototype/assets/icons/icon-512.png`
- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `public/manifest.webmanifest`
- `public/sw.js`
- `public/assets/icons/icon.svg`
- `public/assets/icons/icon-192.png`
- `public/assets/icons/icon-512.png`
- `server.js`
- `package.json`
- `docs/HOSTINGER_DEPLOY.md`
- `docs/CURRENT_STATE.md`

## Validacao executada

- `npm run sync:public`
- `npm run check`
- `node --check public/sw.js`
- parse JSON de `public/manifest.webmanifest`
- verificacao dos icones em `public/assets/icons`
- `curl -I -s http://127.0.0.1:3000/manifest.webmanifest`
- `curl -I -s http://127.0.0.1:3000/sw.js`
- `curl -I -s http://127.0.0.1:3000/`
- busca por `Falar acao`, `manifest.webmanifest`, `serviceWorker`, `masterReaction`, `Mestre narrando` e `application/manifest`.

## Proximo passo recomendado

Subir na Hostinger com HTTPS e testar no celular:

- instalacao PWA na tela inicial;
- permissao de microfone;
- se a crianca entende que falar e a acao principal;
- se as reacoes do mestre aumentam engajamento sem deixar a fala longa;
- se o `speechSynthesis` do aparelho tem voz pt-BR aceitavel.

Depois disso, focar em conteudo/aprendizado.
