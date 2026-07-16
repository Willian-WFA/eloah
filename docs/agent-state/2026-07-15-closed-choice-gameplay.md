# 2026-07-15 - Closed Choice Gameplay

## O que foi feito

- Removido o fluxo de ação livre do painel infantil.
- Removidas as opções `Livre escolha` das aventuras jogáveis em `public/` e `prototype/`.
- Mantida voz ativa como seletor de opção: a criança pode falar `opção 1`, `opção 2`, `opção 3` ou uma frase parecida com uma opção existente.
- Adicionado modal de opções numeradas com botões neon.
- Adicionado modal de dado: o botão abre o desafio, e a criança toca no dado grande para rolar.
- Adicionado modal de desafio físico com instrução e botão grande `Pronto`.
- Ajustado o runtime para não misturar dado e desafio físico na mesma cena; se uma cena antiga tiver ambos, o movimento é removido ao preparar a aventura.
- Ajustada fila de narração com `narrationRunId` para reduzir risco de duas vozes simultâneas.
- Adicionada transição visual curta ao avançar capítulo.
- Service worker atualizado para `rpg-kids-v2026-07-15-closed-choice-flow-pwa`.

## Validação

- `npm run check` passou.
- `node --check prototype/app.js`, `node --check prototype/adventures.js` e `node --check public/sw.js` passaram.
- Busca confirmou ausência de `Livre escolha`, `freeAction`, `Falar ação` e `Usar ação escrita` em `public/` e `prototype/`.
- Servidor local rodou em `http://127.0.0.1:3107`.
- `/` respondeu HTTP 200 e `/health` respondeu `{"ok":true,"app":"rpg-kids"}`.
- Chrome headless renderizou a página inicial e screenshot mobile do modal de perfil.
- Simulação lógica da primeira aventura (`O Portal das Estrelinhas`) completou 5 cenas sem travar.
- Simulação lógica da última aventura (`A Cidade dos Sinos Claros`) percorreu 17 passos de hub/quests e chegou à torre com 5 Notas de Sino.

## Riscos e próximos pontos

- O teste de clique real em navegador ainda não foi automatizado porque Playwright não está instalado no projeto.
- Algumas cenas fonte ainda declaram `movement` junto com `dice`, mas o runtime remove o movimento ao preparar a aventura; depois podemos limpar os dados na origem.
- Próximo passo recomendado: instalar/adicionar teste E2E leve para clicar primeira e última história, rolar dado e concluir desafio físico em Chrome headless.
