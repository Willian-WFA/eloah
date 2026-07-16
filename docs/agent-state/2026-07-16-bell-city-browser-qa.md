# 2026-07-16 - Bell City Browser QA

## Contexto

Pedido: abrir a campanha `A Cidade dos Sinos Claros` no navegador, testar o fluxo e procurar erros, melhorias, efeitos, interações e falas.

## Teste executado

- Chrome headless com DevTools Protocol em viewport mobile `390x844`.
- Fluxo percorrido: perfil inicial, painel dos pais, abrir campanha, Portão Baixinho, escolha, dado, clique fora/avanço durante dado, Praça do Relógio Parado, escolha da Biblioteca, início da Biblioteca.
- Capturas geradas em `/tmp/`: `rpg-kids-portao.png`, `rpg-kids-after-dice.png`, `rpg-kids-first-square.png`, `rpg-kids-library.png`, `rpg-kids-library-dice-prompt.png`.

## Achados

- A primeira chegada à praça exibiu o texto completo e mostrou `3/8 caminhos`, como esperado.
- A escolha de rota na praça não abriu dado, como esperado.
- O modal do dado bloqueou avanço enquanto o resultado ainda estava ativo, evitando avanço indevido.
- O fluxo da Biblioteca revelou um bug de texto: a cena começava com `Depois da padaria`, mesmo quando era a primeira rota escolhida.
- A Ponte da Nara tinha outra suposição rígida: `Quando três notas brilham`, apesar de abrir com 2 Notas de Sino.
- O modal de opções com revelação escalonada é bonito, mas pode induzir toque cedo na opção 1 antes das opções 2 e 3 aparecerem.
- O resultado do dado pode parecer travado enquanto a narração longa termina; seria melhor mostrar um estado visual do tipo `Escutando o resultado`.

## Correções feitas

- Biblioteca agora usa entrada neutra: `Luma leva você por uma rua silenciosa...`
- Ponte agora usa entrada neutra por progresso: `Quando novas Notas de Sino brilham...`
- Regenerados os WAVs de cena para `sinos_vira_pagina` e `sinos_ponte_nara`.
- Cache PWA atualizado para `rpg-kids-v2026-07-16-bell-city-route-narration-pwa`.

## Melhorias sugeridas

- Adicionar falas ociosas curtas quando a criança fica parada no modal: uma aos 8s e outra aos 18s, no máximo duas por cena.
- Adicionar ambiências leves por cena: sinos baixinhos na praça, página/guarda-chuva na biblioteca, vento suave na colina.
- Mostrar opções sincronizadas com a fala do narrador, ou bloquear clique até as três opções estarem visíveis.
- No dado, mostrar `Escutando o resultado...` ou uma barrinha de voz enquanto a seta ainda não pode aparecer.
- Nas recompensas, fazer as Notas de Sino voarem visualmente para a fonte/mapa.
