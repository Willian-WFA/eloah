# 2026-07-16 - Bell City Flow Audio Fixes

## Contexto

Feedback do teste na campanha `A Cidade dos Sinos Claros`:

- Na primeira chegada à praça redonda, a cena precisava narrar o texto completo e abrir o modal de opções.
- A praça pode ter vários caminhos, mas o mestre deve falar no máximo 3 opções por vez.
- Gerar áudio Gemini para `Jogue um dado.`
- Botão do diário estava cobrindo o título do card da heroína.
- A Biblioteca dos Guarda-Chuvas recebeu áudio extra no fundo no início.
- Após resultado do dado, clicar fora/na seta podia travar a tela.

## Alterações

- `renderScene()` agora calcula a narração exibida antes de registrar a cena no diário e passa o texto para `composeSceneNarration()`, evitando que a primeira visita ao hub seja tratada como retorno.
- `hubRemainingRouteText()` passou a distinguir caminhos restantes totais de opções visíveis; a fala indica que há vários caminhos no mapa, mas só até 3 são apresentados por vez.
- O mapa visual da praça bloqueia toques enquanto a narração ainda está tocando.
- `handlePlayerAction()` interrompe narração pendente ao confirmar uma opção, reduzindo áudio antigo ao entrar na próxima cena.
- Gerado `public/assets/audio/ui/jogue-um-dado/prompt.wav` e equivalente em `prototype/`.
- `openDiceModal()` fala `Jogue um dado.` usando o áudio pregerado de UI.
- `scripts/generate-audio.js` ganhou modo customizado com `--key=... --text=...`.
- `renderSceneControls()` e `nextScene()` bloqueiam avanço enquanto o modal/animação do dado está ativo.
- `showDiceResult()` usa timer rastreado (`diceAnimationTimer`) e invalida callbacks antigos quando a cena muda.
- Botão do diário foi reposicionado para o canto superior direito do card da heroína.
- Service worker atualizado para `rpg-kids-v2026-07-16-bell-city-flow-audio-fixes-pwa`.

## Validação

- `npm run check`
- `node --check scripts/generate-audio.js`
- `cmp` entre `public/` e `prototype/` para app, CSS, service worker e manifesto de áudio.
- Confirmação de `ui/jogue-um-dado/prompt.wav` em `public/` e `prototype/`.
- Chrome headless carregou `http://127.0.0.1:3000/`.

## Próximos pontos

- Testar no celular real o pós-dado: rolar, tocar fora, tentar avançar e confirmar que não trava.
- Testar a entrada da Biblioteca dos Guarda-Chuvas depois de selecionar rota na praça para confirmar que não há áudio antigo em fundo.
