# 2026-07-16 - Bell City Regenerated Audio

## Contexto

O usuário comprou créditos/tokens e pediu para gerar os áudios que ainda faltavam. No estado anterior, três cenas da campanha `A Cidade dos Sinos Claros` estavam sem uso de áudio pregerado porque os WAVs antigos continham frases de escolha livre:

- `sinos_pipoca_jardim`
- `sinos_bento_bosque`
- `sinos_torre_final`

## Alterações

- `scripts/generate-audio.js` ganhou filtro `--scene=...`, aceitando uma lista separada por vírgula.
- Tentativa inicial com o modelo padrão `gemini-3.1-flash-tts-preview` retornou quota `429`.
- Os três WAVs foram regenerados com `TTS_MODEL=gemini-2.5-flash-preview-tts`.
- Arquivos atualizados em `public/assets/audio/cidade-dos-sinos-claros/` e `prototype/assets/audio/cidade-dos-sinos-claros/`.
- `scenePrebuiltAudioKey()` voltou a liberar os três IDs, completando o uso de áudio pregerado nas cenas não-hub da campanha.
- Service worker atualizado para `rpg-kids-v2026-07-16-bell-city-regenerated-audio-pwa`.

## Validação

- `npm run check`
- `node --check scripts/generate-audio.js`
- `cmp` entre `public/app.js` e `prototype/app.js`
- `cmp` entre `public/sw.js` e `prototype/sw.js`
- `cmp` entre manifestos e WAVs regenerados de `public/` e `prototype/`

## Observações

- O manifesto de áudio manteve as mesmas URLs; o cache PWA foi versionado para forçar atualização dos clientes.
- Ainda pode ser útil gerar um áudio especial pregerado para o encerramento/parabéns final.
