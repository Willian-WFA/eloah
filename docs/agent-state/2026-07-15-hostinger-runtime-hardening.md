# Checkpoint - Hardening do runtime Hostinger

Data: 2026-07-15
Agente/sessao: The Creator / Codex

## Contexto

O dominio `https://eloah.uaifacil.com/` respondia com `503 Service Unavailable` vindo da Hostinger. O dominio resolvia e chegava na plataforma, entao o problema mais provavel era runtime/configuracao do app Node.

## Feito

- `server.js` passou a escutar em `0.0.0.0` por padrao, mantendo `process.env.PORT`.
- Log de inicializacao agora mostra host e porta reais.
- `docs/HOSTINGER_DEPLOY.md` atualizado com:
  - campos recomendados de construcao e saida;
  - comando `npm start`;
  - observacao de `0.0.0.0`;
  - alternativa estatica usando `public/`.

## Validacao

- `npm run check`
- Servidor local em `PORT=3107 npm start`
- `curl http://127.0.0.1:3107/health` retornou:

```json
{"ok":true,"app":"rpg-kids"}
```

- `curl -I http://127.0.0.1:3107/` retornou `HTTP/1.1 200 OK`.

## Proximo passo recomendado

Reimplantar na Hostinger com o commit novo. Se continuar `503`, buscar logs de runtime do app Node. Se o painel permitir deploy estatico mais simples, usar `Output directory: public`.
