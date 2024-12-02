import { useForm } from 'react-hook-form';
import stylesUpdate from './Update_Form.module.css';
import styles from '../create-course/Create_From.module.css';
import { Course } from '../../../types';
import { useContext, useEffect, useState } from 'react';
import DATACONTEXT from '../../../context/DataContext';
import LoadingSpinner from '../../loader/LoadingSpinner';
import { fetchCourseTitles, getCourse, updateCourse } from '../../../ApiService';
import COURSE_CATEGORY_INPUT from '../create-course/Course_Category_Input';
import DATE_INPUT from '../create-course/Date_Input';
import PG_CT_INPUT from '../create-course/PG_CT_Input';
import QUESTION_CATEGORY_INPUT from '../create-course/Question_Category_Input';
import COURSE_INPUT from './Course_Input';
import modal from '../modal/Modal.module.css';
import MODAL from '../modal/Modal';

const UPDATE_FORM = () => {
	const [OPEN, SET_OPEN] = useState<boolean>(false);
	const [OPEN_MESSAGE, SET_OPEN_MESSAGE] = useState<boolean>(false);
	const [MESSAGE, SET_MESSAGE] = useState<string>('');
	const { LOADING, SET_LOADING } = useContext(DATACONTEXT);
	const [QUESTION_CATEGORIES, SET_QUESTION_CATEGORIES] = useState<string[]>(['']);
	const [COURSE_TITLES, SET_COURSE_TITLES] = useState<string[]>([]);
	const [COURSE, SET_COURSE] = useState('');
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Course>({
		defaultValues: {
			id: new Date().getTime().toString(),
			name: '',
			category: '',
			passingGrade: 50,
			completeTime: 60,
			questionCategories: [''],
			questions: [],
			date: ''
		},
	});

	const handleAddCategory = () => SET_QUESTION_CATEGORIES([...QUESTION_CATEGORIES, '']);

	const handleRemoveCategory = (index: number) => SET_QUESTION_CATEGORIES(QUESTION_CATEGORIES.filter((_, i) => i !== index));

	const loadCourseTitles = async () => {
		try {
			SET_LOADING(true);
			const data = await fetchCourseTitles();
			SET_COURSE_TITLES(data);
		} catch (error) {
			if (error instanceof Error) {
				console.log(`Error: ${error.message}`);
				alert('Failed to fetch course titles.');
			}
		} finally {
			SET_LOADING(false);
		}
	};

	const onSubmit = async (data: Course) => {
		try {
			SET_LOADING(true);
			data.questionCategories = QUESTION_CATEGORIES;

			const RESPONE_MESSAGE = await updateCourse(data);
			SET_MESSAGE(RESPONE_MESSAGE);
		} catch (error) {
			SET_MESSAGE(`Failed to update ${data.name}. Please try again.`); 
		} finally {
			reset({
				id: new Date().getTime().toString(),
				name: '',
				category: '',
				passingGrade: 50,
				completeTime: 60,
				questionCategories: [''],
				questions: [],
				date: '',
			});
			SET_QUESTION_CATEGORIES(['']);
			SET_COURSE('');
			SET_LOADING(false);
			SET_OPEN(false); 
			SET_OPEN_MESSAGE(true);
		}
	};

	const onSelect = async (selectedCourse: string) => {
		SET_COURSE(selectedCourse);
		SET_LOADING(true);

		if (selectedCourse) {
			try {
				const course = await getCourse(selectedCourse);
				reset({
					id: course.id,
					name: course.name,
					category: course.category,
					passingGrade: course.passingGrade,
					completeTime: course.completeTime,
					questionCategories: course.questionCategories,
					questions: course.questions,
					date: course.date,
				});

				SET_QUESTION_CATEGORIES(course.questionCategories);
			} catch (error) {
				console.error('Error fetching course details:', error);
				alert('Failed to fetch course details.');
			} finally {
				SET_LOADING(false);
			}
		} else {
			SET_LOADING(false);
		}
	};

	useEffect(() => {
		loadCourseTitles();
	}, [SET_LOADING]);

	const BUTTON_CLASSNAME = `
    ${styles.submitButton} 
    ${Object.keys(errors).length === 0 ? styles.valid : styles.invalid}
	`;

	if (LOADING) return <LoadingSpinner message='Getting courses!' />;

	return (
		<div className={styles.createFormContainer}>
			<h1 className={stylesUpdate.updateTitle}>Update Course</h1>
			<div>
				<div className={styles.formGroup}>
					<p>Select a course to modify</p>
					<COURSE_INPUT course={COURSE} courseTitles={COURSE_TITLES} onSelect={onSelect} />
				</div>
			</div>
			<form className={styles.createForm} onSubmit={handleSubmit((data) =>
				onSubmit(data)
			)}>
				<h2 className={stylesUpdate.detailTitle}>Course Details</h2>
				<COURSE_CATEGORY_INPUT register={register} errors={errors} disable={true} />

				<PG_CT_INPUT register={register} errors={errors} />

				<DATE_INPUT register={register} errors={errors} />

				<QUESTION_CATEGORY_INPUT
					questionCategories={QUESTION_CATEGORIES}
					setQuestionCategories={SET_QUESTION_CATEGORIES}
					handleRemoveCategory={handleRemoveCategory}
					handleAddCategory={handleAddCategory}
				/>

				<button
					type="button"
					onClick={() => SET_OPEN(true)}
					id='cy-update-course-btn'
					className={BUTTON_CLASSNAME}
				>
					Update Course
				</button>
				<MODAL open={OPEN} onClose={() => SET_OPEN(false)}>
					<div className={modal.modal} style={{ color: 'black' }}>
						<h1 className={modal.modalTitle} style={{ color: 'black' }}>Confirm Update</h1>
						<p className={modal.modalTxt}>Are you sure you want to update?</p>
						<p>{COURSE}</p>
						<button type="submit" className={modal.modalBtn}>Update</button>
					</div>
				</MODAL>
			</form>
			<MODAL open={OPEN_MESSAGE} onClose={() => SET_OPEN_MESSAGE(false)}>
				<div className={modal.modal} style={{ color: 'black' }}>
					<p>{MESSAGE}</p>
				</div>
			</MODAL>
		</div>
	);
};

export default UPDATE_FORM;
