# 2026-07-17 - Cookie challenge QA polish

## Escopo

Responder ao relato de que o desafio de Tico parecia igual, testar o fluxo real no navegador e executar os ajustes pendentes citados: polimento do desafio, seguranca de avanço, mapa por tipo de recompensa e cache PWA.

## Achados

- O dado nao abria no fluxo local, mas a seta ficava disponivel enquanto o modal visual ainda estava aberto.
- O desafio ja estava embaralhado, mas visualmente ainda parecia um grid generico.
- O sucesso do desafio dependia de audio opcional `visual-success`; sem WAV pronto, o modal podia ficar aberto esperando TTS/API.
- O service worker ainda usava cache antigo.

## Feito

- Desafio do Tico ganhou tema `cookie_sequence`, visual de bandeja/forno e labels nos objetos.
- `renderSceneControls()` agora esconde a seta enquanto ha desafio visual/template/fisico aberto ou pendente.
- `speakNarration()` executa `onComplete` mesmo com narracao desligada ou texto vazio.
- Sucesso de `visualChallenge` e `templateChallenge` ganhou fallback de fechamento apos alguns segundos.
- Mapa da cidade passou a mostrar tipo de rota: `Nota`, `Item` ou `Final`.
- Service worker atualizado para cache `rpg-kids-v2026-07-17-cookie-challenge-flow-pwa`.

## Validacao

- `npm run check`
- `cmp` entre `public/` e `prototype/`
- Teste automatizado via Chrome DevTools para Tico:
  - modal visual abriu;
  - dado ficou fechado;
  - seta ficou escondida;
  - grid veio embaralhado;
  - apos estrela/lua/sino, modal fechou;
  - dado continuou fechado;
  - seta apareceu;
  - `nota_amarela` e `notas_sino +1` foram aplicados.
- Teste automatizado via Chrome DevTools para mapa:
  - rotas de Nota/Item/Final renderizadas com tipo correto.

## Bloqueio

- `npm run generate:audio:missing` foi bloqueado pelo revisor automatico porque enviaria texto privado da historia para Gemini TTS.

## Proximo passo

Redeploy na Hostinger e teste no celular com limpeza/atualizacao do service worker. Gerar WAVs opcionais so com aprovacao explicita para envio dos textos a Gemini TTS.
