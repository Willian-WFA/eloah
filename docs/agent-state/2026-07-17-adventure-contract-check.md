# 2026-07-17 - Adventure Contract Check

## Escopo

Issue #7: validar pacotes/contratos de aventura no `npm run check`.

## Feito

- Criado `scripts/check-adventure-contracts.js`.
- `npm run check` agora valida estrutura das aventuras alem da cobertura de audio.
- O validador verifica ids unicos, campos obrigatorios, escolhas, imagens, transicoes, rotas de hub, dado e movimento.
- `docs/CURRENT_STATE.md` atualizado.

## Validacao

- Pendente nesta branch: rodar `npm run check`.

## Proximo Passo

Issue #8: migrar `A Cidade dos Sinos Claros` para pacote declarativo.
