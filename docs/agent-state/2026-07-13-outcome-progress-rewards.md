# Agent State - Outcome Progress + Rewards

Data: 2026-07-13
Projeto: RPG Kids
Sessao: The Creator / Codex

## Pedido do usuario

O usuario pediu para continuar depois da etapa de sons, efeitos, imagens/cenas e template.

## Decisao

A proxima melhoria estrutural deveria corrigir uma limitacao importante: progresso e recompensas estavam ligados principalmente a cena. Para historias mais coerentes, o resultado do dado tambem precisa poder definir aprendizado e item.

## Alteracoes feitas

- `prototype/app.js`
  - Adicionado `pendingOutcomeByScene` para guardar progresso/recompensa quando o resultado 4 exige desafio antes de aplicar.
  - `applySceneProgress` agora aceita `progressDelta` e `rewardId` vindos do resultado do dado.
  - `rollDice` passa progresso/recompensa de `diceOutcomes.low`, `middle` e `high`.
  - `renderOutcomeReview` mostra progresso e recompensa por faixa do dado na leitura completa.
  - O painel dos pais mostra o `assetPack`.

- `prototype/adventures.js`
  - Cenas com dado agora declaram `progressDelta` e `reward` por resultado.
  - Resultado baixo concede progresso leve e sem item.
  - Resultado medio concede progresso apos desafio.
  - Resultado alto concede progresso completo e item quando fizer sentido.

- `content/templates/adventure-template-v0.json`
  - Template atualizado para incluir progresso/recompensa por faixa do dado.

- `docs/STORY_PROTOCOL_V0.md`
  - Regra adicionada: `dice_check.outcomes.*.progress_delta` e `reward` podem sobrescrever o progresso/recompensa geral da cena.

## Validacao

- `node --check prototype/app.js`
- `node --check prototype/adventures.js`
- `node -e "JSON.parse(require('fs').readFileSync('content/templates/adventure-template-v0.json','utf8')); console.log('template json ok')"`
- Busca confirmou `pendingOutcomeByScene`, `renderOutcomeReview`, `Pacote`, regra de sobrescrita por resultado e `assetPack`.

## Proximo passo recomendado

Testar visualmente no navegador/celular. Depois, evoluir escolha livre/voz para tambem influenciar progresso, usando criterios seguros e auditaveis.
