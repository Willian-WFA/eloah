# 2026-07-16 - Bell City Celebration Polish

## Contexto

Feedback do teste mobile da campanha `A Cidade dos Sinos Claros`:

- Dado parecia cair apenas em `2` e `1`.
- Alguns áudios de resultado do dado estavam duplicando/sobrepondo.
- Praça redonda deveria narrar quantos caminhos ainda restam.
- Ícone do diário estava cobrindo área de itens/texto.
- Botão de avanço precisava ficar mais claro.
- Final da aventura precisava de áudio de parabéns, sons de conquista e fala sobre conquistas.

## Alterações

- Adicionado histórico de rolagens (`recentDiceRolls`) e D6 amigável (`rollFriendlyD6`) para suavizar sequência ruim: depois de dois resultados `1-2`, um novo resultado baixo é elevado para faixa `3-6`.
- Checkpoint passou a salvar/restaurar `recentDiceRolls`.
- Resultado do dado agora chama `stopNarrationPlayback()` antes da animação e usa `activeDiceNarrationId` para ignorar callbacks antigos, reduzindo duplicidade de áudio.
- Praça do Relógio Parado ganhou texto dinâmico conforme quantidade de rotas disponíveis: três caminhos, dois caminhos, último local ou torre.
- Diário da aventura foi movido para dentro do card da heroína como `journal-card-button`.
- Seta de avanço mudou para `➜` com botão circular mais polido e pulso sutil.
- Encerramento final ganhou `buildAdventureCelebrationText()` com nome da criança, Notas de Sino, itens e progresso mais forte.
- Adicionados sons sintéticos de celebração com `playCelebrationCues()` e padrão `victory_fanfare`.
- Cache PWA atualizado para `rpg-kids-v2026-07-16-bell-city-celebration-pwa`.
- `public/` e `prototype/` foram sincronizados.

## Validação

- `npm run check`
- `node --check public/app.js`
- `cmp -s public/app.js prototype/app.js`
- `cmp -s public/styles.css prototype/styles.css`
- `cmp -s public/index.html prototype/index.html`
- `cmp -s public/sw.js prototype/sw.js`
- Busca sem ocorrências antigas em `public/`, `prototype/` e `scripts/`: `pode inventar`, `própria escolha`, `própria ação`, `contar algo diferente`, `livre escolha`.
- Chrome headless carregou `http://127.0.0.1:3000/` e gerou captura mobile em `/tmp/rpg-kids-polish.png`.

## Próximos pontos

- Testar no celular se a duplicidade de áudio do dado foi eliminada em navegador real.
- Regenerar com Gemini os WAVs restantes da campanha quando a quota permitir.
- Criar áudio pregerado especial para encerramento/parabéns da campanha se a voz dinâmica ainda ficar fraca.
