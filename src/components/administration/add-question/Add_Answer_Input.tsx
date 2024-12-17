import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Question, Type } from '../../../types';
import styles from './Add_Question.module.css';

interface AddAnswersInputProps {
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
    index: number
}

const ADD_ANSWER_INPUT = ({ register, errors, index }: AddAnswersInputProps) => {
    
	const hasError = (index: number, errors: FieldErrors<Question>): boolean => {
		return !!errors.answers?.[index]?.answer;
	};
       
	const renderError = (index: number) =>{
		return hasError(index, errors) && <div className={styles.errorMessage}>Answer is required</div>;
	}; 

	return (
		<div className={styles.formGroup}>
			<label>Answer</label>
			<textarea
				{...register(`answers.${index}.answer`, { required: true })}
				id='cy-add-question-answer-input'
				className={styles.formControl}
				placeholder="Enter answer"
			/>
			{ renderError(index)}
		</div>
	);
};

export default ADD_ANSWER_INPUT;