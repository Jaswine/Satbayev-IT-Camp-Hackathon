import { useEffect, useState } from 'react'
import styles from './ShowAllCourses.module.css'
import Navigation from '../../../components/Navigation/Navigation'
import { $axios } from '../../../api'
import { Link, useNavigate } from 'react-router-dom'


const ShowAllCourses = () => {
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])

	useEffect(() => {
		getCourses()
	}, [])

	const getCourses = () => {
		$axios('/courses')
			.then((response) => {
				console.log(response.data)
				setCourses(response.data)
			})
			.catch((error) => {
				console.log(error)
				// navigate('/login')
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

				<div className="user">
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
		</div>
	</div>
  )
}

export default ShowAllCourses