import {useEffect, useState} from 'react'
import styles from './ShowOneCourse.module.css'
import { Link, useParams } from 'react-router-dom'
import { $axios } from '../../../api'
import Navigation from '../../../components/Navigation/Navigation'

const ShowOneCourse = () => {
    const [currentUser, setCurrentUser] = useState('')
    const [course, setCourse] = useState('')
    const [tasks, setTasks] = useState([])
    const [courseRegistrationStatus, setCourseRegistrationStatus] = useState('')
    const {id} = useParams()

    useEffect(() => {
        getCourse()
        getTasks()
    }, [])

    const getCourse = () => {
        $axios(`/courses/${id}`)
            .then(res => {
                console.log(res.data)
                setCourse(res.data.course)
                setCourseRegistrationStatus(res.data.course_status)
                setCurrentUser(res.data.user)
            })
    }

    const getTasks = () => {
        $axios(`/courses/${id}/tasks`)
            .then(res => {
                setTasks(res.data)
                console.log(tasks)
            })
    }

    const registerToCourse = () => {
        $axios.post(`/courses/${id}/course-write`)
        .then(res => {
            console.log(res.data)
            getTasks()
            getCourse()
        })
    }

    const containerButtonStyles = {
        backgroundColor: courseRegistrationStatus == 'Зарегистрирован' ? 'white' : '',
        color: courseRegistrationStatus == 'Зарегистрирован' ? '#564070' : '',
    }

    const containerTasksStyles = {
        opacity: courseRegistrationStatus == 'Зарегистрирован' ? 1 : .4,
    }
    

  return (
    <div className={styles.container}>
        <Navigation/>
		<div className={styles.main}>
            {course? (
                <div className={styles.boxcard}>
                    <div className={styles.card}>
                        <img src={`http://127.0.0.1:8000/static${course.image}`} alt={course.title} />
                    </div>
                    <div className={styles.card__info}>
                        <h1>{course.title}</h1>
                        <p>{course.user.username} . {course.created.slice(0, 10)}</p>
                        <p>
                        {course.description}
                        </p>
                        <button 
                            onClick={registerToCourse}
                            style={containerButtonStyles}
                        >
                            {courseRegistrationStatus}
                        </button>
                    </div> 
             </div>
            ): ""}
            <h3>Tasks:</h3>
            <div 
                className={styles.tasks}
                style={containerTasksStyles}
                >
                {tasks.length != 0 ? (
                    <div>
                        {tasks.map(task => 
                            <div className={styles.task} key={task.id}>
                                <div className="">
                                    <span className={styles.task__complete}></span>
                                    <Link to={courseRegistrationStatus == 'Зарегистрирован' ? `/courses/${course.id}/tasks/${task.id}`: ""}>{task.title}</Link>
                                </div>
                                <Link to={courseRegistrationStatus == 'Зарегистрирован' ? `/courses/${course.id}/tasks/${task.id}` : ""} className={styles.task__go}></Link>
                            </div>    
                        )}
                    </div>
                ) : (<h2>Tasks not found</h2>)}
            </div>
        </div>

        
   </div>
  )
}

export default ShowOneCourse