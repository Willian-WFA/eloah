# Adventure Asset Packages

Este documento define a separacao inicial de assets e audio por pacote de aventura.

## Objetivo

Cada historia deve ter um pacote proprio para facilitar:

- adicionar nova aventura sem editar a engine;
- validar se imagens e audios existem antes do deploy;
- mover futuramente arquivos para pastas por aventura;
- revisar conteudo no painel dos pais com assets aprovados.

## Estrutura

```text
public/adventure-packages/
  index.json
  cidade-dos-sinos-claros/
    package.json
```

O mesmo espelho deve existir em `prototype/adventure-packages/`.

## Modo Atual: `reference`

No modo `reference`, o pacote ainda aponta para os assets globais atuais:

```json
{
  "mode": "reference",
  "paths": {
    "sceneImageBase": "assets/scenes/",
    "audioBase": "assets/audio/cidade-dos-sinos-claros/",
    "adventureAudioBase": "assets/audio/cidade-dos-sinos-claros/__adventure/"
  }
}
```

Isso evita mover arquivos grandes agora e permite validar o contrato antes da migracao fisica.

## Proximo Modo: `bundled`

Quando uma aventura virar pacote completo, o pacote pode apontar para arquivos internos:

```text
public/adventure-packages/cidade-dos-sinos-claros/
  adventure.json
  assets/scenes/
  assets/audio/
```

Nesse modo, a engine deve carregar a aventura, imagens e audios a partir do pacote.

## Regras

- Cada aventura jogavel precisa aparecer em `index.json`.
- Cada pacote precisa declarar `adventureId`, `assetPack`, `paths.audioBase` e `sceneImages`.
- Toda imagem listada em `sceneImages` precisa existir em `public/`.
- Aventura sem imagem aprovada pode declarar `sceneImages: []`, mas isso deve ficar claro em `notes`.
- Audios continuam validados por `scripts/check-audio-coverage.js`.
