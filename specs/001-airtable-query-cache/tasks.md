# Tasks: Cache da lista de presentes

**Input**: [spec.md](./spec.md) · [plan.md](./plan.md)

## Phase 1 - Cache policy

- [x] **T001** Ajustar `staleTime` (~5 min) e desativar refetch por foco de aba enquanto fresco + `src/components/providers/QueryProvider.tsx`
- [x] **T002** [P] Confirmar `useQuery` da lista com chave `["gifts"]` e opções alinhadas à política global + `src/sections/gifts/index.tsx`

## Phase 2 - Atualização pontual pós-escrita

- [x] **T003** Após reserva bem-sucedida, atualizar cache com `setQueryData` a partir da resposta (sem `invalidateQueries` da lista) + `src/components/GiftCard.tsx`
- [x] **T004** Após desreserva bem-sucedida, atualizar cache com `setQueryData` a partir da resposta + `src/components/GiftCard.tsx`
- [x] **T005** [P] Confirmar que RSVP não invalida a lista de presentes + `src/components/RsvpForm.tsx`

## Phase 3 - Verificação

- [x] **T006** Validar manualmente: 1 fetch na visita, sem refetch ao refocar aba; reserva/desreserva atualizam UI; RSVP não refetcha lista
