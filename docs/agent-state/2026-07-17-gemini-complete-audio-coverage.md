# 2026-07-17 - Gemini complete audio coverage

## Escopo

Gerar todos os audios opcionais restantes da campanha `A Cidade dos Sinos Claros` usando Gemini TTS em modo teatral, apos aprovacao explicita do usuario para enviar o texto privado da historia ao servico externo.

## Feito

- Executado `npm run generate:audio:missing`.
- Gerados 15 WAVs complementares:
  - 4 falas de rota da Praca;
  - sucesso visual do desafio do Tico;
  - `challenge` e `challenge-success` de Biblioteca, Jardim, Oficina, Bosque e Torre.
- Atualizados manifests de audio em `public/` e `prototype/`.

## Validacao

- `npm run check`
- Resultado: 203 chaves esperadas, 184 obrigatorias, 19 opcionais, 242 entradas no manifesto, 0 obrigatorias faltando e 0 opcionais faltando.
- `cmp` confirmou que os WAVs novos e manifests estao sincronizados entre `public/` e `prototype/`.

## Resultado

A campanha agora tem cobertura completa de audio pre-gerado para cenas, rotas, dados ainda usados, desafios visuais e desafios de template. O app nao precisa depender de voz do navegador nesses trechos.

## Proximo passo

Redeploy na Hostinger e teste no celular, lembrando de atualizar/limpar o service worker para pegar o cache novo.
