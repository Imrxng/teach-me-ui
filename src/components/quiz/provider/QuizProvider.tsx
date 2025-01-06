import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCourseTitles } from '../../../ApiService';
import DATACONTEXT from '../../../context/DataContext';
import { Course, Question, RootObject } from '../../../types';
import LoadingSpinner from '../../loader/LoadingSpinner';
import QuizPage from '../quiz-page/Quiz-Page';
import { QuizContext } from './QuizContext';

const BASE_URL = process.env.BASE_URL || 'https://teach-me-backend.vercel.app/api';

const QuizProvider = () => {
	const [COURSE, SET_COURSE] = useState<Course>();
	const [START_QUIZ, SET_START_QUIZ] = useState<boolean>(false);
	const [SHOW_RESULTS, SET_SHOW_RESULTS] = useState<boolean>(false);
	const [AMOUNT_OF_QUESTIONS, SET_AMOUNT_OF_QUESTIONS] = useState<number>(1);
	const [CHECK_BETWEEN_QUESTIONS, SET_CHECK_BETWEEN_QUESTIONS] = useState<boolean>(true);
	const [CURRENT_INDEX, SET_CURRENT_INDEX] = useState<number>(0);
	const [TIME, SET_TIME] = useState<number>(1);
	const { SET_LOADING, LOADING } = useContext(DATACONTEXT);
	const { ID } = useParams();
	const NAVIGATE = useNavigate();

	const shuffleArray = (questions: Question[]) => {
		return questions
			.map(value => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
	};

	const notFoundData = (data: RootObject) => {
		if (!data.content) {
			NAVIGATE('/not-found');
		}
	};

	const fetchQuestions = async () => {
		SET_LOADING(true);
		const titles: string[] = await fetchCourseTitles();

		if (ID && !titles.includes(ID)) {
			NAVIGATE('/not-found');
			return;
		}

		const responseCourse = await fetch(`${BASE_URL}/get-course/${ID}`, {
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include'
		});
		const data: RootObject = await responseCourse.json();
		notFoundData(data);

		data.content.questions = shuffleArray(data.content.questions);

		SET_COURSE(data.content);
		SET_LOADING(false);
	};

	useEffect(() => {
		fetchQuestions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (LOADING) {
		return <LoadingSpinner message="Gathering information, please wait!" />;
	}

	if (!COURSE) {
		return null;
	}

	const VALUE = {
		COURSE,
		SET_COURSE,
		START_QUIZ,
		SET_START_QUIZ,
		SHOW_RESULTS,
		SET_SHOW_RESULTS,
		AMOUNT_OF_QUESTIONS,
		SET_AMOUNT_OF_QUESTIONS,
		CHECK_BETWEEN_QUESTIONS,
		SET_CHECK_BETWEEN_QUESTIONS,
		CURRENT_INDEX,
		SET_CURRENT_INDEX,
		TIME,
		SET_TIME,
	};

	return (
		<QuizContext.Provider value={VALUE}>
			<QuizPage />
		</QuizContext.Provider>
	);
};

export default QuizProvider;
