import {useState, createContext} from 'react'


export const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState(localStorage.getItem('token')? true : false)
    
  return (
    <AuthContext.Provider value={{isAuth, setIsAuth}} >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider