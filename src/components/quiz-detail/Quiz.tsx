/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useState } from 'react';
import { Content, RootObject } from '../../types';
import { useNavigate, useParams } from 'react-router-dom';
import DATACONTEXT from '../../context/DataContext';
import LoadingSpinner from '../loader/LoadingSpinner';

const QUIZ = () => {
	const [COURSE, SET_COURSE] = useState<Content>();
	const { SET_LOADING, LOADING } = useContext(DATACONTEXT);
	const { ID } = useParams();
	const NAVIGATE = useNavigate();
	
	const fetchQuestions = async () => {
		SET_LOADING(true);
		const responseTitles = await fetch('http://localhost:3000/api/get-course-titles');
		const titles: string[] = await responseTitles.json();

		if (ID && !titles.includes(ID)) {
			NAVIGATE('/not-found');
			return;
		}

		const responseCourse = await fetch(`http://localhost:3000/api/get-course/${ID}`);
		const data: RootObject = await responseCourse.json();
		SET_COURSE(data.content);

		SET_LOADING(false);
	};

	useEffect(() => {
		fetchQuestions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (LOADING) return <LoadingSpinner message='Gathering information, please wait!' />;

	
	// const Settings = () => {
	// 	return (
			
	// 	);
	// }

	return (
		<div>
			{COURSE ? 
				<>
					<p>Settings</p>
					<label htmlFor="amountOfQuestions">amount of questions (max {COURSE.questions.length}) </label>
					<input type="number" name="amountOfQuestions" id="amountOfQuestions" min={1} value={COURSE.questions.length} max={COURSE.questions.length} />
				</>
					:
				<></>
			}
			
		</div>
	);

};

export default QUIZ;