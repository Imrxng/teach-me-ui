/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect, useState } from 'react';
import { RootObject } from '../../types';
import TABLE from './table/Table';
import DATACONTEXT from '../../context/DataContext';
import Search from './Search';
import Pagination from './Pagination';
import LoadingSpinner from '../loader/LoadingSpinner';

const HOME = () => {
	const [COURSES, SET_COURSES] = useState<RootObject[]>([]);
	const [FILTERED_COURSES, SET_FILTERED_COURSES] = useState<RootObject[]>([]);
	const [SEARCH, SETSEARCH] = useState<string>('');
	const [CURRENT_INDEX, SET_CURRENT_INDEX] = useState<number>(1);
	const { LOADING, SETLOADING } = useContext(DATACONTEXT);

	 
	

	const getCourses = async () => {
		const responseTitles = await fetch('http://localhost:3000/api/get-course-titles');
		const titles: string[] = await responseTitles.json();

		return await Promise.all(
			titles.map(async (title) => {
				const responseCourse = await fetch(`http://localhost:3000/api/get-course/${title}`);
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

	useEffect(() => {
		const fetchQuestions = async () => {
			SETLOADING(true);
			try {
				const coursesArray = await getCourses();
				SET_COURSES(coursesArray);
				SET_FILTERED_COURSES(coursesArray);
			} catch (error) {
				console.error('Error fetching courses:', error);
			} finally {
				SETLOADING(false);
			}
		};
		fetchQuestions();
	}, [SETLOADING]);

	if (LOADING) return <LoadingSpinner message='Gathering information, please wait!' />;

	return (
		<div className="homeMain">
			<Search search={SEARCH} onSearchChange={handleSearchChange} />
			<TABLE COURSES={FILTERED_COURSES} CURRENT_INDEX={CURRENT_INDEX} />
			<Pagination
				currentIndex={CURRENT_INDEX}
				maxIndex={Math.ceil(FILTERED_COURSES.length / 5)}
				onPrevious={goToPreviousPage}
				onNext={goToNextPage}
			/>
		</div>
	);
};

export default HOME;
