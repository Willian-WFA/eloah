# RPG Kids

RPG Kids e um app/jogo mobile-first para criancas pequenas jogarem aventuras curtas com um adulto responsavel. A experiencia combina narrador de IA, rolagem simples de dados, historias infantis guiadas e uma biblioteca onde novas aventuras podem ser adicionadas com seguranca.

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

## Ordem de leitura

1. `docs/DISCOVERY_NOTES.md`
2. `docs/MASTER_SPEC.md`
3. `docs/CHILD_DEVELOPMENT_LEARNING_MAP.md`
4. `docs/STORY_PROTOCOL_V0.md`
5. `content/adventures/portal-das-estrelinhas.md`
6. `prototype/index.html`
7. `docs/HOSTINGER_DEPLOY.md`
8. `PROJECT_CONTEXT.md`
9. `AGENTS.md`
10. `docs/CURRENT_STATE.md`
