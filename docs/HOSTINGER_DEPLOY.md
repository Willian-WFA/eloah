# Deploy na Hostinger com Node.js

## Estrutura

```text
rpg-kids/
  package.json
  server.js
  public/
    index.html
    styles.css
    app.js
    adventures.js
    manifest.webmanifest
    sw.js
    assets/
```

## Configuracao na Hostinger

- Runtime: Node.js 18 ou superior.
- Arquivo inicial: `server.js`.
- Comando de start: `npm start`.
- Porta: usar a variavel `PORT` fornecida pela Hostinger. O servidor ja usa `process.env.PORT`.

Antes de enviar uma nova versao, rode:

```bash
npm run sync:public
npm run check
```

Isso copia a versao de desenvolvimento em `prototype/` para `public/`.

## PWA / celular

- A versao atual inclui `manifest.webmanifest`, `sw.js` e icones em `public/assets/icons/`.
- Para instalar no celular e usar microfone de forma confiavel, publique em HTTPS.
- Depois do deploy, abra a URL no celular e use a opcao do navegador `Adicionar a tela inicial`.
- Se uma versao antiga ficar presa em cache, altere o `CACHE_NAME` em `prototype/sw.js`, rode `npm run sync:public` e publique novamente.

## Rotas

- `/` abre o jogo.
- `/health` retorna status simples.
- `/api/master` e um endpoint mock para futura IA mestre.
- `/manifest.webmanifest` expõe o manifesto PWA.
- `/sw.js` expõe o service worker.

## Observacoes

- A chave da DeepSeek nao deve ir para `public/`.
- Quando a IA real entrar, use variavel de ambiente no painel da Hostinger, por exemplo `DEEPSEEK_API_KEY`.
- O frontend atual ainda roda sem backend real; o Node esta preparado para servir o app e receber futuros endpoints.
- Voz por microfone depende de permissao do navegador e HTTPS fora de `localhost`.
