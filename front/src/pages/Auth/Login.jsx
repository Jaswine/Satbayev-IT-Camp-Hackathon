import { useState, useEffect } from 'react'
import styles from './Auth.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { $axios } from '../../api';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate('')
    const {setIsAuth} = useAuth()
    const [error, setError] = useState('')

    useEffect(() => {
      document.title = 'Вход'
    }, [])

    const Auth = (e) => {
      e.preventDefault()

      console.log(email, password)

      $axios.post('/auth/sign-in', 
        { email: email, 
          password: password }).then(res => {
        console.log(res.data)

        setIsAuth(true)
        localStorage.setItem('token', res.data.access_token)

        navigate('/')
      }) 
      .catch(err => {
        setError(err.message)
      })
    }

  return (
    <div className={styles.container}>
    <div className={styles.block}>
        <div className={styles.zag}><p><img src="/public/images/header.png" width="50" height="50" />Edutech Вход</p></div>
        <div className={styles.inn}>
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
        </div>
            <button onClick={Auth}>ВХОД</button><br />
            {error ? <div className="error">{error}</div> : ""}
            <Link to="/registration"><p>Регистрация</p></Link>
        </div>
    </div>
  )
}

export default Login