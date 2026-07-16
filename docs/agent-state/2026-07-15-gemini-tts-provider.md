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
- Primeiro lote local gerou 4 WAVs para `portal-das-estrelinhas` antes de a Gemini retornar `429 quota exceeded`; os arquivos foram mantidos e o manifest foi sincronizado.
- `scripts/generate-audio.js` agora grava manifest incremental, pula WAVs existentes, faz backoff em 429 e pode continuar com `--continue-on-error`.
- Retomada com `--delay-ms=12000 --continue-on-error` completou `portal-das-estrelinhas`: 23 WAVs previsiveis, incluindo narracao das 5 cenas e resultados de dado.
- Geradas 5 imagens bitmap para `portal-das-estrelinhas`: `forest_gate_soft`, `crystal_bridge_soft`, `tiny_bell_town`, `sleepy_star_portal` e `star_party_soft`; as cenas agora apontam para `.webp`.
- Campanha grande `cidade-dos-sinos-claros` completada com `--delay-ms=15000 --continue-on-error`: 64 WAVs previsiveis e 10 imagens bitmap novas ligadas as cenas.
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
