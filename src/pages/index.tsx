import Head from 'next/head'
import styles from '../styles/Home.module.css'
import url from 'url'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Modal from '../components/modal'

export default function Home() {
  const routes = useRouter()
  const [sessionCode, setSessionCode] = useState('')
  const [modalError, setModalError] = useState(false)

  useEffect(() => {
    const uri = window.location.href

    if (url.parse(uri).query) {
      const code = url.parse(uri).query.substring(5)
      setSessionCode(code)
      
      axios.post('/api/user', {code}).then((request) => {

        if(request.data.user.login == undefined) {
          console.log('Não vou pra login')
          setSessionCode('')
          setModalError(true)
        } else {
          Cookies.set('login', request.data.user.login)
          Cookies.set('name', request.data.user.name)
          Cookies.set('avatar', request.data.user.avatar)
          Cookies.set('company', request.data.user.company)
          Cookies.set('repository', request.data.user.repository)
          Cookies.set('following', request.data.user.following)
          routes.push('/user')
        }

      })

    }

  }, [])

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {modalError && (
        <Modal />
      )}
      

      <div className={styles.container}>

        <div className={styles.leftContent}>
          <img src="/landing.svg" alt="landing" />
        </div>


        <div className={styles.rightContent}>
          <img src="/logowhite.svg" alt="logo" />

          {!sessionCode ? (
            <>
              <strong>Bem-vindo</strong>
              <p>
                <img src="/icons/logo.svg" alt="githublogo" />
                                    Faça login com seu Guithub para começar
                                </p>
              <a href="#">
                <button>
                  Buscar Usuário
                            <img src="/icons/githublogo.svg" alt="githublogo" />
                </button>
              </a>
            </>
          ) : (
            <>
              <strong>Entrando...</strong>
              <div className={styles.loading} >
                <img src="/icons/loading.gif" alt="githublogo" />
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
