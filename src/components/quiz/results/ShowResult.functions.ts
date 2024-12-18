import { IncorrectAnswer } from '../../../types';

export const renderHeader = (incorrectAnswersCount: number) => {
	return incorrectAnswersCount > 0 ? 'Incorrect Answers:' : 'Results:';
};

export const renderResultText = (CURRENT_INDEX: number, AMOUNT_OF_QUESTIONS: number, INCORRECT_ANSWERS: IncorrectAnswer[]) => {
	if (CURRENT_INDEX < AMOUNT_OF_QUESTIONS && INCORRECT_ANSWERS.length > 0) {
		return 'Time\'s up! Thanks for giving it your best shot. Let\'s see how you did!';
	}
};