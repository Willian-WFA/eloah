# Agent State - Learning Criteria + Cave Rewrite

Data: 2026-07-13
Projeto: RPG Kids
Sessao: The Creator / Codex

## Pedido do usuario

O usuario questionou por que escolher a capa concedia ponto de criatividade e apontou que a caverna ficou sem nexo por misturar a ideia original com elementos novos.

## Diagnostico

- O prototipo aplicava `progressDelta` por cena, nao por escolha.
- A escolha da capa estava ligada a criatividade por uma inferencia fraca: "usar/definir item de personagem" foi tratado como criatividade sem a cena explicar isso.
- A caverna tinha residuos de duas ideias: o exemplo original da entrada da caverna e uma missao nova de resgate da Lanterna de Lua.

## Alteracoes feitas

- `prototype/app.js`
  - A leitura completa agora mostra `Critério de aprendizado` quando a cena define `learningCriteria`.
  - O avatar passou a renderizar a camada `Martelo`.

- `prototype/styles.css`
  - Adicionado estilo para `hero-hammer`.

- `prototype/adventures.js`
  - A cena inicial do Portal removeu a escolha "Eu escolho minha capa".
  - A capa agora esta ligada a gentileza, com criterio explicito: acolher Luma, perguntar o que aconteceu e ajudar.
  - A caverna foi reescrita para seguir o eixo original: estrada, entrada escura, escolha, dado, placa dos 4 pulos, vagalumes, sala de desafio e quebra-cabeca.
  - Removida a missao da Lanterna de Lua.
  - Adicionados `Escudo de Vagalume` e `Martelo Macio`.

## Decisao de produto

Progresso pedagogico precisa de criterio observavel. No motor atual ainda ha uma limitacao: o progresso e aplicado por cena. O proximo passo correto e permitir progresso por escolha e por resultado do dado.

## Validacao

- `node --check prototype/app.js`
- `node --check prototype/adventures.js`
- Busca confirmou presenca de `learningCriteria`, `Critério de aprendizado`, `Martelo Macio` e `hero-hammer`.
- Busca confirmou ausencia de `Eu escolho minha capa`, `Lanterna de Lua` e `resgate de uma lanterna` no prototipo.
