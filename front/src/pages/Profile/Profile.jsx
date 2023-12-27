import React, { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import { $axios } from '../../api'
import { useParams } from 'react-router-dom'
import Navigation from '../../components/Navigation/Navigation'

const Profile = () => {
    const {username} = useParams()
    const [profile, setProfile] = useState('')
    const [userCourseProgress, setUserCourseProgress] = useState([])

    useEffect(() => {
        getProfile()
        getUserCourseProgress()
    }, [])

    const getProfile = () => {
        $axios(`/profile/${username}`)
            .then(res => {
                console.log(res.data)
                setProfile(res.data)
            })
    }
    

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
            <div className={styles.profile__information}>
                {profile ? (
                    <div className={styles.profile__information__main}>
                        <div className={styles.profile__information__main__left}>
                            {profile.image != null ? (
                                <img src={ profile.image } alt="" />) : (
                                    <img src='/public/images/profile.jpg' alt="" />
                                )}
                        </div>
                        <div className={styles.profile__information__main__right}>
                            <h1>{username}</h1>
                            <h3>{profile.user.email}</h3>
                            <p>{ profile.about }</p>
                        </div>
                    </div>
                ): (<h3>Loading...</h3>)}
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

export default Profile