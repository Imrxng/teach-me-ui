import { IncorrectAnswer } from '../../../types';

export const renderHeader = (incorrectAnswersCount: number) => {
	return incorrectAnswersCount > 0 ? 'Incorrect Answers:' : 'Results:';
};

export const renderResultText = (CURRENT_INDEX: number, AMOUNT_OF_QUESTIONS: number, INCORRECT_ANSWERS: IncorrectAnswer[]) => {
	if (CURRENT_INDEX < AMOUNT_OF_QUESTIONS && INCORRECT_ANSWERS.length > 0) {
		return 'The quiz time was up, there were no mistakes, but the quiz was not completed.';
	}
};