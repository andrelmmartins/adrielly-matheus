# Adrielly & Matheus

Site para o **chá de cozinha** e o **casamento** de Adrielly e Matheus. Os convidados podem consultar a lista de presentes e confirmar presença nos eventos.

## Funcionalidades

- **Lista de presentes** — visualizar itens e reservar o que deseja levar.
- **Confirmação de presença (RSVP)** — confirmar comparecimento e enviar informações aos noivos.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Chakra UI](https://www.chakra-ui.com) — interface
- [Airtable](https://airtable.com) — armazenamento de dados (sem backend próprio)
- [GitHub](https://github.com) — versionamento
- [Vercel](https://vercel.com) — publicação

## Por que Airtable?

Queremos algo **simples e confiável**, sem manter servidor ou banco de dados. O Airtable funciona como planilha com API: fácil de editar manualmente e suficiente para lista de presentes e RSVP.

## Desenvolvimento local

### Pré-requisitos

- Node.js 20+
- Conta no Airtable com base configurada

### Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
AIRTABLE_API_KEY=sua_chave_aqui
AIRTABLE_BASE_ID=seu_base_id_aqui
```

### Instalação e execução

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Verificação com ESLint |

## Deploy

O projeto é publicado na **Vercel**, conectada ao repositório no **GitHub**. Configure as variáveis de ambiente do Airtable no painel da Vercel antes do primeiro deploy.

## Estrutura (prevista)

```
src/
├── app/          # Rotas e páginas (App Router)
├── components/   # Componentes reutilizáveis (Chakra UI)
└── lib/          # Integração com Airtable e utilitários
```
