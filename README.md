![Banner](public/banner.jpg)
# 📚 Gerenciamento de Livros e Autores

Este projeto é uma aplicação de gerenciamento de livros e autores, construída com **React** e **TypeScript**. Ele utiliza componentes como `Dialog`, `Button`, e `Table` da biblioteca **@radix-ui/themes**, e implementa validação de formulários com **zod** e **react-hook-form**.

## ❗ Funcionalidades

- **Gerenciamento de Autores**:
  - Adicionar, editar e excluir autores.
  - Exibir lista de autores com detalhes.

- **Gerenciamento de Livros**:
  - Adicionar, editar e excluir livros.
  - Associar um livro a um autor.
  - Exibir lista de livros com detalhes.

- **Modais de Confirmação e Detalhes**:
  - Modal para confirmar exclusões.
  - Modal para exibir detalhes de um item.

## 💻 Tecnologias Utilizadas
![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![]( https://img.shields.io/badge/Zod-000000?style=for-the-badge&logo=zod&logoColor=3068B7)
![](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
- **React** com **TypeScript**
- **Radix UI** para componentes acessíveis e estilizados
- **Zod** para validação de dados
- **React Hook Form** para gerenciamento de formulários
- **Lucide-React** para ícones
- **uuid** para geração de IDs únicos

## ⚠ Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)


## Instalação e Configuração

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/amandazzoc/gerenciamento-livros
   cd gerenciamento-livros
   ```
2. **Instale as dependências**:
   ```bash
   npm install
   # ou
   yarn install
   ```
3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   # ou
   yarn run dev
   ```
4. **Acesse a aplicação**: Abra http://localhost:5173/ no navegador e comece a explorar!

## 🐳 Rodando com Docker

### Passos para rodar a aplicação

1. **Construir a imagem Docker**:
   No diretório onde o `Dockerfile` está localizado, execute o comando abaixo para criar a imagem Docker:

   ```bash
   docker build -t nome-da-imagem .
    ```
2. **Rodar o container**: Após a construção da imagem, execute o seguinte comando para iniciar a aplicação dentro de um container:
    ```bash
   docker run -p 3000:3000 nome-da-imagem
    ```
3. **Acesse a aplicação**: A aplicação estará disponível em http://localhost:3000.
4. **Verificar containers em execução**: Para verificar se o container está em execução, use o comando:
   ```bash
   docker ps
    ```
5. **Parar o container**: Caso precise parar o container, execute o comando:
    ```bash
   docker stop <container-id>
   # Substitua <container-id> pelo ID do seu container.
    ```

   
## ⚙ Estrutura do projeto
   ```bash
src/
├── components/
│   ├── ConfirmModal.tsx     # Modal de confirmação de exclusão
│   ├── DataList.tsx         # Componente de lista genérica
│   ├── DetailsModal.tsx     # Modal para exibição de detalhes
│   ├── EditModal.tsx        # Modal reutilizável para edição
│   ├── Navbar.tsx           # Componente da Navbar
├── context/
│   ├── AppContext.tsx       # Contexto para gerenciamento de estado global
├── hooks/                   
│   ├── useLocalStorage.ts   # Hook para gerenciar o estado utilizando o localStorage do navegador
│   ├── useAppContext.ts     # Hook para usar o contexto da aplicação
├── pages/
│   ├── AuthorsPage.tsx      # Página de gerenciamento de autores
│   ├── BooksPage.tsx        # Página de gerenciamento de livros
├── routes/
│   ├── Authors.tsx          # Rota da página dos Autores
│   ├── Books.tsx            # Rota da página dos Livros
│   ├── ErrorPage.tsx        # Rota para a página de erro
│   ├── Home.tsx             # Rota para a página Home
├── styles/
│   ├── App.css              # Folha de estilo de toda a aplicação
│   ├── index.css            # Folha de estilo da index
├── types/                   # Interfaces
│   ├── AppContextType.ts          
│   ├── Author.ts         
│   ├── Book.ts      
│   ├── ConfirmDeleteModalProps.ts     
│   ├── DataListProps.ts    
│   ├── DetailsModalProps.ts   
│   ├── EditModalProps.ts          
└── App.tsx                  # Componente principal
└── main.tsx                 
   ```

## Licença
 Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

## 👩🏻‍💻 Autor
<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/100137341?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Amanda Oliveira</b></sub>🚀
 
Feito com ❤️ por Amanda Oliveira 👋🏽 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-Amanda-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/amanda-oliveira-970410232/)](https://www.linkedin.com/in/amanda-oliveira-970410232/)
