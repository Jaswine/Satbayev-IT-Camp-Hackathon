import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navigation from '../../components/Navigation/Navigation'
import styles from './Home.module.css'


const Home = () => {
  return (
    <div className={styles.container}>
      <Navigation />

		<div className={styles.main}>
			<div className={styles.topbar}>
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
			</div>

			<div className={styles.cardBox}>
				<div className={styles.card}>

					<div>
						<div className={styles.name}>Название<br/>курса</div>
						<div className={styles.cardName}>Course</div>
					</div>

                       

				</div>


			<div className={styles.card}>

					<div>
						<div className={styles.name}>Название<br/>курса</div>
						<div className={styles.cardName}>Course</div>
					</div>
				</div>


          <div className={styles.card}>
            <div>
              <div className={styles.name}>Название<br/>курса</div>
              <div className={styles.cardName}>Course</div>
            </div>    
          </div>
		</div>

		<div className={styles.details}>
			<div className={styles.recentOrders}>
				
            <div className={styles.rating}>
                <h1>Топ лидеров:</h1>
               <div className={styles.rating_mini}>
                   <table>
                      <tr>
                            <td width="120px">
                             
                                <h2>1</h2>
                            </td>
                            <td>
                                <h2>Карпов Константин</h2>
                            </td>
                            <td>
                                <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                                <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                                <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
								<span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                                <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                            </td>
                     </tr>
                    
                     <tr>
                        <td width="120px">
                            <h2>2</h2>
                        </td>
                        <td>
                            <h2>Войтенко Екатерина</h2>
                        </td>
                        <td>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                        </td>
                    </tr>

                    <tr>
                        <td width="120px">
                            <h2>3</h2>
                        </td>
                        <td>
                            <h2>Петров Алексей</h2>
                        </td>
                        <td>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                        </td>
                    </tr>


                    <tr>
                        <td width="120px">
                            <h2>4</h2>
                        </td>
                        <td>
                            <h2>Пчельникова Кристина</h2>
                        </td>
                        <td>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                        </td>
                 </tr>

                 <tr>
                    <td width="120px">
                        <h2>5</h2>
                    </td>
                    <td>
                        <h2>Карпов Константин</h2>
                    </td>
                    <td>

                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                            <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                    </td>
                </tr>

                 <tr>
                  <td width="120px">
                    <h2>6</h2>
                  </td>
                  <td>
                    <h2>Войтенко Екатерина</h2>
                  </td>
                  <td>
                    <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                    <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                </td>
                </tr>

                <tr>
                    <td width="120px">
                        <h2>7</h2>
                    </td>
                    <td>
                        <h2>Петров Алексей</h2>
                    </td>
                    <td>
						<span className={styles.icon}><ion-icon name="star"></ion-icon></span>
						<span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                    </td>
                </tr>


                <tr>
                    <td width="120px">
                        <h2>8   </h2>
                    </td>
                    <td>
                        <h2>Пчельникова Кристина</h2>
                    </td>
                    <td>
                        <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                    </td>
                </tr>
                  
				<tr>
                    <td width="120px">
                        <h2>9  </h2>
                    </td>
                    <td>
                        <h2>Пчельникова Кристина</h2>
                    </td>
                    <td>
                        <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                    </td>
                </tr>

				<tr>
                    <td width="120px">
                        <h2>10   </h2>
                    </td>
                    <td>
                        <h2>Пчельникова Кристина</h2>
                    </td>
                    <td>
                        <span className={styles.icon}><ion-icon name="star"></ion-icon></span>
                    </td>
                </tr>
                
                
                   </table>
                   
                    
               </div>
            </div>
			</div>

			<div className="recentCustomers">
				<div className="{styles.card}Header">
					<h2>Мои друзья:</h2>
				</div>

                <table>
                	<tr>
                		<td width="60px">
                			<span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                		</td>
                		<td>
                			<h4>Светлана Владимировна<br/><span>Kazakhstan</span></h4>
                		</td>
                	</tr>

                	<tr>
                		<td width="60px">
                			<span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                		</td>
                		<td>
                			<h4>Екатерина Войтенко<br/><span>Kazakhstan</span></h4>
                		</td>
                	</tr>

                	<tr>
                		<td width="60px">
                			<span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                		</td>
                		<td>
                			<h4>Кристина Пчельникова<br/><span>Kazakhstan</span></h4>
                		</td>
                	</tr>

                	<tr>
                		<td width="60px">
                			<span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                		</td>
                		<td>
                			<h4>Елена Валерьевна <br/><span>Kazakhstan</span></h4>
                		</td>
                	</tr>

                	<tr>
                		<td width="60px">
                			<span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                		</td>
                		<td>
                			<h4>Мария <br/><span>Kazakhstan</span></h4>
                		</td>
                	</tr>

                	<tr>
                		<td width="60px">
                			<span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                		</td>
                		<td>
                			<h4>Ангеина Никитина<br/><span>Kazakhstan</span></h4>
                		</td>
                	</tr>

                	<tr>
                		<td width="60px">
                			<span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                		</td>
                		<td>
                			<h4>Дарья Шурис <br/><span>Kazakhstan</span></h4>
                		</td>
                	</tr>

                	<tr>
                		<td width="60px">
                			<span className={styles.icon}><ion-icon name="person"></ion-icon></span>
                		</td>
                		<td>
                			<h4>Юлия Скрипник<br/><span>Kazakhstan</span></h4>
                		</td>
                	</tr>

                </table>

			</div>
		</div>


	</div>
  </div>
  )
}

export default Home