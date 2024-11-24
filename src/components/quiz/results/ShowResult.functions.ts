export const renderHeader = (incorrectAnswersCount: number) => {
	return incorrectAnswersCount > 0 ? 'Incorrect Answers:' : 'Results:';
};

export const renderResultText = (CURRENT_INDEX: number, AMOUNT_OF_QUESTIONS: number) => {
	return CURRENT_INDEX < AMOUNT_OF_QUESTIONS ? 'The quiz time was up, there were no mistakes, but the quiz was not completed.': 'All answers are correct!';
};