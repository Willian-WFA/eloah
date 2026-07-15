# Publicacao no GitHub

Repositorio alvo:

```text
https://github.com/Willian-WFA/eloah
```

## Estado local

O projeto foi inicializado como repositorio Git local na branch `main`.

Primeiro commit local:

```text
1e90d0f Initial RPG Kids playable prototype
```

O push ainda depende de autenticacao local do GitHub CLI.

## Autenticacao

Rode:

```bash
gh auth login -h github.com
```

Depois confirme:

```bash
gh auth status
```

## Push inicial

Com a autenticacao funcionando:

```bash
git push -u origin main
```

## Arquivos que devem subir

O repositorio deve incluir:

- `server.js`
- `package.json`
- `public/`
- `prototype/`
- `content/`
- `docs/`
- `README.md`
- `PROJECT_CONTEXT.md`
- `AGENTS.md`

## Imagens e assets

As imagens devem subir junto com o repositorio.

Fontes/editaveis do prototipo:

```text
prototype/assets/scenes/
prototype/assets/icons/
```

Arquivos usados pela hospedagem:

```text
public/assets/scenes/
public/assets/icons/
```

O app usa as versoes `.webp` nas cenas para carregar melhor no celular. Os `.png` originais continuam no repositorio enquanto a geracao/curadoria visual ainda estiver em fase de prototipo.

## Hostinger

Na Hostinger, use:

```text
Entry file: server.js
Start command: npm start
Node.js: 18+
```

O servidor serve a pasta `public/`.

## Validacao antes de publicar

Rode:

```bash
npm run check
```

Opcionalmente:

```bash
npm start
```

E abra:

```text
http://localhost:3000
```

## Observacoes

- Nunca subir `.env`.
- Chaves da DeepSeek devem ficar em variaveis de ambiente da Hostinger.
- O MVP nao deve armazenar audio bruto da crianca.
- Novas aventuras devem entrar primeiro em `content/adventures/` e so depois virar manifest jogavel.
