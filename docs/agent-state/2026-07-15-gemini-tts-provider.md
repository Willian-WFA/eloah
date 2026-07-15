# 2026-07-15 - Gemini TTS provider

## Pedido

Usuario obteve uma key do Gemini e quer usar essa key para a voz do narrador.

## Implementado

- `/api/tts` passou a aceitar `TTS_PROVIDER=gemini`.
- Variaveis adicionadas/documentadas:
  - `GEMINI_API_KEY`
  - `TTS_PROVIDER=gemini`
  - `TTS_MODEL=gemini-3.1-flash-tts-preview`
  - `TTS_VOICE=Puck`
  - `GEMINI_TTS_URL=https://generativelanguage.googleapis.com/v1beta/interactions`
- O backend chama Gemini TTS via REST e procura o audio base64 na resposta.
- O audio PCM retornado pelo Gemini e encapsulado em WAV (`audio/wav`) antes de ir ao navegador.
- O perfil `theatrical` foi ajustado para imitar a direcao de performance "The Master Storyteller", mas com instrucao obrigatoria de portugues do Brasil e proibicao de falar em ingles.
- Apos teste real, o Gemini TTS ficou bom em qualidade mas lento. O frontend passou a usar voz local para cenas/opcoes longas e Gemini apenas para falas premium, como resultado do dado e fala importante do mestre.
- Timeout de TTS no frontend foi aumentado para 18s; falha gera cooldown curto de 8s em vez de desativar a API ate recarregar.
- Evolucao seguinte: audio previsivel agora pode ser pre-gerado com `npm run generate:audio`. O app consulta `assets/audio/manifest.json` e toca WAV salvo antes de tentar Gemini ao vivo.
- Suporte OpenAI TTS foi mantido como opcao futura (`TTS_PROVIDER=openai`).
- O fallback do frontend permanece: se `/api/tts` falhar, volta para `speechSynthesis`.

## Fontes

- Documentacao oficial Gemini Speech generation: `https://ai.google.dev/gemini-api/docs/speech-generation`

## Proximo passo

Configurar na Hostinger:

```text
GEMINI_API_KEY=<sua-chave-gemini>
TTS_PROVIDER=gemini
TTS_MODEL=gemini-3.1-flash-tts-preview
TTS_VOICE=Puck
```

Depois reiniciar/redeployar e testar `/api/tts`.
