# Discovery Notes

## Entendimento inicial

RPG Kids nasce de uma experiencia real: um adulto mestrou RPG para uma crianca de 4 anos, ela gostou, e agora a ideia e transformar isso em um app/jogo de celular com narrador, dados e historias infantis curtas.

O diferencial nao e "IA contando historia qualquer". O valor esta em uma IA que atua como mestre dentro de uma aventura aprovada, mantendo liberdade criativa para a crianca enquanto conduz a sessao ate um objetivo seguro, educativo e divertido.

## Certezas

- O jogo deve funcionar bem no celular.
- As sessoes podem ter duracao variavel, determinada pelo tamanho da historia.
- A IA deve atuar como mestre/narrador.
- Deve existir dado ou mecanica simples de sorte.
- Deve haver biblioteca de historias.
- Ao finalizar uma historia, o adulto deve poder adicionar novo jogo/historia.
- A IA deve ficar dentro do escopo da aventura.
- A experiencia deve ensinar algo sem parecer aula.
- O primeiro uso e familiar.
- A crianca deve poder dar comandos por voz dentro de uma historia validada por familiar.
- O MVP deve ter audio/narracao e imagens salvas para marcos de cena, como entrada de caverna, cidade, marcos, pontos e portais.
- Historias serao desenvolvidas por adulto com apoio de IA, passando por curadoria e orientacoes especificas para a IA mestre.
- Custo de token nao e preocupacao central neste momento; qualidade, diversao, desafio e desenvolvimento infantil sao mais importantes.
- O jogo deve intercalar desafios fisicos, cognitivos, emocionais, criativos e de idiomas quando fizer sentido narrativo.
- A crianca pode ganhar itens e ver o personagem/avatar mudar visualmente.
- O produto deve ter medidor de progresso por conquistas, sem ranking ou comparacao com outras criancas.

## Hipoteses

- O MVP pode ser uma PWA antes de app nativo.
- A crianca joga acompanhada por adulto.
- A aventura pode ser estruturada em cenas, objetivos, personagens, desafios e final.
- A voz pode ser processada sem armazenar audio bruto, mantendo apenas transcricao curta quando necessario para continuidade da sessao.
- As imagens do MVP podem ser assets preaprovados por cena/marco, nao imagens geradas ao vivo durante a sessao.

## Perguntas que mudam decisao

1. O produto precisa funcionar offline em algum momento?
2. A crianca pode perder/falhar ou toda falha deve virar desvio divertido?
3. O adulto precisa apertar um botao para gravar a fala da crianca ou a escuta fica ativa durante a cena?
4. O audio do narrador sera voz sintetica/TTS ou narracao pregravada no primeiro prototipo?
5. As imagens de cena serao escolhidas de uma biblioteca fixa ou geradas durante a criacao/curadoria da historia?
6. O protocolo de historia deve ser simples o bastante para editar em Markdown/JSON ou precisa de uma interface adulta desde cedo?
7. Quais movimentos fisicos serao permitidos no MVP: pular, marchar, polichinelo, equilibrio, alongar, imitar animal/personagem?
8. O avatar deve ser montado por camadas preaprovadas ou gerado com IA apenas em modo adulto/curadoria?

## Riscos principais

- IA sair do tom infantil ou do escopo aprovado.
- Coleta indevida de dados de crianca.
- Experiencia ficar text-heavy demais para 4 anos.
- Adulto perder controle do que a IA pode narrar.
- Historias geradas sem estrutura suficiente para chegar ao objetivo.
- Sessao longa perder ritmo se nao houver checkpoints, movimento e variacao de desafio.
- Captura de voz introduzir risco de privacidade, consentimento e armazenamento indevido.
- Reconhecimento de fala interpretar mal comandos infantis e levar a historia para uma direcao confusa.
- Imagens geradas em tempo real podem trazer conteudo inadequado; preferir assets preaprovados no MVP.
- Historias longas podem perder ritmo se nao houver checkpoints, pausas e resumo de retomada.
- Desafios fisicos inadequados para idade/espaco podem gerar risco; sempre permitir pular/trocar desafio e exigir supervisao adulta.
- Idiomas podem frustrar se forem tratados como prova; devem ser exposicao leve, repetitiva e divertida.

## Nao objetivos iniciais

- Chat livre irrestrito com crianca.
- Marketplace publico de historias.
- Multiplayer.
- Billing/assinatura.
- Voz gravada e armazenada como historico bruto.
- Imagem gerada livremente durante a sessao da crianca.
- Exercicio como punicao ou requisito rigido de performance.
- Diagnostico, terapia ou promessa de desenvolvimento clinico.
- Ranking entre criancas.
- App nativo nas lojas antes de validar o loop central.
