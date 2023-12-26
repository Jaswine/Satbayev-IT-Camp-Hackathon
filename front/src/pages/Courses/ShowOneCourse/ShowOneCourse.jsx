import {useEffect, useState} from 'react'
import styles from './ShowOneCourse.module.css'
import { Link, useParams } from 'react-router-dom'
import { $axios } from '../../../api'
import Navigation from '../../../components/Navigation/Navigation'

const ShowOneCourse = () => {
    const [course, setCourse] = useState('')
    const [tasks, setTasks] = useState('')
    const {id} = useParams()

    useEffect(() => {
        getCourse()
        getTasks()
    }, [])

    const getCourse = () => {
        $axios(`/courses/${id}`)
            .then(res => {
                console.log(res.data)
                setCourse(res.data)
            })
    }

    const getTasks = () => {
        $axios(`/courses/${id}/tasks`)
            .then(res => {
                console.log(res.data)
                setTasks(res.data)
            })
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
                    </div> 
             </div>
            ): ""}
            <h3>Tasks:</h3>
            <div className={styles.tasks}>
                {tasks.length != 0 ? (
                    <div>
                        {tasks.map(task => 
                            <div className={styles.task} key={task.id}>
                                <div className="">
                                    <span className={styles.task__complete}></span>
                                    <Link to={`/courses/${course.id}/task/${task.id}`}>{task.title}</Link>
                                </div>
                                <div className="">
                                    <Link to={`/courses/${course.id}/task/${task.id}`}></Link>
                                </div>
                                <Link to={`/courses/${course.id}/task/${task.id}`} className={styles.task__go}></Link>
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