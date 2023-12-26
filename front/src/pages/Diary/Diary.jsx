import Navigation from '../../components/Navigation/Navigation'
import styles from './Diary.module.css'

const Diary = () => {
	

  return (
	<div className={styles.container}>
		<Navigation/>

	<div className={styles.main}>
		{/* <div className="topbar">
			<div className="toggle">
				<span className="icon"><ion-icon name="menu"></ion-icon></span>
			</div>

			<div className="search">
				<label>
					<input type="text" placeholder="Search here">
					<ion-icon name="search-outline"></ion-icon>
				</label>
			</div>

			<div className="user">
				<img src="img/man.png" alt="">
			</div>
		</div> */}



	<div className={styles.details}>
		<div className={styles.recentOrders}>
			<div className={styles.cardHeader}>
				<h2>Успеваемость</h2>
			</div>

			<table>
				<thead>
				<tr>
					<td>Предмет</td>
					<td>Общий балл</td>
				</tr>
			</thead>

			<tbody>
				<tr>
					<td>Название курса</td>
					<td>78%</td>
				</tr>

				<tr>
					<td>Название курса</td>
					<td>64%</td>
				</tr>

				<tr>
					<td>Название курса</td>
					<td>99%</td>
				</tr>

				<tr>
					<td>Название курса</td>
					<td>78%</td>
				</tr>

				<tr>
					<td>Название курса</td>
					<td>64%</td>
				</tr>

				<tr>
					<td>Название курса</td>
					<td>99%</td>
				</tr>

				<tr>
					<td>Название курса</td>
					<td>78%</td>
				</tr>

				<tr>
					<td>Название курса</td>
					<td>64%</td>
				</tr>

			</tbody>

			</table>
		</div>

		{/* <div className="recentCustomers">
			<div className="cardHeader">
				<h2>Мои друзья</h2>
			</div>

			<table>
				<tr>
					<td width="60px">
						<span className="icon"><ion-icon name="person"></ion-icon></span>
					</td>
					<td>
						<h4>Панкова Людмила<br/><span>Buffalo</span></h4>
					</td>
				</tr>

				<tr>
					<td width="60px">
						<span className="icon"><ion-icon name="person"></ion-icon></span>
					</td>
					<td>
						<h4>Панкова Людмила<br/><span>Italy</span></h4>
					</td>
				</tr>

				<tr>
					<td width="60px">
						<span className="icon"><ion-icon name="person"></ion-icon></span>
					</td>
					<td>
						<h4>Панкова Людмила<br><span>New-York</span></h4>
					</td>
				</tr>

				<tr>
					<td width="60px">
						<span className="icon"><ion-icon name="person"></ion-icon></span>
					</td>
					<td>
						<h4>Панкова Людмила<br><span>Buffalo</span></h4>
					</td>
				</tr>

				<tr>
					<td width="60px">
						<span className="icon"><ion-icon name="person"></ion-icon></span>
					</td>
					<td>
						<h4>Панкова Людмила<br><span>Italy</span></h4>
					</td>
				</tr>

				<tr>
					<td width="60px">
						<span className="icon"><ion-icon name="person"></ion-icon></span>
					</td>
					<td>
						<h4>Панкова Людмила<br><span>New-York</span></h4>
					</td>
				</tr>

				<tr>
					<td width="60px">
						<span className="icon"><ion-icon name="person"></ion-icon></span>
					</td>
					<td>
						<h4>Панкова Людмила<br><span>Buffalo</span></h4>
					</td>
				</tr>

				<tr>
					<td width="60px">
						<span className="icon"><ion-icon name="person"></ion-icon></span>
					</td>
					<td>
						<h4>Панкова Людмила<br><span>Italy</span></h4>
					</td>
				</tr>

			</table>

		</div> */}
		</div>
	</div>
	</div>
  )
}

export default Diary