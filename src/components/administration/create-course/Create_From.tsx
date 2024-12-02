import { useForm } from 'react-hook-form';
import styles from './Create_From.module.css';
import { Course } from '../../../types';
import { useContext, useState } from 'react';
import DATACONTEXT from '../../../context/DataContext';
import LoadingSpinner from '../../loader/LoadingSpinner';
import { addCourse } from '../../../ApiService';
import COURSE_CATEGORY_INPUT from './Course_Category_Input';
import PG_CT_INPUT from './PG_CT_Input';
import DATE_INPUT from './Date_Input';
import QUESTION_CATEGORY_INPUT from './Question_Category_Input';
import DOWNLOAD_TEMPLATE from '../download-template/Download_Template';

const CREATE_FORM = () => {
	const { LOADING, SET_LOADING } = useContext(DATACONTEXT);
	const [QUESTION_CATEGORIES, SET_QUESTION_CATEGORIES] = useState<string[]>(['']);
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
	
	const handleRemoveCategory = ( index: number,) => SET_QUESTION_CATEGORIES( QUESTION_CATEGORIES.filter((_, i) => i !== index));
	
	const uploadCourse = async (
		data: Course,
		questionCategories: string[],
		setLoading: (loading: boolean) => void,
		reset: () => void,
		setQuestionCategories: (categories: string[]) => void
	) => {
		data.questionCategories = questionCategories;
		setLoading(true);
		await addCourse(data);
		reset();
		setQuestionCategories(['']);
		setLoading(false);
		console.log(data);
	};

	const BUTTON_CLASSNAME = `
    ${styles.submitButton} 
    ${Object.keys(errors).length === 0 ? styles.valid : styles.invalid}
	`;

	if (LOADING) return <LoadingSpinner message='Adding course!' />;

	return (
		<div className={styles.createFormContainer} style={{ minWidth: '5rem' }}>
			<h1 className={styles.createTitle}>Create Course</h1>
			<DOWNLOAD_TEMPLATE />
			<form className={styles.createForm} onSubmit={handleSubmit((data) =>
				uploadCourse(data, QUESTION_CATEGORIES, SET_LOADING, reset, SET_QUESTION_CATEGORIES)
			)}>

				<COURSE_CATEGORY_INPUT register={register} errors={errors} disable={false}/>

				<PG_CT_INPUT register={register} errors={errors}/>

				<DATE_INPUT register={register} errors={errors}/>

				<QUESTION_CATEGORY_INPUT
					questionCategories={QUESTION_CATEGORIES}
					setQuestionCategories={SET_QUESTION_CATEGORIES}
					handleRemoveCategory={handleRemoveCategory}
					handleAddCategory={handleAddCategory}
				/>

				<button
					type="submit"
					id='cy-create-course-btn' 
					className={BUTTON_CLASSNAME}
				>
                    Create Course
				</button>
			</form>
		</div>
	);
};

export default CREATE_FORM;
