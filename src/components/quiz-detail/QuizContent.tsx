import { useEffect, useState } from 'react';
import QuestionComponent from './QuestionComponent';
import SETTINGS from './Settings';
import { Course } from '../../types';
import ShowResult from './ShowResult';

interface QuizContentProps {
    COURSE: Course;
}

const QuizContent = ({ COURSE } : QuizContentProps) => {
	const [START_QUIZ, SET_START_QUIZ] = useState<boolean>(false);
	const [SHOW_RESULTS, SET_SHOW_RESULTS] = useState<boolean>(false);
	const [AMOUNT_OF_QUESTIONS, SET_AMOUNT_OF_QUESTIONS] = useState<number>(COURSE.questions.length);
	const [CHECK_BETWEEN_QUESTIONS, SET_CHECK_BETWEEN_QUESTIONS] = useState<boolean>(true);
	const [ CURRENT_INDEX, SET_CURRENT_INDEX ] = useState<number>(0);
	const [ TIME, SET_TIME] = useState<number>(1);


	useEffect(() => {
		const handle = setInterval(() => {
		   SET_TIME(TIME => {
				if (TIME <= 0 ) {
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
	  }, [TIME]);

	if (!START_QUIZ) {
		return (
			<SETTINGS AMOUNT_OF_QUESTIONS={AMOUNT_OF_QUESTIONS} SET_AMOUNT_OF_QUESTIONS={SET_AMOUNT_OF_QUESTIONS} SET_CHECK_BETWEEN_QUESTIONS={SET_CHECK_BETWEEN_QUESTIONS} CHECK_BETWEEN_QUESTIONS={CHECK_BETWEEN_QUESTIONS} SET_TIME={SET_TIME} SET_START_QUIZ={SET_START_QUIZ} COURSE={COURSE} />
		);
	} 
	
	if (!SHOW_RESULTS){
		return (
			<div>
				{ <QuestionComponent AMOUNT_OF_QUESTIONS={AMOUNT_OF_QUESTIONS} SET_CURRENT_INDEX={SET_CURRENT_INDEX} SET_SHOW_RESULTS={SET_SHOW_RESULTS} LENGTH={AMOUNT_OF_QUESTIONS} CURRENT_INDEX={CURRENT_INDEX + 1} QUESTION={COURSE.questions[CURRENT_INDEX]} TIME={TIME} CHECK_BETWEEN_QUESTIONS={CHECK_BETWEEN_QUESTIONS} /> }
			</div>
		);
	}

	return (
		<div>
			<ShowResult COURSE={COURSE} AMOUNT_OF_QUESTIONS={AMOUNT_OF_QUESTIONS}/>
		</div>
	);
};

export default QuizContent;