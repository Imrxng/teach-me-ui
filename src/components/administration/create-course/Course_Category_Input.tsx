import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Course } from '../../../types';
import styles from './Create_From.module.css';

interface CourseCategoryInputProps {
    register: UseFormRegister<Course>,
    errors: FieldErrors<Course>,
	disable: boolean
}

const COURSE_CATEGORY_INPUT = ({ register, errors, disable }: CourseCategoryInputProps) => {
	return (
		<div style={{ display: 'flex', gap: '2rem' }}>
			
			<div className={styles.formGroup}>
				<label className={styles.formLabel}>Course</label>
				<input
					{...register('name', { required: 'Course title is required' })}
					className={styles.formInput}
					placeholder="Enter course title"
					disabled={disable}
				/>
				{errors.name && <div className={styles.errorMessage}>{errors.name.message}</div>}
			</div>

			<div className={styles.formGroup}>
				<label className={styles.formLabel}>Category</label>
				<input
					{...register('category', { required: 'Category is required' })}
					className={styles.formInput}
					placeholder="Enter category"
				/>
				{errors.category && <div className={styles.errorMessage}>{errors.category.message}</div>}
			</div>
		</div>
	);
};

export default COURSE_CATEGORY_INPUT;