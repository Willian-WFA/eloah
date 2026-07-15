# Agent State - 2026-07-14 - Story Depth, Rubric, Avatar, Assets, Resume

## Pedido do usuário

Melhorar as histórias, criar mais 2 ou 3 aventuras curtas com começo/meio/objetivo/chefão/recompensa, fazer progresso por escolha mais inteligente, melhorar avatar, assets, sons/efeitos e criar resumo de retomada usando `narrativeLog`.

## O que foi alterado

- Adicionadas 3 aventuras novas em `prototype/adventures.js` e sincronizadas para `public/adventures.js`:
  - `O Navio do Chá das Nuvens`
  - `O Jardim do Relógio Girafa`
  - `A Biblioteca do Dragão Sonolento`
- Cada aventura nova tem cenas com objetivo claro, desafio intermediário, desafio final, recompensa, movimentos, idiomas, `diceOutcomes`, `learningCriteria`, sons e efeitos.
- Criado suporte de avaliação contextual por cena via `actionRubric` em `prototype/app.js`.
- A avaliação de ação livre agora tenta `scene.actionRubric` antes da rubrica global antiga.
- Adicionadas rubricas contextuais às cenas principais das aventuras antigas.
- Avatar melhorado com identidade dinâmica por progresso dominante, rosto, chapéu, aura e variação de cor.
- Adicionados assets CSS por tema de cena para navio/nuvens, jardim/relógio e biblioteca/dragão.
- Sons sintéticos expandidos para mar, vento/tempestade, jardim/relógio e biblioteca/dragão.
- Criado `buildResumeSummary()` usando cena atual, progresso, recompensas e últimos eventos do `narrativeLog`.
- Geradas 9 imagens bitmap para as 3 aventuras novas, uma por cena.
- Imagens salvas como PNG fonte e WebP otimizado em `prototype/assets/scenes/` e `public/assets/scenes/`.
- Cenas novas atualizadas para usar `image.src` apontando para WebP.
- Renderer atualizado para exibir `<img class="scene-bitmap">` quando houver imagem real.
- `server.js` atualizado para servir `.webp` como `image/webp`.

## Arquivos principais

- `prototype/adventures.js`
- `prototype/app.js`
- `prototype/styles.css`
- `public/adventures.js`
- `public/app.js`
- `public/styles.css`
- `prototype/assets/scenes/*.png`
- `prototype/assets/scenes/*.webp`
- `public/assets/scenes/*.png`
- `public/assets/scenes/*.webp`
- `server.js`
- `docs/CURRENT_STATE.md`

## Validação executada

- `node --check prototype/app.js`
- `node --check prototype/adventures.js`
- `npm run sync:public`
- `npm run check`
- `node --check public/app.js`
- `node --check public/adventures.js`
- Busca por `navio-do-cha`, `jardim-do-relogio`, `biblioteca-do-dragao`, `actionRubric`, `buildResumeSummary` e `hero-title`.
- `npm start`
- `curl -s http://127.0.0.1:3000/health`
- `curl -I -s http://127.0.0.1:3000/`
- `curl -I -s http://127.0.0.1:3000/assets/scenes/cloud_harbor_soft.webp`
- `du -h public/assets/scenes/*.webp`

## Próximo passo recomendado

Testar no navegador/celular as três aventuras novas, especialmente:

- se o botão `Guardar aventura` e `Continuar aventura` geram uma retomada útil;
- se a ação livre concede progresso coerente com a cena;
- se o avatar fica visualmente legível em tela pequena;
- se os sons e efeitos não cansam a criança.
