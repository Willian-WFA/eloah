# 2026-07-16 - Bell City Hub Voice

## Contexto

Pedido: reduzir o tempo de narração ao chegar na Praça do Relógio Parado, porque o texto completo estava longo e sendo lido como frases soltas. Parte dos detalhes deveria entrar depois, se a criança ficasse sem responder.

## Feito

- Separado texto exibido de texto falado para cenas de hub.
- A Praça do Relógio mantém a descrição completa na tela, mas a voz inicial agora fala só o essencial: chegada, Relógio-Coração parado, fonte das Notas de Sino, mapa e opções.
- Removido o prefixo falado `esta é a cena`.
- Detalhes da fonte e das janelas em forma de sino viraram falas ociosas após espera sem escolha.
- `Ouvir de novo` agora repete a versão falada curta do hub.
- Cache PWA atualizado para `rpg-kids-v2026-07-16-bell-city-hub-voice-pwa`.

## Validação

- `npm run check`
- `cmp -s public/app.js prototype/app.js`
- `cmp -s public/sw.js prototype/sw.js`
- Chrome headless/CDP com checkpoint direto na Praça do Relógio:
  - fala inicial capturada com 314 caracteres, já incluindo as três opções;
  - modal de 3 opções abriu;
  - primeira fala ociosa entrou após espera sem escolha;
  - sem erros JS.

## Pendências

- Testar no celular real com áudio Gemini/navegador para medir se a pausa entre frases ficou natural.
- Avaliar se as falas ociosas devem usar WAV pregerado no futuro para manter a mesma voz bonita.
