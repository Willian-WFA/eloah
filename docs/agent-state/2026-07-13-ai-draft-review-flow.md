# Agent State: AI draft review flow

Data: 2026-07-13
Agente: The Creator / Codex

## Contexto

O proximo passo do jogo era simular o fluxo futuro de historias criadas por IA: a historia nao pode aparecer direto para a crianca, precisa passar pelo painel dos pais com revisao, pontos de atencao e decisoes de permissao.

## Implementado no prototipo

- Botao `Gerar rascunho com IA` no painel dos pais.
- O botao cria uma historia mock em runtime:
  - titulo: `Rascunho IA: A Torre do Sapo-Rei`;
  - status: `draft`;
  - personagens absurdos;
  - desafio de movimento;
  - `contentReview` com flags e contexto sinalizado.
- A historia aparece no topo da biblioteca.
- O painel dos pais seleciona o rascunho automaticamente.
- O rascunho exige revisao do responsavel antes de liberar.
- Se `Remover humor restrito` estiver ativo, o app prepara uma versao limpa para o painel da crianca.

## Decisoes

- Historia gerada por IA entra sempre como rascunho adulto.
- Painel da crianca so recebe historia aprovada/preparada.
- O prototipo nao chama DeepSeek ainda; apenas simula a estrutura que a integracao real deve preencher.
- O validador real deve preencher `contentReview.flags`, `contentReview.flaggedContexts`, `requiresParentConsent` e resumo adulto.

## Arquivos alterados

- `prototype/index.html`
- `prototype/app.js`
- `docs/CURRENT_STATE.md`

## Validacao

- `node --check prototype/app.js`
- `node --check prototype/adventures.js`
- Busca no prototipo por `pum`, `cocô`, `xixi`, `light_potty` e `allowedPotty` sem ocorrencias.

## Proximo passo

Persistir rascunhos gerados e criar acao explicita de `Publicar na biblioteca infantil`, separando:

- rascunho;
- aprovado pelo responsavel;
- publicado para crianca.
