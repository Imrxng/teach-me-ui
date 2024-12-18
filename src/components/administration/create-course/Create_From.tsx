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
import MODAL from '../modal/Modal';
import modal from '../modal/Modal.module.css';
import { useNavigate } from 'react-router-dom';

const CREATE_FORM = () => {
	const [RESPONSE_MODAL, SET_RESPONSE_MODAL] = useState<boolean>(false);
	const [MESSAGE, SET_MESSAGE] = useState<string>('');
	const [COURSE_TITLE, SET_COURSE_TITLE] = useState<string>('');
	const navigate = useNavigate();
	const { LOADING, SET_LOADING, DARKMODE } = useContext(DATACONTEXT);
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
	
	const uploadCourse = async (data: Course) => {
		try {
			SET_LOADING(true);
			data.questionCategories = QUESTION_CATEGORIES;
			const RESPONE_MESSAGE = await addCourse(data);;
			SET_COURSE_TITLE(data.name);
			SET_MESSAGE(RESPONE_MESSAGE);
		} catch (error: unknown) {
			console.error(error);
			SET_MESSAGE(`Failed to add ${data.name}. Please try again.`); 
		} finally {
			reset();
			SET_QUESTION_CATEGORIES(['']);
			SET_LOADING(false);
			SET_RESPONSE_MODAL(true);
		}
	};

	const BUTTON_CLASSNAME = `
    ${styles.submitButton} 
    ${Object.keys(errors).length === 0 ? styles.valid : styles.invalid}
	`;
	const lightModeStyle = () => {
		return `${!DARKMODE ? styles.lightMode : ''}`;
	};

	if (LOADING) return <LoadingSpinner message='Adding course!' />;

	return (
		<div className={`${lightModeStyle()} ${styles.createFormContainer}`} style={{ minWidth: '5rem' }}>
			<h1 className={styles.createTitle}>Create Course</h1>
			<form className={styles.createForm} onSubmit={handleSubmit((data) =>
				uploadCourse(data)
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
			<MODAL open={RESPONSE_MODAL} onClose={() => SET_RESPONSE_MODAL(false)}>
				<div className={modal.responseModal} style={{ color: 'black' }}>
					<p>{MESSAGE}</p>
					<button id='cy-create-course-add-questions-btn' className='mainButton' onClick={() => navigate(`/settings/add-question/${COURSE_TITLE}`)}>Add Questions</button>
				</div>
			</MODAL>
		</div>
	);
};

export default CREATE_FORM;
