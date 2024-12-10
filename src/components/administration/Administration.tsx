import  { useContext, useState } from 'react';
import styles from './administration.module.css';
import DATACONTEXT from '../../context/DataContext';
import HOME from '../home/Home';

const ADMINISTRATION = () => {
	const { DARKMODE } = useContext(DATACONTEXT);
	const [COMPONENT, SET_COMPONENT] = useState<() => JSX.Element>(() => HOME)

	return (
		<div className={`${!DARKMODE ? styles.lightMode : ''} ${styles.adminContainer}`}>
			<div className={styles.adminAside}>
				<h1 className={styles.pageTitle}>Hello Admin,<br/>what would you like to do?</h1>
				<div className={styles.btnList}>
						<button id='cy-settings-courses-btn' className={styles.btn} onClick={() => SET_COMPONENT(() => HOME)}>Courses</button>
						<button id='cy-settings-user-management-btn' className={styles.btn}>User Management</button>
				</div>
			</div>
			<div className={styles.adminMain}>
				<COMPONENT />
			</div>
		</div>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export default ADMINISTRATION;