# Checkpoint - Sons sinteticos da campanha dos sinos

Data: 2026-07-15
Agente/sessao: The Creator / Codex

## Objetivo

Dar mais personalidade sonora para `A Cidade dos Sinos Claros` sem depender de arquivos de audio externos.

## Feito

- `bell_wave` agora usa padrao de sino antes de cair nos sons de onda/mar.
- Adicionados padroes para:
  - `workshop` / `hammer` / `tap`;
  - `bridge`;
  - `wind_soft`.
- Cache PWA atualizado para `rpg-kids-v2026-07-15-bell-city-sound-pwa`.

## Validacao

- `npm run sync:public`
- `npm run check`

## Observacao

Sons ainda sao sintéticos via Web Audio. Arquivos reais de efeito sonoro podem entrar depois por cena, mantendo estes como fallback.
