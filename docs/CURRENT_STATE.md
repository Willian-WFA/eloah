# Current State

Projeto: RPG Kids
Atualizado em: 2026-07-15
Agente/sessao: The Creator / Codex
Branch: main
Commit(s): 1e90d0f Initial RPG Kids playable prototype
PR/Issues: n/a

## Resumo curto

Projeto em descoberta para app/jogo mobile familiar de RPG infantil com narrador IA via DeepSeek API, dados, entrada por voz, audio/TTS, imagens preaprovadas por cena, mapa de desenvolvimento infantil, desafios fisicos/idiomas e biblioteca de aventuras criadas por adulto com apoio de IA.

## Estado atual

Documentos iniciais criados e atualizados com as primeiras decisoes de produto: uso familiar, comando por voz, historias hibridas adulto + IA, audio no MVP e imagens salvas/preaprovadas para marcos de cena. Ja existem mapa de aprendizado, protocolo V0 de historia, primeira aventura exemplo, regra para pacotes multimodais com tempo de sessao e prototipo estatico jogavel sem IA real.

## O que foi feito desde o ultimo checkpoint

- Estruturada a visao inicial do produto.
- Registrados riscos de IA e seguranca infantil.
- Definido MVP recomendado como PWA/mobile-first.
- Criado roadmap em PRs pequenos.
- Respondidas perguntas centrais de discovery sobre voz, publico inicial, criacao de historias, audio/imagens e duracao.
- Atualizados spec, roadmap, contexto e regras de agentes para incluir voz e assets visuais.
- Registrada decisao de usar DeepSeek API.
- Localizadas referencias de medicao de token/custo em Gestor e Linguini.
- Criado `docs/CODE_REUSE_INDEX.md` com classificacao de reaproveitamento.
- Criado `docs/CHILD_DEVELOPMENT_LEARNING_MAP.md` com dominios de desenvolvimento, desafios, progresso, idiomas, avatar e guardrails.
- Atualizados spec, roadmap, discovery e contexto para priorizar desenvolvimento ludico e personagem dinamico.
- Criado `docs/STORY_PROTOCOL_V0.md` como contrato de aventura para IA mestre.
- Criada primeira aventura exemplo em `content/adventures/portal-das-estrelinhas.md`.
- Atualizado protocolo para tratar historia como pacote de aventura com source, manifest, assets, sons, efeitos, templates variaveis e limite de tempo definido pelos pais.
- Atualizada aventura exemplo com metadados de biblioteca, template, politica de sessao, sons/efeitos e encerramento por tempo.
- Criado prototipo estatico em `prototype/` com biblioteca, duas aventuras, sessao, dado, progresso, recompensas, tempo e checkpoint.
- Ajustado prototipo apos feedback: textos visiveis com acentos, dado em modal com animacao/glow, rolagem limitada a 1 vez por desafio, avancar bloqueado ate rolar dado quando necessario, remocao de mensagens tecnicas de efeito na tela e avatar visual placeholder.
- Ajustado loop de jogo para estilo D&D infantil: narrador pergunta "o que voce faz?", cenas oferecem 3 opcoes + livre escolha, D6 resolve consequencias por faixa 1-3/4/5-6 e pontos de sorte permitem rolar 2 dados ficando com o melhor.
- Atualizada aventura dummy da caverna para refletir o exemplo de entrada de caverna, placa de 4 pulos, vagalumes, complicacao segura e premio potencial.
- Definido perfil de humor infantil: humor bobo e levemente escatologico pode ser usado quando aprovado pelo adulto, limitado a `pum`, `cocô` e `xixi`, com personagens absurdos e afetuosos.
- Ajustado prototipo para separar painel dos pais e painel da crianca: adulto escolhe historia, revisa resumo/pontos de atencao, configura tempo/permissoes e aprova antes de iniciar a sessao infantil.
- Removido humor escatologico do conteudo jogavel do prototipo; permanecem personagens absurdos curados, como guardia com orelhas de cachorro e coelho barrigudo.
- Expandido painel dos pais no prototipo com metadados da historia, resumo adulto, pontos de atencao, contextos sinalizados, configuracao de tempo/sons/humor restrito e extensao futura desabilitada.
- Adicionado modelo inicial de creditos no prototipo: leitura completa gratuita, resumo automatico consumindo credito e tempo base fixo de 30 minutos com extensao paga por credito.
- Adicionado fluxo mock de rascunho gerado por IA no painel dos pais: cria historia em rascunho, preenche pontos de atencao/contextos sinalizados e exige revisao antes de liberar para a crianca.
- Persistidos em `localStorage` o saldo de creditos, resumos pagos e rascunhos mock gerados por IA.
- Corrigido botao "Ler historia completa" no painel dos pais: agora exibe o contrato jogavel completo da aventura, incluindo narracao, pergunta do mestre, escolhas, desafio fisico, idioma, faixas do dado, recompensa e progresso.
- Reescrita a aventura `O Portal das Estrelinhas` para ter um arco mais coerente: Luma perdeu tres brilhos do mapa, e a crianca precisa recuperar coragem, palavra e cuidado para abrir o portal.
- Ajustado criterio de progresso do Portal: a capa deixou de conceder criatividade sem justificativa e passou a ser recompensa ligada a gentileza/acolhimento.
- Adicionado campo `learningCriteria` na leitura completa para o responsavel ver por que cada cena concede determinado progresso.
- Reescrita a aventura `A Caverna dos Bichinhos` para voltar ao eixo da ideia original: entrada de caverna, escolha da crianca, dado, placa dos 4 pulos, vagalumes, sala de desafio, quebra-cabeca e personagens absurdos curados.
- Adicionado item visual `Martelo Macio` ao avatar do prototipo.
- Adicionado contrato multimodal no prototipo: cenas agora podem declarar `image`, `theme`, `sound`, `effects` e `assetPack`.
- O painel dos pais passou a mostrar imagem, sons e efeitos dentro da leitura completa da historia.
- O painel da crianca passou a renderizar placeholders visuais por cena com paleta/tema, efeitos CSS de entrada/resultado/recompensa e sons sinteticos curtos via Web Audio quando o toggle de sons esta ligado.
- Criado template reutilizavel em `content/templates/adventure-template-v0.json`.
- Atualizado `docs/STORY_PROTOCOL_V0.md` com `Contrato multimodal V0`.
- Evoluido o motor para permitir progresso e recompensa por resultado do dado (`low`, `middle`, `high`), nao apenas por cena.
- A leitura completa agora mostra progresso e recompensa de cada faixa do dado para auditoria do responsavel.
- O painel dos pais agora mostra o `assetPack` da aventura.
- Adicionada escolha livre no painel da crianca com campo de texto, botao de voz e feedback de criterio.
- Implementada avaliacao local de acao livre: gentileza, pensamento esperto, movimento, palavras novas, criatividade ou coragem como fallback.
- A acao livre pode conceder no maximo 1 ponto por cena sem bloquear a progressao/recompensa do dado.
- Checkpoint agora preserva cenas que ja receberam progresso por acao livre.
- Atualizados `docs/STORY_PROTOCOL_V0.md` e `content/templates/adventure-template-v0.json` com `actionEvaluation`.
- Adicionado `Diário da aventura` no painel da crianca, funcionando como narrador/mestre local.
- O diario registra cena, acao da crianca, resultado do dado, desafio, recompensa e checkpoint.
- O checkpoint agora preserva `narrativeLog`.
- Entradas do diario escapam HTML antes de renderizar, protegendo texto vindo de escolha livre.
- Adicionada voz do narrador via `speechSynthesis` do navegador, sem API externa.
- O narrador lê cena, pergunta, feedbacks, resultado do dado, desafio, checkpoint e fim.
- Painel dos pais ganhou controles de voz do narrador: ligar/desligar e ritmo da narração.
- Painel da criança ganhou controles `Ouvir de novo` e `Pausar voz`.
- Preferências de narração passaram a ser salvas em `localStorage` junto do estado parental.
- A escuta por voz interrompe a fala do narrador antes de abrir o microfone, evitando conflito.
- Atualizados `docs/STORY_PROTOCOL_V0.md` e `content/templates/adventure-template-v0.json` com contrato de narração.
- Preparada versão Node.js para deploy na Hostinger.
- Criado `server.js` sem dependências externas, servindo `public/`, `/health` e `/api/master` mock.
- Criado `package.json` com `npm start`, `npm run check` e `npm run sync:public`.
- Copiados os arquivos jogáveis do protótipo para `public/`.
- Criado `.gitignore`.
- Criado `docs/HOSTINGER_DEPLOY.md` com instruções de configuração na Hostinger.
- Adicionadas 3 aventuras curtas mais completas ao catálogo jogável: `O Navio do Chá das Nuvens`, `O Jardim do Relógio Girafa` e `A Biblioteca do Dragão Sonolento`.
- As novas aventuras já têm começo, meio, objetivo, desafio final/chefão, recompensa, critérios de aprendizado, dados, movimentos, idiomas, sons e assets CSS por cena.
- Adicionada rubrica contextual por cena (`actionRubric`) para avaliar escolhas livres/voz por intenção narrativa, reduzindo dependência de palavras-chave globais.
- Aplicadas rubricas contextuais também nas cenas principais das aventuras existentes, corrigindo progresso arbitrário.
- Melhorado avatar do herói com identidade dinâmica baseada no progresso dominante, rosto, chapéu, aura e variação visual por perfil de desenvolvimento.
- Adicionados novos assets CSS e efeitos visuais para navio/nuvens, jardim/relógio e biblioteca/dragão.
- Expandido motor de sons sintéticos com padrões para mar, vento/tempestade, jardim/relógio e biblioteca/dragão.
- Criado resumo de retomada a partir de `narrativeLog`, últimas ações, dados/desafios, recompensas, progresso dominante e cena atual.
- Gerado pacote inicial de 9 imagens bitmap para as 3 aventuras novas, uma por cena.
- Imagens salvas em `prototype/assets/scenes/` e `public/assets/scenes/`, com PNG original e versão WebP otimizada.
- As cenas novas passaram a apontar para `.webp` em `image.src`, mantendo fallback CSS.
- Renderer de cena atualizado para exibir bitmap quando `image.src` existir.
- Servidor Node atualizado para servir `.webp` com MIME `image/webp`.
- Fluxo de rodada ajustado para parecer mais mestre de RPG: o narrador apresenta cena e opções, a criança precisa escolher/falar uma ação, depois o dado é liberado e só então a cena pode avançar.
- A narração agora fala as opções em voz alta como `Opção 1`, `Opção 2`, `Opção 3` e escolha livre.
- Adicionado indicador visual de rodada (`roundHint`) com etapas: escolher ação, rolar dado, cumprir desafio e avançar.
- Botões de escolha agora mostram numeração visual e preservam seleção.
- Voz do narrador melhorada com fila de frases curtas, pausas entre blocos e carregamento assíncrono das vozes do navegador.
- Fala da criança virou ação principal no painel da criança: o bloco de voz subiu antes das opções, o botão principal agora é `Falar ação` e as opções funcionam como sugestões narradas.
- Adicionadas reações teatrais do mestre por tipo de progresso/ação (`coragem`, `gentileza`, `movimento`, `palavras_novas`, `criatividade`, `pensamento_esperto`, `cooperacao`).
- Ajustada narração para tom mais teatral, com abertura `Mestre narrando`, opções como escolhas de aventura e pedido de dado mais encenado.
- Preparado PWA mobile para Hostinger com `manifest.webmanifest`, `sw.js`, ícones PNG/SVG e registro de service worker.
- `server.js` passou a servir `.webmanifest` com `application/manifest+json`.
- `npm run sync:public` agora também copia manifest, service worker e ícones.
- Adicionado no painel dos pais o seletor `Tratamento da criança` com opções `Menina · aventureira` e `Menino · aventureiro`.
- O tratamento escolhido agora é salvo em `localStorage`, preservado no checkpoint e usado na sessão da criança.
- Narrador, feedback, diário, resultado do dado, resumo final, rótulo de ação e título do avatar passam a adaptar `herói/heroína`, `aventureiro/aventureira` e títulos como `Guardião/Guardiã`, `Mago/Maga`, `Parceiro/Parceira`.
- Criada camada `genderedText()` para adaptar textos antigos de aventura quando o perfil for menina, sem reescrever manualmente cada cena.
- Cache do service worker atualizado para `rpg-kids-v2026-07-15-gender-voice-pwa`.
- Adicionados controles de perfil no painel dos pais: nome/apelido da criança, estilo do mestre, cor do avatar, companheiro mágico e modo só voz.
- O nome/apelido agora entra na narração inicial, no avatar e no relatório final.
- Estilo do mestre agora altera frases de condução: `Teatral e engraçado`, `Calmo e doce`, `Épico leve` e `Professor gentil`.
- Modo só voz esconde as opções visuais e deixa a fala como controle principal no painel da criança.
- Avatar ganhou cor configurável e companheiro mágico (`Fagulha`, `Nuvinha`, `Sininho`, `Folhinha`).
- Ação livre ganhou tratamento para silêncio, repetição de ação na mesma cena e ações impossíveis/fora de rota, com redirecionamento seguro.
- Encerramento ganhou `Relatório dos pais`, mostrando domínios treinados, pontos principais, quantidade de ações declaradas e desafios de dado resolvidos.
- Cache do service worker atualizado para `rpg-kids-v2026-07-15-profile-learning-pwa`.
- Corrigido retorno ao painel dos pais: ao clicar em voltar, a narração em andamento agora é cancelada junto com a troca de tela.
- Adicionado balão de ajuda `?` para explicar `humor restrito` no painel dos pais, mantendo o padrão de remover esse conteúdo.
- Removida a abertura falada `Mestre narrando` da narração de cena.
- Ajustada fala das opções: a narração enumera apenas opções concretas e não lê `Livre escolha` quando em seguida já informa que a criança pode inventar a própria ação.
- Adicionadas reações teatrais por resultado exato do dado, de 1 a 6, antes da consequência narrativa.
- Cache do service worker atualizado para `rpg-kids-v2026-07-15-dice-humor-help-pwa`.
- Repositório Git local inicializado em `main`, com remoto `https://github.com/Willian-WFA/eloah.git`.
- Criado commit local inicial `1e90d0f Initial RPG Kids playable prototype`, incluindo código, docs, PWA, `public/`, `prototype/` e imagens PNG/WebP.
- Push para GitHub ficou bloqueado por autenticação local inválida do `gh`/HTTPS.
- README atualizado para explicar conteúdo, imagens, aventura longa e publicação no GitHub.
- Criado `docs/GITHUB_PUBLISH.md` com passos de autenticação, push, Hostinger e arquivos que devem subir.
- Criado template `content/templates/long-branching-adventure-template-v1.json` para aventuras longas com hub, grafo de quests, tokens centrais, checkpoints e contrato do narrador.
- Criada aventura longa em rascunho `content/adventures/cidade-dos-sinos-claros.md`, planejada para pelo menos 3 horas, com cidade-hub, NPCs, quests sequenciais, recompensas, inglês, mandarim, desafios físicos e final cooperativo.
- Atualizado `docs/STORY_PROTOCOL_V0.md` com seção `Aventura longa ramificada V1`.

## Decisoes tomadas

- Nao implementar codigo antes de fechar perguntas centrais de produto.
- Tratar IA como mestre limitado por contrato de aventura, nao como chat livre.
- Priorizar supervisao adulta e minimo de dados sensiveis.
- Primeiro uso sera familiar.
- Entrada principal desejada no MVP: comando por voz da crianca.
- Historias serao criadas por adulto com apoio de IA e curadoria.
- MVP deve ter audio/narracao e imagens preaprovadas por marcos de cena.
- Duracao da sessao sera variavel conforme o tamanho da historia.
- Voz no MVP deve evitar escuta continua e armazenamento de audio bruto.
- DeepSeek API sera o provider alvo da IA mestre no MVP.
- Medicao de token/custo deve entrar junto da integracao real com IA, sem armazenar prompt completo, audio bruto ou dados pessoais da crianca.
- Custo de token nao e preocupacao central; medicao fica como telemetria/controle, nao como norte de produto.
- O jogo deve desenvolver linguagem, cognicao, socioemocional, motricidade ampla/fina, idiomas e criatividade por meio de desafios ludicos.
- A crianca pode descrever personagem por voz e ganhar itens que mudam o avatar.
- Progresso deve medir conquistas pessoais, sem ranking.
- Protocolo V0 usa Markdown com YAML/front matter no MVP, podendo virar JSON/schema depois.
- Primeira aventura exemplo: `O Portal das Estrelinhas`.
- Historias devem ser adicionadas/trocadas por pacote/manifesto, nao hardcoded no app.
- Cada historia pode ter template proprio, direcao audiovisual e politica de sessao.
- Imagem, som e efeito devem ser declarados pela cena, com fallback silencioso/visual se o asset real ainda nao existir.
- Pais podem definir tempo diario, com aviso antes do fim, extensao suave e checkpoint para continuar outro dia.
- Primeiro prototipo fica sem DeepSeek, STT e TTS; usa cenas predefinidas e placeholders.
- Dado deve ser requisito de cenas de sorte e ter limite de uma rolagem por rodada/desafio.
- Mensagens tecnicas como ids de efeito nao devem aparecer para a crianca.
- O resultado do dado deve vir do contrato da cena (`diceOutcomes`) sempre que possivel, nao de texto generico fixo no motor.
- Pontos de sorte sao recurso ludico/magico, nao moeda real: no prototipo, 1 ponto permite vantagem em uma rolagem.
- Humor bobo faz parte do design de engajamento para 4-6 anos quando declarado pela aventura.
- Humor escatologico deve ficar restrito e fora do padrao; se uma historia trouxer esse tipo de conteudo, o painel dos pais deve exibir contexto e exigir decisao explicita/remocao antes de liberar.
- Leitura integral da historia e aprovacao manual devem continuar gratuitas; credito deve ser usado para conveniencia, como resumo automatico, e para extensao de tempo acima de 30 minutos.
- Historia gerada por IA deve entrar primeiro como rascunho adulto, nunca diretamente no painel da crianca.
- O validador/revisor deve preencher `contentReview`, incluindo resumo, flags, contextos sinalizados e consentimentos necessarios.
- Rascunhos e estado parental precisam sobreviver a refresh no prototipo local para permitir teste real no celular.
- Esse humor nao pode virar humilhacao, vergonha corporal, nojo pesado, acidente realista constrangedor, conteudo sexual/adulto ou punicao.
- Personagens absurdos e divertidos sao desejados quando curados pelo adulto, por exemplo mulher com orelha de cachorro, girafa de pescoço curto e coelho barrigudo.
- Progresso pedagogico nao deve ser arbitrario: cada ponto precisa ter criterio observavel ligado a acao, desafio, explicacao ou consequencia da cena.
- Escolhas livres devem preferir rubrica contextual da cena (`actionRubric`) antes da rubrica global, para que o mesmo verbo possa ter significado diferente conforme o desafio.
- Resultado do dado pode definir progresso/recompensa especificos; recompensas especiais devem preferir resultado alto ou cumprimento de desafio.
- Acao livre/voz deve ser avaliada por rubrica auditavel antes da IA real; a IA pode ajudar depois, mas nao deve conceder progresso fora dos limites do app.
- Voz no MVP deve ser acionada por botao, sem escuta continua.
- O diario do mestre deve virar fonte de contexto curta para retomada, resumo e futura integracao com IA mestre.
- TTS local do navegador entra antes de TTS externo para validar texto, ritmo e engajamento.
- Voz do narrador deve ser controlada pelos pais e pela criança, com repetir ultima fala e pausar voz.
- Deploy em Hostinger Node.js deve servir `public/` via `server.js`; chaves futuras da DeepSeek devem ficar em variáveis de ambiente, nunca no frontend.
- O loop padrão da criança deve seguir ordem de mestre: ouvir cena/opções, declarar ação, resolver dado/desafio quando houver e só então avançar.
- Como a criança prefere falar, voz deve ser a ação primária da interface; botões de opção são apoio/sugestão.
- PWA/microfone fora de localhost deve ser testado em HTTPS na Hostinger.
- Tratamento de gênero deve ser configurável pelo responsável e aplicado na fala do mestre; novas histórias devem evitar masculino fixo quando possível.
- Personalização de nome/personagem, estilo do mestre, avatar e modo só voz são parte do MVP familiar antes da IA real.
- Relatório de aprendizado para os pais deve continuar descritivo e não clínico.
- A reação emocional ao dado deve vir antes da consequência da cena, para reforçar a sensação de mestre de RPG sem esconder o resultado.
- Aventuras longas devem ser estruturadas como hub + quests + linha central, com transições narradas entre locais e sem grandes saltos de acontecimento.
- Uma aventura de 3 horas deve ser planejada por sessões curtas com retomada, deslocamento, NPC/desafio, dado, consequência e checkpoint.

## Arquivos alterados

- `README.md`
- `docs/GITHUB_PUBLISH.md`
- `.gitignore`
- `package.json`
- `server.js`
- `prototype/assets/scenes/*.png`
- `prototype/assets/scenes/*.webp`
- `prototype/assets/icons/icon.svg`
- `prototype/assets/icons/icon-192.png`
- `prototype/assets/icons/icon-512.png`
- `prototype/manifest.webmanifest`
- `prototype/sw.js`
- `public/assets/scenes/*.png`
- `public/assets/scenes/*.webp`
- `public/assets/icons/icon.svg`
- `public/assets/icons/icon-192.png`
- `public/assets/icons/icon-512.png`
- `public/manifest.webmanifest`
- `public/sw.js`
- `PROJECT_CONTEXT.md`
- `AGENTS.md`
- `docs/DISCOVERY_NOTES.md`
- `docs/MASTER_SPEC.md`
- `docs/ROADMAP.md`
- `docs/HOSTINGER_DEPLOY.md`
- `docs/CHILD_DEVELOPMENT_LEARNING_MAP.md`
- `docs/STORY_PROTOCOL_V0.md`
- `docs/CODE_REUSE_INDEX.md`
- `docs/CURRENT_STATE.md`
- `content/adventures/portal-das-estrelinhas.md`
- `content/adventures/cidade-dos-sinos-claros.md`
- `content/templates/adventure-template-v0.json`
- `content/templates/long-branching-adventure-template-v1.json`
- `public/index.html`
- `public/styles.css`
- `public/app.js`
- `public/adventures.js`
- `prototype/index.html`
- `prototype/styles.css`
- `prototype/adventures.js`
- `prototype/app.js`
- `docs/agent-state/2026-07-13-dnd-dice-luck-loop.md`
- `docs/agent-state/2026-07-13-silly-potty-humor-profile.md`
- `docs/agent-state/2026-07-13-parent-child-panel-split.md`
- `docs/agent-state/2026-07-13-estado-inicial.md`
- `docs/agent-state/2026-07-13-discovery-voz-audio-imagens.md`
- `docs/agent-state/2026-07-13-deepseek-token-cost.md`
- `docs/agent-state/2026-07-13-learning-map-avatar-progress.md`
- `docs/agent-state/2026-07-13-story-protocol-v0.md`
- `docs/agent-state/2026-07-13-static-playable-prototype.md`
- `docs/agent-state/2026-07-13-full-story-and-adventure-depth.md`
- `docs/agent-state/2026-07-13-learning-criteria-cave-rewrite.md`
- `docs/agent-state/2026-07-13-multimodal-template-effects.md`
- `docs/agent-state/2026-07-13-outcome-progress-rewards.md`
- `docs/agent-state/2026-07-13-free-action-voice-rubric.md`
- `docs/agent-state/2026-07-13-narrator-journal.md`
- `docs/agent-state/2026-07-13-browser-narrator-voice.md`
- `docs/agent-state/2026-07-13-hostinger-node-deploy.md`
- `docs/agent-state/2026-07-14-story-depth-rubric-avatar-assets-resume.md`
- `docs/agent-state/2026-07-15-rpg-master-flow-narrator-options.md`
- `docs/agent-state/2026-07-15-voice-first-pwa-hostinger.md`
- `docs/agent-state/2026-07-15-child-gender-treatment.md`
- `docs/agent-state/2026-07-15-profile-style-avatar-voice-learning.md`

## Validacao executada

- Revisao documental apos atualizacao das decisoes de discovery.
- Inspecao local de referencias de medicao de custo/token em Gestor e Linguini.
- Consulta a referencias oficiais/institucionais iniciais: CDC, NAEYC, WHO e Cambridge English.
- Revisao documental do protocolo e aventura exemplo.
- Revisao documental da arquitetura de pacotes multimodais e tempo de sessao.
- `node --check prototype/app.js`
- `node --check prototype/adventures.js`
- Revisao textual do prototipo para acentos e remocao de feedback tecnico visivel.
- Validacao sintatica do ajuste D&D executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Validacao sintatica apos perfil de humor executada com `node --check prototype/adventures.js`.
- Validacao sintatica apos separacao pai/crianca executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Validacao sintatica apos detalhes do painel dos pais executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Busca no prototipo por `pum`, `cocô`, `xixi`, `light_potty` e `allowedPotty` sem ocorrencias.
- Validacao sintatica apos modelo de creditos executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Validacao sintatica apos rascunho IA mock executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Busca no prototipo por `pum`, `cocô`, `xixi`, `light_potty` e `allowedPotty` continua sem ocorrencias.
- Validacao sintatica apos persistencia local executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Validacao sintatica apos leitura completa e aprofundamento das aventuras executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Busca no prototipo por `perdeu três brilhos`, `renderFullScene` e `full-dice` confirmou presenca dos novos fluxos.
- Busca no prototipo por `pum`, `cocô`, `xixi`, `light_potty` e `allowedPotty` continua sem ocorrencias.
- Validacao sintatica apos criterio pedagogico e reescrita da caverna executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Busca no prototipo confirmou `learningCriteria`, `Critério de aprendizado`, `Martelo Macio` e `hero-hammer`; tambem confirmou ausencia de `Eu escolho minha capa`, `Lanterna de Lua` e `resgate de uma lanterna`.
- Validacao sintatica apos contrato multimodal executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Validacao do template executada com `node -e "JSON.parse(require('fs').readFileSync('content/templates/adventure-template-v0.json','utf8')); console.log('template json ok')"`.
- Busca confirmou `Contrato multimodal V0`, `adventure-template-v0`, `approved_placeholder`, `playSyntheticCue`, `scene-art--cave_soft` e `assetPack`.
- Validacao sintatica apos progresso por resultado executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Validacao do template JSON repetida apos incluir `progressDelta` e `reward` por faixa do dado.
- Busca confirmou `pendingOutcomeByScene`, `renderOutcomeReview`, `Pacote`, regra de sobrescrita por `dice_check.outcomes.*.progress_delta` e `assetPack`.
- Validacao sintatica apos acao livre/voz executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Validacao do template JSON repetida apos incluir `actionEvaluation`.
- Busca confirmou `Acao livre e voz`, `actionEvaluation`, `local_rubric_then_ai`, `free-action-panel`, `captureVoiceAction`, `actionProgressScenes` e mensagens de criterio.
- Validacao sintatica apos diario do mestre executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Validacao do template JSON repetida apos diario do mestre.
- Busca confirmou `narrator-journal`, `narrativeLog`, `addNarratorEntry`, `renderNarratorLog`, `escapeHtml` e `Diário da aventura`.
- Validacao sintatica apos voz do narrador executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Validacao do template JSON repetida apos contrato de narração.
- Busca confirmou `narrationToggle`, `narrationRate`, `repeatNarration`, `stopNarration`, `speakNarration`, `speechSynthesis`, `Voz do narrador`, `browser_speech_synthesis`, `Ouvir de novo` e `Pausar voz`.
- Validação de deploy Hostinger executada com `npm run check`.
- Validado `package.json` com parse JSON.
- Servidor Node testado localmente com `node server.js`.
- `/health` respondeu `{"ok":true,"app":"rpg-kids"}`.
- `/` respondeu HTTP 200 com `text/html; charset=utf-8`.
- Validação sintática apos aprofundamento das histórias e rubricas executada com `node --check prototype/app.js` e `node --check prototype/adventures.js`.
- Sincronização para `public/` executada com `npm run sync:public`.
- Validação da versão servida executada com `npm run check`, `node --check public/app.js` e `node --check public/adventures.js`.
- Busca confirmou presença de `navio-do-cha-das-nuvens`, `jardim-do-relogio-girafa`, `biblioteca-do-dragao-sonolento`, `actionRubric`, `buildResumeSummary` e `hero-title` em `prototype/` e `public/`.
- Servidor local iniciado com `npm start` e validado em `http://127.0.0.1:3000/health` com `{"ok":true,"app":"rpg-kids"}`.
- Página inicial validada com HTTP 200 em `http://127.0.0.1:3000/`.
- Validação pós-imagens executada com `npm run check`.
- WebP otimizado validado via servidor local em `http://127.0.0.1:3000/assets/scenes/cloud_harbor_soft.webp` com HTTP 200 e `Content-Type: image/webp`.
- Tamanho dos WebP em `public/assets/scenes/` ficou entre aproximadamente 72 KB e 196 KB por imagem.
- Validação após fluxo de mestre/narração executada com `npm run check`.
- Busca confirmou `composeSceneNarration`, `roundHint`, `narrationQueue`, `Escolha uma ação` e fala de `Opção` em `prototype/` e `public/`.
- Validação após fluxo voice-first/PWA executada com `npm run sync:public`, `npm run check`, `node --check public/sw.js` e parse de `public/manifest.webmanifest`.
- Manifest PWA validado via servidor local em `http://127.0.0.1:3000/manifest.webmanifest` com HTTP 200 e `Content-Type: application/manifest+json; charset=utf-8`.
- Service worker validado via servidor local em `http://127.0.0.1:3000/sw.js` com HTTP 200.
- Busca confirmou `Falar ação`, `manifest.webmanifest`, `serviceWorker`, `masterReaction`, `Mestre narrando` e MIME `application/manifest`.
- Validação após tratamento menina/menino executada com `npm run sync:public`, `npm run check` e `node --check public/sw.js`.
- Busca confirmou `childGenderSelect`, `genderedText`, `Menina · aventureira`, `Menino · aventureiro` e cache `gender-voice-pwa` em `prototype/` e `public/`.
- Validação após perfil/estilo/avatar/modo só voz/relatório executada com `node --check prototype/app.js`, `node --check prototype/sw.js`, `npm run sync:public`, `npm run check` e `node --check public/sw.js`.
- Busca confirmou `Nome na aventura`, `Estilo do mestre`, `Modo só voz`, `Companheiro`, `buildLearningReport`, `profile-learning-pwa`, `hero-companion` e `learning-report` em `prototype/` e `public/`.

## O que falta fazer

- Testar `prototype/index.html` manualmente no navegador/celular.
- Fazer upload/configuração do app Node na Hostinger e testar URL pública em HTTPS.
- No celular, testar instalação PWA via `Adicionar à tela inicial`, abertura em modo standalone e permissão de microfone em HTTPS.
- Gerar imagens bitmap para as aventuras antigas (`Portal das Estrelinhas` e `Caverna dos Bichinhos`) se o estilo das novas for aprovado.
- Testar em navegador real o fluxo de retomada por checkpoint, voz e sons em Android/iOS.
- Testar sons sinteticos no navegador, porque `node --check` valida sintaxe mas nao executa Web Audio.
- Testar efeitos visuais no navegador/celular, especialmente entrada de cena, resultado alto/medio/baixo no dado e recompensa.
- Validar se o loop D&D infantil esta divertido para uma crianca de 4 anos: escolher acao, ouvir consequencia, rolar dado somente quando pedido e entender ponto de sorte.
- Ler as duas aventuras completas no painel dos pais e ajustar ritmo, humor absurdo, quantidade de escolhas e clareza de objetivo apos teste real.
- Testar reconhecimento de voz no navegador/celular; em navegadores sem Web Speech API o prototipo usa fallback de exemplo.
- Testar `speechSynthesis` no navegador/celular, porque a lista/qualidade de vozes varia por dispositivo.
- Avaliar se a narração automática deve interromper feedbacks anteriores ou enfileirar falas em alguns momentos.
- Evoluir escolha livre/voz para enviar contexto ao narrador IA quando DeepSeek for conectado.
- Usar `narrativeLog` como base para resumo curto de retomada e payload compacto para DeepSeek.
- Decidir se o prototipo estatico vira app Vite/React ou se primeiro ajustamos o loop.
- Revisar a primeira aventura exemplo com teste narrativo adulto/crianca.
- Decidir se o MVP usa botao de falar ou escuta continua controlada.
- Decidir provider/estrategia de STT e TTS.
- Validar se o protocolo V0 deve continuar em Markdown com front matter ou virar JSON schema formal.
- Definir manifest JSON normalizado derivado do Markdown.
- Definir estrutura final de pacote de aventura: `adventure.md`, `manifest.json`, `assets/`.
- Implementar loader de biblioteca por manifest JSON real.
- Definir modelo DeepSeek inicial e tabela/config de precos por modelo antes de estimar custo real.
- Adicionar assets reais ou placeholders visuais melhores.
- Trocar os placeholders CSS restantes das aventuras antigas por arquivos reais e evoluir sons/camadas de avatar quando o pacote de aventura for normalizado.
- Transformar dados de `prototype/adventures.js` em manifest JSON real.
- Revisar fluxo de checkpoint/continuar com a crianca.

## Pendencias fora do commit

- Nao ha repositorio git inicializado neste projeto.

## Riscos / atencoes

- Produto envolve crianca pequena e IA; seguranca, privacidade e controle adulto devem guiar a arquitetura.
- Audio/voz esta dentro do MVP, entao consentimento familiar, minimizacao de dados, nao armazenamento de audio bruto e controle adulto viram requisitos de arquitetura.
- Imagens devem ser preaprovadas no MVP para reduzir risco de conteudo inadequado.
- Precos de LLM mudam; manter calculo de custo configuravel e nao hardcoded como verdade permanente.
- Desafios fisicos devem ser opcionais, supervisionados e trocaveis.
- O app nao deve prometer diagnostico, terapia ou resultado clinico.
- O narrador deve respeitar limite de tempo sem manipular a crianca para continuar.
- Sons/efeitos precisam ter fallback silencioso e controle adulto de volume.
- O prototipo ainda nao foi validado visualmente no browser com inspeção humana ou Playwright.
- O modal do dado, sorte e avatar visual ainda precisam de validacao visual no browser/celular.

## Proximo prompt recomendado

Atue como The Creator no projeto RPG Kids. Abra/teste a versão em `http://localhost:3000`, avalie o loop com foco em crianca de 4 anos, valide as imagens WebP das 3 aventuras novas, ajuste friccoes de UX/texto/tempo e proponha se o proximo passo deve ser gerar imagens para as aventuras antigas, polir o prototipo estatico ou migrar para Vite/React. Nao conectar DeepSeek, STT ou TTS ainda.
