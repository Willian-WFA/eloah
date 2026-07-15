# 2026-07-15 - DeepSeek master in playable flow

## Pedido

Conectar o endpoint real `/api/master`, ja validado em producao com `mode=deepseek`, ao fluxo jogavel do RPG Kids.

## Implementado

- `public/app.js` e `prototype/app.js` agora chamam `/api/master`:
  - apos acao da crianca em cena sem dado;
  - apos resultado do dado em cena com sorte.
- O payload enviado ao backend inclui:
  - titulo/objetivo da aventura;
  - cena, narracao, pergunta e opcoes aprovadas;
  - acao da crianca;
  - leitura local da acao;
  - resultado/consequencia local do dado;
  - instrucao de movimento quando houver;
  - perfil da crianca e estilo do mestre;
  - progresso, recompensas e ultimas entradas do `narrativeLog`.
- O frontend so mostra a fala da IA quando `mode=deepseek`.
- Resposta `mock` ou erro nao substitui a narracao local, preservando jogabilidade offline/fallback.
- Entradas da IA entram no diario como `Mestre`.
- `server.js` reforcou o prompt para a IA narrar sem decidir recompensas/progresso, sem sair do escopo aprovado e sem iniciar com `Mestre narrando`.
- Service worker atualizado para `rpg-kids-v2026-07-15-deepseek-master-flow-pwa`.

## Validacao

- `npm run check` passou.
- Servidor local em porta de teste aceitou o novo payload de `/api/master` e respondeu `mode=mock` sem erro, como esperado sem chave local.

## Riscos / pendencias

- Ainda falta teste manual no celular para calibrar sobreposicao de falas: resultado do dado, consequencia local e fala da IA.
- A IA ainda responde texto livre; proximo passo recomendado e evoluir `/api/master` para retorno estruturado com `narration`, `nextPrompt`, `tone`, `sfxCue` e `safetyFlags`.
- Para voz mais teatral de alta qualidade, ainda sera necessario avaliar TTS externo; o navegador continua sendo o TTS atual.
