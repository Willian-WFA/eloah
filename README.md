# RPG Kids

RPG Kids e um app/jogo mobile-first para criancas pequenas jogarem aventuras com um adulto responsavel. A experiencia combina narrador de IA, rolagem simples de dados, historias infantis guiadas, voz, imagens preaprovadas, progresso por aprendizado e uma biblioteca onde novas aventuras podem ser adicionadas com seguranca.

## Visao

O produto deve preservar a criatividade da crianca, mas manter a IA dentro de um enredo aprovado, com objetivo claro, linguagem adequada, duracao curta e aprendizado leve.

## Usuario principal

- Crianca jogadora: inicialmente 4+ anos, usando o app com supervisao.
- Adulto mestre/responsavel: escolhe historia, acompanha a sessao, cria ou aprova novas aventuras.
- Autor de historia: adulto que cria aventuras curtas com objetivo, cenas, personagens, desafios e chefao final nao assustador.

## MVP

1. Biblioteca de aventuras curtas.
2. Tela de sessao com narrador, escolhas da crianca e dado simples.
3. Motor de mestre IA limitado por uma historia estruturada.
4. Encerramento com objetivo, pequena licao e celebracao.
5. Area adulta para adicionar uma nova aventura a biblioteca.

## Prototipo atual

Existe um prototipo estatico em `prototype/index.html`.

Ele roda direto no navegador e inclui biblioteca por dados de aventura, uma aventura real, uma aventura dummy, sessao mobile, dado D6, progresso, recompensas/avatar placeholder, ids de sons/efeitos com fallback, limite de tempo configuravel, aviso de encerramento e checkpoint em `localStorage`.

## Conteudo e imagens

- Aventuras editaveis ficam em `content/adventures/`.
- Templates de aventura ficam em `content/templates/`.
- Aventura longa em desenvolvimento: `content/adventures/cidade-dos-sinos-claros.md`.
- Template para aventura longa ramificada: `content/templates/long-branching-adventure-template-v1.json`.
- Imagens aprovadas do prototipo ficam em `prototype/assets/scenes/` e sao copiadas para `public/assets/scenes/` para hospedagem.
- Icones PWA ficam em `prototype/assets/icons/` e `public/assets/icons/`.

As imagens entram no repositorio junto do codigo para facilitar deploy na Hostinger e teste no celular sem depender de CDN externa.

## Deploy Hostinger / Node.js

Tambem existe uma versao pronta para hospedagem Node.js:

```text
server.js
package.json
public/
```

Para rodar localmente:

```bash
npm start
```

Depois abra `http://localhost:3000`.

Na Hostinger, configure:

- arquivo inicial: `server.js`;
- comando de start: `npm start`;
- Node.js 18+;
- porta via `process.env.PORT`.

Detalhes em `docs/HOSTINGER_DEPLOY.md`.

## GitHub

Repositorio alvo:

```text
https://github.com/Willian-WFA/eloah
```

O primeiro commit local inclui codigo, docs, assets PNG/WebP, PWA e servidor Node. Para publicar, autentique o GitHub CLI e rode:

```bash
gh auth login -h github.com
git push -u origin main
```

Mais detalhes em `docs/GITHUB_PUBLISH.md`.

## Ordem de leitura

1. `docs/DISCOVERY_NOTES.md`
2. `docs/MASTER_SPEC.md`
3. `docs/CHILD_DEVELOPMENT_LEARNING_MAP.md`
4. `docs/STORY_PROTOCOL_V0.md`
5. `content/adventures/cidade-dos-sinos-claros.md`
6. `content/adventures/portal-das-estrelinhas.md`
7. `prototype/index.html`
8. `docs/HOSTINGER_DEPLOY.md`
9. `docs/GITHUB_PUBLISH.md`
10. `PROJECT_CONTEXT.md`
11. `AGENTS.md`
12. `docs/CURRENT_STATE.md`
