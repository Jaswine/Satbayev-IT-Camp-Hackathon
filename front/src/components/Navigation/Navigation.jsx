import React from 'react'
import styles from './Navigation.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { $axios } from '../../api'
import { useAuth } from '../../hooks/useAuth';


const Navigation = () => {
    const navigate = useNavigate()
    const { userUsername } = useAuth()


    const logout = () => {
        $axios.post('/auth/sign-out')
            .then((res) => {
                console.log(res)
                localStorage.removeItem('token')
                navigate('/login')
            })
            .catch(err => {
                navigate('/login')
            })
    }

  return (
    <div className={styles.navigation}>
        <ul>
            <li>
                <Link to="/" className={styles.logo}>
                    <span className={styles.icon}> <ion-icon name="star-outline"></ion-icon> </span>
                    <span className={styles.title}>Edutech</span>
                </Link>
            </li>

            <li>
                <Link to="/">
                    <span className={styles.icon}> <ion-icon name="home-outline"></ion-icon> </span>
                    <span className={styles.title}>Главная</span>
                </Link>
            </li>

            <li>
                <Link to={`/profile/${userUsername}`}>
                <span className={styles.icon}><ion-icon name="person-circle-outline"></ion-icon></span>
                    <span className={styles.title}>Профиль</span>
                </Link>
            </li>

            <li>
                <Link to="/chats">
                    <span className={styles.icon}> <ion-icon name="logo-wechat"></ion-icon> </span>
                    <span className={styles.title}>Чаты</span>
                </Link>
            </li>

            <li>
                <Link to="/diary">
                    <span className={styles.icon}> <ion-icon name="reader-outline"></ion-icon> </span>
                    <span className={styles.title}>Дневник</span>
                </Link>
            </li>

            <li>
                <Link to="/courses">
                    <span className={styles.icon}> <ion-icon name="create-outline"></ion-icon> </span>
                    <span className={styles.title}>Курсы</span>
                </Link>
            </li>
        </ul>

        <button onClick={logout}>
             <span className={styles.title} >Выйти</span>
        </button>
    </div>
  )
}

export default Navigation