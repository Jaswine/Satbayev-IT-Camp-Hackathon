import Navigation from '../../components/Navigation/Navigation'
import styles from './Diary.module.css'

const Diary = () => {
  return (
    <div className={styles.container}>
        <Navigation/>

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
						<div className={styles.name}>Название курса</div>
						<div className={styles.cardName}>Описание</div>
					</div>

                       

				</div>


			<div className={styles.card}>

					<div>
						<div className={styles.name}>Название курса</div>
						<div className={styles.cardName}>Описание</div>
					</div>

                       

				</div>


          <div className={styles.card}>

					<div>
						<div className={styles.name}>Название курса</div>
						<div className={styles.cardName}>Описание</div>
					</div>

                       

				</div></div>

				<div className={styles.cardBox}>
					<div className={styles.card}>
	
						<div>
							<div className={styles.name}>Название курса</div>
							<div className={styles.cardName}>Описание</div>
						</div>
	
						   
	
					</div>
	
	
				<div className={styles.card}>
	
						<div>
							<div className={styles.name}>Название курса</div>
							<div className={styles.cardName}>Описание</div>
						</div>
	
						   
	
					</div>
	
	
			  <div className={styles.card}>
	
						<div>
							<div className={styles.name}>Название курса</div>
							<div className={styles.cardName}>Описание</div>
						</div>
	
					</div></div>

					<div className={styles.cardBox}>
						<div className={styles.card}>
		
							<div>
								<div className={styles.name}>Название курса</div>
								<div className={styles.cardName}>Описание</div>
							</div>
		
						</div>
		
		
					<div className={styles.card}>
		
							<div>
								<div className={styles.name}>Название курса</div>
								<div className={styles.cardName}>Описание</div>
							</div>
		
						</div>
	
				  <div className={styles.card}>
		
							<div>
								<div className={styles.name}>Название курса</div>
								<div className={styles.cardName}>Описание</div>
							</div>

						</div>

			</div>
		</div>


	</div>  
  )
}

export default Diary