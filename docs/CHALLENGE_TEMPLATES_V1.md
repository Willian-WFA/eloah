# Challenge Templates V1

Este documento define uma biblioteca inicial de desafios reutilizáveis para o RPG Kids. O objetivo é evitar que cada história vire um jogo novo no código. A história escolhe um template, preenche conteúdo, assets, áudio e recompensas, e a engine renderiza a interação.

## Princípio

Cada desafio deve declarar:

- `templateId`: tipo de interação reutilizável.
- `prompt`: fala curta do mestre antes do desafio.
- `instruction`: instrução visível para a criança.
- `successText`: fala/feedback ao concluir.
- `fallbackText`: alternativa segura quando a criança não consegue ou não quer fazer.
- `audioKeys`: chaves dos WAVs pré-gerados.
- `reward`: progresso, item ou token concedido.
- `safety`: restrições para idade, movimento e supervisão.

A história não deve controlar DOM, timers, microfone, dado, animação ou estado interno. Isso fica na engine.

## Templates Base

### `dice_check`

Uso: desafio de sorte em estilo D&D infantil.

Quando usar:

- A criança tentou atravessar, abrir, procurar, conversar ou escapar.
- O resultado pode gerar uma consequência divertida e segura.
- A cena precisa de suspense curto.

Contrato mínimo:

```json
{
  "templateId": "dice_check",
  "prompt": "Jogue um dado.",
  "dice": {
    "sides": 6,
    "bands": {
      "low": [1, 2],
      "middle": [3, 4],
      "high": [5, 6]
    }
  },
  "outcomes": {
    "low": {
      "reaction": "Ih... o dado caiu no cantinho do azar.",
      "narration": "Algo complica, mas a aventura continua.",
      "progressDelta": {}
    },
    "middle": {
      "reaction": "Quase deu errado, mas a sorte sorriu.",
      "narration": "A criança consegue com uma condição simples.",
      "progressDelta": {}
    },
    "high": {
      "reaction": "Sorte grande!",
      "narration": "A ação dá muito certo.",
      "progressDelta": {},
      "rewardId": null
    }
  }
}
```

Regras:

- Um uso por desafio.
- O número deve aparecer grande.
- O efeito sonoro de rolagem é obrigatório quando som estiver ativo.
- O resultado deve ser narrado por áudio pré-gerado quando existir.

### `movement_timer`

Uso: movimento leve, com botão `Pronto` e confirmação depois de alguns segundos.

Quando usar:

- Pular, bater palmas, alongar, girar devagar, marchar parado, respirar fundo.
- A cena quer treinar motricidade ampla sem competição.

Contrato mínimo:

```json
{
  "templateId": "movement_timer",
  "label": "Desafio do Corpo",
  "instruction": "Dê 5 pulos pequenos como uma estrela acordando.",
  "durationSeconds": 20,
  "confirmationQuestion": "Você já cumpriu o desafio?",
  "successText": "Muito bem. O caminho abriu com energia.",
  "fallbackText": "Tudo bem. Faça só um gesto pequeno com a mão e seguimos juntos.",
  "safety": {
    "requiresAdultNearby": true,
    "allowSeatedFallback": true,
    "maxRepetitions": 10
  }
}
```

Regras:

- Não deve aparecer junto com dado no mesmo passo. Fluxo recomendado: escolha -> movimento -> depois dado somente se a cena exigir uma segunda etapa.
- Deve aceitar `Sim`/`Não` por toque e voz.
- Nunca deve punir a criança por não conseguir.

### `visual_sequence_pick`

Uso: selecionar objetos em ordem, como estrela -> lua -> sino.

Quando usar:

- Buscar símbolos numa cena.
- Reforçar atenção, memória visual, sequência e vocabulário.
- Criar mini-jogos reaproveitáveis com imagens/ícones por história.

Contrato mínimo:

```json
{
  "templateId": "visual_sequence_pick",
  "title": "Escolha",
  "instruction": "Toque na estrela, depois na lua e depois no sino.",
  "targets": ["star", "moon", "bell"],
  "options": [
    { "id": "star", "label": "estrela", "symbol": "★", "audioLabel": "estrela" },
    { "id": "moon", "label": "lua", "symbol": "☾", "audioLabel": "lua" },
    { "id": "bell", "label": "sino", "symbol": "🔔", "audioLabel": "sino" },
    { "id": "tree", "label": "árvore", "symbol": "♣", "audioLabel": "árvore" }
  ],
  "wrongText": "Quase. Procure outro símbolo.",
  "successText": "Isso! A sequência acendeu."
}
```

Regras:

- Deve mostrar slots com `?`.
- Só avança quando a sequência correta for completa.
- Errar não deve fechar o modal.
- A engine pode embaralhar opções mantendo `targets`.

### `language_repeat`

Uso: repetir ou reconhecer uma palavra curta em inglês ou mandarim.

Quando usar:

- Uma palavra por cena para crianças pequenas.
- Reforçar som, curiosidade e memória, sem avaliar pronúncia com rigidez.

Contrato mínimo:

```json
{
  "templateId": "language_repeat",
  "language": "en",
  "word": "star",
  "translation": "estrela",
  "prompt": "Vamos aprender uma palavra mágica: star quer dizer estrela.",
  "instruction": "Fale star ou toque em Pronto.",
  "acceptApproximation": true,
  "successText": "Muito bem. Star brilhou no mapa.",
  "fallbackText": "Tudo bem. O mestre falou junto com você: star."
}
```

Regras:

- Inglês: máximo 2 palavras novas por quest.
- Mandarim: usar pinyin e máximo 1 palavra nova por quest.
- A engine não deve reprovar pronúncia de criança pequena.

### `memory_echo`

Uso: lembrar uma sequência curta narrada pelo mestre.

Quando usar:

- Sequência de sons, cores, NPCs, sinos ou símbolos.
- Treinar atenção auditiva e memória de trabalho.

Contrato mínimo:

```json
{
  "templateId": "memory_echo",
  "sequence": ["plim", "plom", "plim"],
  "instruction": "Toque os sons na mesma ordem.",
  "options": [
    { "id": "plim", "label": "Plim" },
    { "id": "plom", "label": "Plom" }
  ],
  "successText": "Você lembrou a música certinha.",
  "fallbackText": "Vamos ouvir de novo mais devagar."
}
```

Regras:

- Para 4 anos, começar com 2 ou 3 itens.
- Deve ter botão de ouvir novamente.

### `counting_sort`

Uso: contar, agrupar ou escolher quantidade.

Quando usar:

- Numerais pequenos, objetos na cena, recompensas, sinos, estrelas.
- Ensinar números junto com visual forte.

Contrato mínimo:

```json
{
  "templateId": "counting_sort",
  "instruction": "Toque nos 3 sinos pequenos.",
  "targetCount": 3,
  "targetTag": "sino",
  "items": [
    { "id": "bell_1", "label": "sino", "tag": "sino" },
    { "id": "star_1", "label": "estrela", "tag": "estrela" }
  ],
  "successText": "Três sinos! O número 3 brilhou grande."
}
```

Regras:

- Números devem aparecer grandes.
- O app deve falar o número no resultado.

### `map_route_choice`

Uso: mapa tocável de hub.

Quando usar:

- Cidade com vários pontos de investigação.
- A história tem rotas abertas, bloqueadas e concluídas.

Contrato mínimo:

```json
{
  "templateId": "map_route_choice",
  "hubSceneId": "sinos_praca_relogio",
  "maxNarratedRoutes": 3,
  "routes": [
    {
      "id": "sinos_tico_biscoitos",
      "label": "Rua dos Biscoitos Redondos",
      "icon": "cookie",
      "position": { "x": 24, "y": 44 },
      "requires": {},
      "routeAudioKey": "cidade-dos-sinos-claros/sinos_praca_relogio/route-sinos_tico_biscoitos"
    }
  ]
}
```

Regras:

- A narração deve falar no máximo 3 rotas por vez.
- O mapa pode mostrar mais pontos, mas precisa indicar bloqueado/concluído/aberto.
- Tocar em rota aberta pode levar direto ao capítulo.

## Como Escolher Um Template

- Sorte e suspense: `dice_check`.
- Corpo em movimento: `movement_timer`.
- Encontrar símbolos/objetos: `visual_sequence_pick`.
- Aprender palavra: `language_repeat`.
- Lembrar sons/ordem: `memory_echo`.
- Números/quantidades: `counting_sort`.
- Cidade ou hub: `map_route_choice`.

## Critério De Pronto

Um template só entra em produção quando:

- Tem estado de início, sucesso, erro leve e fallback.
- Funciona por toque no celular.
- Funciona sem áudio, mas usa WAV pré-gerado quando existir.
- Não depende de fala livre para avançar.
- Salva progresso/checkpoint ao concluir.
- É revisável pelo adulto antes da criança jogar.

