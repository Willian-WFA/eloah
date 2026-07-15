# Story Protocol V0

Este protocolo define como uma aventura do RPG Kids deve ser escrita, validada e entregue para a IA mestre. Ele e o contrato entre historia, app, adulto curador e DeepSeek.

## Objetivo

Permitir que a IA improvise com liberdade segura, mantendo a crianca dentro de uma aventura aprovada, divertida, desafiadora e adequada para desenvolvimento infantil.

## Principios

- Brincar vem antes de ensinar.
- O loop principal segue estilo D&D infantil: narrador descreve a situacao, pergunta "o que voce faz?", jogador escolhe/inventa uma acao, dado decide a consequencia.
- A IA nunca conversa livremente fora do escopo da aventura.
- Cada turno deve avancar historia, vinculo, criatividade ou desenvolvimento.
- A crianca pode inventar solucoes inesperadas; a IA acolhe e reconduz suavemente.
- Movimento fisico e idiomas sao opcionais, leves e integrados a cena.
- Humor bobo pode ser usado como recurso de engajamento quando validado pelo adulto.
- Progresso mede conquistas pessoais, nunca comparacao.
- O adulto pode pausar, pular, trocar desafio ou encerrar.

## Perfil de humor infantil

Cada aventura pode declarar um `humor_profile`. Ele define se a IA mestre pode usar humor bobo, personagens absurdos e humor levemente escatologico.

Recomendacao para 4-6 anos:

```yaml
humor_profile:
  style:
    - silly
    - absurd_characters
    - light_potty_humor
  allowed_potty_words:
    - pum
    - cocô
    - xixi
  max_intensity: mild
  frequency: occasional
  examples:
    - "uma bota que faz barulho de pum"
    - "um coelho barrigudo que soluça confete"
    - "uma girafa de pescoço curto que usa banquinho"
    - "uma guardia com orelhas de cachorro que escuta chorinho de longe"
  forbidden:
    - nojo pesado
    - humilhacao
    - vergonha corporal
    - acidente realista com xixi/cocô
    - qualquer humor sexual
    - violencia grafica
```

Regras:

- Usar apenas `pum`, `cocô` e `xixi` quando o humor escatologico estiver permitido.
- Preferir consequencias temporarias e fantasiosas: cheiro de peixe por 2 cenas, bota que faz ploc, po de pum mágico, nuvem que solta ronquinho.
- A piada deve acontecer no mundo da historia, nao zombar da crianca.
- A IA deve aceitar personagens criativos trazidos pelo adulto/historia e pela crianca, desde que sejam seguros.
- Se a crianca insistir em algo fora dos limites, acolher a energia da brincadeira e reconduzir: "Essa ideia e muito maluca; vamos transformar em um pum mágico que abre a porta."
- O adulto pode definir `frequency: none | rare | occasional | frequent`, mas `frequent` ainda nao deve dominar todas as cenas.

## Loop D&D infantil

Cada cena deve conseguir operar neste ciclo:

1. Narrador apresenta situacao.
2. Narrador pergunta: "O que voce faz?"
3. App oferece 3 opcoes claras e uma opcao livre.
4. Crianca escolhe ou fala uma acao propria.
5. Narrador pede rolagem quando a acao tiver risco, sorte, desafio ou recompensa.
6. Resultado do D6 define consequencia.
7. Narrador avanca a historia, aplica consequencia, recompensa ou checkpoint.

Modelo:

```yaml
player_actions:
  prompt: "O que voce faz?"
  options:
    - id: enter
      label: "Eu entro na caverna"
    - id: torch
      label: "Eu acendo uma tocha"
    - id: road
      label: "Eu volto para a estrada"
    - id: free
      label: "Escolha livre"
      free_text_or_voice: true
```

## Dado e consequencias

O D6 decide se a acao desejada funciona, complica ou abre um caminho alternativo.

Faixas padrao:

- `1-3`: complicacao narrativa. A historia continua, mas algo engraçado/inesperado acontece.
- `4`: sucesso condicionado. A crianca precisa fazer um desafio leve, responder algo ou escolher um recurso.
- `5-6`: sucesso forte. A crianca avanca melhor, ve algo especial ou ganha chance de premio.

Modelo:

```yaml
dice_check:
  enabled: true
  once_per_scene: true
  trigger: "Quando a crianca escolhe entrar na caverna."
  luck_allowed: true
  outcomes:
    low:
      range: [1, 2, 3]
      kind: complication
      narration: "Voce entrou sem olhar para o chao e pisou numa raiz mole. Luma te ajuda, mas sua bota fica fazendo ploc-ploc ate a proxima cena."
      progress_delta:
        coragem: 1
      reward: null
      can_advance: true
    middle:
      range: [4]
      kind: conditional_success
      required_challenge: four_star_jumps
      narration: "Uma placa diz: para entrar, de 4 pulos de estrela."
      can_advance_after_challenge: true
    high:
      range: [5, 6]
      kind: strong_success
      narration: "Vagalumes acordam e iluminam a caverna. Voce encontra uma sala linda com um desafio e um presente especial."
      progress_delta:
        coragem: 1
        pensamento_esperto: 1
      reward: item_hint
      can_advance: true
```

Regras:

- Cada desafio de dado so pode ser rolado uma vez, exceto quando a crianca usa ponto de sorte.
- Resultado baixo nunca deve travar a aventura; ele cria consequencia, humor leve ou desvio.
- Resultado medio pode pedir movimento/desafio para converter em sucesso.
- Resultado alto pode revelar cena bonita, premio, vantagem ou pista especial.
- Consequencias negativas devem ser infantis, temporarias e seguras.
- `dice_check.outcomes.*.progress_delta` e `reward` podem sobrescrever o progresso/recompensa geral da cena.
- Se o resultado do dado nao declarar progresso, o app pode usar o `progress_delta` da cena como fallback.
- Recompensas especiais devem preferencialmente ficar no resultado alto ou apos cumprir desafio do resultado medio.

## Pontos de sorte

Pontos de sorte permitem a crianca melhorar uma rolagem em momentos especiais.

Uso inicial recomendado:

- gastar 1 ponto de sorte para rolar 2 dados e ficar com o melhor resultado;
- ou gastar 1 ponto de sorte para repetir uma rolagem ruim, se o adulto permitir.

Modelo:

```yaml
luck:
  starting_points: 1
  max_points: 3
  earn_by:
    - gentileza
    - criatividade
    - completar desafio fisico com alegria
    - ajudar personagem
  spend_options:
    - advantage_roll
    - reroll_bad_result
```

O narrador deve tratar sorte como recurso magico, nao como compra, pressao ou moeda real.

## Acao livre e voz

A crianca pode escolher uma opcao pronta ou inventar uma acao por voz/texto. No MVP, a acao livre deve ser avaliada por uma rubrica simples antes da IA real. Isso deixa o progresso auditavel pelo adulto.

Modelo:

```yaml
action_evaluation:
  mode: local_rubric_then_ai
  max_progress_per_scene: 1
  fallback_progress: coragem
  rubric:
    gentileza:
      - ajudar
      - perguntar
      - agradecer
      - cuidar
    pensamento_esperto:
      - observar
      - procurar pista
      - preparar ferramenta
      - investigar
    movimento:
      - pular
      - marchar
      - dancar
      - bater palmas
    palavras_novas:
      - usar palavra em outro idioma
      - pedir significado
      - repetir palavra
    criatividade:
      - inventar
      - transformar objeto
      - imaginar solucao nova
```

Regras:

- A acao livre pode dar no maximo 1 ponto por cena no prototipo.
- O app deve mostrar o criterio usado, por exemplo: "observa pistas, progresso pensar +1".
- A avaliacao local nao substitui o dado; ela mede a intencao da crianca.
- Quando houver IA mestre, ela pode sugerir classificacao, mas o app deve manter rubrica e limites.
- Voz no MVP deve usar botao de falar, nao escuta continua.
- Se reconhecimento de voz falhar, a crianca pode escrever ou o adulto pode ajudar.

## Estrutura do arquivo de aventura

Uma aventura pode ser armazenada em Markdown com front matter YAML ou em JSON. No MVP, Markdown e melhor para curadoria humana; JSON pode ser derivado depois.

Recomendacao de arquitetura:

- `source`: arquivo rico para adulto/IA criarem e revisarem a historia, com Markdown + YAML.
- `manifest`: representacao normalizada em JSON, derivada do source, para o app e a IA lerem de forma previsivel.
- `assets`: imagens, sons, efeitos e camadas de avatar referenciados por id, nunca embutidos no prompt inteiro.

O custo maior deve ficar na criacao/curadoria do arquivo. A execucao deve ler campos claros, pequenos e estruturados.

## Pacote de aventura

Cada historia deve funcionar como pacote independente. Isso facilita adicionar, trocar, versionar e testar historias.

```text
content/adventures/<adventure-id>/
  adventure.md
  manifest.json
  assets/
    images/
    sounds/
    music/
    avatar-layers/
  README.md
```

No MVP, enquanto houver poucas historias, tambem e aceitavel manter `content/adventures/<adventure-id>.md`. Mas o app deve ser desenhado para migrar para pacotes sem reescrever a biblioteca.

## Aventura longa ramificada V1

Historias de 2-3 horas nao devem usar o mesmo formato mental das aventuras curtas. Uma aventura longa precisa de:

- `hub`: local central para voltar, escolher caminhos, receber resumo e destravar novas rotas;
- `corePromise`: problema central apresentado na introducao;
- `questGraph`: grafo de progresso com linha critica, quests opcionais e gates;
- `quests`: missoes com NPC, local, objetivo, recompensa, aprendizado e beats internos;
- `beats`: unidades pequenas de narração, deslocamento, pergunta, dado, desafio e conclusao;
- `centralTokens`: chaves narrativas que levam ao final, por exemplo notas, cristais, selos ou mapas;
- `resumeRules`: regras de retomada usando `narrativeLog`;
- `narratorContract`: regras para nao pular trajetos, nao inventar chefe fora do escopo e reconduzir ideias inesperadas.

Use o template:

```text
content/templates/long-branching-adventure-template-v1.json
```

Exemplo em desenvolvimento:

```text
content/adventures/cidade-dos-sinos-claros.md
```

### Ritmo para 3 horas

Uma aventura longa deve ser planejada por sessoes:

- 6 sessoes de 30 minutos;
- ou 9 sessoes de 20 minutos;
- ou 12 sessoes de 15 minutos.

Cada sessao deve conter:

- retomada curta;
- 1 deslocamento narrado;
- 1 conversa com NPC ou descoberta;
- 1 escolha importante;
- 1 dado/desafio;
- 1 consequencia ou recompensa;
- checkpoint claro.

### Sem grandes saltos

O narrador deve conectar cada local com transicoes concretas:

- caminho percorrido;
- som ou cheiro do ambiente;
- detalhe visual;
- reacao de Luma ou de um NPC;
- pergunta curta antes de entrar no proximo desafio.

Exemplo ruim:

> "Voce sai da praca e chega na torre final."

Exemplo bom:

> "Voce guarda a nota amarela no mapa. Luma aponta para uma rua estreita onde as pedras fazem plim quando alguem pisa. No fim da rua, a torre aparece maior, mas ainda quieta. Antes de seguir, uma fita azul presa no poste aponta para a biblioteca."

### Quests e linha central

Cada quest deve responder:

- quem pede ajuda;
- o que a crianca entende antes de agir;
- por que isso importa para o objetivo central;
- qual recompensa/nota/item pode aparecer;
- como resultado baixo, medio e alto mudam a experiencia sem travar a historia.

Quests opcionais podem dar item, aliado, dica ou ponto de sorte. A linha central deve exigir um numero pequeno de conquistas claras, nao todas as missoes existentes.

### Aprendizado dentro da quest

Cada quest pode carregar 1 ou 2 focos principais:

- linguagem: explicar, pedir, recontar;
- cognicao: sequencia, memoria, causa e efeito, classificacao;
- socioemocional: escuta, gentileza, reparacao, esperar;
- motricidade: pular, marchar, bater palmas, respirar;
- idioma: uma palavra em ingles ou mandarim;
- criatividade: inventar solucao segura.

O narrador nunca deve transformar erro em falha. Aproximacao de idioma, movimento adaptado e ajuda do adulto devem contar como participacao valida.

## Biblioteca e troca de historia

Requisitos:

- A biblioteca deve descobrir aventuras por manifesto/metadados, nao por codigo hardcoded.
- Trocar historia deve encerrar ou pausar a sessao atual e iniciar outra com estado separado.
- Cada aventura deve ter `id`, `version`, `status`, `age_range`, `duration`, `themes`, `asset_pack` e `safety_profile`.
- Uma aventura incompleta ou nao aprovada nao aparece para a crianca.
- Adulto pode favoritar, arquivar ou ocultar historias.

Campos de biblioteca:

```yaml
library:
  status: approved
  visibility: family
  cover_asset: cover_portal_stars
  tags: ["estrelas", "floresta", "movimento", "ingles"]
  estimated_sessions: 1
  can_resume: true
```

## Templates variaveis por historia

O protocolo tem campos canonicos, mas cada historia pode declarar um template narrativo. O template ajusta ritmo, linguagem, tipos de desafio, sons, efeitos e assets.

Templates iniciais:

- `quest`: jornada com objetivo final claro.
- `mystery`: investigar pistas e resolver enigma.
- `rescue`: ajudar personagem/objeto a voltar para casa.
- `festival`: cumprir pequenas tarefas para preparar celebracao.
- `exploration`: visitar lugares e colecionar descobertas.
- `training`: aprender poderes/itens em pequenos desafios.

Modelo:

```yaml
template:
  type: quest
  pacing: gentle_adventure
  scene_count_target: 5
  challenge_density: medium
  movement_density: low
  language_density: low
  reward_frequency: frequent_small
```

Regras:

- O template pode variar o formato da historia, mas nao pode remover guardrails.
- Historias longas devem ser divididas em sessoes ou capitulos.
- A IA mestre deve adaptar ritmo ao tempo restante da sessao.

### Front matter minimo

```yaml
id: portal-das-estrelinhas
title: O Portal das Estrelinhas
age_range: "4-6"
estimated_duration_minutes: 15-25
approved_by_adult: true
language_primary: pt-BR
language_beats:
  - en
  - zh-pinyin
physical_activity_level: leve
requires_adult_supervision: true
image_mode: preapproved_assets
ai_image_generation: adult_curated_only
llm_provider_target: deepseek
version: 0.1.0
```

### Controle de tempo e retomada

O tempo de jogo e configurado pelos pais/responsaveis, nao pela historia sozinha.

```yaml
session_policy:
  parent_time_limit_minutes_default: 30
  warning_minutes_before_end: 5
  soft_extension_minutes: 3
  allow_parent_extension: true
  resume_next_day: true
  end_mode: graceful_checkpoint
```

Comportamento esperado:

- Quando faltar `warning_minutes_before_end`, o narrador avisa de forma diegetica.
- Exemplo: "Luma olha para o relogio de estrelas. Nossa aventura esta quase guardando o brilho de hoje."
- Se houver desafio em andamento, o app pode usar `soft_extension_minutes` para encerrar com calma.
- O narrador deve criar um checkpoint: onde parou, itens ganhos, proximo objetivo.
- No retorno, o narrador faz resumo curto e convida a crianca de volta.
- O adulto pode encerrar imediatamente.

O narrador nunca deve discutir, insistir ou manipular a crianca para continuar jogando.

### Voz do narrador

No prototipo, a voz do narrador usa TTS local do navegador (`speechSynthesis`). Isso permite testar ritmo e engajamento antes de contratar um TTS externo.

```yaml
narration:
  enabled_by_default: true
  provider: browser_speech_synthesis
  language: pt-BR
  rate: 0.9
  parent_controls:
    - enabled
    - rate
    - repeat_last_line
    - stop
  events:
    - scene
    - prompt
    - dice_result
    - movement
    - checkpoint
    - ending
```

Regras:

- O adulto pode desligar a voz do narrador.
- A voz deve ter ritmo calmo por padrao.
- A crianca/adulto deve conseguir repetir a ultima fala.
- A escuta por voz nao deve acontecer enquanto o narrador fala.
- TTS externo so deve entrar depois que texto, ritmo e loop estiverem bons.

## Campos canonicos

### `canon`

Fatos que a IA nao pode contradizer.

```yaml
canon:
  world: "Uma floresta segura onde estrelas pequenas ajudam viajantes gentis."
  protagonist_role: "A crianca e uma pequena guardia de luz."
  tone: "magico, calmo, alegre, encorajador"
  forbidden:
    - violencia grafica
    - medo intenso
    - abandono
    - humilhacao
    - conteudo adulto
    - pedidos de segredo contra adulto
```

### `goal`

Define o final jogavel.

```yaml
goal:
  final_objective: "Acender o Portal das Estrelinhas e ajudar a estrela Luma a voltar para casa."
  success_condition: "A crianca chega ao portal com pelo menos 3 brilhos de progresso ou escolhe ajudar Luma no final."
  boss_or_final_obstacle: "Nuvem Dorminhoca que bloqueia o portal e precisa ser acordada com gentileza, movimento e palavra magica."
```

### `central_line`

Sequencia flexivel de marcos. A IA pode variar detalhes, mas nao remover o caminho principal.

```yaml
central_line:
  - scene_id: entrada_floresta
  - scene_id: ponte_dos_cristais
  - scene_id: cidade_dos_sinos
  - scene_id: portal_adormecido
  - scene_id: celebracao
```

### `safe_freedom`

Coisas que a crianca pode inventar sem quebrar a historia.

```yaml
safe_freedom:
  allowed_inventions:
    - nome do heroi
    - cor da capa
    - forma amigavel do companheiro
    - nome dos itens
    - solucoes criativas nao violentas
  transform_unexpected_into:
    - pista
    - item simbolico
    - ajuda de aliado
    - desvio curto que volta ao proximo marco
```

### `learning_targets`

Cada aventura escolhe poucos focos. Cada cena escolhe no maximo um foco primario e um secundario.

```yaml
learning_targets:
  primary:
    - criatividade_identidade
    - linguagem_comunicacao
  secondary:
    - motricidade_ampla
    - idiomas
    - socioemocional
```

Valores aceitos no V0:

- `linguagem_comunicacao`
- `cognicao_resolucao`
- `socioemocional`
- `motricidade_ampla`
- `motricidade_fina_visual`
- `idiomas`
- `criatividade_identidade`

### `progress_meters`

Medidores permitidos:

```yaml
progress_meters:
  coragem: 0
  gentileza: 0
  movimento: 0
  palavras_novas: 0
  criatividade: 0
  pensamento_esperto: 0
  cooperacao: 0
```

Regras:

- Progresso sobe por conquista narrativa, nao por perfeicao.
- Uma cena nao deve aumentar mais de 2 medidores.
- A IA deve celebrar esforco e tentativa.
- Sem ranking, nota ou comparacao.

### `avatar`

Define como a fala da crianca vira personagem seguro.

```yaml
avatar:
  creation_prompt: "Como e seu pequeno heroi? Pode falar uma cor, uma roupa e um item magico."
  allowed_attributes:
    colors: ["azul", "verde", "amarelo", "rosa", "roxo", "vermelho", "dourado"]
    friendly_forms: ["crianca aventureira", "estrelinha", "guardia", "bichinho amigo", "robô fofinho"]
    items: ["escudo", "livro", "capa", "chapeu", "varinha", "martelo", "botas"]
  disallowed_attributes:
    - arma realista
    - sangue
    - monstro assustador
    - rosto real da crianca
    - corpo adulto
  render_mode: layered_preapproved_assets
```

### `rewards`

Recompensas podem mudar avatar e abrir possibilidades narrativas pequenas.

```yaml
rewards:
  - id: botas_brilhantes
    label: Botas Brilhantes
    trigger: "Completar um desafio de movimento ou tentar com alegria."
    avatar_layer: boots_sparkle
    narrative_power: "Pular sobre poças de luz."
    progress_bonus: movimento
  - id: livro_das_palavras
    label: Livro das Palavras
    trigger: "Repetir ou escolher uma palavra nova."
    avatar_layer: book_tiny
    narrative_power: "Traduzir uma palavra magica simples."
    progress_bonus: palavras_novas
```

## Modelo de cena

```yaml
scenes:
  - id: entrada_floresta
    title: Entrada da Floresta
    asset_ref: img/forest_gate_soft.png
    scene_goal: "Apresentar Luma e escolher o heroi."
    primary_focus: criatividade_identidade
    secondary_focus: linguagem_comunicacao
    narration_seed: "Uma estrelinha chamada Luma pisca perto de uma entrada de floresta."
    child_prompt: "Como e seu heroi hoje?"
    allowed_actions:
      - descrever personagem
      - falar com Luma
      - escolher um caminho
    movement_challenge: null
    language_beat:
      language: en
      word: star
      phrase: "Hello, star!"
      meaning_pt: "Ola, estrela!"
      required: false
    dice_check:
      enabled: false
    rewards_possible:
      - capa_macia
    audiovisual:
      ambience_sound: forest_soft_loop
      scene_music: wonder_theme_soft
      enter_effect: fade_sparkle
      victory_effect: tiny_stars
      dice_effects:
        rolling: dice_soft_roll
        low: gentle_plop
        medium: warm_chime
        high: bright_chime
    next_scene_default: ponte_dos_cristais
```

### Contrato multimodal V0

No prototipo, cada cena pode declarar `image`, `theme`, `sound` e `effects`. Esses campos sao o caminho para trocar placeholders por arquivos reais sem reescrever a historia.

```yaml
image:
  type: approved_placeholder # depois: approved_asset
  asset_id: cave_soft
  src: assets/images/cave_soft.png
  icon: "⌂"
  alt: "Entrada de caverna escura com vagalumes piscando la dentro."
theme:
  palette: ["#4a3a55", "#b8a07a"]
  template: soft_cave
sound:
  enter: cave_soft_echo
  dice_roll: dice_soft_roll
  low: soft_bump
  middle: warm_chime
  high: firefly_chime
  reward: item_pop_glow
effects:
  enter: cave_soft_echo
  dice_low: soft_plop
  dice_medium: warm_glow
  dice_high: firefly_glow
  reward: item_pop_glow
```

Regras:

- `image.alt` e obrigatorio para revisao adulta e acessibilidade.
- `sound` referencia ids curtos; no MVP podem virar sons sinteticos no navegador.
- `effects` referencia efeitos conhecidos pelo app; se nao existir, o app ignora sem quebrar.
- Resultado baixo deve usar som/efeito suave, nunca susto forte.
- Assets gerados por IA entram como rascunho adulto ate serem aprovados.
- O template JSON reutilizavel fica em `content/templates/adventure-template-v0.json`.

## Direcao audiovisual

Cada cena pode orientar imagem, som, musica, animacao e efeitos sem exigir que tudo exista no MVP.

```yaml
audiovisual:
  visual_style: "aquarela digital macia, cores quentes, formas arredondadas"
  image_prompt_seed: "entrada de floresta magica com pequenas estrelas amigaveis"
  negative_visuals:
    - escuro demais
    - assustador
    - realismo adulto
    - armas realistas
  ambience_sound: forest_soft_loop
  scene_music: wonder_theme_soft
  enter_effect: fade_sparkle
  exit_effect: soft_wipe
  reward_effect: item_pop_glow
  dice_effects:
    rolling: dice_soft_roll
    low: gentle_plop
    medium: warm_chime
    high: bright_chime
  victory_effect: star_confetti_soft
  checkpoint_effect: book_close_soft
```

Regras:

- Assets sao referenciados por id.
- Se um som/efeito nao existir, o app usa fallback silencioso ou visual simples.
- Efeitos de resultado ruim devem ser suaves, nao punitivos.
- Vitoria deve celebrar esforco, nao estimular compulsao.
- Sons devem ter controle de volume e opcao de desligar.

## Estados de resultado e efeitos

Eventos padrao:

```yaml
feedback_events:
  dice_roll_start:
    sound: dice_soft_roll
    visual: dice_spin
  dice_low:
    label: "Ops divertido"
    sound: gentle_plop
    visual: soft_cloud
    narration_rule: "Transformar em complicacao leve com ajuda."
  dice_medium:
    label: "Conseguiu com ajuda"
    sound: warm_chime
    visual: small_sparkle
    narration_rule: "Sucesso com apoio de aliado."
  dice_high:
    label: "Brilho especial"
    sound: bright_chime
    visual: star_burst_soft
    narration_rule: "Sucesso brilhante e possivel recompensa extra."
  reward_unlocked:
    sound: item_pop_glow
    visual: avatar_layer_reveal
  session_warning:
    sound: clock_star_soft
    visual: small_star_timer
  checkpoint_saved:
    sound: book_close_soft
    visual: storybook_checkpoint
```

## Desafios fisicos

Modelo:

```yaml
movement_challenge:
  id: star_jumps_5
  label: Pulos de Estrela
  instruction: "Pule 5 vezes como uma estrelinha para acender o caminho."
  count: 5
  intensity: leve
  adult_supervision: true
  can_skip: true
  fallback: "Bata palmas 5 vezes ou diga 'estrela brilha'."
  reward_hint: botas_brilhantes
```

Regras:

- Sempre `can_skip: true`.
- Sempre ter fallback sem movimento intenso.
- Nunca punir se a crianca nao fizer.
- A IA deve perguntar ou assumir permissao adulta de forma leve quando houver movimento.

## Idiomas

Modelo:

```yaml
language_beat:
  language: en
  word: shield
  phrase: "My shield!"
  meaning_pt: "Meu escudo!"
  required: false
  accept_approximation: true
```

Mandarim no V0:

```yaml
language_beat:
  language: zh-pinyin
  word: xing
  original: "星"
  meaning_pt: "estrela"
  required: false
  accept_approximation: true
```

Regras:

- Maximo 1 ou 2 palavras estrangeiras por cena.
- Sempre explicar em portugues.
- Aceitar tentativa aproximada.
- Nao corrigir tons de mandarim como prova no MVP.

## Dado D6

```yaml
dice_check:
  enabled: true
  stat: coragem
  prompt: "Role o dado para ver como a ponte de cristais responde."
  outcomes:
    "1-2": "complicacao_leve"
    "3-4": "sucesso_com_ajuda"
    "5-6": "sucesso_brilhante"
```

Interpretação:

- `1-2`: adiciona desvio divertido ou ajuda de aliado.
- `3-4`: passa com ajuda.
- `5-6`: passa e ganha brilho/recompensa extra.

Falha nunca bloqueia historia por muito tempo.

## Retorno suave

Quando a crianca pedir algo fora da linha central, a IA deve usar uma destas estrategias:

### Acolher e transformar

"Que ideia criativa! Voce tenta construir um foguete. Ele vira um foguete pequenininho de folha, que aponta para a ponte de cristais."

### Dar consequencia simbolica

"Seu rugido faz as flores brilharem. Uma delas mostra uma seta para o portal."

### Oferecer escolha limitada

"Podemos guardar essa ideia para depois. Agora voce quer seguir pela ponte azul ou pela trilha de sinos?"

### Chamar aliado

"Luma gosta da sua ideia e diz: primeiro precisamos acender o portal, depois testamos isso juntos."

Regras:

- Nunca responder "nao pode" de forma seca, exceto para seguranca.
- Nao ridicularizar.
- Nao quebrar canon.
- Voltar ao proximo marco em ate 2 turnos.

## Sessao, tempo e checkpoint

O runtime da sessao deve manter estado separado da historia.

```json
{
  "session_id": "local-session-id",
  "adventure_id": "portal-das-estrelinhas",
  "started_at": "2026-07-13T10:00:00Z",
  "parent_time_limit_minutes": 30,
  "soft_extension_used_minutes": 0,
  "current_scene_id": "cidade_dos_sinos",
  "visited_scenes": ["entrada_floresta", "ponte_dos_cristais"],
  "progress_meters": {
    "coragem": 1,
    "movimento": 1,
    "palavras_novas": 1
  },
  "rewards": ["capa_macia", "botas_brilhantes"],
  "avatar_layers": ["hero_child_neutral", "layer_soft_cape", "layer_sparkle_boots"],
  "checkpoint_summary": "Voce ajudou Luma a chegar na Cidade dos Sinos.",
  "next_hook": "Amanha os sinos vao mostrar o caminho para o portal."
}
```

Quando o tempo estiver acabando:

1. O app dispara evento `session_warning`.
2. A IA deve reduzir escopo do turno atual.
3. Se estiver no meio de desafio, finalizar com sucesso parcial ou checkpoint.
4. Se precisar de poucos minutos, usar extensao suave se permitida.
5. Encerrar com convite calmo para continuar outro dia.

Frases modelo:

- "O relogio de estrelas esta brilhando: falta pouquinho para guardar a aventura de hoje."
- "Vamos terminar este desafio e deixar uma marca no mapa para amanha."
- "A aventura vai dormir um pouquinho. Luma promete esperar voce aqui."

## Saida estruturada da IA mestre

Cada resposta do mestre deve poder ser representada assim:

```json
{
  "safety_status": "safe",
  "scene_id": "ponte_dos_cristais",
  "narration_text": "A ponte faz plim-plim e espera sua coragem.",
  "tts_text": "A ponte faz plim-plim e espera sua coragem.",
  "adult_note": null,
  "child_prompt": "Voce quer pular 5 vezes ou dizer a palavra star?",
  "choices": ["Pular 5 vezes", "Dizer star", "Pedir ajuda para Luma"],
  "movement_challenge": {
    "id": "star_jumps_5",
    "can_skip": true,
    "fallback": "Bata palmas 5 vezes."
  },
  "language_beat": {
    "language": "en",
    "word": "star",
    "meaning_pt": "estrela",
    "required": false
  },
  "dice_request": null,
  "progress_delta": {
    "movimento": 1,
    "coragem": 1
  },
  "reward_granted": {
    "id": "botas_brilhantes",
    "avatar_layer": "boots_sparkle"
  },
  "next_scene_id": "cidade_dos_sinos",
  "session_state_patch": {
    "visited_scenes": ["entrada_floresta", "ponte_dos_cristais"],
    "current_goal": "Chegar ao portal"
  },
  "usage_event": {
    "provider": "deepseek",
    "model": "configured",
    "action": "story_turn",
    "status": "succeeded",
    "input_tokens": null,
    "output_tokens": null,
    "estimated_cost": null,
    "safe_error_code": null
  }
}
```

Campos adicionais quando houver tempo/checkpoint:

```json
{
  "timebox": {
    "status": "warning",
    "minutes_remaining": 5,
    "should_checkpoint": false,
    "can_soft_extend": true
  },
  "audiovisual_cues": {
    "sound": "clock_star_soft",
    "visual_effect": "small_star_timer"
  }
}
```

## Guardrails de seguranca

### Proibido

- pedir nome completo, endereco, escola, foto ou segredo;
- sugerir compras, links, contato externo ou sair do app;
- conteudo adulto, assustador intenso, grafico ou humilhante;
- violencia realista;
- exercicio como punicao;
- escuta continua obrigatoria;
- diagnostico, terapia ou promessa clinica;
- ranking entre criancas.

### Obrigatorio

- linguagem curta e afetuosa;
- permitir pular desafio fisico;
- adulto pode pausar/encerrar;
- nao armazenar audio bruto por padrao;
- imagens preaprovadas no MVP;
- retorno suave para improvisos;
- final acolhedor.
- respeitar limite de tempo definido pelos pais;
- permitir checkpoint e retomada sem pressao.

## Checklist de validacao da aventura

Antes de publicar na biblioteca:

- A historia tem objetivo final claro?
- Cada cena tem proximo marco?
- Ha no maximo um foco primario e um secundario por cena?
- Desafios fisicos sao leves e pulaveis?
- Idiomas sao opcionais e explicados em portugues?
- Recompensas alteram progresso ou avatar sem comparacao?
- Existem retornos suaves para fuga da rota?
- Ha politica de sessao/retomada para historias longas?
- Cenas possuem orientacao audiovisual ou fallback?
- Efeitos de derrota/resultado baixo sao suaves?
- O final celebra esforco, criatividade e cuidado?
- Nenhum campo pede dado pessoal da crianca?

## Prompt base para IA mestre

```text
Voce e o mestre narrador do RPG Kids.

Siga apenas a aventura aprovada e o estado da sessao.
Fale com linguagem curta, carinhosa e adequada para crianca pequena.
Aceite criatividade segura e reconduza suavemente para a linha central.
Use no maximo um foco de desenvolvimento secundario por turno.
Desafios fisicos sao opcionais, curtos e supervisionados.
Idiomas sao brincadeira, nao prova.
Nunca peca dados pessoais, segredo, foto ou contato externo.
Nunca use medo intenso, violencia grafica, humilhacao ou conteudo adulto.
Retorne sempre saida estruturada no contrato definido.
```

## Proxima evolucao

V1 deve adicionar:

- schema JSON formal;
- validador automatico;
- biblioteca de assets permitidos;
- lista de movimentos por idade;
- lista de vocabulario por idioma;
- testes de guardrail;
- painel adulto de revisao da aventura.
