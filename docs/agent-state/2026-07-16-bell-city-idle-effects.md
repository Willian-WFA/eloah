# 2026-07-16 - Bell City Idle Effects

## Contexto

Pedido: fazer as melhorias 1 a 5 sugeridas após QA da campanha `A Cidade dos Sinos Claros`.

## Feito

- Adicionadas falas ociosas no modal de opções, limitadas a duas por cena.
- O modal de opções agora revela as escolhas mais rápido e bloqueia clique até as opções estarem visíveis.
- Adicionadas ambiências sintéticas leves por cena: praça/sinos, biblioteca, ponte, oficina, jardim e vento.
- O dado agora mostra `Escutando o resultado...` enquanto a narração do resultado termina.
- Recompensas e Notas de Sino ganharam animação voando na tela com som curto.
- Timers de ambiência são limpos ao trocar de cena, finalizar aventura ou voltar ao painel dos pais.
- `public/` e `prototype/` foram mantidos sincronizados.
- Cache PWA atualizado para `rpg-kids-v2026-07-16-bell-city-idle-effects-pwa`.

## Validação

- `npm run check`
- `node --check public/app.js`
- `node --check prototype/app.js`
- `cmp -s public/app.js prototype/app.js`
- `cmp -s public/styles.css prototype/styles.css`
- `cmp -s public/sw.js prototype/sw.js`
- Chrome headless/CDP em `http://127.0.0.1:3000/`:
  - Portão Baixinho carregou.
  - Modal de opções começou com botões desabilitados e destravou após a revelação.
  - Após escolha, o dado abriu corretamente.
  - Resultado do dado exibiu número grande, texto e estado `Escutando o resultado...`.
  - Seta apareceu apenas depois que o modal do dado fechou.
  - Animação de Nota de Sino apareceu no DOM e sumiu sozinha.

## Riscos / pendências

- Testar em celular real, porque autoplay, Web Audio, Wake Lock e TTS variam por navegador.
- Avaliar se as falas ociosas com voz premium ficam naturais ou se devem virar WAVs pregerados.
- Ajustar intensidade/frequência das ambiências após teste com criança, para não disputar atenção com a narração.

## Próximo prompt recomendado

Teste no celular a campanha `A Cidade dos Sinos Claros` depois do redeploy. Foque em áudio duplicado, tempo de resposta do dado, falas ociosas, ambiências e se a criança entende quando pode tocar nas opções.
