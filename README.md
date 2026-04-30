# GitHub Explorer

Aplicativo Expo com React Native e TypeScript para buscar repositórios públicos do GitHub, visualizar detalhes e acompanhar issues abertas.

## Tecnologias

- Expo SDK 54
- React Native
- TypeScript
- Expo Router
- TanStack Query
- Jest
- React Native Testing Library
- ESLint
- Prettier

## Funcionalidades

- Busca de repositórios no GitHub ordenada por estrelas.
- Campo de busca com debounce e persistência da última busca.
- Ação para limpar rapidamente o termo pesquisado.
- Lista com paginação infinita.
- Feedback de fim de lista.
- Pull-to-refresh na busca e nas issues.
- Skeleton loading em estados de carregamento.
- Tela de detalhes do repositório.
- Tela de issues abertas do repositório.
- Links para abrir repositórios e issues no GitHub.
- Design System tipado com tokens, tema claro/escuro e componentes base.
- Showcase do Design System.
- Cache e controle de estados de carregamento/erro com TanStack Query.

## Instalação

```bash
npm install
```

## Execução

```bash
npm start
```

Para abrir diretamente no navegador:

```bash
npm run web
```

Também é possível usar:

```bash
npm run android
npm run ios
```

## Token do GitHub

A API pública do GitHub permite poucas requisições por hora sem autenticação. Para reduzir erros de rate limit durante o desenvolvimento, crie um arquivo `.env` na raiz do projeto:

```bash
EXPO_PUBLIC_GITHUB_TOKEN=seu_token
```

O arquivo `.env` está no `.gitignore`. O repositório mantém apenas o `.env.example` como referência.

O app também aceita `GITHUB_TOKEN` como fallback, mas em projetos Expo o nome com `EXPO_PUBLIC_` é o caminho mais direto para disponibilizar a variável no bundle.

## Scripts

```bash
npm run typecheck
npm run lint
npm run format
npm run format:check
npm test
npm run test:watch
```

## Organização

O projeto usa `app/` para as rotas do Expo Router e `src/` para a implementação das features, serviços e Design System.

```txt
app/
  (tabs)/
  repository/

src/
  design-system/
  features/
    issues/
    repositories/
  services/
    github/
    query/
  utils/
```

## Decisões arquiteturais

O `app/` fica responsável principalmente por rotas. A lógica das telas fica em `src/features`, o que mantém os arquivos de rota pequenos e facilita a evolução das telas.

O Design System concentra tokens, tema e componentes base. As telas usam props controladas como `variant`, `size`, `tone`, `loading` e `disabled`, evitando estilos livres por instância nos componentes principais.

O TanStack Query foi usado para cache e data fetching. A busca e a listagem de issues usam `useInfiniteQuery`, pois precisam de paginação. A tela de detalhes usa `useQuery`, pois depende de um único recurso. As queries usam chaves específicas por busca, repositório e lista de issues.

O cliente do GitHub fica isolado em `src/services/github`, com tipos, funções de request e mensagens de erro amigáveis para casos como rate limit, rede e repositório não encontrado.

Alguns utilitários puros, como formatação de números, data relativa e debounce, ficam em `src/utils` para evitar duplicação nas features.

## Testes

Os testes usam Jest e React Native Testing Library. Há cobertura para renderização da tela de busca, cards de repositório, cards de issue, tratamento de erros da API e formatação de data relativa.

```bash
npm test
```
