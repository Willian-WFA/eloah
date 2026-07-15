# 2026-07-15 - API TTS voice

## Pedido

Melhorar a voz agora com API, deixando clonagem de voz para depois.

## Implementado

- Criado `POST /api/tts` no `server.js`.
- Provider inicial: OpenAI TTS.
- Variaveis novas:
  - `OPENAI_API_KEY`
  - `TTS_PROVIDER=openai`
  - `TTS_MODEL=gpt-4o-mini-tts`
  - `TTS_VOICE=nova`
  - `OPENAI_TTS_URL=https://api.openai.com/v1/audio/speech`
- O backend envia instrucoes de tom por estilo do mestre:
  - teatral;
  - calmo;
  - epico leve;
  - professor gentil.
- O frontend tenta tocar audio da API primeiro.
- Se `/api/tts` falhar, nao tiver chave ou for bloqueado, o jogo volta automaticamente para `speechSynthesis`.
- `Pausar voz`, `Ouvir de novo`, interrupcao ao voltar e fila de narracao continuam funcionando.
- Cache PWA atualizado para `rpg-kids-v2026-07-15-api-tts-pwa`.

## Validacao

- `npm run check` deve ser executado apos esta alteracao.
- Teste local sem `OPENAI_API_KEY` deve retornar fallback para voz do navegador.
- Teste em producao requer configurar `OPENAI_API_KEY` na Hostinger e reiniciar/redeployar o app.

## Proximo passo

Configurar `OPENAI_API_KEY` na Hostinger, redeployar e testar no celular. Depois calibrar `TTS_VOICE`, ritmo e instrucoes de estilo.
