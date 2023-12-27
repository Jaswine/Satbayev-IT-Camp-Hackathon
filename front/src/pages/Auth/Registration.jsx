import { useState, useEffect } from 'react'
import styles from './Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { $axios } from '../../api';
import { useAuth } from '../../hooks/useAuth';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const navigate = useNavigate('')
    const {setIsAuth, setUserUsername} = useAuth()
    const [error, setError] = useState('')

    useEffect(() => {
      document.title = 'Регистрация'
    }, [])

    const Auth = (e) => {
      e.preventDefault()

      console.log(email, password)

      $axios.post('/auth/sign-up', 
        { username: username,
          email: email, 
          password: password,
          password_confirmation: passwordConfirmation }).then(res => {
        console.log(res.data)

        setIsAuth(true)
        localStorage.setItem('token', res.data.access_token)

        setUserUsername(res.data.user.username)
        localStorage.setItem('username', res.data.user.username)

        navigate('/')
      }) 
      .catch(err => {
        console.log(err)
        setError(err.response.data.message)
      })
    }

  return (
    <div className={styles.container}>
    <div className={styles.block}>
        <div className={styles.zag}><p><img src="/public/images/header.png" width="50" height="50" />Edutech Регистрация</p></div>
        <div className={styles.inn}>
        <input
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required />
          <input
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            required />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required />
             <input 
              type="password" 
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Password Confirmation"
              required />
        </div>
            <button onClick={Auth}>РЕГИСТРАЦИЯ</button><br />
            {error ? <div className="error">{error}</div> : ""}
            <Link to="/login"><p>Логин</p></Link>
        </div>
    </div>
  )
}

export default Registration