<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Adrielly & Matheus — Guia para agentes

Site para o chá de cozinha e o casamento de Adrielly e Matheus. O foco é simplicidade: duas funcionalidades principais, sem backend próprio.

## Funcionalidades

1. **Lista de presentes** — convidados visualizam itens disponíveis e podem reservar/comprar presentes.
2. **Confirmação de presença (RSVP)** — convidados confirmam presença e informam dados relevantes (nome, acompanhantes, restrições alimentares, etc.).

## Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | Next.js (App Router, TypeScript) |
| UI | Chakra UI |
| Dados | Airtable (sem backend complexo) |
| Versionamento | GitHub |
| Deploy | Vercel |

## Arquitetura

- **Sem backend dedicado.** Toda persistência passa pelo Airtable via API (Route Handlers ou Server Actions no Next.js).
- **Chaves do Airtable** ficam em variáveis de ambiente (`AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`, etc.) — nunca no código-fonte.
- Prefira **Server Components** para leitura e **Server Actions** ou **Route Handlers** para escrita, mantendo o token do Airtable no servidor.
- Evite adicionar banco de dados, ORM ou serviços de autenticação a menos que o escopo mude explicitamente.

## Convenções de código

- Use **Chakra UI** para todos os componentes visuais. Não introduza outra biblioteca de UI.
- Mantenha o projeto **simples**: poucas abstrações, sem over-engineering.
- Textos voltados ao usuário final em **português brasileiro**.
- Siga os padrões já existentes no repositório (estrutura `src/`, alias `@/*`).

## Airtable (orientação)

Organize o base em tabelas separadas, por exemplo:

- `Presentes` — nome, descrição, link, reservado por, data da reserva.
- `RSVP` — nome, nome de acompanhantes, observações.

Consulte a [API do Airtable](https://airtable.com/developers/web/api/introduction) para endpoints e limites de taxa.

## Deploy e ambiente

- Branch principal no **GitHub**; preview e produção na **Vercel**.
- Variáveis de ambiente configuradas no painel da Vercel e em `.env.local` para desenvolvimento.
- Não commitar `.env`, `.env.local` nem chaves de API.
