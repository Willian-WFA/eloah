# 2026-07-16 - Bell City Map Flow Voice

## Contexto

Problemas relatados na Praça do Relógio:

- a primeira fala estava sendo lida frase por frase, com pausas longas;
- após escolher rota, opções caíam na voz do navegador em vez da voz Gemini;
- o modal de mapa não aparecia;
- o modal de desafio/dado não aparecia no fluxo esperado.

## Feito

- A fila de narração agora agrupa frases curtas em blocos maiores.
- Textos premium com `Opção` voltaram a ser elegíveis para Gemini TTS.
- A Praça do Relógio abre o mapa automaticamente após o narrador terminar a fala inicial.
- Tocar em rota aberta no mapa leva direto para a cena escolhida, sem exigir seta intermediária.
- O mapa aceita qualquer rota aberta pelo progresso, mesmo que ela não esteja entre as 3 opções narradas.
- O cache PWA foi atualizado para `rpg-kids-v2026-07-16-bell-city-map-flow-voice-pwa`.

## Validação

- `npm run check`
- `node --check prototype/app.js`
- `cmp -s public/app.js prototype/app.js`
- `cmp -s public/sw.js prototype/sw.js`
- Chrome headless/CDP:
  - a fala inicial da Praça ficou em um único bloco;
  - `shouldUseApiTts("Opção...", "premium")` retornou `true`;
  - mapa abriu automaticamente;
  - mapa exibiu 8 pontos e 3 rotas abertas no início;
  - tocar em `Rua dos Biscoitos Redondos` abriu a cena `Tico e a Ordem dos Biscoitos`;
  - após escolher uma opção da cena, o modal do dado abriu;
  - sem erros JS.

## Pendências

- Testar no celular real com Gemini TTS ativo para confirmar latência e ausência de fallback para voz do navegador.
- Validar se abrir o mapa automaticamente é melhor do que abrir um botão grande em alguns momentos da campanha.
