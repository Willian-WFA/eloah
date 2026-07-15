# Agent State: parent and child panel split

Data: 2026-07-13
Agente: The Creator / Codex

## Contexto

O usuario definiu que o app deve ter duas superficies claras:

- painel inicial do pai/responsavel, com configuracoes da historia, tempo, permissoes e revisao;
- painel da crianca, focado apenas no jogo.

## Decisoes

- A biblioteca passa a operar como painel dos pais.
- Clicar em uma aventura seleciona a historia para revisao, nao inicia diretamente.
- O painel dos pais mostra resumo adulto, status e pontos de atencao.
- A historia so inicia no painel da crianca depois que o responsavel marca aprovacao.
- O prototipo inclui controles para tempo, sons, remocao de humor restrito e uma opcao futura de extensao extra.
- Humor escatologico saiu do conteudo jogavel; personagens absurdos continuam permitidos com curadoria.

## Arquivos alterados

- `prototype/index.html`
- `prototype/app.js`
- `prototype/styles.css`
- `prototype/adventures.js`
- `docs/CURRENT_STATE.md`

## Validacao

- `node --check prototype/app.js`
- `node --check prototype/adventures.js`
- Busca no prototipo por `pum`, `cocô`, `xixi`, `light_potty` e `allowedPotty` sem ocorrencias.

## Proximo passo

Validar visualmente no navegador/celular se o fluxo esta claro:

1. pai seleciona aventura;
2. painel mostra resumo e alertas;
3. pai marca aprovacao;
4. botao inicia painel da crianca;
5. crianca joga sem ver configuracoes adultas.
