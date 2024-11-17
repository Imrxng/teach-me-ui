import { useState } from 'react';
import { Question } from '../../types';
import OneAnswer from './OneAnswer';

interface QuestionProps {
    TIME: number;
    QUESTION: Question;
    CURRENT_INDEX: number;
    LENGTH: number;
	AMOUNT_OF_QUESTIONS: number;
	SET_CURRENT_INDEX: React.Dispatch<React.SetStateAction<number>>;
	SET_SHOW_RESULTS: React.Dispatch<React.SetStateAction<boolean>>;
	CHECK_BETWEEN_QUESTIONS: boolean;
}

const QuestionComponent = ({ TIME, QUESTION, CURRENT_INDEX, LENGTH, SET_CURRENT_INDEX, AMOUNT_OF_QUESTIONS, SET_SHOW_RESULTS, CHECK_BETWEEN_QUESTIONS } : QuestionProps ) => {
	const [CURRENT_ANSWER, SET_CURRENT_ANSWER] = useState<string | undefined>(undefined);
	const [SHOW_RIGHT_ANSWERS, SET_SHOW_RIGHT_ANSWERS] = useState<boolean>(false);
	
	const handleAnswerReview = () => {
		SET_SHOW_RIGHT_ANSWERS(true);
		QUESTION.yourAnswer = CURRENT_ANSWER;
	};

	const moveToNextQuestion = () => {
		if (CURRENT_INDEX < AMOUNT_OF_QUESTIONS) {
			SET_SHOW_RIGHT_ANSWERS(false);
			SET_CURRENT_ANSWER(undefined);
			SET_CURRENT_INDEX(CURRENT_INDEX => CURRENT_INDEX + 1);
		} else {
			finishQuiz();
		}
	};

	const finishQuiz = () => {
		SET_SHOW_RESULTS(true);
	};

	const clickHandler: React.MouseEventHandler<HTMLButtonElement> = () => {
		if (SHOW_RIGHT_ANSWERS || !CHECK_BETWEEN_QUESTIONS) {
			moveToNextQuestion();
		} else {
			handleAnswerReview();
		}
	};

	return (
		<>
			<p>Question {CURRENT_INDEX} of {LENGTH}</p>
			<p>{Math.round(TIME / 60)} minutes remaining</p>
			<p>{QUESTION.question}</p>
  
			<button className='startQuizButton' onClick={CURRENT_ANSWER ? clickHandler : undefined}>Next</button>

			{QUESTION.answers.map((answer, index) => (
				<OneAnswer key={index} index={index} answer={answer.answer} QUESTION={QUESTION} SHOW_RIGHT_ANSWERS={SHOW_RIGHT_ANSWERS} CHECK_BETWEEN_QUESTIONS={CHECK_BETWEEN_QUESTIONS} CURRENT_ANSWER={CURRENT_ANSWER} SET_CURRENT_ANSWER={SET_CURRENT_ANSWER}/>
			))}
		</>
	);
};

export default QuestionComponent;