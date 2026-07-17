# 2026-07-17 - Bell city narrative audit

## Escopo

Repassar `A Cidade dos Sinos Claros` procurando furos de coerencia, caminhos sem sentido e pontos de gamificacao fracos, usando o motor de `challenge template` quando o encontro deveria ser resolvido por mini-jogo em vez de dado.

## Problemas encontrados

- Cenas com `challenge` ainda podiam abrir dado depois do desafio, repetindo o problema ja corrigido no `visualChallenge`.
- A historia falava em cinco espacos de Notas de Sino, mas varias rotas entregavam Notas duplicadas.
- O desafio final de memoria mostrava a sequencia completa na tela, reduzindo a ideia de memoria/eco.
- Jardim, Oficina, Bosque e Torre tinham a proposta certa para mini-jogo, mas parte da resolucao ainda estava presa em textos de dado.

## O que foi feito

- `challenge` e `visualChallenge` passaram a contar como mecanismo principal de resolucao da cena.
- `completeTemplateChallenge()` agora aplica progresso/recompensa e libera a seta, sem abrir dado em seguida.
- A leitura completa dos pais passou a listar os desafios de template da cena.
- `memory_echo` passou a usar slots com `?`, preenchidos conforme a crianca acerta.
- Opcoes de memoria e contagem passaram a embaralhar de forma estavel.
- Praca do Relogio explica os cinco espacos coloridos e separa Notas de Sino de itens auxiliares.
- Biblioteca ficou como desafio de palavra `shu` e acorda a Nota Verde.
- Jardim virou desafio de contar 5 flores calmas e acorda a Nota Prateada.
- Oficina virou desafio de memoria/ritmo `toc, pausa, plim` e entrega o Martelo Macio.
- Bosque/Bento virou desafio de contar 3 cartas e entrega o Selo de Carteiro, sem Nota duplicada.
- Torre final virou desafio de memoria dos potinhos, sem dado final.

## Validacao

- `node --check public/app.js`
- `node --check public/adventures.js`
- `npm run check`
- `cmp` entre `public/` e `prototype/` nos arquivos sincronizados.
- Chrome headless carregou `http://127.0.0.1:3133/` sem quebrar o DOM inicial.

## Resultado

Campanha com fluxo mais consistente: cada cena usa um unico mecanismo principal, as cinco Notas de Sino voltam a fazer sentido como objetivo central, e os mini-jogos ficam mais ligados ao pedido do narrador.

## Pendencias

- Gerar WAVs Gemini para os novos `challenge` e `challenge-success`.
- Testar no celular os mini-jogos de Jardim, Oficina, Bosque e Torre.
- Decidir se rotas auxiliares devem ficar visualmente marcadas no mapa como `item` vs `Nota`.
