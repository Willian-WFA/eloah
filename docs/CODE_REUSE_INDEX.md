# Code Reuse Index

Este inventario registra referencias locais para medicao de tokens/custo de IA. Ele nao autoriza copiar codigo sem adaptar ao dominio infantil, stack final e regras de privacidade do RPG Kids.

## Necessidade

Medir consumo da DeepSeek API usada pela IA mestre: tokens de entrada/saida, custo estimado, provider/modelo, action, status, latencia e erro seguro, sem armazenar prompt completo, audio bruto ou dados pessoais da crianca.

## Referencias localizadas

### Gestor - LLM Cost Observability

- Caminho atual lido: `/media/hitsuzen/6995495d-7a34-4f19-9d7a-ae92eca46fc82/home/willian/Documentos/Gestor`
- Arquivos lidos:
  - `services/api/app/models/ai_usage.py`
  - `services/api/app/repositories/ai_usage.py`
  - `services/api/app/schemas/ai_usage.py`
  - `migrations/versions/0020_ai_usage_events.py`
- Achado: possui entidade `AiUsageEvent` com organization/user/entity, provider, model, input/output tokens, cost estimate, action, status e error code; tambem possui repository para criar/listar e contar uso mensal.
- Classificacao: `ADAPTAR`.
- Riscos: modelo e multi-tenancy sao de SaaS/admin; RPG Kids e uso familiar e nao deve carregar campos de ads/diagnosticos. Custo estimado nao deve virar billing.

### Linguini SaaS - LLM Usage Dashboard

- Caminho atual lido: `/media/hitsuzen/6995495d-7a34-4f19-9d7a-ae92eca46fc82/home/willian/Documentos/Linguini-Saas`
- Arquivos lidos:
  - `backend/services/llm_cost_calculator.py`
  - `backend/services/ai_events.py`
  - `backend/routes/admin/llm_usage.py`
  - `backend/tests/test_llm_usage.py`
- Achado: possui calculador por modelo, emissao de eventos de IA, endpoints de overview/by-provider/time-series/events e testes de agregacao.
- Classificacao: `ADAPTAR`.
- Riscos: stack Python/FastAPI e dominio de receitas/admin; nao copiar dashboard inteiro. Para RPG Kids, reaproveitar o padrao: evento seguro, calculo configuravel, agregacoes simples e testes.

## Recomendacao para RPG Kids

Criar uma versao menor e especifica:

- `llm_usage_events` ou equivalente.
- Campos: `story_id`, `session_id`, `turn_id`, `provider`, `model`, `action`, `status`, `input_tokens`, `output_tokens`, `cache_read_tokens`, `estimated_cost`, `latency_ms`, `safe_error_code`, `created_at`.
- Evitar: prompt completo, transcricao integral longa, audio bruto, nome real da crianca, logs de erro crus.
- Configurar precos por modelo em arquivo/env/admin, nao hardcode permanente.
- Comecar com visao adulta simples: custo estimado da sessao, chamadas, tokens e alerta de limite.

## Instrucao para executor

Ao implementar o PR de medidor de tokens/custo, use Gestor e Linguini apenas como referencia arquitetural. Adapte nomes, campos e testes ao RPG Kids. Nao copie codigo literalmente sem revisar stack, privacidade infantil e formato de eventos do projeto.
