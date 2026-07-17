# 2026-07-17 - Tico visual challenge flow

## Escopo

Corrigir a cena `Tico e a Ordem dos Biscoitos` apos teste manual: a cena estava executando desafio visual e depois dado, gerando confusao e risco de audio sobreposto.

## Feito

- Definida regra de produto: uma cena usa um mecanismo principal de resolucao por vez.
- `visualChallenge` agora conclui a cena ao acertar o desafio, aplica progresso/recompensa e libera a seta.
- `Tico e a Ordem dos Biscoitos` deixou de usar dado e passou a recompensar a Nota Amarela pelo desafio visual.
- Grade do desafio visual ganhou embaralhamento estavel e simbolos com mesmo tratamento visual.
- Registrado protocolo de uso de efeitos especiais: usar em conquista/virada, nao como camada persistente na leitura normal.

## Validacao

- `npm run check`
- Resultado: 0 audios obrigatorios faltando; audios complementares seguem opcionais.

## Proximo passo

Testar no celular a cena do Tico: escolher rota, ouvir fala, resolver estrela-lua-sino, receber efeito/recompensa e avancar sem abrir dado.
