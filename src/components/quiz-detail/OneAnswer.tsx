import { getColorAnswer } from '../../functions/functions';
import { Question } from '../../types';

interface OneQuestionProps {
    index: number;
    answer: string;
    QUESTION: Question;
    SHOW_RIGHT_ANSWERS: boolean;
    CURRENT_ANSWER: string | undefined;
    SET_CURRENT_ANSWER: React.Dispatch<React.SetStateAction<string | undefined>>;
	CHECK_BETWEEN_QUESTIONS: boolean;
}

const OneAnswer = ({ index, answer, QUESTION, SHOW_RIGHT_ANSWERS, CURRENT_ANSWER, SET_CURRENT_ANSWER, CHECK_BETWEEN_QUESTIONS }: OneQuestionProps) => {
	return (
		<div key={index}>
			<input
				type='radio'
				name='answer'
				value={answer}
				checked={CURRENT_ANSWER === answer} 
				onClick={(e) => SET_CURRENT_ANSWER(e.currentTarget.value)}
				disabled={SHOW_RIGHT_ANSWERS}
			/>
			<label
				style={{ color: CHECK_BETWEEN_QUESTIONS ? getColorAnswer(SHOW_RIGHT_ANSWERS, CURRENT_ANSWER, answer, QUESTION) : '' }}
				htmlFor={`answer-${index}`}
			>
				{index + 1}. {answer}
			</label>
		</div>
	);
};

export default OneAnswer;