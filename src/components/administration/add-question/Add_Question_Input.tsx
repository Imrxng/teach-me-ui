import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Question, Type } from '../../../types';
import styles from './Add_Question.module.css';

interface AddQuestionInputProps {
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
    errors: FieldErrors<Question>
}

const ADD_QUESTION_INPUT = ({ register, errors }: AddQuestionInputProps) => {
	return (
		<div className={styles.formGroup}>
			<label className={styles.label}>Question</label>
			<input
				{...register('question', { required: true })}
				id='cy-add-question-question-input'
				className={styles.formControl}
				placeholder="Enter question"
			/>
			{errors.question && <div className={styles.errorMessage}>Question is required</div>}
		</div>
	);
};

export default ADD_QUESTION_INPUT;