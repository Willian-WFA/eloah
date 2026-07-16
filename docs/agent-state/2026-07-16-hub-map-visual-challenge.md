# 2026-07-16 - Hub Map and Visual Challenge QA

## Objetivo

Corrigir falhas vistas no celular ao chegar à Praça do Relógio e adicionar um primeiro desafio visual reutilizável.

## Feito

- Corrigida a chave de áudio da primeira chegada à Praça do Relógio.
- Retorno à Praça usa áudio curto `hub-return`.
- Seleção no mapa pode tocar fala teatral por rota quando o WAV existir.
- Página volta ao topo ao renderizar nova cena.
- Adicionado `visualChallenge` na cena `Tico e a Ordem dos Biscoitos`.
- Criado modal visual de sequência com slots `?` e objetos tocáveis.
- Adicionados jobs de áudio para `hub-return`, seleção de rota e desafio visual.
- `check-audio-coverage` passou a separar áudios obrigatórios e complementares.

## Validação

- `node --check public/app.js`: passou.
- `node --check prototype/app.js`: passou.
- `node --check public/adventures.js`: passou.
- `npm run check`: passou.
- Chrome headless carregou a tela inicial e gerou captura em `/tmp/rpg-kids-hub-visual-challenge.png`.

## Áudio

- Chaves totais: 232.
- Obrigatórias: 223.
- Complementares: 9.
- Manifesto: 227.
- Obrigatórias faltantes: 0.
- Complementares faltantes: 5.

Complementares pendentes por quota Gemini:

- `cidade-dos-sinos-claros/sinos_praca_relogio/route-sinos_bolim_oficina`
- `cidade-dos-sinos-claros/sinos_praca_relogio/route-sinos_bento_bosque`
- `cidade-dos-sinos-claros/sinos_praca_relogio/route-sinos_iara_vento`
- `cidade-dos-sinos-claros/sinos_praca_relogio/route-sinos_torre_final`
- `cidade-dos-sinos-claros/sinos_tico_biscoitos/visual-success`

## Próximo Passo

Publicar e testar no celular. Quando a quota Gemini liberar, rodar:

```bash
node scripts/generate-audio.js --missing-only --continue-on-error --delay-ms=30000
npm run check
```
