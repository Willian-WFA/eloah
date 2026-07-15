# Checkpoint - Painel visual de hub

Data: 2026-07-15
Agente/sessao: The Creator / Codex

## Objetivo

Dar feedback visual simples para campanhas com hub, sem substituir a voz nem o fluxo de mestre.

## Feito

- Adicionado `#hubPanel` na tela da criança.
- `renderHubPanel()` exibe o painel somente em cenas com `scene.hub.routes`.
- O painel mostra:
  - Notas de Sino atuais;
  - quantidade de caminhos abertos;
  - rotas abertas;
  - rotas concluidas;
  - rotas bloqueadas com requisito resumido.
- Adicionado CSS responsivo para o painel e lista de rotas.
- `prototype/` sincronizado para `public/`.
- Cache PWA atualizado para `rpg-kids-v2026-07-15-hub-map-panel-pwa`.

## Validacao

- `npm run sync:public`
- `npm run check`
- Busca local confirmou `hubPanel`, `hub-panel`, `Mapa da cidade` e `Notas de Sino` em `prototype/` e `public/`.

## Proximo passo recomendado

Transformar itens abertos do painel de hub em botoes de rota, se o teste com a criança mostrar que tocar no mapa e mais natural que tocar nas opções sugeridas.
