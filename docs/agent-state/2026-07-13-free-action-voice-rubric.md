# Agent State - Free Action + Voice Rubric

Data: 2026-07-13
Projeto: RPG Kids
Sessao: The Creator / Codex

## Pedido do usuario

O usuario pediu para continuar apos a etapa de progresso/recompensa por resultado do dado.

## Decisao

O proximo passo natural era permitir que a escolha livre da crianca importasse no jogo, sem depender ainda de IA real. A solucao implementada foi uma rubrica local e auditavel.

## Alteracoes feitas

- `prototype/index.html`
  - Adicionada area `Escolha livre` com campo de texto, botao `Falar`, botao `Enviar acao` e feedback de criterio.

- `prototype/app.js`
  - Adicionado `actionProgressScenes` para limitar progresso livre a 1 ponto por cena.
  - Checkpoint passou a salvar/restaurar `actionProgressScenes`.
  - Opcoes prontas agora passam por `handlePlayerAction`.
  - Opcao `Livre escolha` foca o campo de acao livre.
  - `evaluateAction` classifica a intencao em gentileza, pensamento esperto, movimento, palavras novas, criatividade ou coragem.
  - `captureVoiceAction` usa Web Speech API quando disponivel e fallback de exemplo quando nao houver suporte.

- `prototype/styles.css`
  - Adicionados estilos para o painel de escolha livre.

- `content/templates/adventure-template-v0.json`
  - Adicionado `actionEvaluation`.

- `docs/STORY_PROTOCOL_V0.md`
  - Adicionada secao `Acao livre e voz`.

## Validacao

- `node --check prototype/app.js`
- `node --check prototype/adventures.js`
- `node -e "JSON.parse(require('fs').readFileSync('content/templates/adventure-template-v0.json','utf8')); console.log('template json ok')"`
- Busca confirmou `Acao livre e voz`, `actionEvaluation`, `local_rubric_then_ai`, `free-action-panel`, `captureVoiceAction`, `actionProgressScenes` e mensagens de criterio.

## Limite conhecido

O reconhecimento de voz precisa ser testado no navegador/celular. O fallback de voz existe para permitir testar o fluxo mesmo quando Web Speech API nao estiver disponivel.
