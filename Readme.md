# Backend teste ntsencomendas

Este é um pequeno projeto de amostra da aplicação de técnicas e ferramentas para a construção de um backend NodeJS. Abaixo o que foi aplicado para o setup:

  - Servidor http express
  - Orm TypeOrm 
  - Banco de dados Postgres
  - Migrations para aplicar code first
  - Eslint aplicando standard guidelines
  - Prettier
  - Typescript
  - ts-node-dev para transpilar typescript para js durante dev
  - babel para transpilar typescript para js durante build
  - jwt para authorization
  - bcrypt para gerar hash de senha
  - middleware para aplicar proteção nas rotas (authorization)
  - docker compose para orquestrar containers (app e database)
  - ambiente de testes automatizados funcionais utilizando jest

# Features

  Desenvolvido duas tabelas, uma para controle de usuário (cadastro de novo usuário e login) e uma tabela para encomendas. Obs: Como não é conhecido a regra de negócio, foi criado apenas uma simples tabela para encomendas, mas claro, poderia ter sido criado tabela separado de itens e tudo mais...

# Executar ambiente de desenvolvimento

 Para executar o ambiente de dev, apenas é necessário rodar no terminal o comando docker-compose up. Este comando irá orquestrar dois containeres: 
  1 - Banco de dados postgres
  2 - Aplicação nodeJS
  
 Mas também é possível executar por "yarn dev" (eu prefiro sempre executar o node no terminal do VS e o docker executar tudo o que é necessário de infra (bancos SQL, NOSQL, Redis, etc))

# Controle de usuários

    - Para criar um novo usuário
    Post: /users
    body: {
      "email": "teste@gmail.com",
      "name": "Teste",
      "password": "1"
    }
    
    - Para logar e gerar um token de autenticação
    Post: /auth
    body: {
      "email": "teste@gmail.com",
      "password": "1"
    }
    
# Encomendas

 Desenvolvido três rotas, uma parar criar nova encomenda, uma para listar e outra para alterar o status. As rotas são protegidas para middleware de autenticação, sendo necessário passar o header Authorization.
 
 - Para criar uma nova encomenda
    Post: /order
    body: {
      "description": "Nova encomenda"
    }

 - Para listar as encomendas
    Get: /order

 - Para alterar o status de uma encomenda
    Put: /order
    body: {
      "id": "2e11775d-c519-435d-8979-341b52164bfd",
      "status": 2
    }

# Testes funcionais automatizados (Jest)

 Para executar os testes funcionais, é necessário rodar no terminal o comando yarn jest. Para este ambiente não foi configurado um docker para o banco de dados, então é necessário executar o postgres e criar uma database com o nome: ntsencomendas_test
 
    Testes executados
  - Criar novo usuário
  - Criar nova ordem
  
 Sempre que executa uma suite de testes, todas as migrations são executadas e todas as tabelas são "limpas" para que cada teste não tenha interferência de testes anteriores... Mas também é possível criar testes unitários de funções puras e também utilizar mocking data, para simular um banco (fake)

  # Build
  
   Para fazer um deploy, basta executar yarn build. O babel irá gerar uma pasta dist no diretório raiz da aplicação =D
 