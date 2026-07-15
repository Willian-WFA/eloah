# Agent State Log

Projeto: RPG Kids
Data: 2026-07-13
Agente/sessao: The Creator / Codex
Branch: sem repositorio git verificado
Commit(s): n/a
PR/Issues: n/a

## Objetivo da sessao

Atualizar a descoberta e especificacao inicial com decisoes do usuario sobre voz, uso familiar, criacao de historias com IA, audio no MVP, imagens de cena e duracao variavel.

## Estado inicial observado

Projeto possuia documentacao inicial criada na sessao anterior, com voz/audio inicialmente tratados como fase futura.

## O que foi feito

- Atualizado `docs/DISCOVERY_NOTES.md` com respostas do usuario.
- Atualizado `docs/MASTER_SPEC.md` para incluir entrada por voz, audio/TTS, imagens preaprovadas e protocolo de historia.
- Atualizado `docs/ROADMAP.md` com PR dedicado ao loop de voz.
- Atualizado `PROJECT_CONTEXT.md` com riscos e arquitetura de voz/midia.
- Atualizado `AGENTS.md` com regras de seguranca para voz e imagens.
- Atualizado `docs/CURRENT_STATE.md`.

## Decisoes tomadas

- O primeiro uso do produto sera familiar.
- A crianca deve poder dar comandos por voz em historias validadas por familiar.
- As historias serao criadas por adulto com apoio de IA e curadoria.
- O MVP deve ter audio/narracao e imagens salvas/preaprovadas por marco de cena.
- A duracao das historias sera variavel conforme o tamanho da aventura.
- Voz deve ser tratada como requisito sensivel: preferir botao de falar, evitar escuta continua e nao armazenar audio bruto.
- Imagens devem ser preaprovadas no MVP, sem geracao livre durante a sessao infantil.

## Arquivos alterados

- `PROJECT_CONTEXT.md`
- `AGENTS.md`
- `docs/DISCOVERY_NOTES.md`
- `docs/MASTER_SPEC.md`
- `docs/ROADMAP.md`
- `docs/CURRENT_STATE.md`
- `docs/agent-state/2026-07-13-discovery-voz-audio-imagens.md`

## Validacao executada

- Revisao documental e consistencia entre discovery, spec, contexto, agentes e roadmap.

## Resultado

RPG Kids agora tem uma direcao de MVP mais clara: jogo familiar com voz, narracao em audio, assets visuais preaprovados e mestre IA controlado por um protocolo de historia.

## O que falta fazer

- Definir formato v0 do protocolo de historia.
- Criar a primeira aventura exemplo.
- Decidir stack final.
- Decidir estrategia de speech-to-text e TTS.
- Definir se o MVP usa botao de falar ou algum modo de escuta controlada.

## Pendencias fora do commit

- Projeto ainda sem repositorio git inicializado.

## Riscos / atencoes

- Voz infantil aumenta risco de privacidade; nao armazenar audio bruto por padrao.
- STT pode interpretar mal criancas pequenas; UX precisa confirmar ambiguidades com carinho.
- Historias longas precisam de checkpoints e resumos para retomada.
- Imagens devem ser preaprovadas para evitar conteudo inadequado.

## Proximo prompt recomendado

Atue como The Creator no projeto RPG Kids. Leia a documentacao atual e crie `docs/STORY_PROTOCOL_V0.md` com um modelo JSON/Markdown para aventuras: canon, objetivo final, linha central, cenas, assets, guardrails, retornos suaves, regras de voz, criterios de encerramento e exemplos. Depois crie `content/adventures/primeira-aventura.md` como aventura exemplo para uma crianca de 4 anos.
