# Checkpoint - Retomada de campanha com hub

Data: 2026-07-15
Agente/sessao: The Creator / Codex

## Objetivo

Melhorar o resumo de retomada para campanhas longas, especialmente `A Cidade dos Sinos Claros`.

## Feito

- `buildResumeSummary()` agora adiciona detalhes de campanha quando a aventura tem uma cena `hub`.
- O resumo informa quantidade de `Notas de Sino`.
- O resumo informa ultimas quests/cenas concluidas.
- O resumo informa ate tres caminhos abertos no hub.
- Criados helpers `buildHubCampaignResume()` e `routeAvailableForSnapshot()` para calcular isso a partir do checkpoint ou do estado atual.
- Cache PWA atualizado para `rpg-kids-v2026-07-15-campaign-resume-pwa`.

## Validacao

- `npm run sync:public`
- `npm run check`

## Proximo passo recomendado

Criar um painel visual simples de hub, mostrando destinos disponiveis, destinos concluidos e requisito da torre.
