import { useContext, useEffect, useState } from 'react';
import DATACONTEXT from '../../context/DataContext';
import LoadingSpinner from '../loader/LoadingSpinner';
import Search from '../home/Search';
import './Delete_Course.css';
import { deleteCourse, fetchCourseTitles } from '../../ApiService';

const loadCourseTitles = async (setLoading: (loading: boolean) => void,
	setCourseTitles: (titles: string[]) => void
) => {
	try {
		setLoading(true);
		const data = await fetchCourseTitles();
		setCourseTitles(data);
	} catch (error) {
		if (error instanceof Error) {
			console.log(`Error: ${error.message}`);
			alert('Failed to fetch course titles.');
		}
	} finally {
		setLoading(false);
	}
};

const deleteThisCourse = async (course: string,
	setLoading: (loading: boolean) => void,
	setCourseTitles: (titles: string[]) => void
) => {
	const confirmation: boolean = confirm(`Are you sure you want to delete ${course}?`);
	if (confirmation) {
		await deleteCourse(course);
		loadCourseTitles(setLoading, setCourseTitles);
	}
};

const DELETE_COURSE = () => {
	const { LOADING, SET_LOADING } = useContext(DATACONTEXT);
	const [COURSE_TITLES, SET_COURSE_TITLES] = useState<string[]>([]);
	const [SEARCH, SET_SEARCH] = useState<string>('');

	useEffect(() => {
		loadCourseTitles(SET_LOADING, SET_COURSE_TITLES);
	}, [SET_LOADING]);

	const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const searchValue = event.target.value;
		SET_SEARCH(searchValue);
		filteredCourses();
	};

	const filteredCourses = () => {
		return COURSE_TITLES.filter((course) =>
			course ? course.toLowerCase().startsWith(SEARCH.toLowerCase()) : 1
		);
	};

	if (LOADING) return <LoadingSpinner message='Gathering courses, please wait!' />;

	return (
		<div className="courses-container">
			<div className="search-container">
				<Search search={SEARCH} onSearchChange={handleSearchChange} />
			</div>
			<div className="courses-list">
				{filteredCourses().map((course, index) => (
					<div key={index} className="course-card">
						<button
							onClick={() => deleteThisCourse(course, SET_LOADING, SET_COURSE_TITLES)}
							className="delete-button"
						>
                            &times;
						</button>
						<h3 className="course-title">{course.toUpperCase()}</h3>
					</div>
				))}
			</div>
		</div>
	);
};

export default DELETE_COURSE;