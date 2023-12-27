import { useEffect, useState } from 'react'
import { $axios } from '../../../api'
import { Link, useParams } from 'react-router-dom'
import styles from './ShowTask.module.css'
import Navigation from '../../../components/Navigation/Navigation'

const ShowTask = () => {
    const {id, task_id} = useParams()
    const [task, setTask] = useState('')

    useEffect(() => {
        getTask()
        CompleteTask()
    }, [])

    const getTask = () =>{
        $axios(`/courses/${id}/tasks/${task_id}`)
            .then(res => {
                console.log(res.data)
                setTask(res.data)
            })
    }

    const CompleteTask = () =>{
      $axios.post(`/courses/${id}/tasks/${task_id}/task-complete`)
          .then(res => {
              console.log(res.data)
          })
  }

  return (
    <div className={styles.container}>
        <Navigation/>
        <div className={styles.main}>

        {task ? (
            <div className={styles.task}>
              <h2>
               / <Link to={`/courses/${task.course.id}`}>{task.course.title }</Link>
              </h2>
              <div className={styles.task__info}>
                  <h1>{ task.title }</h1>
                  <p><span>{task.type} </span> <span>{task.course.user.username}</span> <span>{task.points} points</span></p>
              </div>
              {task.type == 'TaskText' ? (
                <div className={styles.task__text}>{ task.text }</div>
              ): (
                <video src={`http://127.0.0.1:8000/static${task.video}`} className={styles.task__video} controls></video>
              )}
            </div>
        ): (<h2>Loading...</h2>)}
      </div>
    </div>
  )
}

export default ShowTask