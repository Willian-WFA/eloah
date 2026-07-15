# Checkpoint - Mapa de hub tocavel

Data: 2026-07-15
Agente/sessao: The Creator / Codex

## Objetivo

Permitir que a criança toque diretamente nos caminhos abertos do mapa da cidade, alem de escolher por voz ou pelos botoes de opcoes.

## Feito

- Rotas abertas no `hubPanel` agora renderizam como botoes.
- Ao tocar em uma rota aberta, o app chama `handlePlayerAction()` com o label da rota.
- Rotas concluidas e bloqueadas continuam apenas informativas.
- Estilo do painel atualizado para botao interno sem quebrar a densidade mobile.
- Cache PWA atualizado para `rpg-kids-v2026-07-15-clickable-hub-map-pwa`.

## Validacao

- `npm run sync:public`
- `npm run check`
- Busca local confirmou `data-route-index` e estilos em `prototype/` e `public/`.
