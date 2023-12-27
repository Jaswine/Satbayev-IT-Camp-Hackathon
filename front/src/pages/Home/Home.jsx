import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navigation from '../../components/Navigation/Navigation'
import styles from './Home.module.css'
import { $axios } from '../../api'


const Home = () => {
    const [courses, setCourses] = useState([])
    const [userCourseProgress, setUserCourseProgress] = useState([])

	useEffect(() => {
		getCourses()
		getUserCourseProgress()
	}, [])

	const getUserCourseProgress = () => {
		$axios('/diary')
			.then((res) => {
				console.log(res.data)
				setUserCourseProgress(res.data)
			})
			.catch((err) => {
				console.error(err)
			})
	}


	const getCourses = () => {
		$axios('/courses')
			.then((response) => {
				console.log(response.data)
				setCourses(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}

  return (
    <div className={styles.container}>
      <Navigation />

		<div className={styles.main}>
			{/* <div className={styles.topbar}>
				<div className={styles.toggle}>
					<span className={styles.icon}><ion-icon name="menu"></ion-icon></span>
				</div>

				<div className={styles.search}>
					<label>
						<input type="text" placeholder="Search here" />
						<ion-icon name="search-outline"></ion-icon>
					</label>
				</div>

				<div className={styles.user}>
					<img src="img/man.png" alt="" />
				</div>
			</div> */}

            <div className={styles.cardBox}>
				{courses.map (course => 
					<div className={styles.card} key={course.id}>
						
					<div>
						<img src={`http://127.0.0.1:8000/static${course.image}`} alt="course" />
						<Link to={`/courses/${course.id}`} className={styles.name}>{course.title}</Link>
						<div className={styles.cardName}>{course.user.username}</div>
					</div>
                    
				</div>	
				)}

			</div>

            <div className={styles.info}>

                <div className={styles.details}>
                    <div className={styles.recentOrders}>
                        <div className={styles.cardHeader}>
                            <h2>Успеваемость</h2>
                        </div>

                        <table>
                            <thead>
                            <tr>
                                <td>Курс</td>
                                <td>Общий балл</td>
                            </tr>
                        </thead>

                        <tbody>
                            {userCourseProgress.map(c => 
                                <tr key={c.id}>
                                    <td>{c.course.title}</td>
                                    <td>{c.points}</td>
                                </tr>		
                            )}

                        </tbody>

                        </table>
                    </div>

                    </div>

                <div className={styles.info__chats}>
                </div>
            </div>

		</div>
  </div>
  )
}

export default Home