# :construction: README customizado em construção ! :construction:

# Project Trybe Futebol Clube

## Descrição
Este projeto é uma aplicação web desenvolvida completa, em um monorepo, visando simular um sistema de gerenciamento de um clube de futebol, onde podemos: 
- Ver a classificação de todos os times e filtrá-los
- Cadastrar novas partidas
- Modificar partidas em andamento
- Finalizar partidas
- Realizar o login com usuários com diferentes níveis de permissão

--- Todo o projeto, com seus serviços, rodam dentro de contêineres Docker, orquestrados por um Docker Compose localizado na raiz do projeto (Necessário Docker e Docker Compose na versão 1.29 ou superior instalados em sua máquina, para executar o projeto)

-- Os seeds do banco de dados já foram providos em ./app/backend/src/database/seeders




## Tecnologias utilizadas
- TypeScript
- Node.js
- Express
- Sequelize
- MySLQ
- Eslint
- JWT (JSON Web Token)
- React.js
- HTML/CSS

## Como executar
1. Clone o repositório: `git clone https://github.com/victor-s-salles/project-trybe-futebol-clube.git`

2. Acesse o diretório do projeto: `cd project-trybe-futebol-clube`

3. Instale as dependências: `npm install`

4. Rode o Docker-compose: `docker-compose up -d`

O site estará disponível em `http://localhost:3000`.

- Foram desenvolvidos testes do backend da aplicação, através do comando npm test dentro do diretório backend

Seguem algumas imagens do projeto em execução:

- Tela da classifição:

![Captura de Tela 2023-04-05 às 19 32 01](https://user-images.githubusercontent.com/108904571/230230656-c34094cf-bd7c-4239-b43c-4d942c9f6021.png)

- Tela de partidas em andamento e finalizadas: 

![Captura de Tela 2023-04-05 às 19 35 27](https://user-images.githubusercontent.com/108904571/230230693-6aa3c447-c323-4986-92bb-da4fa30ebd60.png)



