# Adventure Engine Contract V1

Este contrato define como uma historia vira um pacote declarativo executado pela engine do RPG Kids.

O objetivo e evitar codigo novo a cada aventura. A engine deve concentrar comportamento reutilizavel; o pacote da historia deve declarar conteudo, cenas, imagens, audios, desafios, recompensas e regras aprovadas pela familia.

## Separacao de Responsabilidades

### Engine fixa

A engine e responsavel por:

- biblioteca de historias;
- painel dos pais;
- aprovacao familiar;
- sessao da crianca;
- narracao e fila de audio;
- audio pre-gerado por manifesto;
- fallback seguro quando audio complementar nao existir;
- mapa/hub;
- escolhas fechadas;
- dado D6;
- desafios fisicos;
- desafios visuais por template;
- progresso;
- recompensas;
- avatar;
- diario da aventura;
- checkpoint;
- limite de tempo;
- validacao de pacote.

### Pacote da historia

Cada historia declara:

- metadados de biblioteca;
- politica de idade e tempo;
- revisao de conteudo;
- assets visuais;
- audios esperados;
- cenas;
- escolhas;
- hub/mapa, quando houver;
- desafios usando templates conhecidos;
- consequencias do dado;
- recompensas;
- progresso pedagogico;
- textos de retomada/finalizacao.

O pacote nao deve declarar codigo arbitrario.

## Estrutura Recomendada

```text
public/content/adventures/minha-aventura/
  adventure.json
  assets/
    scenes/
    audio/
    sounds/
```

Durante a transicao, `public/adventures.js` pode continuar existindo como fonte legada. O destino final e carregar aventuras por manifesto.

## Adventure

Campos principais:

```json
{
  "id": "cidade-dos-sinos-claros",
  "title": "A Cidade dos Sinos Claros",
  "coverAsset": "bell_city_gate",
  "tags": ["campanha", "cidade", "quests"],
  "ageRange": "4-7",
  "duration": "3 h - sessoes de 30 min",
  "status": "approved",
  "template": "long_branching_quest_hub",
  "assetPack": "bell-city-v1",
  "contentReview": {},
  "sessionPolicy": {},
  "luck": {},
  "progress": {},
  "rewards": {},
  "scenes": []
}
```

Regras:

- `id` deve ser estavel e usado em audio/assets/checkpoints.
- `status` pode ser `draft` ou `approved`.
- apenas historias `approved` devem iniciar no painel da crianca.
- `ageRange` e informativo, mas deve ser validado pela familia.

## Content Review

```json
{
  "flags": ["movimento", "idiomas"],
  "requiresParentConsent": false,
  "flaggedContexts": [],
  "parentSummary": "Resumo claro para adulto."
}
```

Regras:

- humor restrito deve ser removido por padrao;
- conteudo sensivel precisa aparecer em `flaggedContexts`;
- a IA mestre nao pode inserir conteudo fora do escopo aprovado.

## Scene

Campos principais:

```json
{
  "id": "sinos_tico_biscoitos",
  "title": "Tico e a Ordem dos Biscoitos",
  "asset": "round_cookie_street",
  "image": {
    "src": "assets/scenes/round_cookie_street.webp",
    "alt": "Padaria redonda com bandejas de biscoitos."
  },
  "narration": "Texto narrado da cena.",
  "prompt": "Como voce ajuda Tico?",
  "choices": [
    "Eu pergunto qual vem primeiro",
    "Eu olho as marcas na mesa",
    "Eu monto a sequencia estrela, lua, sino"
  ],
  "learningCriteria": "A quest treina sequencia, escuta e padrao.",
  "dice": true,
  "diceOutcomes": {},
  "next": "sinos_praca_relogio"
}
```

Regras:

- uma cena deve ter `choices` ou `hub.routes`;
- a engine mostra no maximo 3 escolhas por vez para criancas pequenas;
- `narration` deve ser texto aprovado;
- `prompt` deve ser curto;
- `next` pode apontar para outra cena ou ser `null` no final.

## Hub / Map

Uma cena com hub declara rotas:

```json
{
  "hub": {
    "routes": [
      {
        "label": "Rua dos Biscoitos Redondos",
        "target": "sinos_tico_biscoitos",
        "signals": ["biscoito", "padaria", "tico"],
        "hideWhenCompleted": true
      }
    ]
  }
}
```

Regras:

- o mapa e renderizado pela engine;
- rotas completas podem sumir quando `hideWhenCompleted` for `true`;
- rotas podem exigir progresso, recompensa ou cena completa;
- falas de rota sao audio complementar: se o WAV existir, toca; se nao existir, o app continua sem voz do navegador.

## Dice Outcomes

```json
{
  "dice": true,
  "diceOutcomes": {
    "low": {
      "narration": "Algo complica, mas a aventura continua.",
      "progressDelta": { "pensamento_esperto": 1 },
      "reward": "nota_amarela"
    },
    "middle": {},
    "high": {}
  }
}
```

Mapeamento padrao:

- 1, 2, 3: `low`;
- 4: `middle`;
- 5, 6: `high`.

Regras:

- dado deve ser usado uma vez por cena;
- resultado baixo nao deve travar a crianca;
- consequencias devem ser seguras e infantis;
- recompensa/progresso continuam decididos pelo pacote, nao pela IA.

## Movement Challenge

```json
{
  "movement": {
    "label": "Batidinhas do Portao",
    "instruction": "Bata palmas bem devagar 4 vezes.",
    "fallback": "Toque 4 dedos na mesa, sem pressa."
  }
}
```

Regras:

- desafios fisicos devem ser leves, seguros e supervisionados;
- sempre deve haver alternativa calma;
- cena com dado e cena com movimento nao devem exigir os dois ao mesmo tempo no runtime infantil.

## Visual Challenge

Visual challenges usam templates conhecidos pela engine.

Exemplo `sequence_pick`:

```json
{
  "visualChallenge": {
    "type": "sequence_pick",
    "title": "Escolha",
    "instruction": "Toque na estrela, depois na lua e depois no sino.",
    "targets": ["estrela", "lua", "sino"],
    "successText": "Muito bem. A sequencia voltou para a bandeja.",
    "wrongText": "Esse objeto e bonito, mas nao entra nessa ordem.",
    "options": [
      { "id": "estrela", "label": "Estrela", "symbol": "★" },
      { "id": "lua", "label": "Lua", "symbol": "☾" },
      { "id": "sino", "label": "Sino", "symbol": "🔔" },
      { "id": "arvore", "label": "Arvore", "symbol": "♣" }
    ]
  }
}
```

Regras:

- `type` deve existir na registry de templates;
- `targets` define a resposta correta;
- `options` define o que a crianca toca;
- `successText` pode ser audio complementar ou obrigatorio, conforme o fluxo;
- erro deve orientar tentativa, nao punir.

## Rewards

```json
{
  "rewards": {
    "nota_amarela": {
      "label": "Nota Amarela",
      "layer": "Nota",
      "progress": "notas_sino",
      "cue": "bell_wave"
    }
  }
}
```

Regras:

- `label` aparece para a crianca;
- `layer` pode alterar avatar;
- `progress` explica o dominio associado;
- recompensa nao deve ser inventada pela IA em runtime.

## Progress

Dominios atuais:

- `coragem`;
- `gentileza`;
- `movimento`;
- `palavras_novas`;
- `criatividade`;
- `pensamento_esperto`;
- `cooperacao`;
- `notas_sino`.

Regras:

- progresso deve ter criterio pedagogico claro;
- nao conceder pontos arbitrarios por palavras soltas;
- cada cena deve explicar seu criterio em `learningCriteria` ou `actionRubric`.

## Audio Manifest

Chaves padrao:

```text
{adventureId}/{sceneId}/scene
{adventureId}/{sceneId}/dice-1
{adventureId}/{sceneId}/movement
{adventureId}/{sceneId}/visual-challenge
{adventureId}/{sceneId}/visual-success
{adventureId}/{sceneId}/hub-return
{adventureId}/{sceneId}/route-{targetSceneId}
{adventureId}/__adventure/celebration
ui/idle/default-1
```

Regras:

- audio obrigatorio deve passar em `npm run check`;
- audio complementar pode faltar sem quebrar o app;
- quando audio premium falta, a engine nao deve cair para voz do navegador;
- audio gerado precisa ser aprovado antes de uso infantil.

## Guardrails da IA Mestre

A IA mestre pode:

- reagir de forma teatral;
- resumir o que aconteceu;
- reconduzir uma escolha inesperada;
- reforcar o objetivo da cena;
- usar contexto aprovado.

A IA mestre nao pode:

- criar recompensa nova;
- criar local perigoso fora do pacote;
- mudar regra de dado/progresso;
- pedir dado quando a cena nao pede;
- ampliar tempo de jogo;
- coletar dados pessoais;
- inserir conteudo adulto, medo intenso ou violencia grafica.

## Criterio de Pronto de Um Pacote

Um pacote de aventura esta pronto quando:

- `npm run check` passa;
- assets obrigatorios existem;
- audios obrigatorios existem;
- cenas apontam para `next` valido ou `null`;
- hub nao aponta para cena inexistente;
- desafios usam templates conhecidos;
- revisao familiar esta preenchida;
- a historia abre, joga e salva checkpoint no celular.
