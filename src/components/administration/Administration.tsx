import  { useContext, useState } from 'react';
import styles from './administration.module.css';
import DATACONTEXT from '../../context/DataContext';
import HOME from '../home/Home';
import  { ifAdmin } from '../home/table/Table';
import { useNavigate } from 'react-router-dom';
import USER_MANAGEMENT from './user-management/User_Management';

const ADMINISTRATION = () => {
	const { DARKMODE, LOGIN_SESSION } = useContext(DATACONTEXT);
	const [COMPONENT, SET_COMPONENT] = useState<() => JSX.Element>(() => HOME);
	const NAVIGATE = useNavigate();

	if (!ifAdmin(LOGIN_SESSION)) {
		NAVIGATE('/');
		return;
	}

	return (
		<div className={`${!DARKMODE ? styles.lightMode : ''} ${styles.adminContainer}`}>
			<div className={styles.adminAside}>
				<h1 className={styles.pageTitle}>Hello Admin,<br/>what would you like to do?</h1>
				<div className={styles.btnList}>
					<button id='cy-settings-courses-btn' className={styles.btn} onClick={() => SET_COMPONENT(() => HOME)}>Courses</button>
					<button id='cy-settings-user-management-btn' className={styles.btn} onClick={() => SET_COMPONENT(() => USER_MANAGEMENT)}>User Management</button>
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