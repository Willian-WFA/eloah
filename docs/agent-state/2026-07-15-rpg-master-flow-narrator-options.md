# Agent State - 2026-07-15 - RPG Master Flow and Narrator Options

## Pedido do usuário

Melhorar o fluxo para parecer mais mestre de RPG, fazer o narrador falar as opções para a criança, melhorar voz do narrador e depois focar em conteúdo/aprendizado.

## O que foi alterado

- A cena agora é narrada com opções faladas:
  - `Opção 1`
  - `Opção 2`
  - `Opção 3`
  - escolha livre
- O dado fica bloqueado até a criança escolher uma opção ou declarar uma ação livre.
- O botão de avançar fica bloqueado até a rodada estar resolvida.
- `renderSceneControls()` passou a mostrar a etapa atual da rodada em `roundHint`.
- Botões de escolha ganharam numeração visual.
- Feedback do mestre ficou mais narrativo:
  - ação escolhida/falada;
  - critério da escolha;
  - pedido de dado quando a cena exige sorte;
  - liberação para avançar quando a cena não exige dado.
- `speakNarration()` passou a usar fila de frases curtas com pausa, reduzindo fala embolada do `speechSynthesis`.
- `preferredNarrationVoice()` prioriza vozes pt-BR mais prováveis de soar naturais quando disponíveis.
- Vozes do navegador são carregadas também via `onvoiceschanged`.

## Arquivos alterados

- `prototype/index.html`
- `prototype/app.js`
- `prototype/styles.css`
- `public/index.html`
- `public/app.js`
- `public/styles.css`
- `docs/CURRENT_STATE.md`

## Validação executada

- `npm run sync:public`
- `npm run check`
- Busca por `composeSceneNarration`, `roundHint`, `narrationQueue`, `Escolha uma ação` e `Opção`.

## Próximo passo recomendado

Testar no celular com voz ligada:

- se a fala das opções fica clara para uma criança de 4 anos;
- se o bloqueio do dado antes da ação parece natural;
- se o ritmo `Bem calmo` é melhor como padrão;
- se o texto do mestre precisa ficar mais curto por cena.
