import React, { useContext, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Course, Question, Type } from '../../types';
import styles from './Add_Question.module.css';
import DATACONTEXT from '../../context/DataContext';
import LoadingSpinner from '../loader/LoadingSpinner';
import { addQuestion, fetchCourseTitles, getCourse } from '../../ApiService';
import ADD_COURSE_INPUT from './Add_Course_Input';
import ADD_QUESTION_INPUT from './Add_Question_Input';
import ADD_TYPE_CATEGORY_INPUT from './Add_Type_Category_Input';
import ADD_ANSWER_INPUT from './Add_Answer_Input';
import ADD_REASON_INPUT from './Add_Reason_Input';

const ADD_QUESTION = () => {
	const { LOADING, SET_LOADING } = useContext(DATACONTEXT);
	const [COURSE_TITLES, SET_COURSE_TITLES] = useState<string[]>([]);
	const [COURSE, SET_COURSE] = useState('');
	const [selectedType, setSelectedType] = useState<Type>(Type.Single);
	const [CORRECT_ANSWERS, SET_CORRECT_ANSWERS] = useState<string[]>(['']);
	const {
		control,
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			question: '',
			type: '' as Type,
			category: '',
			answers: [{ answer: '', reason: '' }],
			questionAnswerResult: [''],
		},
	});

	const { fields: answerFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
		control,
		name: 'answers',
	});

	const appendCorrectAnswer = () => SET_CORRECT_ANSWERS([...CORRECT_ANSWERS, '']);

	const removeCorrectAnswer = (index: number) => SET_CORRECT_ANSWERS(CORRECT_ANSWERS.filter((_, i) => i !== index));

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

	useEffect(() => {
		loadCourseTitles();
	}, [SET_LOADING]);

	const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newType = e.target.value as Type;
		setSelectedType(newType);
	
		if (newType === 'single') {
			SET_CORRECT_ANSWERS(['']); 
			reset({
				...watch(),
				type: newType,
				questionAnswerResult: [''],
			});
		} else {
			reset({
				...watch(),
				type: newType,
				questionAnswerResult: watch('questionAnswerResult'),
			});
		}
	};

	const resetForm = () => {
		reset({
			question: '',
			type: '' as Type,
			category: '',
			answers: [{ answer: '', reason: '' }],
			questionAnswerResult: [''],
		});
	};

	const onSubmit = async (data: Question) => {
		SET_LOADING(true);
		const course: Course = await getCourse(COURSE);
		course.questions.push(data);
		await addQuestion(course);
		resetForm();
		SET_LOADING(false);
	};

	const renderDeleteButton = (index: number) => {
		return index > 0 && (
			<button
				type="button"
				className={styles.btnDelete}
				onClick={() => removeCorrectAnswer(index)}
			>
				Delete
			</button>
		);
	};

	const renderError = (index: number) => {
		return errors.questionAnswerResult?.[index] && (
			<div className={styles.errorMessage}>Correct answer is required</div>
		);
	};

	const answerFieldDeleteButton = (index: number) => {
		return index > 0 && (
			<button type="button" className={styles.btnDelete} onClick={() => removeAnswer(index)}>
				Delete
			</button>
		);
	};

	const answersFieldAddButton = () => {
		return answerFields.length < 4 && (
			<button type="button" className={styles.btnAdd} onClick={() => appendAnswer({ answer: '', reason: '' })}>
				Add Answer
			</button>
		);
	};

	const handleCorrectAnswer = () => {
		return selectedType === Type.Multi && (
			CORRECT_ANSWERS.length < answerFields.length && (
				<button
					type="button"
					className={styles.btnAdd}
					onClick={() => appendCorrectAnswer()}
				>
					Add Correct Answer
				</button>
			)
		);
	};

	if (LOADING) return <LoadingSpinner message='Adding course!' />;

	return (
		<div className={styles.container}>
			<h1 className={styles.addQuesionTitle}>Add Question</h1>
			<div className={styles.formGroup}>
				<label>Select a course to add the question to</label>
				<ADD_COURSE_INPUT course={COURSE} setCourse={SET_COURSE} courseTitles={COURSE_TITLES} />
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h2 className={styles.header}>Question Form</h2>

				<ADD_QUESTION_INPUT register={register} errors={errors} />

				<ADD_TYPE_CATEGORY_INPUT register={register} errors={errors} handleTypeChange={handleTypeChange} />

				<div>
					<h5 className={styles.subTitle}>Possible Answers</h5>
					{answerFields.map((field, index) => (
						<div key={field.id} className={styles.answerSection}>

							<ADD_ANSWER_INPUT register={register} errors={errors} index={index} />

							<ADD_REASON_INPUT register={register} errors={errors} index={index} />

							{answerFieldDeleteButton(index)}
						</div>
					))}
					{answersFieldAddButton()}
				</div>

				<div>
					<h5 className={styles.subTitle}>Correct Answer(s)</h5>
					{CORRECT_ANSWERS.map((_, index) => (
						<div key={index} className={styles.answerSection}>
							<label>Correct Answer {index + 1}</label>
							<input
								{...register(`questionAnswerResult.${index}`, { required: true })}
								className={styles.formControl}
								placeholder="Enter correct answer"
							/>
							{renderError(index)}
							{renderDeleteButton(index)}
						</div>
					))}
					{handleCorrectAnswer()}
				</div>

				<button type="submit" className={styles.btnSubmit} disabled={answerFields.length < 2 || COURSE === ''}>
					Add Question
				</button>
				<button type="button" className={styles.btnReset} onClick={() => resetForm()}>
					Reset form
				</button>
			</form>
		</div>
	);
};

export default ADD_QUESTION;