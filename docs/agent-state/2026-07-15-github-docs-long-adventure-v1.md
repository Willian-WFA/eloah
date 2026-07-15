# Checkpoint - GitHub, imagens e aventura longa V1

Data: 2026-07-15
Agente/sessao: The Creator / Codex

## Pedido

Documentar o projeto para GitHub, garantir que imagens entrem no repositorio e iniciar uma historia grande, detalhada, sequencial e ramificada para pelo menos 3 horas de jogo.

## Feito

- Repositorio Git local ja estava inicializado em `main`.
- Remoto configurado para `https://github.com/Willian-WFA/eloah.git`.
- Primeiro commit local existente: `1e90d0f Initial RPG Kids playable prototype`.
- README atualizado com estrutura de conteudo, imagens, GitHub, Hostinger e ordem de leitura.
- Criado `docs/GITHUB_PUBLISH.md` com passos de autenticacao, push, arquivos que devem subir e observacoes de Hostinger.
- Confirmado que imagens PNG/WebP estao no commit local em `prototype/assets/scenes/` e `public/assets/scenes/`.
- Criado `content/templates/long-branching-adventure-template-v1.json` para historias longas com hub, grafo de quests, tokens centrais, checkpoints e contrato do narrador.
- Criado rascunho de aventura longa `content/adventures/cidade-dos-sinos-claros.md`.
- Atualizado `docs/STORY_PROTOCOL_V0.md` com regras para aventura longa ramificada V1, ritmo de 3 horas, quests, linha central e transicoes sem saltos.
- Atualizado `docs/CURRENT_STATE.md`.

## Aventura criada

`A Cidade dos Sinos Claros` e uma aventura de cidade-hub onde a crianca ajuda NPCs para reunir cinco Notas de Sino e reativar o Relogio-Coracao.

Ela inclui:

- introducao com problema central;
- praca central/hub;
- 7 quests com NPCs;
- desbloqueios por quantidade de Notas de Sino;
- ingles e mandarim em doses pequenas;
- desafios fisicos adaptaveis;
- recompensas de avatar;
- final cooperativo com o Grande Silencio Macio.

## Bloqueio

O push para GitHub ainda depende de autenticacao local:

```bash
gh auth login -h github.com
git push -u origin main
```

O erro anterior foi:

```text
fatal: could not read Username for 'https://github.com': No such device or address
```

## Proximo passo recomendado

1. Autenticar o GitHub CLI.
2. Fazer push dos commits locais.
3. Transformar `cidade-dos-sinos-claros.md` em manifest jogavel por atos/quests.
4. Criar assets visuais para praca, padaria, biblioteca, jardim, ponte, oficina, bosque, colina e torre.
