# Agent State: silly potty humor profile

Data: 2026-07-13
Agente: The Creator / Codex

## Contexto

O usuario definiu que o RPG Kids deve aceitar humor bobo e levemente escatologico, porque criancas de 4 anos tendem a se engajar com piadas simples de pum, cocô e xixi. O usuario tambem quer personagens absurdos e criativos, como mulher com orelha de cachorro, girafa de pescoço curto e coelho barrigudo, com curadoria humana na criacao das historias.

## Decisoes

- Humor bobo passa a ser parte intencional do tom do produto quando declarado pela aventura.
- Humor escatologico permitido fica limitado a `pum`, `cocô` e `xixi`.
- Intensidade inicial recomendada: `mild`.
- Frequencia inicial recomendada: `rare` ou `occasional`, para funcionar como tempero e nao dominar a historia.
- Personagens absurdos e afetuosos sao desejados como material criativo.
- O adulto/humano continua responsavel pela curadoria da historia e pode desligar/reduzir esse perfil.

## Guardrails

- Nao usar nojo pesado.
- Nao usar humilhacao, vergonha corporal ou punicao.
- Nao transformar xixi/cocô em acidente realista constrangedor.
- Nao usar humor sexual, conteudo adulto, medo intenso ou violencia grafica.
- A piada deve acontecer no mundo da historia, nao contra a crianca.
- Se a crianca pedir algo fora do limite, a IA deve acolher a energia boba e reconduzir para uma versao segura.

## Arquivos alterados

- `docs/MASTER_SPEC.md`
- `docs/STORY_PROTOCOL_V0.md`
- `content/adventures/portal-das-estrelinhas.md`
- `prototype/adventures.js`
- `docs/CURRENT_STATE.md`

## Validacao

- `node --check prototype/adventures.js`

## Proximo passo

Quando o prompt do mestre IA for criado, incluir `humor_profile` como parte obrigatoria do contrato de aventura e exigir que qualquer improviso respeite `allowed_potty_words`, `max_intensity` e `frequency`.
