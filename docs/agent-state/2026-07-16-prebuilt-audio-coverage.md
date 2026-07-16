# 2026-07-16 - Prebuilt Audio Coverage

## Objetivo

Garantir que as falas do jogo usem áudios pré-gerados, evitando fallback para voz do navegador.

## Feito

- Expandido `scripts/generate-audio.js` para gerar:
  - narração de cena;
  - resultados de dado;
  - desafio físico, pergunta de conclusão e fallback;
  - celebração de fim de aventura;
  - falas ociosas de UI;
  - prompt `Jogue um dado`.
- Gerados novos WAVs com Gemini para aventuras menores, desafios, celebrações e UI parcial.
- Segunda tentativa gerou todos os áudios principais que faltavam para cenas, dados, desafios físicos e celebrações.
- Tentativas finais com `TTS_MODEL=gemini-2.5-flash-preview-tts` completaram os últimos áudios ociosos de UI.
- Bloqueado fallback para `speechSynthesis` em narração `premium`.
- Feedbacks dinâmicos de tela não falam mais por padrão.
- Criado `scripts/check-audio-coverage.js`.
- Adicionado `npm run generate:audio:missing` para retomar apenas pendências.

## Validação

- `node --check public/app.js`: passou.
- `node --check prototype/app.js`: passou.
- `node --check scripts/generate-audio.js`: passou.
- `node --check scripts/check-audio-coverage.js`: passou.
- `cmp -s public/app.js prototype/app.js`: passou.
- `cmp -s public/sw.js prototype/sw.js`: passou.
- `cmp -s public/assets/audio/manifest.json prototype/assets/audio/manifest.json`: passou.
- `node scripts/check-audio-coverage.js`: passou com `Missing audio keys: 0`.
- `npm run check`: passou.

## Cobertura Atual

- Chaves esperadas: 221.
- Entradas no manifesto: 221.
- Faltantes: 0.

## Bloqueio

Resolvido. A cobertura local está completa.

## Próximo Passo

Para verificar novamente, rodar:

```bash
npm run check
```

O critério de pronto é `Missing audio keys: 0`.
