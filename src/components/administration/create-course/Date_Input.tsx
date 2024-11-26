import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Course } from '../../../types';
import styles from './Create_From.module.css';

interface DateInputProps {
    register: UseFormRegister<Course>,
    errors: FieldErrors<Course>
}

const DATE_INPUT = ({ register, errors }: DateInputProps) => {
	return (
		<div className={styles.formGroup}>
			<label className={styles.formLabel}>Date</label>
			<input
				type="date"
				{...register('date', {
					required: 'Date is required'
				})}
				id='cy-create-course-date-input'
				className={styles.formInput}
				placeholder="Enter date"
			/>
			{errors.date && <div className={styles.errorMessage}>{errors.date.message}</div>}
		</div>
	);
};

export default DATE_INPUT;