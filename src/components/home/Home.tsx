/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useState } from 'react';
import { RootObject } from '../../types';
import TABLE, { ifAdmin } from './table/Table';
import DATACONTEXT from '../../context/DataContext';
import Search from './Search';
import Pagination from './Pagination';
import LoadingSpinner from '../loader/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

const HOME = () => {
	const [COURSES, SET_COURSES] = useState<RootObject[]>([]);
	const [FILTERED_COURSES, SET_FILTERED_COURSES] = useState<RootObject[]>([]);
	const [SEARCH, SETSEARCH] = useState<string>('');
	const [CURRENT_INDEX, SET_CURRENT_INDEX] = useState<number>(1);
	const { LOADING, SET_LOADING, LOGIN_SESSION } = useContext(DATACONTEXT);
	const NAVIGATE = useNavigate();


	const getCourses = async (): Promise<RootObject[]> => {
		const responseTitles = await fetch(`${BASE_URL}/get-course-titles`);
		const titles: string[] = await responseTitles.json();

		return await Promise.all(
			titles.map(async (title) => {
				const responseCourse = await fetch(`${BASE_URL}/get-course/${title}`);
				return await responseCourse.json();
			})
		);
	};

	const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const searchValue = event.target.value;
		SETSEARCH(searchValue);
		updateFilteredCourses(searchValue);
	};

	const updateFilteredCourses = (searchValue: string) => {
		const filtered = COURSES.filter((COURSE) =>
			COURSE.content.name ? COURSE.content.name.toLowerCase().startsWith(searchValue.toLowerCase()) : 1
		);
		SET_FILTERED_COURSES(filtered);
	};

	const goToPreviousPage = () => {
		SET_CURRENT_INDEX((prevIndex) => Math.max(prevIndex - 1, 1));
	};

	const goToNextPage = () => {
		SET_CURRENT_INDEX((prevIndex) =>
			Math.min(prevIndex + 1, Math.ceil(FILTERED_COURSES.length / 5))
		);
	};
	const fetchCourses = async () => {
		SET_LOADING(true);
		try {
			const coursesArray = await getCourses();
			SET_COURSES(coursesArray);
			SET_FILTERED_COURSES(coursesArray);
		} catch (error) {
			console.error('Error fetching courses:', error);
		} finally {
			SET_LOADING(false);
		}
	};

	useEffect(() => {
		fetchCourses();
	}, [SET_LOADING]);

	const showAddCourseBtn = () => {
		return (ifAdmin(LOGIN_SESSION) ? <button id='cy-settings-create-course-btn' onClick={() => NAVIGATE('/settings/create-course')}>Add New Course</button> : '' );
	};

	if (LOADING) return <LoadingSpinner message='Gathering information, please wait!' />;

	return (
		<div className="homeMain">
			<div style={{ display: 'flex', gap: '10px' }}>
				<Search search={SEARCH} onSearchChange={handleSearchChange} />
				{showAddCourseBtn()}
			</div>
			<TABLE COURSES={FILTERED_COURSES} CURRENT_INDEX={CURRENT_INDEX} REFRESH_COURSES={fetchCourses} />
			{
				FILTERED_COURSES.length > 0
					?
					<Pagination
						currentIndex={CURRENT_INDEX}
						maxIndex={Math.ceil(FILTERED_COURSES.length / 5)}
						onPrevious={goToPreviousPage}
						onNext={goToNextPage}
					/>
					:
					<>
					</>
			}
		</div>
	);
};

export default HOME;
