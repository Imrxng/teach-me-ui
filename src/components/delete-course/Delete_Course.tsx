import { useContext, useEffect, useState } from 'react';
import DATACONTEXT from '../../context/DataContext';
import LoadingSpinner from '../loader/LoadingSpinner';
import Search from '../home/Search';
import { deleteCourse, fetchCourseTitles } from '../../ApiService';
import styles from './Delete_Course.module.css';

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
		<div className={styles.coursesContainer}>
			<div>
				<h1 className={styles.deleteTitle}>Delete Course</h1>
			</div>
			<div className={styles.searchContainer}>
				<Search search={SEARCH} onSearchChange={handleSearchChange} />
			</div>
			<div className={styles.coursesList}>
				{filteredCourses().map((course, index) => (
					<div key={index} className={styles.courseCard}>
						<button
							onClick={() => deleteThisCourse(course, SET_LOADING, SET_COURSE_TITLES)}
							className={styles.deleteButton}
						>
                            &times;
						</button>
						<p className={styles.courseTitle}>{course.toUpperCase()}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default DELETE_COURSE;