# Project Context

## Project Overview

- Nome: RPG Kids
- Dominio: jogo narrativo infantil com IA como mestre de RPG.
- Usuarios: crianca pequena com supervisao adulta; adulto responsavel; autor de aventuras.
- Apps/servicos: app mobile-first, backend/API, motor de narracao IA, biblioteca de historias, mapa de aprendizado, avatar/progresso.
- Portas locais: a definir quando a stack for escolhida.
- Status: descoberta e especificacao inicial.

## Architecture

- Frontend: recomendado iniciar como PWA/mobile web para validar rapido no celular.
- Backend: API simples para aventuras, sessoes e chamadas controladas ao LLM.
- Admin adulto: pode ser uma area protegida no proprio app no MVP.
- Worker/jobs: nao necessario no primeiro prototipo, exceto se geracao de historias for assincrona.
- Banco: SQLite ou Postgres, conforme ambicao de deploy.
- Storage: JSON/Markdown versionado para aventuras no prototipo; banco no produto; imagens locais/preaprovadas por cena.
- Integracoes externas: DeepSeek API para mestre IA, speech-to-text e TTS.

## AI/LLM

- A IA nao deve conversar livremente sem escopo.
- Cada aventura deve fornecer mundo, objetivo, cenas permitidas, personagens, tom, regras de seguranca e final esperado.
- O backend deve montar prompt versionado e validar saida estruturada.
- Respostas devem ser curtas, infantis, nao assustadoras e sempre oferecer escolhas simples.
- A IA pode improvisar detalhes seguros, mas nao pode mudar tema, inserir violencia grafica, medo intenso, conteudo adulto, coleta de dados pessoais ou compras.
- Registrar uso/custo de IA sem armazenar dados sensiveis da crianca. O evento deve conter provider, modelo, action, status, tokens de entrada/saida, custo estimado, latencia e erro seguro.
- O mestre IA deve ter estrategias de retorno para quando a crianca pedir algo inesperado: acolher a intencao segura, transformar em consequencia leve e reconectar ao proximo marco da linha central.
- A IA deve usar `docs/CHILD_DEVELOPMENT_LEARNING_MAP.md` para selecionar desafios de movimento, idioma, memoria, empatia, criatividade e observacao sem sobrecarregar a cena.

## Voice And Media

- Entrada principal desejada: voz da crianca.
- MVP deve preferir botao de falar em vez de escuta continua.
- Evitar armazenar audio bruto; quando inevitavel para debug local, isso deve ser opcional, temporario e desligado por padrao.
- Narrador deve responder em audio/TTS e manter texto curto para o adulto acompanhar.
- Imagens do MVP devem ser assets preaprovados por historia/cena, nao geradas livremente durante a sessao.
- Personagem/avatar deve preferir assets/camadas preaprovadas; geracao por IA so em modo adulto/curadoria.

## Learning And Progression

- Fonte inicial: `docs/CHILD_DEVELOPMENT_LEARNING_MAP.md`.
- Progressao por conquistas: coragem, gentileza, movimento, palavras novas, criatividade, pensamento esperto e cooperacao.
- Desafios fisicos devem ser curtos, opcionais, supervisionados e adequados a idade.
- Idiomas devem entrar como exposicao leve: 1 ou 2 palavras/frases por cena, sempre com contexto em portugues.
- Recompensas podem alterar avatar/personagem por itens: escudo, espada, livro, cetro, chapeu, capa, varinha, martelo, botas e medalha.

## Dados Sensíveis

- Nome/apelido da crianca: opcional e evitavel no MVP.
- Idade: tratar como dado sensivel; preferir faixa etaria configurada pelo adulto.
- Voz/audio: MVP inclui voz, mas deve evitar armazenamento de audio bruto e exigir uso familiar/supervisionado.
- Historico de jogo: armazenar o minimo necessario.

## Environment

| Variable | Purpose | Required |
| --- | --- | --- |
| `DEEPSEEK_API_KEY` | Chave usada pelo backend para chamar a DeepSeek API. | yes |
| `DEEPSEEK_MODEL` | Modelo configuravel usado pela IA mestre. Default recomendado: `deepseek-v4-flash`. | yes |
| `DEEPSEEK_API_URL` | Endpoint de chat. Default recomendado: `https://api.deepseek.com/chat/completions`. | yes |
| `LLM_COST_PRICING_CONFIG` | Fonte configuravel de preco por modelo para estimativa de custo. | no |

## Testing

- Testes de contrato para estrutura de aventura.
- Testes de guardrails do narrador.
- Testes de selecao segura de desafios de aprendizado/movimento.
- Testes de progressao e recompensa visual sem ranking.
- Testes de fluxo completo de uma sessao curta.
- Validacao mobile no navegador antes de tratar como app instalavel.

## Git Artifact Policy

- Nao incluir atribuicao a ferramenta de IA em commits, PRs, changelog ou artefatos Git sem pedido explicito.
- Ao fim de cada sessao relevante, atualizar `docs/CURRENT_STATE.md` e criar log em `docs/agent-state/`.
