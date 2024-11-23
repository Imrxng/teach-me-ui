import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Question, Type } from '../../../types';
import styles from './Add_Question.module.css';

interface AddTypeCategoryInputProps {
    register: UseFormRegister<{
        question: string;
        type: Type;
        category: string;
        answers: {
            answer: string;
            reason: string;
        }[];
        questionAnswerResult: string[];
    }>,
    errors: FieldErrors<Question>,
    handleTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const ADD_TYPE_CATEGORY_INPUT = ({ register, errors, handleTypeChange }: AddTypeCategoryInputProps) => {
	return (
		<div className={styles.row}>
			<div className={styles.formGroup}>
				<label className={styles.label}>Type</label>
				<select {...register('type', { required: true })} className={styles.formControl} onChange={handleTypeChange}>
					<option value="">-- SELECT TYPE --</option>
					<option value={Type.Single}>Single</option>
					<option value={Type.Multi}>Multiple</option>
				</select>
				{errors.type && <div className={styles.errorMessage}>Type is required</div>}
			</div>

			<div className={styles.formGroup}>
				<label className={styles.label}>Category</label>
				<input
					{...register('category', { required: true })}
					className={styles.formControl}
					placeholder="Enter question category"
				/>
				{errors.category && <div className={styles.errorMessage}>Category is required</div>}
			</div>
		</div>
	);
};

export default ADD_TYPE_CATEGORY_INPUT;