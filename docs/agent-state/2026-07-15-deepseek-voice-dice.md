# Checkpoint - DeepSeek, voz teatral e dado numerico

Data: 2026-07-15
Agente/sessao: The Creator / Codex

## Pedido

Adicionar base para API DeepSeek, melhorar voz para ficar mais dinamica e teatral, tocar efeito de dado rolando, falar o resultado e mostrar o numero grande para a crianca aprender numeros.

## Feito

- `/api/master` agora chama DeepSeek quando `DEEPSEEK_API_KEY` existe.
- Sem chave, `/api/master` retorna modo `mock`, mantendo o app funcionando.
- Variaveis suportadas:
  - `DEEPSEEK_API_KEY`
  - `DEEPSEEK_MODEL`
  - `DEEPSEEK_API_URL`
- Criado `.env.example`.
- `docs/HOSTINGER_DEPLOY.md` atualizado com variaveis da DeepSeek.
- Voz do navegador ficou mais teatral:
  - ritmo padrao `0.98`;
  - perfil teatral acelera um pouco mais;
  - pitch muda por estilo de mestre;
  - pausas entre frases ficaram menores.
- Dado agora mostra numeros grandes `1` a `6`.
- Modal do dado fala `Voce tirou X`.
- Durante a rolagem, o dado toca ticks sinteticos `dice_tick_roll`.
- Cache PWA atualizado para `rpg-kids-v2026-07-15-deepseek-dice-voice-pwa`.

## Validacao

- `npm run sync:public`
- `npm run check`
- Servidor local em `PORT=3109 npm start`
- `POST /api/master` sem chave retornou modo `mock` com `tokenUsage`.

## Proximo passo recomendado

Configurar `DEEPSEEK_API_KEY` na Hostinger e testar `POST /api/master` em producao. Depois conectar chamadas reais do mestre IA ao fluxo de cena com limite de contexto por aventura.
