# 2026-07-16 - Bell City Touch Map

## Contexto

Pedido: na chegada à Praça do Relógio, mostrar um modal com mapa da cidade e os 8 pontos da campanha, permitindo que a criança toque em uma região para investigar/interagir.

## Feito

- Adicionado botão `Abrir mapa da cidade` no painel de hub da Praça.
- Criado modal de mapa tocável para a Cidade dos Sinos.
- O mapa mostra 8 pontos:
  - Biscoitos
  - Biblioteca
  - Jardim
  - Ponte
  - Oficina
  - Bosque
  - Colina
  - Torre
- Cada ponto mostra símbolo, nome curto e estado:
  - `aberto`
  - `feito`
  - requisito de Notas de Sino
- Tocar em ponto aberto confirma a rota e libera a seta para avançar.
- Pontos bloqueados ou concluídos não avançam a história.
- `public/` e `prototype/` foram sincronizados.
- Cache PWA atualizado para `rpg-kids-v2026-07-16-bell-city-map-modal-pwa`.

## Validação

- `npm run check`
- `node --check prototype/app.js`
- `cmp -s public/index.html prototype/index.html`
- `cmp -s public/app.js prototype/app.js`
- `cmp -s public/styles.css prototype/styles.css`
- `cmp -s public/sw.js prototype/sw.js`
- Chrome headless/CDP com checkpoint direto na Praça:
  - modal abriu;
  - 8 pontos renderizados;
  - no início da campanha: 3 abertos, 5 bloqueados;
  - tocar em `Rua dos Biscoitos Redondos` fechou mapa e modal de opções, confirmou rota e liberou a seta;
  - sem erros JS.

## Pendências

- Testar no celular real se os 8 pontos ficam confortáveis para toque infantil.
- Ajustar tamanho/posição dos pontos após teste visual humano.
- No futuro, considerar imagem bitmap do mapa por baixo, mantendo os pontos HTML tocáveis por cima.
