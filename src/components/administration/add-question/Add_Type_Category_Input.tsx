import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Question, Type } from '../../../types';
import styles from './Add_Question.module.css';

interface AddTypeCategoryInputProps {
	register: UseFormRegister<{
		question: string;
		type: Type;
		category: string;
		answers: {
			id: number;
			answer: string;
			reason: string;
		}[];
		questionAnswerResult: string[];
	}>,
	errors: FieldErrors<Question>,
	handleTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
	selectedType: Type
}

const ADD_TYPE_CATEGORY_INPUT = ({ register, errors, handleTypeChange, selectedType }: AddTypeCategoryInputProps) => {
	return (
		<div className={styles.row}>
			<div className={styles.formGroup}>
				<label className={styles.label}>Multiple Choice Question?</label>
				<div style={{ display:'flex', flexDirection:'column' }}>
					<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
						<input 
							id='cy-add-question-single-option' {...register('type', { required: true })} 
							type="radio" 
							value={Type.Single}
							checked={selectedType === Type.Single}
							onChange={handleTypeChange}
						/>
						<label style={{ margin: '0px' }}>No</label>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
						<input 
							id='cy-add-question-multiple-option' {...register('type', { required: true })} 
							type="radio" 
							value={Type.Multi} 
							checked={selectedType === Type.Multi}
							onChange={handleTypeChange}
						/>
						<label style={{ margin: '0px' }}>Yes</label>
					</div>
				</div>
			</div>
			<div className={styles.formGroup}>
				<label className={styles.label}>Category</label>
				<input
					{...register('category', { required: true })}
					id='cy-add-question-question-category-input'
					className={styles.formControl}
					placeholder="Enter question category"
				/>
				{errors.category && <div className={styles.errorMessage}>Category is required</div>}
			</div>
		</div>
	);
};

export default ADD_TYPE_CATEGORY_INPUT;