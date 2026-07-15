# 2026-07-15 - DeepSeek docs, model and URL

## Pedido

Usuario informou que adicionou a key na Hostinger, mas nao tinha certeza do modelo e da URL, e pediu conferencia na documentacao oficial da DeepSeek.

## Confirmado na documentacao oficial

- Base URL OpenAI: `https://api.deepseek.com`
- Endpoint de chat usado pelo app: `https://api.deepseek.com/chat/completions`
- Modelos atuais: `deepseek-v4-flash` e `deepseek-v4-pro`
- `deepseek-chat` e `deepseek-reasoner` estao marcados para deprecacao em `2026-07-24 15:59 UTC`
- Thinking mode vem habilitado por padrao; para narracao curta e direta, o backend envia `thinking: { "type": "disabled" }`

## Alteracoes

- `.env.example` atualizado para `DEEPSEEK_MODEL=deepseek-v4-flash`.
- `docs/HOSTINGER_DEPLOY.md` atualizado com as variaveis corretas para Hostinger.
- `PROJECT_CONTEXT.md` documenta `DEEPSEEK_API_URL` e o modelo recomendado.
- `docs/CURRENT_STATE.md` registra a decisao.
- `server.js` carrega `.env` local quando existir, sem sobrescrever variaveis ja definidas no ambiente.

## Proximo passo

Na Hostinger, confirmar:

```text
DEEPSEEK_API_KEY=<chave real>
DEEPSEEK_MODEL=deepseek-v4-flash
DEEPSEEK_API_URL=https://api.deepseek.com/chat/completions
```

Depois testar uma chamada real para `/api/master` em producao.
