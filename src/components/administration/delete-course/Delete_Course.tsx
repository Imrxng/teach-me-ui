import { useContext, useEffect, useState } from 'react';
import DATACONTEXT from '../../../context/DataContext';
import LoadingSpinner from '../../loader/LoadingSpinner';
import Search from '../../home/Search';
import { deleteCourse, fetchCourseTitles } from '../../../ApiService';
import styles from './Delete_Course.module.css';
import Pagination from '../../home/Pagination';
import MODAL from '../modal/Modal';
import modal from '../modal/Modal.module.css';

const DELETE_COURSE = () => {
	const [CONFIRMATION_MODAL, SET_CONFIRMATION_MODAL] = useState<boolean>(false);
	const [RESPONSE_MODAL, SET_RESPONSE_MODAL] = useState<boolean>(false);
	const [MESSAGE, SET_MESSAGE] = useState<string>('');
	const [SELECTED_COURSE, SET_SELECTED_COURSE] = useState<string>('');
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
		try {
			SET_LOADING(true);
			await deleteCourse(course);
			SET_MESSAGE(`"${course}" deleted succesfully`);
		} catch (error: unknown) {
			console.error(error);
			SET_MESSAGE(`Failed to delete "${course}". Please try again.`);
		} finally {
			LOAD_COURSE_TITLES();
			SET_LOADING(false);
			SET_CONFIRMATION_MODAL(false);
			SET_RESPONSE_MODAL(true);
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
						<>
							<div key={index} className={styles.courseCard}>
								<button
									onClick={() => {
										SET_SELECTED_COURSE(course);
										SET_CONFIRMATION_MODAL(true);
									}}
									id={`cy-delete-course-btn-${index}`}
									className={styles.deleteButton}
								>
									&times;
								</button>
								<p className={styles.courseTitle}>{course.toUpperCase()}</p>
							</div>
						</>
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
			<MODAL open={CONFIRMATION_MODAL} onClose={() => SET_CONFIRMATION_MODAL(false)}>
				<div className={modal.modal} style={{ color: 'black' }}>
					<p className={modal.modalTitle} style={{ color: 'black' }}>Confirm Delete</p>
					<p className={modal.modalTxt}>Are you sure you want to delete this course?</p>
					<p>{SELECTED_COURSE}</p>
					<button
						type="button"
						className={modal.actionBtn}
						onClick={() => DELETE_THIS_COURSE(SELECTED_COURSE)}
					>
						Delete
					</button>
				</div>
			</MODAL>
			<MODAL open={RESPONSE_MODAL} onClose={() => SET_RESPONSE_MODAL(false)}>
				<div className={modal.responseModal} style={{ color: 'black' }}>
					<p>{MESSAGE}</p>
				</div>
			</MODAL>
		</div>
	);
};

export default DELETE_COURSE;