# Checkpoint - Motor de hub para campanha dos sinos

Data: 2026-07-15
Agente/sessao: The Creator / Codex

## Objetivo

Evoluir `A Cidade dos Sinos Claros` de campanha linear para uma primeira versao com hub jogavel, preservando compatibilidade com aventuras curtas.

## Feito

- Adicionado suporte generico a `scene.hub.routes` no motor.
- Rotas podem exigir progresso, recompensas ou cenas completas.
- Rotas podem sumir quando a quest alvo ja foi completada.
- `nextScene()` agora resolve proxima cena por rota de hub, `choiceRoutes` ou `scene.next`.
- Fala livre no hub pode bater com sinais da rota, como `biblioteca`, `ponte`, `vento` ou `torre`.
- A leitura completa dos pais mostra escolhas de hub.
- A Praca do Relogio Parado virou hub real da campanha.
- Quests iniciais: padaria, biblioteca e jardim.
- Com 2 Notas de Sino: ponte e oficina.
- Com 3 Notas de Sino: bosque e colina.
- Com 5 Notas de Sino: torre final.
- Todas as quests principais voltam para a praca.
- Resultado baixo pode conceder recompensas `nota_*`, mantendo a linha central avancando.
- Cache PWA atualizado para `rpg-kids-v2026-07-15-bell-city-hub-pwa`.

## Validacao

- `npm run sync:public`
- `npm run check`
- Teste estrutural via Node confirmou:
  - 10 cenas na campanha;
  - hub `sinos_praca_relogio`;
  - 8 rotas de hub;
  - nenhuma rota quebrada;
  - quests retornando ao hub.

## Proximo passo recomendado

Testar no navegador/celular se a crianca entende voltar para a praca e escolher o proximo caminho. Depois melhorar a interface visual do hub com um pequeno mapa/lista de destinos desbloqueados.
