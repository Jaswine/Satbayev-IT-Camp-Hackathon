import { useEffect, useState } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import styles from './Diary.module.css'
import { $axios } from '../../api'

const Diary = () => {
	const [userCourseProgress, setUserCourseProgress] = useState([])

	useEffect(() => {
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

  return (
	<div className={styles.container}>
		<Navigation/>

	<div className={styles.main}>

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
		</div>
	</div>
  )
}

export default Diary