# Master Spec

## Produto

RPG Kids e um jogo narrativo infantil mobile-first em que uma crianca vive aventuras conduzidas por um mestre de IA. Cada aventura tem escopo aprovado por adulto, objetivo final, personagens, cenas, desafios fisicos/mentais leves, idiomas ocasionais, recompensas visuais e aprendizado integrado ao brincar.

## Promessa de valor

Permitir que adultos criem ou escolham aventuras seguras para criancas brincarem de RPG no celular, com uma IA capaz de improvisar dentro de limites, desenvolver habilidades infantis de forma ludica e conduzir a historia ate um final satisfatorio.

## MVP Value Flow

1. Adulto abre a biblioteca.
2. Escolhe uma aventura familiar validada.
3. Crianca inicia a sessao.
4. App exibe imagem de marco/cena e narrador apresenta a situacao em audio.
5. Crianca responde por voz.
6. App rola dado simples quando ha desafio.
7. Aventura intercala desafio de movimento, observacao, idioma, memoria, empatia ou criatividade quando fizer sentido.
8. IA interpreta a intencao, narra consequencia segura em audio e avanca a historia.
9. Crianca ganha progresso, item visual ou transformacao do personagem.
10. Crianca chega ao objetivo/chefao final.
11. App encerra com celebracao e resumo de conquistas.
12. Adulto pode adicionar nova aventura a biblioteca.

## Modelo de aventura

Cada aventura deve ter:

- titulo;
- faixa etaria;
- duracao estimada;
- tema;
- aprendizado;
- tom permitido;
- perfil de humor permitido;
- coisas proibidas;
- personagens aliados;
- objetivo;
- linha central da historia;
- cenas principais;
- marcos visuais por cena;
- desafios;
- chefao ou obstaculo final;
- final feliz/acolhedor;
- fallback caso a crianca fuja do enredo;
- estrategias de retorno para a linha central;
- criterios de encerramento;
- resumo de retomada para historias longas;
- dominios de desenvolvimento trabalhados;
- desafios fisicos seguros;
- desafios de idioma;
- recompensas e itens visuais;
- regras de progressao.

## Protocolo de historia

As historias serao criadas por adulto com apoio de IA e curadoria humana. Cada historia deve funcionar como um "contrato de aventura" para o mestre IA.

O protocolo deve separar:

- `canon`: fatos fixos da historia que a IA nao pode contradizer;
- `objetivo_final`: o que precisa acontecer para a historia terminar;
- `linha_central`: sequencia flexivel de marcos que levam ao objetivo;
- `liberdade_segura`: coisas que a crianca pode inventar sem quebrar a historia;
- `limites`: temas, acoes e tons proibidos;
- `humor_profile`: humor bobo permitido, intensidade, palavras liberadas e limites;
- `retorno_suave`: formas de aceitar uma ideia inesperada e reconduzir para o proximo marco;
- `checagens`: momentos em que dado, escolha ou ajuda de personagem entram;
- `assets`: imagens/audio permitidos por marco de cena;
- `learning_targets`: dominios de desenvolvimento e aprendizado por cena;
- `movement_challenges`: desafios fisicos curtos e seguros;
- `language_beats`: palavras ou frases simples em outros idiomas;
- `rewards`: itens, poderes narrativos e mudancas visuais no personagem.
- `audiovisual`: imagens, sons, musica, efeitos de dado, recompensa, vitoria e checkpoint;
- `session_policy`: limite de tempo, aviso, extensao suave e retomada.

## Mapa de aprendizado infantil

O produto deve usar `docs/CHILD_DEVELOPMENT_LEARNING_MAP.md` como fonte inicial para selecionar desafios e recompensas.

Dominios iniciais:

- linguagem e comunicacao;
- cognicao e resolucao de problemas;
- socioemocional;
- motricidade ampla;
- motricidade fina e percepcao visual;
- idiomas;
- criatividade e identidade.

O mestre IA deve escolher no maximo um foco primario e um foco secundario por turno, para nao sobrecarregar a crianca.

## Regras de jogo iniciais

- Usar dado D6.
- Loop base estilo D&D infantil: narrador apresenta a cena, pergunta "o que voce faz?", jogador escolhe entre 3 opcoes ou acao livre, mestre pede dado quando houver risco/sorte/desafio.
- Cada desafio/rodada usa no maximo 1 rolagem comum de dado.
- Resultado 1-3: complicacao narrativa leve, segura e temporaria; a historia continua.
- Resultado 4: sucesso condicionado por movimento, resposta, escolha de recurso ou ajuda.
- Resultado 5-6: sucesso forte, cena especial, pista melhor ou chance de recompensa.
- Pontos de sorte podem permitir vantagem: gastar 1 ponto para rolar 2 dados e ficar com o melhor resultado.
- Falha nunca humilha a crianca; apenas cria uma virada divertida.
- O chefao deve ser um obstaculo infantil, nao necessariamente inimigo violento.
- Desafios fisicos devem ser curtos, opcionais, supervisionados e nunca usados como punicao.
- Recompensas melhores podem depender de criatividade, gentileza, movimento, memoria, idioma ou coragem, nao apenas de sorte.

## Tom, humor e revisao parental

O RPG Kids deve permitir humor bobo infantil principalmente por personagens absurdos, situacoes fantasiosas e sons inofensivos.

Permitido por padrao quando a historia declarar esse perfil:

- personagens absurdos e afetuosos, como mulher com orelha de cachorro, girafa de pescoço curto, coelho barrigudo, cavaleiro esquecido ou porta que espirra;
- sons bobos sem conotacao escatologica;
- consequencias temporarias e leves, sem humilhacao.

Humor escatologico deve ser restrito e ficar fora do padrao. Se uma historia criada por IA ou adulto trouxer esse tipo de humor, o app deve:

- listar os trechos e contextos no painel dos pais;
- marcar como ponto de atencao;
- oferecer remocao/substituicao antes de aprovar;
- exigir checkbox especifico de consentimento se o responsavel decidir manter;
- impedir que a historia apareca no painel da crianca antes da decisao adulta.

Mesmo quando consentido, humor restrito nunca pode virar nojo pesado, humilhacao, vergonha corporal, punicao, acidente realista constrangedor, sexualizacao, susto pesado ou conteudo adulto.

O painel dos pais e a superficie inicial de seguranca: nele o responsavel escolhe historia, revisa resumo, pontos de atencao, permissoes, tempo permitido, audio/sons e itens a remover antes de liberar o painel da crianca.

## Creditos e incentivos parentais

O modelo futuro deve valorizar atencao parental, nao esconder informacao atras de pagamento.

Regras iniciais:

- ler a historia inteira deve ser gratuito;
- aprovar manualmente com leitura completa deve ser gratuito;
- gerar resumo automatico da historia pode consumir credito, por ser conveniencia;
- o tempo base de jogo deve ser fixo em 30 minutos;
- aumentar tempo acima de 30 minutos pode consumir credito;
- credito nunca deve bloquear encerramento seguro, checkpoint, acesso ao historico ou revisao completa pelo responsavel;
- o app nao deve incentivar a crianca a pedir compra ou extensao de tempo.

## Narrador IA

O narrador deve:

- responder em frases curtas;
- usar linguagem adequada para criancas pequenas;
- usar humor bobo somente quando permitido pelo contrato da aventura, priorizando personagens absurdos e evitando humor restrito sem decisao parental explicita;
- entender comandos por voz e confirmar de forma simples quando a fala for ambigua;
- oferecer ate 2 ou 3 escolhas quando a crianca travar;
- aceitar criatividade segura da crianca;
- reconduzir suavemente quando a acao fugir do objetivo;
- manter continuidade da sessao;
- nunca pedir dados pessoais;
- nunca sugerir compras, links, contato externo ou segredo contra adulto;
- encerrar a historia quando objetivo for cumprido;
- inserir desafios de desenvolvimento apenas quando fizerem sentido na cena;
- aceitar aproximacoes em idioma estrangeiro sem corrigir de modo frustrante;
- trocar ou pular movimento fisico quando adulto/crianca indicar desconforto;
- atualizar progresso e recompensas visuais do personagem.

## Voz e audio

- A entrada principal do MVP e voz da crianca.
- Preferir botao de pressionar para falar no MVP, reduzindo escuta acidental.
- Evitar armazenar audio bruto.
- Quando necessario, armazenar apenas transcricao curta e estado narrativo minimo.
- O narrador deve responder por audio/TTS e tambem manter texto curto na tela para o adulto acompanhar.
- Todo erro de transcricao deve virar uma confirmacao amigavel, nao uma bronca ou bloqueio.

## Tempo de jogo e retomada

- O adulto pode definir tempo diario por crianca/sessao, por exemplo 30 minutos.
- O narrador deve avisar quando a aventura estiver perto de encerrar.
- O app pode permitir alguns minutos de extensao suave para concluir um desafio em andamento.
- O encerramento deve virar checkpoint narrativo, nao corte brusco.
- Ao retornar no dia seguinte, o narrador resume onde a crianca parou, itens ganhos e proximo objetivo.
- O adulto sempre pode encerrar imediatamente.

## Imagens de cena

- O MVP deve usar imagens salvas/preaprovadas, associadas aos marcos da historia.
- Exemplos: entrada de caverna, cidade, portal, floresta, praia, castelo, mapa, objeto magico.
- Nao gerar imagens ao vivo durante a sessao da crianca no MVP.
- A imagem deve ajudar a situar a cena, nao substituir a narracao ou forcar uma unica solucao.

## Sons e efeitos

- Cada historia pode sugerir temas sonoros, ambientes, efeitos de dado, resultado baixo/medio/alto, recompensa, vitoria e checkpoint.
- No MVP, sons podem ser placeholders ou silenciosos, mas os ids devem existir no protocolo.
- Efeitos de resultado ruim devem ser leves e brincalhoes, nunca punitivos.
- Efeitos de vitoria devem celebrar esforco e progresso.
- Adulto deve poder desligar ou reduzir sons.

## Personagem, avatar e itens

- A crianca pode descrever o personagem ou companheiro por voz.
- O sistema deve extrair atributos seguros da descricao: cor, item, acessorio, humor, tipo amigavel.
- No MVP, preferir montagem por assets/camadas preaprovadas.
- Recompensas podem alterar a imagem: escudo, espada, livro, cetro, chapeu, capa, varinha, martelo, botas, medalha.
- Nao pedir foto da crianca.
- Nao gerar imagem livre em tempo real durante a sessao infantil sem modo adulto/curadoria.

## Medidor de progresso

O progresso mede conquistas pessoais dentro da historia, nao ranking.

Medidores iniciais:

- coragem;
- gentileza;
- movimento;
- palavras novas;
- criatividade;
- pensamento esperto;
- cooperacao.

## Stack recomendada para MVP

- Frontend: Next.js ou Vite/React como PWA mobile-first.
- Backend: Node.js/TypeScript com API pequena.
- Banco inicial: SQLite para prototipo local; Postgres se for deploy multiusuario.
- IA: DeepSeek API via backend, com provider/modelo configuraveis, prompt versionado, saida estruturada e guardrails por historia.
- Voz: speech-to-text e TTS atras do backend ou camada controlada, sem chamada direta irrestrita do frontend.
- Conteudo: aventuras em JSON/Markdown no primeiro ciclo.
- Conteudo ideal: pacote de aventura com source Markdown/YAML para curadoria e manifest JSON normalizado para runtime.
- Assets: imagens, sons, musicas, efeitos e camadas de avatar locais/preaprovados por marco de cena.
- Mapa de aprendizagem: `docs/CHILD_DEVELOPMENT_LEARNING_MAP.md`.

## Observabilidade de custo IA

O RPG Kids deve medir consumo desde a primeira integracao real com IA.

Cada chamada ao mestre IA deve registrar:

- provider;
- modelo;
- action ou feature, como `story_turn`, `story_recovery`, `story_summary`;
- status;
- tokens de entrada;
- tokens de saida;
- tokens de cache, se o provider expuser;
- custo estimado;
- latencia;
- codigo de erro seguro;
- id da sessao/historia sem dados sensiveis da crianca.

O calculo de custo deve usar tabela configuravel por modelo, porque precos de provider mudam. Nao usar custo estimado como billing; usar apenas para controle familiar, debug e limite operacional.

## Fases

### Fase 0: Fundacao documental

- Criar contexto, spec, estado vivo e backlog.
- Definir perguntas de produto.
- Criar mapa de desenvolvimento/aprendizado infantil.

### Fase 1: Prototipo jogavel local

- Biblioteca carregada por metadados de aventura, sem hardcode para uma historia unica.
- Tela de sessao mobile.
- Dado D6 visual.
- Narrador simulado com texto/audio simples.
- Imagens preaprovadas por cena.
- Limite de tempo configuravel e checkpoint simples.
- Encerramento da aventura.

### Fase 2: Protocolo de historia e motor IA seguro

- Contrato estruturado de aventura.
- Prompt de mestre com guardrails.
- Validador de resposta.
- Estrategias de retorno para linha central.
- Integracao do mapa de aprendizado por cena.
- Regras de progresso, recompensa e avatar.
- Regras de audiovisual, efeitos e retomada.
- Logs sem dados sensiveis.

### Fase 3: Voz no loop principal

- Entrada por voz com botao de falar.
- Transcricao descartavel ou minimizada.
- Resposta do narrador em audio/TTS.
- Confirmacao amigavel quando a fala for ambigua.

### Fase 4: Observabilidade de IA

- Medidor de tokens/custo por turno.
- Eventos seguros de chamada LLM.
- Limite simples por sessao/historia.
- Visao adulta minima de consumo.

### Fase 5: Criador de aventuras adulto

- Formulario adulto para nova aventura.
- Preview/teste da aventura.
- Publicar na biblioteca local.

### Fase 6: Polimento infantil

- Identidade visual.
- Sons e feedbacks leves.
- Animacoes leves.
- Acessibilidade mobile.

## Criterio de pronto do MVP

- Uma crianca consegue jogar uma aventura validada por familiar com ajuda adulta.
- A crianca consegue dar comandos por voz.
- O narrador responde por audio e mantem texto curto para acompanhamento adulto.
- A sessao usa imagens preaprovadas nos marcos principais.
- A aventura intercala desafios ludicos de movimento, idioma, emocao, memoria ou criatividade.
- O personagem/avatar muda quando a crianca conquista itens.
- O progresso mostra conquistas sem ranking ou comparacao.
- O adulto consegue definir limite de tempo e a aventura encerra/retoma com checkpoint.
- A biblioteca aceita adicionar/trocar historias por pacote de aventura sem alterar codigo central.
- O jogo chega a um final.
- O narrador nao sai do escopo aprovado.
- Cada chamada real ao DeepSeek registra tokens, custo estimado, status e erro seguro.
- O adulto consegue adicionar uma historia simples.
- O app funciona bem em tela de celular.
- Nao ha coleta desnecessaria de dados da crianca.
