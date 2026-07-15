# Agent State - Browser Narrator Voice

Data: 2026-07-13
Projeto: RPG Kids
Sessao: The Creator / Codex

## Pedido do usuario

O usuario pediu para implementar em sequencia:

1. TTS local/mock do navegador.
2. Controles dos pais para voz do narrador.

## Decisao

Usar `speechSynthesis` do navegador antes de qualquer API externa de TTS. Isso permite testar texto, ritmo, pausas e engajamento sem custo e sem dependencias.

## Alteracoes feitas

- `prototype/index.html`
  - Painel dos pais ganhou `Voz do narrador` e `Ritmo da narração`.
  - Painel da criança ganhou `Ouvir de novo` e `Pausar voz`.

- `prototype/app.js`
  - Adicionado estado `narrationEnabled`, `narrationRate` e `lastNarration`.
  - Preferencias de narração persistem em `localStorage`.
  - Criadas funcoes `speakNarration`, `preferredNarrationVoice`, `repeatLastNarration` e `stopNarration`.
  - A narração lê cena + pergunta, feedbacks, resultado do dado e encerramentos.
  - O botão de voz para ação livre interrompe o narrador antes de ouvir.

- `prototype/styles.css`
  - Adicionado layout compacto para controles de narração.

- `content/templates/adventure-template-v0.json`
  - Adicionado bloco `narration`.

- `docs/STORY_PROTOCOL_V0.md`
  - Adicionada seção `Voz do narrador`.

## Validação

- `node --check prototype/app.js`
- `node --check prototype/adventures.js`
- `node -e "JSON.parse(require('fs').readFileSync('content/templates/adventure-template-v0.json','utf8')); console.log('template json ok')"`
- Busca confirmou `narrationToggle`, `narrationRate`, `repeatNarration`, `stopNarration`, `speakNarration`, `speechSynthesis`, `Voz do narrador`, `browser_speech_synthesis`, `Ouvir de novo` e `Pausar voz`.

## Limite conhecido

`speechSynthesis` depende do navegador/dispositivo. A qualidade e disponibilidade de vozes em pt-BR precisam ser testadas manualmente no celular.
