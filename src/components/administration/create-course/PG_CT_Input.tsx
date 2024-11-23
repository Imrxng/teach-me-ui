import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Course } from '../../../types';
import styles from './Create_From.module.css';

interface PgCtInputProps {
    register: UseFormRegister<Course>,
    errors: FieldErrors<Course>
}

const PG_CT_INPUT = ({ register, errors }: PgCtInputProps) => {
	return (
		<div style={{ display: 'flex', gap: '2rem' }}>
			
			<div className={styles.formGroup}>
				<label className={styles.formLabel}>Passing Grade</label>
				<input
					type="number"
					{...register('passingGrade', {
						required: 'Passing grade is required',
						min: { value: 50, message: 'Passing grade must be between 50 and 100' },
						max: { value: 100, message: 'Passing grade must be between 50 and 100' },
					})}
					className={styles.formInput}
					placeholder="Enter passing grade"
				/>
				{errors.passingGrade && <div className={styles.errorMessage}>{errors.passingGrade.message}</div>}
			</div>

			<div className={styles.formGroup}>
				<label className={styles.formLabel}>Complete Time</label>
				<input
					type="number"
					{...register('completeTime', {
						required: 'Complete time is required',
						min: { value: 60, message: 'Complete time must be between 60 and 120' },
						max: { value: 120, message: 'Complete time must be between 60 and 120' },
					})}
					className={styles.formInput}
					placeholder="Enter complete time"
				/>
				{errors.completeTime && <div className={styles.errorMessage}>{errors.completeTime.message}</div>}
			</div>
		</div>
	);
};

export default PG_CT_INPUT;