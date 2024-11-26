import { useContext, useEffect, useState } from 'react';
import DATACONTEXT from '../../../context/DataContext';
import LoadingSpinner from '../../loader/LoadingSpinner';
import Search from '../../home/Search';
import { deleteCourse, fetchCourseTitles } from '../../../ApiService';
import styles from './Delete_Course.module.css';
import Pagination from '../../home/Pagination';

const DELETE_COURSE = () => {
	const { LOADING, SET_LOADING } = useContext(DATACONTEXT);
	const [COURSE_TITLES, SET_COURSE_TITLES] = useState<string[]>([]);
	const [SEARCH, SET_SEARCH] = useState<string>('');
	const [CURRENT_PAGE, SET_CURRENT_PAGE] = useState(1);
	const COURSES_PER_PAGE = 20;
	const TOTAL_PAGES = Math.ceil(COURSE_TITLES.length / COURSES_PER_PAGE);
	const CURRENT_COURSE_TITLES = COURSE_TITLES.slice((CURRENT_PAGE - 1) * COURSES_PER_PAGE, CURRENT_PAGE * COURSES_PER_PAGE);

	const HANDLE_NEXT_PAGE = () => {
		if (CURRENT_PAGE < TOTAL_PAGES) {
			SET_CURRENT_PAGE(CURRENT_PAGE + 1);
		}
	};

	const HANDLE_PREV_PAGE = () => {
		if (CURRENT_PAGE > 1) {
			SET_CURRENT_PAGE(CURRENT_PAGE - 1);
		}
	};

	const LOAD_COURSE_TITLES = async () => {
		try {
			SET_LOADING(true);
			const DATA = await fetchCourseTitles();
			SET_COURSE_TITLES(DATA);
		} catch (error) {
			if (error instanceof Error) {
				console.log(`Error: ${error.message}`);
				alert('Failed to fetch course titles.');
			}
		} finally {
			SET_LOADING(false);
		}
	};

	const DELETE_THIS_COURSE = async (course: string) => {
		const CONFIRMATION: boolean = confirm(`Are you sure you want to delete ${course}?`);
		if (CONFIRMATION) {
			await deleteCourse(course);
			LOAD_COURSE_TITLES();
		}
	};

	useEffect(() => {
		LOAD_COURSE_TITLES();
	}, [SET_LOADING]);

	const HANDLE_SEARCH_CHANGE: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const SEARCH_VALUE = event.target.value;
		SET_SEARCH(SEARCH_VALUE);
		FILTERED_COURSES();
	};

	const FILTERED_COURSES = () => {
		return CURRENT_COURSE_TITLES.filter((course) =>
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
				<Search search={SEARCH} onSearchChange={HANDLE_SEARCH_CHANGE} />
			</div>
			{COURSE_TITLES.length > 0 ? (
				<div className={styles.coursesList}>
					{FILTERED_COURSES().map((course, index) => (
						<div key={index} className={styles.courseCard}>
							<button
								onClick={() => DELETE_THIS_COURSE(course)}
								id={`cy-delete-course-btn-${index}`}
								className={styles.deleteButton}
							>
								&times;
							</button>
							<p className={styles.courseTitle}>{course.toUpperCase()}</p>
						</div>
					))}
				</div>
			)
				:
				<>
					<p>THERE ARE NO COURSES</p>
				</>}
			<div className={styles.deleteCourseFooter}>
				<Pagination
					currentIndex={CURRENT_PAGE}
					maxIndex={TOTAL_PAGES}
					onPrevious={HANDLE_PREV_PAGE}
					onNext={HANDLE_NEXT_PAGE}
				/>
			</div>
		</div>
	);
};

export default DELETE_COURSE;