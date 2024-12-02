import { useState } from 'react';
import MODAL from '../modal/Modal';
import UPDATE_FORM from './Update_Form';
import styles from '../modal/Modal.module.css';

const UPDATE_COURSE = () => {
	const [OPEN, SET_OPEN] = useState<boolean>(false);
	return (
		<div className={styles.modalContainer}>
			<MODAL open={OPEN} onClose={() => SET_OPEN(false)}>
				<div className={styles.modal} style={{ color:'black' }}>
					<h1 className={styles.modalTitle} style={{ color:'black' }}>Confirm Delete</h1>
					<p className={styles.modalTxt}>Are you sure you want to delete?</p>
					<button className={styles.modalBtn}>Delete</button>
				</div>
			</MODAL>
			<button onClick={() => SET_OPEN(true)}>Open Modal</button>
			<UPDATE_FORM />
		</div>
	);
};

export default UPDATE_COURSE;