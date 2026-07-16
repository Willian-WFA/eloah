# Agent State Log

Projeto: RPG Kids
Data: 2026-07-16
Agente/sessao: The Creator / Codex
Branch: main
Commit(s): a gerar nesta sessao
PR/Issues: n/a

## Objetivo da sessao

Corrigir problemas observados na campanha `A Cidade dos Sinos Claros`: tela ativa no celular, consentimento de microfone no modal da historia, audios antigos com fala de escolha livre, hub confuso, desafio fisico antes do dado, sobreposicao de audio e prioridade da campanha na biblioteca.

## Estado inicial observado

- A campanha nao estava no topo da biblioteca.
- WAVs antigos ainda continham frases como `voce tambem pode inventar sua propria escolha`.
- A praça podia falar muitas rotas e depois mostrar apenas tres escolhas, causando confusao.
- Rotas ja visitadas podiam reaparecer na fala por causa de audio antigo e hub amplo.
- `Toque no dado para rolar` vinha por voz do navegador.
- Recompensa/feedback podia falar sobre o resultado do dado, causando sobreposicao.

## O que foi feito

- `A Cidade dos Sinos Claros` agora aparece primeiro na biblioteca.
- Adicionado Screen Wake Lock durante a sessao infantil.
- Adicionado seletor `Usar microfone nesta aventura` no modal `Aprovar e jogar`.
- O consentimento de microfone e salvo no estado parental e controla escuta automatica.
- Hub da praça limita a 3 caminhos disponiveis, escondendo concluidos e bloqueados.
- Retorno para a praça usa texto curto em vez de repetir a introducao completa.
- Cenas com movimento + dado agora seguem: escolha -> desafio -> 20s -> Sim/Nao -> dado.
- Removida narração `Toque no dado para rolar`; o modal visual orienta a criança.
- Recompensas apos dado aparecem sem falar por cima do audio do resultado.
- `scripts/generate-audio.js` ganhou `--force` e `--kind=scene`.
- Regenerados 7 WAVs de cena da campanha com Gemini.
- Bloqueado uso dos WAVs antigos em cenas nao regeneradas por quota.
- `public/` e `prototype/` sincronizados.
- Cache PWA atualizado para `rpg-kids-v2026-07-16-bell-city-focus-fixes-pwa`.

## Decisoes tomadas

- Melhor não tocar WAV antigo nas cenas que a Gemini nao conseguiu regenerar; fallback para API TTS/voz do navegador e menos ruim do que repetir instrução proibida.
- No hub, a criança ve só caminhos acionaveis agora, nao a lista grande de locais futuros/concluidos.
- Desafio fisico virou ritual antes do dado quando ambos existem na cena.

## Arquivos alterados

- `public/app.js`
- `public/index.html`
- `public/styles.css`
- `public/sw.js`
- `prototype/app.js`
- `prototype/index.html`
- `prototype/styles.css`
- `prototype/sw.js`
- `scripts/generate-audio.js`
- 7 WAVs em `public/assets/audio/cidade-dos-sinos-claros/*/scene.wav`
- 7 WAVs em `prototype/assets/audio/cidade-dos-sinos-claros/*/scene.wav`
- `docs/CURRENT_STATE.md`
- `docs/agent-state/2026-07-16-bell-city-focus-fixes.md`

## Validacao executada

- `npm run check`
- `node --check scripts/generate-audio.js`
- Busca em `public/` e `scripts/` por frases de escolha livre retornou sem ocorrencias.
- Chrome headless em `http://127.0.0.1:3114/` sem `Uncaught`, `SyntaxError`, `TypeError` ou `ReferenceError`.
- DOM renderizado confirmou `A Cidade dos Sinos Claros` como primeira aventura.
- Simulacao local confirmou grupos de ate 3 rotas disponiveis no hub.

## Resultado

A campanha ficou mais controlada e adequada para teste no celular. Os audios antigos reclamados pelo usuario foram regenerados nas cenas citadas: portao, biblioteca, ponte e oficina/sino sem plim. A praça tambem foi regenerada, mas o app evita usar WAV pregerado no hub para permitir texto dinamico de retorno.

## O que falta fazer

- Regenerar os WAVs de `sinos_pipoca_jardim`, `sinos_bento_bosque` e `sinos_torre_final` quando a quota Gemini permitir.
- Testar no celular o Wake Lock e permissão de microfone em HTTPS.
- Validar se o desafio de 20 segundos ficou agradável para uma criança pequena.

## Pendencias fora do commit

- `modelo.png`, `modelo historias.png`, `tela jogo.jpg` e `tela jogo2.jpg` seguem untracked como referencias visuais.

## Riscos / atencoes

- Screen Wake Lock depende de suporte do navegador e pode ser liberado pelo sistema em algumas condicoes.
- Se Gemini TTS/API nao responder nas 3 cenas bloqueadas, o app pode cair para voz do navegador, mas sem texto de escolha livre.
- Cota Gemini 429 impediu regeneracao completa nesta sessao.

## Proximo prompt recomendado

Depois do deploy, testar no celular a campanha dos sinos do portao ate pelo menos biblioteca/ponte/oficina, verificando: tela nao apaga, microfone so escuta se aprovado, hub mostra apenas opcoes pendentes, desafio aparece antes do dado e nenhum audio fala escolha livre.
