# Agent State - 2026-07-15 - Child Gender Treatment

## Pedido do usuario

Adicionar modo de escolha de sexo da crianca e adaptar fala para meninas e meninos, por exemplo `aventureiro` para meninos e `aventureira` para meninas.

## O que foi alterado

- Adicionado seletor no painel dos pais:
  - `Menina · aventureira`
  - `Menino · aventureiro`
- O tratamento escolhido é salvo em `localStorage`.
- O tratamento é preservado em checkpoint.
- Adicionado dicionário `childTerms()` para centralizar termos:
  - `herói` / `heroína`
  - `aventureiro` / `aventureira`
  - `Guardião` / `Guardiã`
  - `Mago` / `Maga`
  - `Parceiro` / `Parceira`
- Adicionada camada `genderedText()` para adaptar textos antigos de cena, feedback, diário, resultado de dado e narração quando o perfil é menina.
- O rótulo da ação livre e o título do avatar mudam conforme o tratamento escolhido.
- Cache do PWA atualizado para forçar nova versão no celular.

## Arquivos alterados

- `prototype/index.html`
- `prototype/app.js`
- `prototype/sw.js`
- `public/index.html`
- `public/app.js`
- `public/sw.js`
- `docs/CURRENT_STATE.md`

## Validação executada

- `npm run sync:public`
- `npm run check`
- `node --check public/sw.js`
- Busca por `childGenderSelect`, `genderedText`, `Menina · aventureira`, `Menino · aventureiro` e `gender-voice-pwa`.

## Próximo passo recomendado

Testar uma cena com `Menina` e depois com `Menino`:

- narração inicial;
- feedback ao falar ação livre;
- resultado do dado;
- título do avatar;
- resumo final;
- checkpoint/continuar.
