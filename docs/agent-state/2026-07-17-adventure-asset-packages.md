# 2026-07-17 - Adventure Asset Packages

## Escopo

Issue #5: separar assets e audio por pacote de aventura.

## Feito

- Criado `public/adventure-packages/index.json`.
- Criados manifests `package.json` para as 6 aventuras jogaveis.
- Espelhado o pacote em `prototype/adventure-packages/`.
- Criado `docs/ADVENTURE_ASSET_PACKAGES.md`.
- Criado `scripts/check-adventure-packages.js`.
- `npm run check` passa a validar os pacotes.
- Service worker passou a cachear os manifests dos pacotes.

## Decisao

Os pacotes entram primeiro em modo `reference`: eles apontam para os assets globais existentes, sem mover imagens e WAVs nesta etapa. Isso reduz risco e cria o contrato para migrar depois para modo `bundled`.

## Validacao

- Pendente nesta branch: rodar `npm run check`.

## Proximo Passo

Issue #6: criar o guia para adicionar nova aventura usando manifest, pacote de assets, audio pregerado e checklist de aprovacao adulta.
