import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Question, Type } from '../../types';
import styles from './Add_Question.module.css';

interface AddReasonInputProps {
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
    index: number
}


const ADD_REASON_INPUT = ({ register, errors, index }: AddReasonInputProps) => {

	const hasError = (index: number, errors: FieldErrors<Question>): boolean => {
		return !!errors.answers?.[index]?.reason;
	};
       
	const renderError = (index: number) =>{
		return hasError(index, errors) && <div className={styles.errorMessage}>Reason is required</div>;
	}; 

	return (
		<div className={styles.formGroup}>
			<label>Reason</label>
			<input
				{...register(`answers.${index}.reason`, { required: true })}
				className={styles.formControl}
				placeholder="Enter reason"
			/>
			{renderError(index)}
		</div>
	);
};

export default ADD_REASON_INPUT;