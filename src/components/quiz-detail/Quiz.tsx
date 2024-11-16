/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useState } from 'react';
import { Course, RootObject } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import DATACONTEXT from '../../context/DataContext';
import LoadingSpinner from '../loader/LoadingSpinner';
import './Settings.css'; 
import SETTINGS from './Settings';
import { fetchCourseTitles } from '../../ApiService';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

const QUIZ = () => {
	const [COURSE, SET_COURSE] = useState<Course>();
	const [START_QUIZ, SET_START_QUIZ] = useState<boolean>(false);
	const { SET_LOADING, LOADING } = useContext(DATACONTEXT);
	const [ TIME, SET_TIME] = useState<number>();
	const { ID } = useParams();
	const NAVIGATE = useNavigate();
	
	const fetchQuestions = async () => {
		SET_LOADING(true);
		const titles: string[] = await fetchCourseTitles();

		if (ID && !titles.includes(ID)) {
			NAVIGATE('/not-found');
			return;
		}

		const responseCourse = await fetch(`${BASE_URL}/get-course/${ID}`);
		const data: RootObject = await responseCourse.json();
		if (!data.content) {
			NAVIGATE('/not-found');
			return;
		}
		SET_COURSE(data.content);
		SET_LOADING(false);
	};

	useEffect(() => {
		fetchQuestions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (LOADING) return <LoadingSpinner message='Gathering information, please wait!' />;

	if (!COURSE) {
		return;
	}

	const Question = () => {
		return (
			<>
				Question {} of {}
			</>
		);
	}

	return (
		<div>
			{ !START_QUIZ ?<SETTINGS SET_START_QUIZ={SET_START_QUIZ} COURSE={COURSE} /> : <></> }
		</div>
	);

};

export default QUIZ;