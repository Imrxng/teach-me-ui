import React from 'react';
import styles from '../modal/Modal.module.css';

interface modalProps {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode;
}

const MODAL = ({ open, onClose, children }: modalProps) => {
	return (
		<div className={styles.backdrop} onClick={onClose} style={{
			visibility: open ? 'visible' : 'hidden',
			background: open ? 'rgb(0,0,0,0.6)' : ''
		}}>
			<div className={styles.modalBackdrop} onClick={(e) => e.stopPropagation()}>
				<button type='button' id='cy-modal-close-modal-btn' className={styles.modalCloseBtn} onClick={onClose}>
                X
				</button>
				{children}
			</div>
		</div>
	);
};

export default MODAL;