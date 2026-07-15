# Agent State: parent credits, time and summary

Data: 2026-07-13
Agente: The Creator / Codex

## Contexto

O usuario definiu uma regra de incentivo para uso futuro aberto:

- ler a historia inteira deve ser gratis;
- gerar resumo automatico exige credito;
- tempo de jogo base deve ser fixo em 30 minutos;
- aumentar tempo deve exigir credito.

## Decisoes

- Credito compra conveniencia, nao seguranca basica.
- Revisao completa e aprovacao manual pelo responsavel continuam gratuitas.
- Resumo automatico e pago porque evita trabalho do responsavel.
- Sessao padrao e 30 minutos.
- Extensao acima de 30 minutos consome credito.
- Credito nao pode bloquear encerramento seguro, checkpoint ou acesso a historia completa.
- A crianca nao deve receber pedido de compra ou incentivo para pressionar o responsavel.

## Implementado no prototipo

- Painel dos pais mostra saldo inicial de 2 creditos.
- `Ler historia inteira` e gratuito.
- `Gerar resumo` consome 1 credito.
- Resumo fica bloqueado ate ser comprado.
- Tempo de 30 minutos nao consome credito.
- Tempo de 45 minutos consome 1 credito.
- Tempo de 60 minutos consome 2 creditos.
- Botao de iniciar fica bloqueado se nao houver credito suficiente para a extensao escolhida.

## Arquivos alterados

- `prototype/index.html`
- `prototype/app.js`
- `prototype/styles.css`
- `docs/MASTER_SPEC.md`
- `docs/CURRENT_STATE.md`

## Validacao

- `node --check prototype/app.js`
- `node --check prototype/adventures.js`
- Busca no prototipo por `pum`, `cocô`, `xixi`, `light_potty` e `allowedPotty` sem ocorrencias.

## Proximo passo

Persistir saldo/uso de creditos e criar uma tela adulta futura para adicionar creditos, historico de consumo e limites por crianca/familia.
