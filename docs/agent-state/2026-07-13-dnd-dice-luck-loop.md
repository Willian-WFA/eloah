# Agent State: D&D dice and luck loop

Data: 2026-07-13
Agente: The Creator / Codex

## Contexto

O usuario pediu que o RPG Kids siga um estilo mais proximo de D&D infantil: mestre narra uma situacao, pergunta o que o jogador faz, apresenta opcoes e livre escolha, pede dado quando houver uma acao de risco/sorte e usa o resultado para narrar consequencias.

## Decisoes

- D6 passa a usar faixas 1-3, 4 e 5-6.
- 1-3 cria complicacao narrativa leve, segura e temporaria.
- 4 cria sucesso condicionado, normalmente resolvido por desafio fisico simples.
- 5-6 cria sucesso forte, cena especial ou recompensa melhor.
- Cada cena de dado permite uma rolagem comum.
- Ponto de sorte permite vantagem: rolar 2 dados e ficar com o melhor.
- Consequencias devem vir do contrato da cena em `diceOutcomes`.

## Arquivos alterados

- `prototype/index.html`
- `prototype/styles.css`
- `prototype/app.js`
- `prototype/adventures.js`
- `docs/MASTER_SPEC.md`
- `docs/ROADMAP.md`
- `docs/CURRENT_STATE.md`
- `docs/STORY_PROTOCOL_V0.md`

## Validacao

- `node --check prototype/app.js`
- `node --check prototype/adventures.js`
- Pendente: teste visual/manual no navegador ou celular.

## Proximo passo

Executar validacao sintatica e testar o prototipo no navegador, especialmente:

- escolher uma acao;
- usar ponto de sorte;
- rolar dado;
- confirmar que o resultado 4 bloqueia o avanco ate concluir/pular desafio;
- confirmar que o dado nao pode ser rolado infinitamente.
