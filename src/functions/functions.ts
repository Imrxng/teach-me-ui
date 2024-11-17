import { Question } from '../types';

const isCorrectAnswer = (CURRENT_ANSWER: string | undefined, answer: string): boolean => CURRENT_ANSWER === answer;

const getCorrectAnswerColor = (QUESTION: Question, answer: string): string => {
	return QUESTION.questionAnswerResult.includes(answer) ? 'green' : 'red';
};

const getIncorrectAnswerColor = (QUESTION: Question, answer: string): string => {
	return QUESTION.questionAnswerResult.includes(answer) ? 'green' : '';
};

const determineAnswerColor = (QUESTION: Question, CURRENT_ANSWER: string | undefined, answer: string): string => {
	if (!CURRENT_ANSWER) return '';

	if (isCorrectAnswer(CURRENT_ANSWER, answer)) {
		return getCorrectAnswerColor(QUESTION, answer);
	}

	return getIncorrectAnswerColor(QUESTION, answer);
};

export const getColorAnswer = (SHOW_RIGHT_ANSWERS: boolean, CURRENT_ANSWER: string | undefined, answer: string, QUESTION: Question): string => {
	if (!SHOW_RIGHT_ANSWERS) return '';

	return determineAnswerColor(QUESTION, CURRENT_ANSWER, answer);
};
