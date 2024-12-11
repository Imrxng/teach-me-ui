import { useForm } from 'react-hook-form';
import stylesUpdate from './Update_Form.module.css';
import styles from '../create-course/Create_From.module.css';
import { Course } from '../../../types';
import { useContext, useEffect, useState } from 'react';
import DATACONTEXT from '../../../context/DataContext';
import LoadingSpinner from '../../loader/LoadingSpinner';
import { getCourse, updateCourse } from '../../../ApiService';
import COURSE_CATEGORY_INPUT from '../create-course/Course_Category_Input';
import DATE_INPUT from '../create-course/Date_Input';
import PG_CT_INPUT from '../create-course/PG_CT_Input';
import QUESTION_CATEGORY_INPUT from '../create-course/Question_Category_Input';
import modal from '../modal/Modal.module.css';
import MODAL from '../modal/Modal';
import { useParams } from 'react-router-dom';

const UPDATE_FORM = () => {
	const [CONFIRMATION_MODAL, SET_CONFIRMATION_MODAL] = useState<boolean>(false);
	const [RESPONSE_MODAL, SET_RESPONSE_MODAL] = useState<boolean>(false);
	const [MESSAGE, SET_MESSAGE] = useState<string>('');
	const { LOADING, SET_LOADING } = useContext(DATACONTEXT);
	const [QUESTION_CATEGORIES, SET_QUESTION_CATEGORIES] = useState<string[]>(['']);
	const [COURSE, SET_COURSE] = useState<Course>({
		id:                 '',
		name:               '',
		category:           '',
		passingGrade:       0,
		completeTime:       0,
		questionCategories: [''],
		questions:          [],
		date:               ''
	});
	const { ID } = useParams();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Course>({
		defaultValues: {
			id: COURSE.id,
			name: COURSE.name,
			category: COURSE.category,
			passingGrade: COURSE.passingGrade,
			completeTime: COURSE.completeTime,
			questionCategories: COURSE.questionCategories,
			questions: COURSE.questions,
			date: COURSE.date
		},
	});

	const handleAddCategory = () => SET_QUESTION_CATEGORIES([...QUESTION_CATEGORIES, '']);

	const handleRemoveCategory = (index: number) => SET_QUESTION_CATEGORIES(QUESTION_CATEGORIES.filter((_, i) => i !== index));

	const onSubmit = async (data: Course) => {
		try {
			SET_LOADING(true);
			data.questionCategories = QUESTION_CATEGORIES;
			const RESPONE_MESSAGE = await updateCourse(data);
			SET_MESSAGE(RESPONE_MESSAGE);
		} catch (error: unknown) {
			console.error(error);
			SET_MESSAGE(`Failed to update ${data.name}. Please try again.`); 
		} finally {
			SET_LOADING(false);
			SET_CONFIRMATION_MODAL(false); 
			SET_RESPONSE_MODAL(true);
		}
	};

	const LOAD_COURSE = async () => {
		try {
			SET_LOADING(true);
			const DATA = await getCourse(ID as string);
			SET_COURSE(DATA);
			reset(DATA);
			SET_QUESTION_CATEGORIES(DATA.questionCategories);
		} catch (error: unknown) {
			SET_MESSAGE(`Failed to load course: ${ID}`);
			SET_RESPONSE_MODAL(true);
			console.error(`ERROR: ${error}`);
		} finally {
			SET_LOADING(false);
		}
	};

	useEffect(() => {
		LOAD_COURSE();
	}, []);

	const BUTTON_CLASSNAME = `
    ${styles.submitButton} 
    ${Object.keys(errors).length === 0 ? styles.valid : styles.invalid}
	`;

	if (LOADING) return <LoadingSpinner message={`Loading ${ID} data!`} />;

	return (
		<div className={styles.createFormContainer}>
			<h1 className={stylesUpdate.updateTitle}>Edit Course:<br/>{ID}</h1>
			<form className={styles.createForm} onSubmit={handleSubmit((data) =>
				onSubmit(data)
			)}>
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
					onClick={() => SET_CONFIRMATION_MODAL(true)}
					id='cy-update-course-btn'
					className={BUTTON_CLASSNAME}
				>
					Update Course
				</button>
				<MODAL open={CONFIRMATION_MODAL} onClose={() => SET_CONFIRMATION_MODAL(false)}>
					<div className={modal.modal} style={{ color: 'black' }}>
						<p className={modal.modalTitle} style={{ color: 'black' }}>Confirm Update</p>
						<p className={modal.modalTxt}>Are you sure you want to update?</p>
						<p>{COURSE.name}</p>
						<button type="submit" id='cy-update-course-btn-confirm' className={modal.actionBtn}>Update</button>
					</div>
				</MODAL>
			</form>
			<MODAL open={RESPONSE_MODAL} onClose={() => SET_RESPONSE_MODAL(false)}>
				<div className={modal.responseModal} style={{ color: 'black' }}>
					<p>{MESSAGE}</p>
				</div>
			</MODAL>
		</div>
	);
};

export default UPDATE_FORM;