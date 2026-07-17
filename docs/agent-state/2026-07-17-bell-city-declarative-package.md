# 2026-07-17 - Bell City Declarative Package

## Escopo

Issue #8: migrar `A Cidade dos Sinos Claros` para pacote declarativo.

## Feito

- Gerado `content/adventures/cidade-dos-sinos-claros.json` a partir da aventura runtime atual.
- O JSON recebeu `schema: rpg-kids.playable-adventure.v1` e `packageMode: declarative`.
- Criado `scripts/check-declarative-adventures.js`.
- `npm run check` passa a validar equivalencia estrutural entre o JSON declarativo e `public/adventures.js`.
- README e estado vivo atualizados.

## Decisao

Esta etapa cria a fonte declarativa e trava equivalencia com o runtime atual. A engine ainda consome `public/adventures.js` ate os PRs de manifest/pacote serem consolidados.

## Validacao

- Pendente nesta branch: rodar `npm run check`.

## Proximo Passo

Quando os PRs anteriores forem mesclados, apontar `adventures.manifest.json` para o pacote declarativo da Cidade dos Sinos e remover duplicacao com `adventures.js`.
