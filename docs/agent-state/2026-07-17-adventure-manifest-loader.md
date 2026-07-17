# 2026-07-17 - Adventure Manifest Loader

## Escopo

Issue #4: carregar aventuras por manifest JSON, mantendo compatibilidade com a biblioteca embutida atual.

## Feito

- Criado `public/adventures.manifest.json` e sincronizado para `prototype/adventures.manifest.json`.
- `public/app.js` agora inicializa a biblioteca via `loadAdventureLibrary()`.
- O loader aceita fontes `script-global` e `json`.
- O app mantém fallback para `window.RPG_KIDS_ADVENTURES` quando o manifest falha.
- `scripts/generate-audio.js` e `scripts/check-audio-coverage.js` passam a ler o mesmo manifest.
- `package.json` valida parse do manifest em `build` e `check`.
- Service worker cacheia `adventures.manifest.json` e recebeu novo cache name.

## Validação

- Pendente nesta branch: rodar `npm run check` e comparar `public/` com `prototype/`.

## Riscos

- O manifest ainda aponta para a fonte legada `adventures.js`; a próxima etapa deve mover aventuras para pacotes JSON reais.
- Em abertura direta por `file://`, o fetch do manifest pode falhar, mas o fallback global mantém o protótipo utilizável.

## Próximo Passo

Implementar a issue #5: separar assets e áudio por pacote de aventura, preparando o caminho para manifest JSON por aventura.
