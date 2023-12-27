import {useState, createContext} from 'react'


export const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState(localStorage.getItem('token')? true : false)
    const [userUsername, setUserUsername] = useState(localStorage.getItem('username')? localStorage.getItem('username') : '')
    
  return (
    <AuthContext.Provider value={{isAuth, setIsAuth, userUsername, setUserUsername}} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider