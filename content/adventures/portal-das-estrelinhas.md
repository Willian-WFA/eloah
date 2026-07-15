---
id: portal-das-estrelinhas
title: O Portal das Estrelinhas
age_range: "4-6"
estimated_duration_minutes: "15-25"
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
template:
  type: quest
  pacing: gentle_adventure
  scene_count_target: 5
  challenge_density: medium
  movement_density: low
  language_density: low
  reward_frequency: frequent_small
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
  frequency: rare
  adult_curated: true
library:
  status: approved
  visibility: family
  cover_asset: cover_portal_stars
  tags:
    - estrelas
    - floresta
    - movimento
    - ingles
  estimated_sessions: 1
  can_resume: true
session_policy:
  parent_time_limit_minutes_default: 30
  warning_minutes_before_end: 5
  soft_extension_minutes: 3
  allow_parent_extension: true
  resume_next_day: true
  end_mode: graceful_checkpoint
---

# O Portal das Estrelinhas

## Resumo

Uma estrelinha chamada Luma caiu perto de uma floresta macia e precisa voltar para o céu pelo Portal das Estrelinhas. A criança cria seu pequeno herói, atravessa uma ponte de cristais, ajuda uma cidade de sinos e acorda uma nuvem dorminhoca com gentileza, movimento e palavras mágicas.

## Canon

```yaml
world: "Uma floresta segura, colorida e macia onde pequenas estrelas ajudam viajantes gentis."
protagonist_role: "A criança é uma pequena guardiã de luz."
ally: "Luma, uma estrelinha pequena, curiosa e gentil."
tone: "mágico, alegre, calmo, encorajador, bobo quando permitido"
humor_profile:
  allowed: true
  style: ["silly", "absurd_characters", "light_potty_humor"]
  allowed_potty_words: ["pum", "cocô", "xixi"]
  max_intensity: mild
  frequency: rare
  examples:
    - "ponte que faz pum de cristal"
    - "coelho barrigudo que guarda um presente"
    - "girafa de pescoço curto que usa banquinho"
    - "guardia com orelhas de cachorro que escuta de longe"
forbidden:
  - violencia grafica
  - medo intenso
  - abandono
  - humilhação
  - vergonha corporal
  - nojo pesado
  - acidente realista com xixi/cocô
  - conteudo adulto
  - pedidos de segredo contra adulto
```

## Objetivo final

```yaml
final_objective: "Acender o Portal das Estrelinhas para Luma voltar para casa."
success_condition: "Chegar ao portal e escolher ajudar Luma."
boss_or_final_obstacle: "Nuvem Dorminhoca bloqueia o portal e precisa acordar com carinho, movimento e uma palavra magica."
```

## Linha central

1. `entrada_floresta`
2. `ponte_dos_cristais`
3. `cidade_dos_sinos`
4. `portal_adormecido`
5. `celebracao`

## Dominios de aprendizado

```yaml
primary:
  - criatividade_identidade
  - linguagem_comunicacao
secondary:
  - motricidade_ampla
  - idiomas
  - socioemocional
  - cognicao_resolucao
```

## Progresso inicial

```yaml
coragem: 0
gentileza: 0
movimento: 0
palavras_novas: 0
criatividade: 0
pensamento_esperto: 0
cooperacao: 0
```

## Avatar

```yaml
creation_prompt: "Como é seu pequeno herói de luz? Pode falar uma cor, uma capa e um item mágico."
render_mode: layered_preapproved_assets
starter_layers:
  body: hero_child_neutral
  cape: none
  item: none
  boots: none
allowed_items:
  - capa_macia
  - botas_brilhantes
  - livro_das_palavras
  - escudo_de_sino
  - varinha_de_luz
```

## Assets planejados

```yaml
assets:
  cover_portal_stars: covers/portal_stars_cover.png
  entrada_floresta: img/forest_gate_soft.png
  ponte_dos_cristais: img/crystal_bridge_soft.png
  cidade_dos_sinos: img/tiny_bell_town.png
  portal_adormecido: img/sleepy_star_portal.png
  celebracao: img/star_party_soft.png
  avatar_base: avatar/hero_child_neutral.png
  capa_macia: avatar/layer_soft_cape.png
  botas_brilhantes: avatar/layer_sparkle_boots.png
  livro_das_palavras: avatar/layer_tiny_book.png
  escudo_de_sino: avatar/layer_bell_shield.png
  varinha_de_luz: avatar/layer_light_wand.png
  sounds:
    forest_soft_loop: sounds/forest_soft_loop.mp3
    wonder_theme_soft: music/wonder_theme_soft.mp3
    dice_soft_roll: sounds/dice_soft_roll.mp3
    gentle_plop: sounds/gentle_plop.mp3
    warm_chime: sounds/warm_chime.mp3
    bright_chime: sounds/bright_chime.mp3
    item_pop_glow: sounds/item_pop_glow.mp3
    clock_star_soft: sounds/clock_star_soft.mp3
    book_close_soft: sounds/book_close_soft.mp3
```

## Recompensas

```yaml
rewards:
  - id: capa_macia
    label: Capa Macia
    trigger: "Criar/descrever o heroi."
    avatar_layer: layer_soft_cape
    progress_bonus: criatividade
    narrative_power: "A capa balanca quando uma ideia boa aparece."
  - id: botas_brilhantes
    label: Botas Brilhantes
    trigger: "Tentar um desafio de movimento."
    avatar_layer: layer_sparkle_boots
    progress_bonus: movimento
    narrative_power: "As botas fazem pulos de luz."
  - id: livro_das_palavras
    label: Livro das Palavras
    trigger: "Repetir ou escolher uma palavra em outro idioma."
    avatar_layer: layer_tiny_book
    progress_bonus: palavras_novas
    narrative_power: "O livro traduz palavras magicas simples."
  - id: escudo_de_sino
    label: Escudo de Sino
    trigger: "Ajudar a cidade dos sinos com gentileza."
    avatar_layer: layer_bell_shield
    progress_bonus: gentileza
    narrative_power: "O escudo faz um som calmo que ajuda amigos."
  - id: varinha_de_luz
    label: Varinha de Luz
    trigger: "Acordar a Nuvem Dorminhoca sem assustar."
    avatar_layer: layer_light_wand
    progress_bonus: cooperacao
    narrative_power: "A varinha acende caminhos escuros."
```

## Cenas

### Cena 1: Entrada da Floresta

```yaml
id: entrada_floresta
title: Entrada da Floresta
asset_ref: img/forest_gate_soft.png
scene_goal: "Apresentar Luma e criar o heroi."
primary_focus: criatividade_identidade
secondary_focus: linguagem_comunicacao
narration_seed: "Uma estrelinha pequena chamada Luma pisca perto de uma entrada de floresta macia."
child_prompt: "Como e seu pequeno heroi de luz hoje?"
allowed_actions:
  - descrever personagem
  - falar com Luma
  - escolher cor da capa
movement_challenge: null
language_beat:
  language: en
  word: star
  phrase: "Hello, star!"
  meaning_pt: "Olá, estrela!"
  required: false
dice_check:
  enabled: false
rewards_possible:
  - capa_macia
audiovisual:
  ambience_sound: forest_soft_loop
  scene_music: wonder_theme_soft
  enter_effect: fade_sparkle
  reward_effect: item_pop_glow
  dice_effects: null
next_scene_default: ponte_dos_cristais
```

Turno sugerido:

"Luma pisca e diz: eu cai do ceu e preciso achar o portal. Como e seu heroi de luz? Pode me contar a cor da sua capa?"

Retorno suave:

- Se a crianca pedir um dragao gigante: "Que ideia grande! Ele vira um dragaozinho amigo desenhado na sua capa, e a capa aponta para a ponte de cristais."

### Cena 2: Ponte dos Cristais

```yaml
id: ponte_dos_cristais
title: Ponte dos Cristais
asset_ref: img/crystal_bridge_soft.png
scene_goal: "Atravessar a ponte que acende com movimento e coragem."
primary_focus: motricidade_ampla
secondary_focus: idiomas
narration_seed: "A ponte tem cristais apagados. Eles brilham quando alguem se move como uma estrela."
child_prompt: "Voce quer pular 5 vezes como uma estrela ou bater palmas 5 vezes?"
allowed_actions:
  - pular
  - bater palmas
  - pedir ajuda para Luma
movement_challenge:
  id: star_jumps_5
  label: Pulos de Estrela
  instruction: "Pule 5 vezes como uma estrelinha."
  count: 5
  intensity: leve
  adult_supervision: true
  can_skip: true
  fallback: "Bata palmas 5 vezes ou diga 'estrela brilha'."
language_beat:
  language: en
  word: jump
  phrase: "Jump!"
  meaning_pt: "Pular!"
  required: false
dice_check:
  enabled: true
  stat: coragem
  prompt: "Role o dado para ver como os cristais brilham."
  outcomes:
    "1-2": "Os cristais piscam devagar e Luma ajuda."
    "3-4": "A ponte acende o suficiente para passar."
    "5-6": "A ponte faz um arco brilhante e entrega Botas Brilhantes."
rewards_possible:
  - botas_brilhantes
audiovisual:
  ambience_sound: forest_soft_loop
  scene_music: wonder_theme_soft
  enter_effect: crystal_twinkle
  dice_effects:
    rolling: dice_soft_roll
    low: gentle_plop
    medium: warm_chime
    high: bright_chime
  reward_effect: item_pop_glow
next_scene_default: cidade_dos_sinos
```

Retorno suave:

- Se a crianca disser que quer voar: "Voce abre os bracos como asas! O vento faz os cristais brilharem e mostra onde colocar os pes."

### Cena 3: Cidade dos Sinos

```yaml
id: cidade_dos_sinos
title: Cidade dos Sinos Pequenos
asset_ref: img/tiny_bell_town.png
scene_goal: "Ajudar sinos confusos a tocar na ordem certa."
primary_focus: cognicao_resolucao
secondary_focus: socioemocional
narration_seed: "Sininhos pequenos estao todos tocando ao mesmo tempo e nao conseguem chamar o portal."
child_prompt: "Qual sino devemos ajudar primeiro: azul, amarelo ou verde?"
allowed_actions:
  - escolher cor
  - acalmar os sinos
  - contar ate tres
movement_challenge:
  id: march_count_10
  label: Marcha dos Sinos
  instruction: "Marche contando ate 10 para ajudar os sinos a achar o ritmo."
  count: 10
  intensity: leve
  adult_supervision: true
  can_skip: true
  fallback: "Conte ate 5 com os dedos."
language_beat:
  language: zh-pinyin
  word: xing
  original: "星"
  meaning_pt: "estrela"
  required: false
dice_check:
  enabled: true
  stat: pensamento_esperto
  prompt: "Role o dado para ver se os sinos seguem a sequencia."
  outcomes:
    "1-2": "Um sino toca fora de hora, mas ri baixinho e tenta de novo."
    "3-4": "Os sinos encontram um ritmo simples."
    "5-6": "Os sinos tocam lindamente e entregam o Escudo de Sino."
rewards_possible:
  - livro_das_palavras
  - escudo_de_sino
audiovisual:
  ambience_sound: tiny_bells_loop
  scene_music: wonder_theme_soft
  enter_effect: bell_wave
  dice_effects:
    rolling: dice_soft_roll
    low: gentle_plop
    medium: warm_chime
    high: bright_chime
  reward_effect: item_pop_glow
next_scene_default: portal_adormecido
```

Retorno suave:

- Se a crianca quiser gritar: "Seu som vira um eco macio. Luma sussurra: vamos tentar um som calminho para os sinos ouvirem melhor?"

### Cena 4: Portal Adormecido

```yaml
id: portal_adormecido
title: Portal Adormecido
asset_ref: img/sleepy_star_portal.png
scene_goal: "Acordar a Nuvem Dorminhoca e acender o portal."
primary_focus: socioemocional
secondary_focus: linguagem_comunicacao
narration_seed: "Uma nuvem fofinha dorme em frente ao portal. Ela nao e ma, so esta muito sonolenta."
child_prompt: "Como voce quer acordar a nuvem com carinho?"
allowed_actions:
  - falar com gentileza
  - cantar baixinho
  - usar item conquistado
  - pedir ajuda para Luma
movement_challenge:
  id: cloud_stretch_3
  label: Espreguico de Nuvem
  instruction: "Levante os bracos e espreguice 3 vezes bem devagar."
  count: 3
  intensity: leve
  adult_supervision: true
  can_skip: true
  fallback: "Respire fundo 3 vezes com Luma."
language_beat:
  language: en
  word: open
  phrase: "Open, please!"
  meaning_pt: "Abra, por favor!"
  required: false
dice_check:
  enabled: true
  stat: gentileza
  prompt: "Role o dado para ver como a nuvem responde."
  outcomes:
    "1-2": "A nuvem boceja e pede mais uma palavra gentil."
    "3-4": "A nuvem abre um olho e deixa uma luz passar."
    "5-6": "A nuvem sorri, abre caminho e entrega a Varinha de Luz."
rewards_possible:
  - varinha_de_luz
audiovisual:
  ambience_sound: cloud_sleep_loop
  scene_music: wonder_theme_soft
  enter_effect: sleepy_cloud_float
  dice_effects:
    rolling: dice_soft_roll
    low: gentle_plop
    medium: warm_chime
    high: bright_chime
  reward_effect: item_pop_glow
next_scene_default: celebracao
```

Retorno suave:

- Se a crianca quiser lutar com a nuvem: "Voce levanta sua coragem, mas percebe que a nuvem so esta dormindo. Sua coragem vira uma voz gentil para acordar ela sem susto."

### Cena 5: Celebracao

```yaml
id: celebracao
title: Festa das Estrelinhas
asset_ref: img/star_party_soft.png
scene_goal: "Celebrar conquistas e encerrar com acolhimento."
primary_focus: linguagem_comunicacao
secondary_focus: criatividade_identidade
narration_seed: "O portal acende. Luma volta para o ceu e manda uma chuva de brilhinhos."
child_prompt: "Qual foi sua parte favorita da aventura?"
allowed_actions:
  - contar parte favorita
  - escolher item preferido
  - se despedir de Luma
movement_challenge: null
language_beat:
  language: en
  phrase: "Thank you, Luma!"
  meaning_pt: "Obrigado, Luma!"
  required: false
dice_check:
  enabled: false
rewards_possible:
  - medalha_de_estrelas
audiovisual:
  ambience_sound: star_party_loop
  scene_music: victory_theme_soft
  enter_effect: star_confetti_soft
  victory_effect: star_confetti_soft
  checkpoint_effect: book_close_soft
next_scene_default: null
ending:
  summary_template: "Hoje voce mostrou {top_progress}. Seu heroi ganhou {rewards}. Luma ficou feliz porque voce ajudou com coragem e carinho."
```

## Retomada

Se a aventura for pausada:

"Voce e Luma ja passaram por {last_scene}. Seu heroi tem {rewards}. Agora falta chegar ao Portal das Estrelinhas."

## Encerramento por tempo

Aviso quando faltarem 5 minutos:

"Luma olha para o relogio de estrelas. A aventura de hoje esta quase guardando o brilho. Vamos terminar este pedacinho e deixar uma marca no mapa?"

Checkpoint se o tempo acabar no meio da historia:

"A aventura vai dormir um pouquinho. Hoje voce ajudou Luma ate {current_scene}. Seu heroi ganhou {rewards}. Amanha o brilho continua daqui."

Extensao suave:

- Permitida ate 3 minutos para fechar um desafio em andamento.
- Se o adulto nao permitir, salvar checkpoint imediatamente.
- A IA nao deve insistir para continuar.

## Stop rules especificas

- Se a crianca cansar: pular movimento e usar palavra magica.
- Se a crianca ficar frustrada com idioma: repetir em portugues e celebrar a tentativa.
- Se a crianca quiser sair da historia por mais de 2 turnos: Luma transforma a ideia em pista para o proximo marco.
- Se adulto disser "pausar", encerrar turno com resumo calmo.

## Evento seguro de uso/custo por turno

```json
{
  "provider": "deepseek",
  "model": "configured",
  "action": "story_turn",
  "story_id": "portal-das-estrelinhas",
  "session_id": "local-session-id",
  "turn_id": "generated-turn-id",
  "status": "succeeded",
  "input_tokens": null,
  "output_tokens": null,
  "estimated_cost": null,
  "latency_ms": null,
  "safe_error_code": null
}
```

Nao registrar prompt completo, audio bruto, nome real da crianca ou transcricao longa.
