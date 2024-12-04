import  { useContext, useEffect, useState } from 'react';
import styles from './administration.module.css';
import { useNavigate } from 'react-router-dom';
import DATACONTEXT from '../../context/DataContext';
import CREATE_FORM from './create-course/Create_From';
import DELETE_COURSE from './delete-course/Delete_Course';
import ADD_QUESTION from './add-question/Add_Question';
import CREATE_USER from './create-user/Create_User';
import DELETE_USER from './delete-user/Delete_User';
import UPDATE_COURSE from './update-course/Update_Course';

const ADMINISTRATION = () => {
	const { DARKMODE, LOGIN_SESSION } = useContext(DATACONTEXT);
	const [COMPONENT, SET_COMPONENT] = useState<() => JSX.Element>(() => CREATE_FORM);
	const NAVIGATE = useNavigate();
	useEffect(() => {
		if ( LOGIN_SESSION && LOGIN_SESSION.type === 'user') {
			NAVIGATE('/home');
		}
	}, [LOGIN_SESSION, NAVIGATE]);

	return (
		<div className={`${!DARKMODE ? styles.lightMode : ''} ${styles.adminContainer}`}>
			<div className={styles.adminAside}>
				<h1 className={styles.pageTitle}>Hello Admin,<br/>what would you like to do?</h1>
				<div className={styles.btnList}>
					<button id='cy-admin-create-course-btn' className={styles.btn} onClick={() => SET_COMPONENT(() => CREATE_FORM)}>Create Course</button>
					<button id='cy-admin-update-course-btn' className={styles.btn} onClick={() => SET_COMPONENT(() => UPDATE_COURSE)}>Update Course</button>
					<button id='cy-admin-delete-course-btn' className={styles.btn} onClick={() => SET_COMPONENT(() => DELETE_COURSE)}>Delete Course</button>
					<button id='cy-admin-add-question-btn' className={styles.btn} onClick={() => SET_COMPONENT(() => ADD_QUESTION)}>Add Question</button>
					<button id='cy-admin-create-user-btn' className={styles.btn} onClick={() => SET_COMPONENT(() => CREATE_USER)}>Create User</button>
					<button id='cy-admin-delete-user-btn' className={styles.btn} onClick={() => SET_COMPONENT(() => DELETE_USER)}>Delete User</button>
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