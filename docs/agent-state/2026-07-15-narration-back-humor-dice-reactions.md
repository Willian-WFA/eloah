# Checkpoint - Narração, humor restrito e reações do dado

Data: 2026-07-15
Agente/sessao: The Creator / Codex

## Pedido

Corrigir narração que continuava ao voltar para o painel dos pais, explicar `humor restrito`, remover a abertura `Mestre narrando`, evitar repetir `Livre escolha` na fala das opções e adicionar comentário teatral para cada resultado do dado.

## Feito

- `goLibrary()` agora chama `stopNarration()` antes de renderizar o painel dos pais.
- A narração de cena deixou de usar textos de abertura dos perfis de mestre.
- Os perfis de mestre tiveram o campo `intro` removido para evitar reaproveitamento acidental de `Mestre narrando`.
- `composeSceneNarration()` filtra escolhas com `livre` ao montar a lista falada de opções.
- `diceResultReaction()` adiciona uma reação específica para resultados 1, 2, 3, 4, 5 e 6.
- `showDiceResult()` fala e exibe a reação antes da consequência da cena.
- O painel dos pais ganhou botão `?` com balão explicando `humor restrito`.
- O cache do service worker foi atualizado para `rpg-kids-v2026-07-15-dice-humor-help-pwa`.
- Arquivos do protótipo foram sincronizados para `public/`.

## Validação

- `npm run sync:public`
- `npm run check`
- `node --check public/sw.js`
- Busca local confirmou que `Mestre narrando` e `intro:` não permanecem em `prototype/app.js` ou `public/app.js`.

## Observação

O projeto `RPG Kids` ainda não está em um repositório git nessa pasta, então não houve comparação por `git status`.
