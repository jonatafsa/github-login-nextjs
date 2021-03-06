
import styles from '../styles/User.module.css'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function User() {

    const routes = useRouter()

    const [login, setLogin] = useState('')
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [company, setCompany] = useState('')
    const [repository, setRepository] = useState('')
    const [following, setFollowing] = useState('')

    function logout() {
        Cookies.remove('login')
        Cookies.remove('name')
        Cookies.remove('avatar')
        Cookies.remove('company')
        Cookies.remove('repository')
        Cookies.remove('following')
        routes.push('/')
    }

    useEffect(() => {
    if (Cookies.get('login') == undefined) { 
        logout()
     }

    setLogin(Cookies.get('login'))
    setName(Cookies.get('name'))
    setAvatar(Cookies.get('avatar'))
    
    if (Cookies.get('company') == 'null') {
        setCompany('No Company')
    } else {
        setCompany(Cookies.get('company'))
    }

    setRepository(Cookies.get('repository'))
    setFollowing(Cookies.get('following'))
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.userContainer}>
                <div className={styles.userInfoLeft}> 
                <div className={styles.circle1} >
                <div className={styles.circle2}>
                    <img src={avatar} alt="Avatar" />
                </div>
                </div>
                
                    <strong>{name}</strong>
                    <span>{company}</span>

                    <a href={`https://github.com/${login}`} target="_blank"> <button>Ver no github</button> </a>
                    <button onClick={logout}>Sair</button>
                </div>

                <div className={styles.userInfoRight}>
                    <div className={styles.dataRight}>
                    <p>
                        <span>523</span>
                        Tempo logado
                    </p>

                    <p>
                        <span>15</span>
                        Repositórios
                    </p>

                    <p>
                        <span>{following}</span>
                        Seguidores
                    </p>
                    </div>

                </div>

            </div>
        </div>
    )
}