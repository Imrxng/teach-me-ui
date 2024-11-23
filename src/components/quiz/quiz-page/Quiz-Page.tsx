import { useContext, useEffect } from 'react';
import { QuizContext } from '../provider/QuizContext';
import QuestionComponent from '../questions/QuestionComponent';
import ShowResult from '../results/ShowResult';
import SETTINGS from '../settings/Settings';

const QuizPage = () => {
	const { SET_TIME, TIME, START_QUIZ, SHOW_RESULTS, COURSE, CURRENT_INDEX } = useContext(QuizContext);


	useEffect(() => {
		const handle = setInterval(() => {
			SET_TIME(TIME => {
				if (TIME <= 0) {
					clearInterval(handle);
					return 0;
				} else {
					return TIME - 1;
				}
			});
		}, 1000);

		return () => {
			clearInterval(handle);
		};
	}, [SET_TIME, TIME]);

	if (!START_QUIZ) {
		return (
			<SETTINGS />
		);
	}

	if (!SHOW_RESULTS) {
		return (
			<div>
				{<QuestionComponent QUESTION={COURSE.questions[CURRENT_INDEX]} />}
			</div>
		);
	}

	return (
		<div>
			<ShowResult />
		</div>
	);
};

export default QuizPage;