import { Question } from '../../../types';

export const multipleOrSingleChoice = (QUESTION: Question) => {
	if (QUESTION.questionAnswerResult.length > 1) {
		return 'checkbox';
	} else {
		return 'radio';
	}
};

const isCorrectAnswer = (CURRENT_ANSWER: string[], answer: string): boolean => CURRENT_ANSWER.includes(answer);

const getCorrectAnswerColor = (QUESTION: Question, answer: string): string => {
	return QUESTION.questionAnswerResult.includes(answer) ? '#A1CFCF' : '#EBA5A3';
};

const getIncorrectAnswerColor = (QUESTION: Question, answer: string): string => {
	return QUESTION.questionAnswerResult.includes(answer) ? '#A1CFCF' : '';
};

const determineAnswerColor = (QUESTION: Question, CURRENT_ANSWER: string[], answer: string): string => {
	if (!CURRENT_ANSWER) return '';

	if (isCorrectAnswer(CURRENT_ANSWER, answer)) {
		return getCorrectAnswerColor(QUESTION, answer);
	}

	return getIncorrectAnswerColor(QUESTION, answer);
};

export const getColorAnswer = (SHOW_RIGHT_ANSWERS: boolean, CURRENT_ANSWER: string[], answer: string, QUESTION: Question): string => {
	if (!SHOW_RIGHT_ANSWERS) return '';

	return determineAnswerColor(QUESTION, CURRENT_ANSWER, answer);
};
