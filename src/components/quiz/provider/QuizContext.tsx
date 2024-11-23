import { createContext } from 'react';
import { Course } from '../../../types';

interface IQuizContext {
	COURSE: Course;
	SET_COURSE: React.Dispatch<React.SetStateAction<Course | undefined>>;
	START_QUIZ: boolean;
	SET_START_QUIZ: React.Dispatch<React.SetStateAction<boolean>>;
	SHOW_RESULTS: boolean;
	SET_SHOW_RESULTS: React.Dispatch<React.SetStateAction<boolean>>;
	AMOUNT_OF_QUESTIONS: number;
	SET_AMOUNT_OF_QUESTIONS: React.Dispatch<React.SetStateAction<number>>;
	CHECK_BETWEEN_QUESTIONS: boolean;
	SET_CHECK_BETWEEN_QUESTIONS: React.Dispatch<React.SetStateAction<boolean>>;
	CURRENT_INDEX: number;
	SET_CURRENT_INDEX: React.Dispatch<React.SetStateAction<number>>;
	TIME: number;
	SET_TIME: React.Dispatch<React.SetStateAction<number>>;
}

const initialQuizContext: IQuizContext = {
	COURSE: { id: '1', name: '', category: '', passingGrade: 1, completeTime: 1, questionCategories: [], questions: [], date: '' },
	SET_COURSE: () => { },
	START_QUIZ: false,
	SET_START_QUIZ: () => { },
	SHOW_RESULTS: false,
	SET_SHOW_RESULTS: () => { },
	AMOUNT_OF_QUESTIONS: 0,
	SET_AMOUNT_OF_QUESTIONS: () => { },
	CHECK_BETWEEN_QUESTIONS: true,
	SET_CHECK_BETWEEN_QUESTIONS: () => { },
	CURRENT_INDEX: 0,
	SET_CURRENT_INDEX: () => { },
	TIME: 1,
	SET_TIME: () => { },
};

export const QuizContext = createContext<IQuizContext>(initialQuizContext);