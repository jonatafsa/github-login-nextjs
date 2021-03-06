// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import url from 'url'
import { MongoClient, Db } from 'mongodb'

//Github Passes de permissão
const client_secret = process.env.GITHUB_CLIENT_SECRET
const client_id = process.env.GITHUB_CLIENT_ID

//Mongo - Passes de permissão
const mongoDBKey = process.env.MONGODB_URI
let cachedDb: Db = null

//Função que abre uma conexão com o banco de dados
async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db('user')
  cachedDb = db
  return db
}

//Função que faz request ao Github pedindo permissão para pegar dados do usuário
async function getAccessToken({ code, client_id, client_secret }) {
  const requestPermissionGithub = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code
    })
  })
  const text = await requestPermissionGithub.text()
  const params = new URLSearchParams(text)
  console.log('Estou rodando a função getAccessToken ')
  return params.get('access_token')
}


//Função que recebe os dados do usuário do github
async function fetchGitHubUser(token) {
  const requestUserData = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: 'token ' + token
    }
  })
  console.log('Estou rodando a função fetchGitHubUser ')
  return await requestUserData.json()
}

export default async (req, res) => {

  if (req.method == 'POST') {

    //Recebe o Código de usuário que está a fazer login na página
    const code = req.body.code
    console.log('Codigo recebido?', code)
    console.log('Chave: ', process.env.GITHUB_CLIENT_SECRET)
    console.log('ID: ', process.env.GITHUB_CLIENT_ID)

    //Chama a função que faz request ao Github pedindo permissão para pegar dados do usuário
    //Passando os dados dados como parâmetros
    //'code' vem dá página de login a pedido do usuário que está tentando fazer login
    const access_token = await getAccessToken({ code, client_id, client_secret })

    //Chama a função que retorna os dados do usuário
    const userGithub = await fetchGitHubUser(access_token)
    console.log('Eu acesso com isso', access_token)
    console.log('Peguei os dados?', userGithub)

    const user = {
      login: userGithub.login,
      name: userGithub.name,
      avatar: userGithub.avatar_url,
      company: userGithub.company,
      repository: userGithub.repos_url,
      following: userGithub.following
    }

    const filter = { username: userGithub.login }

    const updateDoc = {
      $set: {
        user
      },
    }
    const options = { upsert: true };

    const db = await connectToDatabase(mongoDBKey)
    const collection = db.collection('users')
    await collection.updateOne(filter, updateDoc, options)

    res.status(200).json({ user })

  }

  if (req.method == 'GET') {
    res.status(200).json({ message: 'Serverless /API/user' })
  }
 
}
