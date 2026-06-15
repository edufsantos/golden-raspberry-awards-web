![Logo do Sistema](public/assets/award-icon.png)

# Golden Raspberry Awards Web

🌐 Acesse a aplicação na AWS: [outsera-test-edu.com.br](https://d1zkwvdju7rtkd.cloudfront.net/dashboard)

Aplicação web para visualização e análise dos dados do Golden Raspberry Awards, com foco em organização arquitetural, qualidade de código e testabilidade.

Repositório oficial: [https://github.com/edufsantos/golden-raspberry-awards-web](https://github.com/edufsantos/golden-raspberry-awards-web)

## Tecnologias Utilizadas

- [React](https://react.dev/) ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
- [TypeScript](https://www.typescriptlang.org/) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
- [Vite](https://vite.dev/) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
- [Tailwind CSS](https://tailwindcss.com/) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
- [React Router](https://reactrouter.com/) ![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat&logo=reactrouter&logoColor=white)
- [Zustand](https://zustand-demo.pmnd.rs/) ![Zustand](https://img.shields.io/badge/Zustand-443E38?style=flat)
- [Axios](https://axios-http.com/) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)
- [Vitest](https://vitest.dev/) ![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) ![Testing Library](https://img.shields.io/badge/Testing%20Library-E33332?style=flat&logo=testinglibrary&logoColor=white)

## Como Rodar o Projeto Localmente

1. Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/edufsantos/golden-raspberry-awards-web.git
cd golden-raspberry-awards-web
```

2. Instale as dependências:

```bash
yarn install
```

3. Copie o arquivo de ambiente de exemplo:

```bash
cp .env.example .env
```

4. Configure as variáveis no arquivo `.env` com os valores necessários para sua execução local.

5. Inicie o projeto em modo de desenvolvimento:

```bash
yarn dev
```

6. Acesse no navegador o endereço exibido no terminal (por padrão, `http://localhost:5173`).

## Arquitetura (Feature Sliced)

O projeto adota uma organização por responsabilidade para garantir isolamento entre domínios e facilitar manutenção:

- `app`: configuração principal da aplicação.
  - Concentra bootstrap, roteamento global, providers, contexto base, store principal e reducers/slices globais.
  - É a camada que monta a aplicação e conecta as demais.

- `features`: domínios de negócio.
  - Cada domínio (ex.: `dashboard`, `movies`) possui sua própria estrutura interna (`components`, `hooks`, `services`, `store`, `models`, `pages`).
  - Regra principal: um domínio não deve conhecer detalhes internos do outro, reduzindo acoplamento.

- `shared`: recursos compartilhados.
  - Contém código reutilizável entre domínios: componentes de UI, utilitários, contextos genéricos, clientes HTTP, tipos e helpers.
  - Se algo for exclusivo de um domínio, deve permanecer dentro da própria `feature`.
  - Se passar a ser reutilizado por múltiplos domínios, pode ser promovido para `shared`.

Essa separação melhora escalabilidade, previsibilidade de mudanças e colaboração entre times.

## Boas Práticas e Qualidade

O projeto aplica práticas de Clean Code para manter legibilidade e consistência:

- responsabilidades bem definidas por pasta e módulo;
- baixo acoplamento entre domínios;
- funções/componentes com foco único;
- padronização com lint e formatação.

### Testes

Os testes adicionados são **testes unitários**, com foco em validar comportamento isolado de componentes, hooks e serviços.

- Rodar testes unitários:

```bash
yarn test
```

- Rodar testes com cobertura:

```bash
yarn test:coverage
```

Após executar cobertura, os relatórios ficam disponíveis na pasta `coverage/`.

Feito com muito carinho por Edu <3
