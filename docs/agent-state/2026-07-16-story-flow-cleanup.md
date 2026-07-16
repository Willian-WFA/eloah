# 2026-07-16 - Story Flow Cleanup

## O que foi feito

- Ajustado o modal inicial para incluir cor do avatar e companheiro.
- Simplificado o painel dos pais para tempo de jogo, humor restrito e permissão de voz/som.
- Sons e voz do narrador ficaram sempre ativos no MVP; seletores de ritmo/voz foram removidos da configuração dos pais.
- Adicionada toolbar de histórias com volume e narrador.
- Cards de histórias ganharam botão `PLAY`; o botão abre modal com `Ler história completa`, `Ler resumo` e `Aprovar e jogar`.
- Diário do mestre virou botão flutuante de livro e abre em modal.
- Narração de cena não usa mais os WAVs antigos de cena, evitando áudio com convite para inventar ação fora das opções.
- `composeSceneNarration()` agora termina após cena, pergunta e opções.
- Modal de opções abre somente depois que a narração termina.
- Seleção de opção ficou travada em uma escolha por cena.
- Ao avançar capítulo, o app salva checkpoint automaticamente.
- `scripts/generate-audio.js` foi ajustado para não gerar novamente a frase de escolha livre.
- Service worker atualizado para `rpg-kids-v2026-07-16-story-flow-cleanup-pwa`.

## Validação

- `npm run check` passou.
- Busca confirmou ausência de frases como `Você também pode`, `inventar sua própria`, `pode inventar`, `Livre escolha` e uso de áudio pré-gerado de cena.
- Servidor local rodou em `http://127.0.0.1:3108`.
- `/health` respondeu `{"ok":true,"app":"rpg-kids"}`.
- Chrome headless gerou screenshot mobile.
- Simulação lógica confirmou `O Portal das Estrelinhas` com 5 passos e `A Cidade dos Sinos Claros` com 17 passos.

## Pendências

- Regenerar os WAVs de cena com Gemini usando o script atualizado, se quisermos voltar a usar áudio pré-gerado para narração de cena.
- Automatizar clique real/E2E no Chrome para validar modal de PLAY, escolha, dado e diário.
- As imagens `modelo.png` e `modelo historias.png` foram usadas como referência visual e não devem entrar no commit.
