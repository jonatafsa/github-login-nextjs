# Github-Login NextJS

App desenvolvido em NextJS, e react com objetico de fazer Login com github.

- ReactJS
- HTML/CSS
- Serverless Node

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Features

- Página de fazer login
- Autenticação via Serverless com Node
- Página de usuário retornando dados do Github
- Autenticação de dados em Cookies

![N|Solid](https://github-login.vercel.app/images/login.png)

![N|Solid](https://github-login.vercel.app/images/user.png)

## Tech

Bibliotecas e tecnologias usadas
- [Typescript] - Superset do Javascript
- [React] - Biblioteca JavaScript para criação de interfaces
- [Node] - Plataforma que executa códigos JavaScript no backend/servidor
- [MongoDB] - Base da dados
- [js-cookie] - Uma API JavaScript simples e leve para lidar com cookies
- [next] - A Estrutura React para Produção
- [axios] - Cliente HTTP para requisição ao serverless

## Installation

O App necessita do [Node.js](https://nodejs.org/) v12+ para funcionar.

Instale todas as depencias e exeute:

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

Você pode começar a editar a página modificando `pages/index.js`. A página é atualizada automaticamente conforme você edita o arquivo.

As [Rotas API](https://nextjs.org/docs/api-routes/introduction) podem ser acessadas em [http://localhost:3000/api/hello](http://localhost:3000/api/user). Este ponto final pode ser editado em `pages/api/user.js`.

O `pages/api/` é mapeado para `/api/*` Os arquivos neste diretório são tratados como [Rotas API](https://nextjs.org/docs/api-routes/introduction) em vez de páginas React.

Variáveis de Anbiente...

```sh
GITHUB_CLIENT_SECRET --Github Oauth Apps
GITHUB_CLIENT_ID --Github Oauth Apps
MONGODB_URI --Autenticação MongoDB
```
## License

FREE

**Free Software, Hell Yeah!**

[Typescript]: <https://www.typescriptlang.org/docs/>
[React]: <https://pt-br.reactjs.org/>
[Node]: <https://nodejs.org/en/>
[MongoDB]: <https://www.mongodb.com/>
[js-cookie]: <https://www.npmjs.com/package/js-cookie>
[react-dom]: <https://pt-br.reactjs.org/docs/react-dom.html>
[next]: <https://nextjs.org/>
[axios]: <https://www.npmjs.com/package/axios>

