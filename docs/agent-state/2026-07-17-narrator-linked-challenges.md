# 2026-07-17 - Narrator Linked Challenges

## Escopo

Adicionar desafios relacionados ao pedido do narrador, usando templates reutilizaveis em vez de criar um jogo novo por historia.

## Feito

- Criado modal generico `templateChallengeModal`.
- Adicionado runtime inicial para:
  - `language_repeat`;
  - `counting_sort`;
  - `memory_echo`.
- A biblioteca continua com `visualChallenge` legado para sequencia visual.
- O fluxo `escolha -> desafio -> dado` agora reconhece `scene.challenge`.
- Cidade dos Sinos recebeu:
  - desafio de palavra `shu` na Biblioteca dos Guarda-Chuvas;
  - desafio de contar 3 cartas no Bosque do Bento;
  - desafio de memoria `plim, tac, vento` no Grande Silencio Macio.
- Scripts de audio passam a gerar `challenge` e `challenge-success` para esses desafios.

## Validacao

- Pendente nesta branch: rodar `npm run check` e comparar `public/` com `prototype/`.

## Proximo Passo

Testar no celular se os modais sao claros para crianca de 4 anos e, se aprovados, gerar WAVs Gemini para os novos textos de desafio.
