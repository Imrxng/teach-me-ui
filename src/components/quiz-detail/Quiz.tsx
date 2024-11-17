/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useState } from 'react';
import { Course, RootObject } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import DATACONTEXT from '../../context/DataContext';
import LoadingSpinner from '../loader/LoadingSpinner';
import './Settings.css'; 
import { fetchCourseTitles } from '../../ApiService';
import QuizContent from './QuizContent';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

const QUIZ = () => {
	const [COURSE, SET_COURSE] = useState<Course>();
	const { SET_LOADING, LOADING } = useContext(DATACONTEXT);
	const { ID } = useParams();
	const NAVIGATE = useNavigate();
	
	const notFoundData = (data: RootObject) => {
		if (!data.content) {
			NAVIGATE('/not-found');
			return;
		}
	};

	const fetchQuestions = async () => {
		SET_LOADING(true);
		const titles: string[] = await fetchCourseTitles();

		if (ID && !titles.includes(ID)) {
			NAVIGATE('/not-found');
			return;
		}

		const responseCourse = await fetch(`${BASE_URL}/get-course/${ID}`);
		const data: RootObject = await responseCourse.json();
		notFoundData(data);
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

	return (
		<QuizContent COURSE={COURSE}/>
	);
};

export default QUIZ;