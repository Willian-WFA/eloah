# Adding A New Adventure

Este guia descreve o caminho recomendado para adicionar uma nova aventura ao RPG Kids sem transformar a engine em um jogo novo a cada historia.

## Resultado Esperado

Uma aventura pronta precisa ter:

- historia revisada por adulto;
- cenas com começo, meio, objetivo e final seguro;
- no maximo 3 opcoes narradas por decisao;
- desafios escolhidos por template reutilizavel;
- imagens aprovadas por cena ou fallback declarado;
- audio pregerado para narracao previsivel;
- pacote de assets registrado;
- validacao local com `npm run check`.

## 1. Definir A Promessa Da Historia

Antes de escrever cenas, defina:

- `Problema central`: o que esta errado no mundo da historia?
- `Objetivo da crianca`: o que ela precisa conquistar?
- `Aliado principal`: quem acompanha sem roubar protagonismo?
- `Desafio final`: quem ou o que precisa ser resolvido sem medo intenso?
- `Recompensa`: item visual, nota, medalha, livro, capa, escudo ou outro layer de avatar.
- `Aprendizado`: linguagem, pensamento, gentileza, movimento, cooperacao, idioma ou criatividade.

Exemplo:

```text
Problema: as lanternas da Vila das Folhas dormiram.
Objetivo: acordar 3 lanternas ajudando moradores.
Aliado: uma joaninha carteiro com mochila enorme.
Final: conversar com a Lanterna-Mae, que esta cansada.
Recompensa: Capa de Folha Clara.
Aprendizado: gentileza, observacao, ingles leve e movimento.
```

## 2. Escolher O Modelo

Use um dos modelos atuais:

- Aventura curta: `content/templates/adventure-template-v0.json`
- Campanha longa/hub: `content/templates/long-branching-adventure-template-v1.json`

Regra pratica:

- 10 a 25 minutos: aventura curta.
- Varios locais, mapa, retorno a hub, sessoes de 30 min: campanha longa.

## 3. Escrever Cenas Com Ritmo De Mestre

Cada cena deve ter:

- `title`: nome curto e memoravel.
- `narration`: texto teatral, sequencial, sem grandes saltos.
- `prompt`: pergunta clara do mestre.
- `choices`: 3 opcoes concretas.
- `learningCriteria`: por que a cena treina algo.
- `next`: proxima cena ou retorno ao hub.

Boa cena:

```text
Voce chega na Ponte das Folhas Baixinhas. As tabuas sao largas, mas cada uma tem uma folha desenhada. A joaninha carteiro aponta para tres folhas brilhando: uma azul, uma amarela e uma verde. Do outro lado, uma lanterna pequena boceja.

O que voce faz?
1. Piso primeiro na folha azul.
2. Pergunto para a joaninha qual folha parece segura.
3. Observo se alguma folha balanca com o vento.
```

Evite:

- pular de um local para outro sem narrar trajeto;
- narrar 8 opcoes de uma vez;
- dar recompensa sem criterio;
- usar susto, monstro agressivo, perda humilhante ou castigo.

## 4. Escolher Templates De Desafio

Use templates reutilizaveis, nao componentes novos por historia.

Templates recomendados:

- `dice_check`: sorte, suspense e consequencia segura.
- `movement_timer`: pular, bater palmas, marchar, respirar ou alongar.
- `visual_sequence_pick`: escolher simbolos em ordem.
- `language_repeat`: repetir palavra curta em ingles ou mandarim.
- `memory_echo`: lembrar sons ou cores.
- `counting_sort`: contar objetos.
- `map_route_choice`: escolher local no mapa.

Regra para crianca pequena:

- Dado e desafio fisico nao devem disputar atencao no mesmo instante.
- Movimento precisa ter fallback.
- Idioma nunca reprova pronuncia.
- Erro vira tentativa leve, nao derrota.

## 5. Criar Revisao Dos Pais

Toda aventura precisa preencher:

```json
{
  "contentReview": {
    "flags": ["movimento", "idiomas"],
    "requiresParentConsent": false,
    "flaggedContexts": [],
    "parentSummary": "Resumo adulto com objetivo, desafios, personagens e pontos de atencao."
  },
  "humorProfile": {
    "style": ["absurd_characters"],
    "restrictedPottyHumor": false,
    "frequency": "rare"
  }
}
```

Humor restrito fica desligado por padrao. Se algum dia for usado, precisa aparecer em `flaggedContexts` e depender de consentimento adulto.

## 6. Preparar Assets

Para cada cena importante, defina:

- imagem aprovada;
- texto `alt`;
- `assetId`;
- efeito visual;
- som/ambiencia.

Enquanto os arquivos ainda estiverem globais, registre o pacote em:

```text
public/adventure-packages/<adventure-id>/package.json
prototype/adventure-packages/<adventure-id>/package.json
```

O pacote deve declarar:

```json
{
  "schema": "rpg-kids.adventure-package.v1",
  "mode": "reference",
  "adventureId": "minha-aventura",
  "assetPack": "minha-aventura-v0",
  "paths": {
    "sceneImageBase": "assets/scenes/",
    "audioBase": "assets/audio/minha-aventura/",
    "adventureAudioBase": "assets/audio/minha-aventura/__adventure/"
  },
  "sceneImages": []
}
```

## 7. Gerar Audio Previsivel

O MVP deve preferir WAV pregerado para falas previsiveis.

Depois de adicionar a aventura ao catalogo:

```bash
npm run generate:audio -- --adventure minha-aventura --continue-on-error
```

Para completar apenas faltantes:

```bash
npm run generate:audio:missing
```

O audio esperado segue este padrao:

```text
assets/audio/<adventure-id>/<scene-id>/scene.wav
assets/audio/<adventure-id>/<scene-id>/dice-1.wav
assets/audio/<adventure-id>/<scene-id>/movement.wav
assets/audio/<adventure-id>/__adventure/celebration.wav
```

## 8. Adicionar Ao Catalogo

Enquanto a migracao completa para JSON nao terminar, o catalogo jogavel ainda vive em:

```text
public/adventures.js
prototype/adventures.js
```

Quando o manifest JSON estiver ativo para pacotes completos, a aventura deve entrar por:

```text
public/adventures.manifest.json
public/adventure-packages/<adventure-id>/adventure.json
```

## 9. Validar

Rode:

```bash
npm run check
```

O check deve confirmar:

- JS sem erro de sintaxe;
- cobertura obrigatoria de audio;
- pacote de assets presente;
- imagens listadas existem.

Teste manual minimo:

1. Abrir a biblioteca.
2. Ler resumo da historia.
3. Aprovar e jogar.
4. Entrar na primeira cena.
5. Ouvir narracao pregerada.
6. Escolher uma opcao.
7. Concluir desafio/dado.
8. Confirmar checkpoint ou proxima cena.

## 10. Abrir PR

O PR deve explicar:

- nova aventura adicionada;
- faixa etaria;
- riscos/pontos de atencao;
- quais assets entraram;
- quais audios foram gerados;
- validacao executada.

Nao inclua segredos, chaves de API, `.env` ou arquivos temporarios.
