# Checkpoint - Correcao ERR_REQUIRE_ESM na Hostinger

Data: 2026-07-15
Agente/sessao: The Creator / Codex

## Problema

Logs da Hostinger mostraram erro repetido:

```text
Error [ERR_REQUIRE_ESM]: require() of ES Module .../.builds/config/preload-timestamp.js not supported.
preload-timestamp.js is treated as an ES module file ... package.json contains "type": "module"
```

## Causa

O runtime da Hostinger injeta um preload CommonJS com `require()`. Como o projeto tinha `"type": "module"` no `package.json`, arquivos `.js` do ambiente de build/runtime passaram a ser tratados como ESM, quebrando antes do app iniciar.

## Correcao

- Removido `"type": "module"` de `package.json`.
- Convertido `server.js` de ESM para CommonJS (`require`).
- Mantido `server.listen(port, "0.0.0.0")`.
- Documentado em `docs/HOSTINGER_DEPLOY.md` para nao recolocar `"type": "module"` enquanto Hostinger usar preload CommonJS.

## Validacao

- `npm run check`
- `PORT=3108 npm start`
- `curl http://127.0.0.1:3108/health` retornou:

```json
{"ok":true,"app":"rpg-kids"}
```

- `curl -I http://127.0.0.1:3108/` retornou `HTTP/1.1 200 OK`.

## Proximo passo

Reimplantar na Hostinger puxando o commit novo.
