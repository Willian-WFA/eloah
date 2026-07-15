# AGENTS.md

Este projeto segue o metodo do The Creator para descoberta, especificacao e execucao por agentes.

## Antes de agir

1. Leia `README.md`.
2. Leia `PROJECT_CONTEXT.md`.
3. Leia `docs/CURRENT_STATE.md`, se existir.
4. Preserve mudancas existentes no worktree.
5. Nao implemente produto antes de entender objetivo, usuario, fluxo central, dados sensiveis, riscos e criterio de pronto.

## Regras de seguranca infantil

- Trate o produto como experiencia para crianca com supervisao adulta.
- Nao colete dados pessoais da crianca sem necessidade explicita.
- Nao adicione chat livre sem guardrails.
- Nao gere conteudo assustador, adulto, violento, humilhante, manipulativo ou comercial.
- Sempre mantenha controle adulto para criar, editar, aprovar e excluir aventuras.
- Toda resposta da IA deve caber no escopo da aventura aprovada.
- Para voz, prefira botao de falar e nao escuta continua.
- Nao armazene audio bruto da crianca sem decisao explicita de produto, consentimento e politica de retencao.
- Nao gere imagens livremente durante a sessao infantil no MVP; use assets preaprovados.

## Roteamento

- Ideia, produto, arquitetura, roadmap ou prompts para executor: usar `creator-orchestrator`.
- Identidade visual, tokens, componentes e direcao visual infantil: usar `design-system-factory`.
- Implementacao frontend: primeiro validar especificacao, depois criar PRs pequenos.
- IA/narrador: tratar como backend/contrato de seguranca, nao como prompt solto no frontend.

## Estado vivo

Ao fim de cada sessao relevante:

1. Atualize `docs/CURRENT_STATE.md`.
2. Crie um log em `docs/agent-state/YYYY-MM-DD-tema.md`.
3. Registre o que foi feito, validacao, riscos, pendencias e proximo prompt recomendado.
