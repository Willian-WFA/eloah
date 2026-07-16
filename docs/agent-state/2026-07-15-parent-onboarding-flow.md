# 2026-07-15 - Parent Onboarding Flow

## O que foi feito

- Criado modal inicial para perfil da criança com nome/apelido, tratamento e idade.
- Reorganizado o painel dos pais em duas etapas: configuração da sessão e aprovação da história.
- Configurações de tempo, sons, voz, humor restrito, avatar e modo voz ficaram em painel retrátil.
- Tela de aprovação ficou mais curta, com aviso simples e pontos de atenção em painel recolhível.
- Cards de aventura passaram a usar imagem aprovada da primeira cena como miniatura.
- Cards agora exibem duração, quantidade de cenas, modelo e idade recomendada.
- `public/` foi espelhado em `prototype/`.
- Service worker atualizado para `rpg-kids-v2026-07-15-parent-onboarding-pwa`.

## Validação

- `npm run check` passou.

## Riscos e próximos pontos

- Falta validação visual manual no celular depois do deploy/cache refresh.
- A idade ainda não altera regras pedagógicas automaticamente; por enquanto entra como dado de perfil para próxima camada de adaptação.
- Próximo passo recomendado: ajustar conteúdo/aprendizado por idade e criar uma tela adulta de edição/aprovação mais completa por aventura.
