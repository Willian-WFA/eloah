# Roadmap

## PR 1: Base do projeto

- Objetivo: escolher stack e criar app mobile-first vazio com rota principal.
- Escopo permitido: setup, README tecnico, scripts, tela inicial simples.
- Escopo proibido: IA real, auth, billing, marketplace.
- Validacao: app roda localmente e abre em viewport mobile.

## PR 2: Mapa de aprendizado e protocolo v0

- Objetivo: criar o mapa de desenvolvimento infantil e o contrato de aventura que a IA mestre deve seguir.
- Escopo permitido: `docs/CHILD_DEVELOPMENT_LEARNING_MAP.md`, `docs/STORY_PROTOCOL_V0.md`, dominios de aprendizado, movimentos seguros, idiomas, recompensas, avatar e progresso.
- Escopo proibido: IA real, app visual, diagnostico infantil, recomendacao medica.
- Validacao: protocolo permite criar uma aventura com cenas, guardrails, retorno suave, desafios e recompensas.

## PR 3: Biblioteca por pacotes de aventura

- Objetivo: exibir biblioteca lendo metadados de pacotes/arquivos de aventura, sem hardcode em uma historia unica.
- Escopo permitido: loader local de aventuras, schema/manifest minimo, card de historia, tela de detalhes, troca de historia.
- Escopo proibido: criador de aventuras, banco remoto.
- Validacao: `portal-das-estrelinhas` aparece e uma segunda aventura dummy poderia entrar sem mudar codigo central.

## PR 4: Sessao jogavel sem IA real, com imagens, progresso e tempo

- Objetivo: provar o loop narrativo com dados e cenas predefinidas.
- Escopo permitido: tela de sessao, escolhas estilo D&D infantil, dado D6 por desafio, consequencias por faixa de resultado, pontos de sorte/vantagem, progresso, desafios de movimento/idioma mockados, recompensas, imagens preaprovadas por marco, limite de tempo configuravel, aviso e checkpoint.
- Escopo proibido: provider LLM.
- Validacao: usuario completa uma aventura em poucos passos, so rola dado quando o mestre pede, usa no maximo uma rolagem comum por desafio, ou pausa por tempo e retoma do checkpoint.

## PR 5: Contrato do mestre IA

- Objetivo: definir prompt, estrutura de entrada/saida e guardrails.
- Escopo permitido: backend endpoint mockado, tipos, testes de contrato, estrategias de retorno para linha central, selecao de desafio por dominio de aprendizado.
- Escopo proibido: conversas livres e persistencia sensivel.
- Validacao: testes cobrem respostas seguras, curtas e dentro do escopo.

## PR 5B: Audio visual e feedback de jogo

- Objetivo: implementar ids/fallbacks para sons e efeitos definidos no pacote da aventura.
- Escopo permitido: efeitos de dado, vitoria, recompensa, checkpoint, controles de som, fallback silencioso.
- Escopo proibido: assets finais obrigatorios ou geracao automatica de midia.
- Validacao: cada evento de feedback possui fallback e nao quebra a sessao quando asset falta.

## PR 6: IA real atras do backend

- Objetivo: conectar DeepSeek API com fallback seguro.
- Escopo permitido: wrapper unico, env vars `DEEPSEEK_API_KEY`/`DEEPSEEK_MODEL`, rate limit simples, logs seguros.
- Escopo proibido: chamada direta do frontend para LLM.
- Validacao: sessao completa usando IA com aventura fixa.

## PR 7: Medidor de tokens e custo IA

- Objetivo: registrar consumo da IA mestre por chamada/sessao.
- Escopo permitido: evento LLM seguro, calculador configuravel por modelo, agregacao por historia/sessao, testes de custo.
- Escopo proibido: armazenar prompt completo, fala/audio bruto, dados pessoais da crianca ou usar custo estimado como billing.
- Validacao: chamada mockada do DeepSeek grava provider, modelo, tokens, custo estimado, status, latencia e erro seguro.

## PR 8: Voz no loop de jogo

- Objetivo: permitir que a crianca de comandos por voz durante a aventura.
- Escopo permitido: botao de falar, speech-to-text controlado, TTS do narrador, fallback para texto.
- Escopo proibido: escuta continua, armazenamento de audio bruto, voz sem consentimento adulto.
- Validacao: comando de voz avanca uma cena e resposta do narrador toca em audio.

## PR 9: Personagem dinamico e itens visuais

- Objetivo: permitir que descricao da crianca influencie personagem e recompensas visuais.
- Escopo permitido: avatar por assets/camadas preaprovadas, itens conquistaveis, mudanca visual por progresso.
- Escopo proibido: pedir foto da crianca, gerar imagem livre sem curadoria adulta, conteudo assustador/adulto.
- Validacao: crianca descreve personagem, app monta versao segura e muda item apos conquista.

## PR 10: Criador adulto de aventuras

- Objetivo: permitir adicionar uma nova aventura a biblioteca.
- Escopo permitido: formulario protegido por tela adulta simples, validacao de schema, selecao de imagens preaprovadas por marco.
- Escopo proibido: marketplace publico e compartilhamento externo.
- Validacao: nova aventura criada aparece na biblioteca e inicia sessao.
