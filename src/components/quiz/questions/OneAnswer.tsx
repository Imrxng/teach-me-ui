import { useContext } from 'react';
import { Question } from '../../../types';
import { QuizContext } from '../provider/QuizContext';
import { getColorAnswer, multipleOrSingleChoice } from './questions.functions';
import './questions.component.css';

interface OneQuestionProps {
	index: number;
	answer: string;
	QUESTION: Question;
	SHOW_RIGHT_ANSWERS: boolean;
	CURRENT_ANSWER: string[];
	SET_CURRENT_ANSWER: React.Dispatch<React.SetStateAction<string[]>>;
}

const OneAnswer = ({ index, answer, QUESTION, CURRENT_ANSWER, SET_CURRENT_ANSWER, SHOW_RIGHT_ANSWERS }: OneQuestionProps) => {
	const { CHECK_BETWEEN_QUESTIONS } = useContext(QuizContext);

	const clickHandler: React.MouseEventHandler<HTMLInputElement> | undefined = (event) => {
		const newAnswer = event.currentTarget.value;
		if (QUESTION.questionAnswerResult.length === 1) {
			SET_CURRENT_ANSWER([newAnswer]);
		} else if (CURRENT_ANSWER.includes(newAnswer)) {
			SET_CURRENT_ANSWER(CURRENT_ANSWER.filter(ans => ans !== newAnswer));
		} else {
			SET_CURRENT_ANSWER([...CURRENT_ANSWER, newAnswer]);
		}
	};

	return (
		<div key={index}>
			<input
				type={multipleOrSingleChoice(QUESTION)}
				name='answer'
				value={answer}
				checked={CURRENT_ANSWER.includes(answer)}
				onClick={clickHandler}
				disabled={SHOW_RIGHT_ANSWERS}
				className='inputQuestions'
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