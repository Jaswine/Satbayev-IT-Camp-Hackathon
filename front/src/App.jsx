import {Routes, Route} from 'react-router-dom'

import Login from './pages/Auth/Login'
import Registration from './pages/Auth/Registration'
import Home from './pages/Home/Home'
import ShowAllCourses from './pages/Courses/ShowAllCourses/ShowAllCourses'
import Diary from './pages/Diary/Diary'
import ShowOneCourse from './pages/Courses/ShowOneCourse/ShowOneCourse'
import ShowTask from './pages/Tasks/ShowTask/ShowTask'
import Profile from './pages/Profile/Profile'
import NotFound from './pages/NotFound/NotFound'
import Chat from './pages/Chat/Chat'

const App = () => {
  return (
    <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/registration' element={<Registration/>} />

        <Route path='/' element={<Home/>} />
        <Route path='/courses' element={<ShowAllCourses/>} />
        <Route path='/courses/:id' element={<ShowOneCourse/>} />
        <Route path='/courses/:id/tasks/:task_id' element={<ShowTask/>} />
        
        <Route path='/diary' element={<Diary/>} />
        <Route path='/chats' element={<Chat/>} />

        <Route path='*' element={<NotFound/>} />

        <Route path='/profile/:username' element={<Profile/>} />

    </Routes>
  )
}

export default App