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

- Framework/preset: `Express`.
- Runtime: Node.js 18 ou superior.
- Arquivo inicial: `server.js`.
- Comando de start: `npm start`.
- Comando de build: `npm run build` ou `Nenhum`.
- Diretorio de saida: deixar vazio para app Node/Express. Use `public` apenas se for publicar como site estatico.
- Porta: usar a variavel `PORT` fornecida pela Hostinger. O servidor ja usa `process.env.PORT`.
- Host: o servidor escuta em `0.0.0.0` por padrao, adequado para runtime gerenciado.

Campos recomendados quando o painel pedir compilacao e saida:

```text
Framework: Express
Comando de construcao: npm run build
Gerenciador de pacotes: npm
Diretorio de saida: deixe vazio
Arquivo de entrada: server.js
```

Se houver campo separado para comando de inicializacao:

```text
npm start
```

## Alternativa estatica

A versao atual do jogo tambem funciona como site estatico porque todo o gameplay do MVP esta em `public/`.

Se o runtime Node continuar retornando `503`, publique como estatico usando:

```text
Framework: Other
Branch: main
Node: 18.x
Root directory: ./
Build command: npm run check
Output directory: public
```

Nesse modo, `/health` nao vai responder com JSON do Node, mas o jogo deve abrir normalmente em `/`.

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

- O projeto nao usa `"type": "module"` no `package.json` porque o runtime da Hostinger injeta scripts CommonJS de preload. Com `"type": "module"`, o deploy pode falhar com `ERR_REQUIRE_ESM` em `.builds/config/preload-timestamp.js`.
- A chave da DeepSeek nao deve ir para `public/`.
- Para ligar a IA mestre real, configure variaveis de ambiente no painel da Hostinger:

```text
DEEPSEEK_API_KEY=coloque-a-chave-no-painel
DEEPSEEK_MODEL=deepseek-v4-flash
DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions
OPENAI_API_KEY=coloque-a-chave-openai-no-painel
GEMINI_API_KEY=coloque-a-chave-gemini-no-painel
TTS_PROVIDER=gemini
TTS_MODEL=gemini-3.1-flash-tts-preview
TTS_VOICE=Puck
OPENAI_TTS_URL=https://api.openai.com/v1/audio/speech
GEMINI_TTS_URL=https://generativelanguage.googleapis.com/v1beta/interactions
```

- A documentacao oficial da DeepSeek usa `https://api.deepseek.com` como base OpenAI e `https://api.deepseek.com/chat/completions` como endpoint de chat.
- O modelo recomendado para o MVP e `deepseek-v4-flash`, que corresponde ao caminho rapido e economico. Evite `deepseek-chat`: a DeepSeek marcou esse nome para deprecacao em `2026-07-24 15:59 UTC`.
- O backend envia `thinking: { "type": "disabled" }` para manter a resposta direta, teatral e rapida para narracao infantil.
- Para voz melhor, `/api/tts` usa Gemini TTS quando `TTS_PROVIDER=gemini` e `GEMINI_API_KEY` existe. Tambem ha suporte a OpenAI TTS com `TTS_PROVIDER=openai` e `OPENAI_API_KEY`.
- Sem chave de TTS ou se a API falhar, o app volta automaticamente para a voz do navegador.
- Para evitar espera durante o jogo, gere audio aprovado antes do deploy:

```bash
npm run generate:audio -- --adventure=cidade-dos-sinos-claros
```

Isso salva WAVs em `public/assets/audio/` e atualiza `public/assets/audio/manifest.json`. O app tenta tocar esse audio primeiro, usa Gemini ao vivo apenas quando nao houver asset e cai para a voz do navegador se necessario.
- O servidor tambem carrega um arquivo `.env` na raiz quando ele existir, mas as variaveis definidas no painel da Hostinger tem prioridade.
- Sem `DEEPSEEK_API_KEY`, `/api/master` responde em modo `mock`, mantendo o app funcionando.
- Voz por microfone depende de permissao do navegador e HTTPS fora de `localhost`.
