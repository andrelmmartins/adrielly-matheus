# Feature Specification: Cache da lista de presentes

**Feature Branch**: `001-airtable-query-cache`

**Created**: 2026-07-30

**Status**: Draft

**Input**: User description: "Estou bem próximo de bater meu limite da api free do airtable quero melhorar minhas requisição, instalando o react query e mudando nas chamadas já ajude pq colocamos um cache nas requisições. Não é um sistema muito utilizado, tem coisas repetitivas, é necessário invalidar o cache apenas após o registro de um presente imgino eu"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Consultar presentes sem refetch repetitivo (Priority: P1)

Um convidado abre o site, vê a lista de presentes e, ao rolar, trocar de aba do navegador ou voltar à seção de presentes pouco depois, continua vendo a mesma lista sem disparar uma nova busca desnecessária aos dados externos. O site é pouco usado, então prioriza-se reduzir chamadas repetidas em vez de atualização em tempo real.

**Why this priority**: É o ganho direto no consumo da cota gratuita: a maior parte do tráfego é leitura repetida da lista.

**Independent Test**: Carregar a lista, sair e voltar à seção (ou refocar a aba) dentro da janela de frescor; a lista permanece disponível e nenhuma nova busca de lista é feita nesse intervalo.

**Acceptance Scenarios**:

1. **Given** a lista de presentes já foi carregada com sucesso, **When** o convidado permanece no site ou volta à seção de presentes dentro da janela de frescor, **Then** a lista continua visível sem nova busca da lista.
2. **Given** a lista ainda não foi carregada nesta visita, **When** o convidado abre a seção de presentes, **Then** a lista é buscada uma vez e exibida (com estado de carregamento enquanto aguarda).
3. **Given** a busca da lista falha, **When** o convidado visualiza a seção, **Then** vê uma mensagem de erro clara em português e não fica com tela em branco indefinida.

---

### User Story 2 - Atualizar lista após reservar presente (Priority: P1)

Um convidado reserva um presente informando o nome. Após a confirmação, a interface reflete o presente como reservado. O cache da lista é atualizado nesse momento (e não continuamente), para não gastar cota em refetch automático.

**Why this priority**: Sem atualização após a reserva, o cache longo mostraria dados errados e permitiria confusão (presente ainda “disponível”).

**Independent Test**: Reservar um presente disponível; o cartão passa a “Reservado” sem recarregar a página inteira; a atualização não depende de polling periódico.

**Acceptance Scenarios**:

1. **Given** um presente disponível, **When** o convidado confirma a reserva com nome válido, **Then** o presente aparece como reservado na lista sem reload completo da página.
2. **Given** uma reserva bem-sucedida, **When** o convidado continua navegando no site, **Then** a lista em cache já reflete o estado reservado (não é necessário um refetch periódico para “descobrir” a mudança).
3. **Given** a reserva falha (ex.: já reservado por outra pessoa), **When** o erro retorna, **Then** o convidado vê a mensagem de erro e o cache da lista não é tratado como se a reserva tivesse sido concluída.

---

### User Story 3 - Atualizar lista após desreservar (Priority: P2)

Um convidado que reservou um presente o desreserva. A lista volta a mostrar o item como disponível. Embora o pedido original mencione invalidação só após “registro”, a desreserva também altera o estado compartilhado e precisa da mesma atualização de cache.

**Why this priority**: Menos frequente que a reserva, mas necessário para consistência do mesmo fluxo de presentes.

**Independent Test**: Desreservar um presente próprio; o botão/estado volta a permitir nova reserva sem reload da página.

**Acceptance Scenarios**:

1. **Given** um presente reservado pelo próprio convidado, **When** ele confirma a desreserva, **Then** o presente volta a aparecer disponível na lista sem reload completo.
2. **Given** a desreserva falha, **When** o erro retorna, **Then** o estado em tela permanece coerente com a falha e o cache não assume sucesso.

---

### User Story 4 - RSVP não dispara refetch da lista (Priority: P3)

Um convidado confirma presença. Essa ação não deve invalidar nem forçar nova busca da lista de presentes, pois não altera o inventário de presentes.

**Why this priority**: Evita gasto desnecessário de cota em um fluxo paralelo já existente.

**Independent Test**: Enviar RSVP com lista já em cache; nenhuma nova busca da lista de presentes ocorre por causa do envio.

**Acceptance Scenarios**:

1. **Given** a lista de presentes já está em cache, **When** o convidado envia a confirmação de presença com sucesso, **Then** a lista de presentes não é buscada de novo só por causa desse envio.

## Edge Cases

- Lista vazia (nenhum presente cadastrado): exibir estado vazio, sem loops de refetch.
- Reserva concorrente: dois convidados tentam o mesmo item; o segundo recebe erro e o cache local não marca sucesso indevido.
- Nome vazio na reserva: formulário impede envio; nenhuma chamada de escrita.
- Sessão longa além da janela de frescor: uma nova busca da lista é permitida para não exibir dados eternamente obsoletos.
- Falha de rede na leitura: erro visível; retry limitado (sem martelar a API).
- Desreserva por quem não é o reservador: permanece bloqueada pelo comportamento atual do site (cookie/controle local).

## Requirements

### Functional Requirements

- **FR-001**: O site MUST manter a lista de presentes em cache no cliente após a primeira leitura bem-sucedida, evitando buscas repetidas enquanto os dados forem considerados frescos.
- **FR-002**: Enquanto a lista estiver fresca, o site MUST NOT refazer a busca da lista apenas por foco da aba do navegador ou por remount da seção de presentes.
- **FR-003**: A janela de frescor da lista MUST ser adequada a um site de baixo tráfego (padrão informado: 5 minutos), priorizando economia de cota sobre atualização quase em tempo real.
- **FR-004**: Após reserva de presente bem-sucedida, o cache da lista MUST ser atualizado para refletir o novo estado do item.
- **FR-005**: Após desreserva bem-sucedida, o cache da lista MUST ser atualizado da mesma forma (extensão necessária do pedido de invalidar só após “registro”).
- **FR-006**: A atualização pós-reserva/desreserva SHOULD preferir reutilizar a resposta da própria operação para atualizar o cache, em vez de disparar uma nova busca completa da lista, quando a resposta já trouxer o item atualizado.
- **FR-007**: O envio de confirmação de presença (RSVP) MUST NOT invalidar nem forçar nova busca da lista de presentes.
- **FR-008**: Em falha de reserva ou desreserva, o cache MUST NOT ser alterado como se a operação tivesse sucesso.
- **FR-009**: Se a biblioteca de cache de consultas no cliente já estiver instalada e em uso, a implementação MUST reaproveitá-la e apenas ajustar política de cache/atualização — sem reinstalar ou duplicar a mesma solução.
- **FR-010**: Textos e estados de carregamento/erro da lista e das ações de reserva MUST permanecer em português brasileiro, coerentes com o restante do site.

### Key Entities

- **Presente**: item da lista com nome, foto opcional, indicador de reservado e nome de quem reservou.
- **Cache da lista de presentes**: cópia em memória no navegador da lista já lida, com janela de frescor e pontos de atualização após escrita.
- **Reserva / Desreserva**: ações que alteram o estado de um presente e disparam atualização do cache.
- **Confirmação de presença (RSVP)**: fluxo paralelo que não altera o inventário de presentes nem o cache da lista.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Em uma sessão típica de navegação (abrir lista, trocar de seção, refocar a aba) dentro da janela de frescor, ocorre no máximo 1 busca da lista de presentes.
- **SC-002**: Após reserva bem-sucedida, o estado “reservado” aparece na interface em menos de 2 segundos sem reload completo da página, em pelo menos 95% das tentativas em condições normais de rede.
- **SC-003**: Após desreserva bem-sucedida, o presente volta a “disponível” na interface sem reload completo da página.
- **SC-004**: Enviar RSVP não provoca nenhuma busca adicional da lista de presentes.
- **SC-005**: Em comparação com refetch a cada foco de aba / a cada ~1 minuto, o número de buscas da lista por sessão de convidado cai de forma perceptível (meta qualitativa: tipicamente uma busca por visita curta, não várias).

## Assumptions

- O site já usa (ou pode reusar) a biblioteca de cache de consultas no cliente; o trabalho é configurar cache longo e atualização pontual, não reinventar o padrão.
- “Invalidar só após registro de presente” interpreta-se como: atualizar cache após mudança de estado do presente (reserva e, por consistência, desreserva); não após RSVP nem por polling.
- Janela de frescor padrão: 5 minutos; sem refetch automático por foco de aba enquanto fresco.
- Tráfego baixo: aceitável que outro convidado em outro dispositivo veja a lista até 5 minutos defasada até a próxima leitura fresca.
- Fora de escopo: mudança de plano do Airtable, autenticação de convidados, cache compartilhado entre todos os usuários no servidor (pode ser melhoria futura se a cota continuar crítica), redesign visual.

## Approach

- Ajustar a política global de queries no provedor de cache do cliente: `staleTime` ~5 minutos e sem refetch por foco de aba enquanto os dados estiverem frescos (`src/components/providers/QueryProvider.tsx`).
- Manter `useQuery` da lista em `src/sections/gifts/index.tsx` com a chave já usada (`["gifts"]`); só alterar se necessário alinhar opções locais.
- Em `src/components/GiftCard.tsx`, após reserva/desreserva com sucesso, atualizar o cache com a resposta da mutação (`setQueryData`) em vez de `invalidateQueries` (evita um GET extra da lista a cada escrita).
- Confirmar que `src/components/RsvpForm.tsx` não invalida a lista de presentes (já é o comportamento esperado).
- Não reinstalar a biblioteca se `@tanstack/react-query` já estiver nas dependências.
