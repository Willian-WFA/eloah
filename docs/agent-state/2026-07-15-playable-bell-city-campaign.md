# Checkpoint - Campanha dos Sinos jogavel

Data: 2026-07-15
Agente/sessao: The Creator / Codex

## Pedido

Continuar enquanto o GitHub era conectado na Hostinger, iniciando a conversao da aventura longa para uma versao jogavel no app.

## Feito

- Adicionada `A Cidade dos Sinos Claros` ao catalogo `prototype/adventures.js`.
- A campanha entrou como primeira versao jogavel linear com sensacao de hub.
- Criadas 10 cenas:
  - O Portao Baixinho
  - A Praca do Relogio Parado
  - Tico e a Ordem dos Biscoitos
  - A Biblioteca dos Guarda-Chuvas
  - Pipoca e as Flores Altas
  - Nara e a Ponte dos Panos
  - O Sino Sem Plim
  - Bento e as Cartas do Bosque
  - Iara e o Vento Devagar
  - O Grande Silencio Macio
- Adicionado progresso `notas_sino`.
- Adicionadas recompensas: notas, livro, capa, botas, martelo, fita e medalha.
- Cada quest recebeu escolhas, rubrica de acao livre, dado, consequencias, idioma ou movimento quando adequado.
- `prototype/app.js` passou a rotular `long_branching_quest_hub` como `Campanha`.
- `notas_sino` ganhou label legivel no medidor.
- `prototype/` sincronizado para `public/`.
- Cache do service worker atualizado para `rpg-kids-v2026-07-15-long-bell-city-pwa`.

## Validacao

- `node --check prototype/adventures.js`
- `node --check prototype/app.js`
- `npm run sync:public`
- `npm run check`

## Limite consciente

Esta ainda nao e a versao com hub ramificado real. Ela valida conteudo, ritmo, voz, dado, progresso, recompensas e final. A proxima etapa deve adaptar o motor para quest graph, desbloqueios e escolha real de quests pela praca.
