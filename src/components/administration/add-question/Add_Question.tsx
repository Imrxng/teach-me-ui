import React, { useContext, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Course, Question, Type } from '../../../types';
import styles from './Add_Question.module.css';
import DATACONTEXT from '../../../context/DataContext';
import LoadingSpinner from '../../loader/LoadingSpinner';
import { addQuestion, getCourse } from '../../../ApiService';
import ADD_QUESTION_INPUT from './Add_Question_Input';
import ADD_TYPE_CATEGORY_INPUT from './Add_Type_Category_Input';
import ADD_ANSWER_INPUT from './Add_Answer_Input';
import ADD_REASON_INPUT from './Add_Reason_Input';
import MODAL from '../modal/Modal';
import modal from '../modal/Modal.module.css';
import { useParams } from 'react-router-dom';

const ADD_QUESTION = () => {
	const [QUESTION_OBJECT, SET_QUESION_OBJECT] = useState<Question>({
		question: '',
		type: '' as Type,
		category: '',
		answers: [{ answer: '', reason: '' }],
		questionAnswerResult: ['']
	});
	const [CONFIRMATION_MODAL, SET_CONFIRMATION_MODAL] = useState<boolean>(false);
	const [RESPONSE_MODAL, SET_RESPONSE_MODAL] = useState<boolean>(false);
	const [MESSAGE, SET_MESSAGE] = useState<string>('');
	const { LOADING, SET_LOADING } = useContext(DATACONTEXT);
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

	const LOAD_COURSE = async () => {
		try {
			SET_LOADING(true);
			const DATA = await getCourse(ID as string);
			SET_COURSE(DATA);
			reset({
				...DATA,
				category: ''
			});
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
		try {
			SET_LOADING(true);
			COURSE.questions.push(data);
			await addQuestion(COURSE);
			SET_MESSAGE(`"${data.question}" has been added`);
		} catch (error: unknown) {
			console.error(error);
			SET_MESSAGE(`Failed to add: "${data.question}". `);
		} finally {
			resetForm();
			SET_LOADING(false);
			SET_CONFIRMATION_MODAL(false);
			SET_RESPONSE_MODAL(true);
		}
	};

	const renderDeleteButton = (index: number) => {
		return index > 0 && (
			<button
				type="button"
				id='cy-add-question-delete-correct-answer-btn'
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
			<button
				type="button"
				id='cy-add-question-delete-answer-btn'
				className={styles.btnDelete}
				onClick={() => removeAnswer(index)}
			>
				Delete
			</button>
		);
	};

	const answersFieldAddButton = () => {
		return answerFields.length < 4 && (
			<button
				type="button"
				id='cy-add-question-add-answer-btn'
				className={styles.btnAdd}
				onClick={() => appendAnswer({ answer: '', reason: '' })}
			>
				Add Answer
			</button>
		);
	};

	const handleCorrectAnswer = () => {
		return selectedType === Type.Multi && (
			CORRECT_ANSWERS.length < answerFields.length && (
				<button
					type="button"
					id='cy-add-question-add-correct-answer-btn'
					className={styles.btnAdd}
					onClick={() => appendCorrectAnswer()}
				>
					Add Correct Answer
				</button>
			)
		);
	};

	if (LOADING) return <LoadingSpinner message='Getting Course / Adding Question!' />;

	return (
		<div className={styles.container}>
			<h1 className={styles.addQuesionTitle}>Add Question:<br/>{ID}</h1>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

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
								id={`cy-add-question-correct-answer-${index}`}
								className={styles.formControl}
								placeholder="Enter correct answer"
							/>
							{renderError(index)}
							{renderDeleteButton(index)}
						</div>
					))}
					{handleCorrectAnswer()}
				</div>

				<button
					type="button"
					onClick={() => {
						SET_QUESION_OBJECT(watch);
						SET_CONFIRMATION_MODAL(true);
					}}
					id='cy-add-question-btn'
					className={styles.btnAdd}
					disabled={answerFields.length < 2}
				>
					Add Question
				</button>
				<button
					type="button"
					id='cy-add-question-reset-btn'
					className={styles.btnReset}
					onClick={() => resetForm()}
				>
					Reset form
				</button>
				<MODAL open={CONFIRMATION_MODAL} onClose={() => SET_CONFIRMATION_MODAL(false)}>
					<div className={modal.modal} style={{ color: 'black' }}>
						<p className={modal.modalTitle} style={{ color: 'black' }}>Verify question</p>
						<p className={modal.modalTxt}>Are you sure you want to add this question?</p>
						<p>Question:</p>
						<p className={styles.modalTxt}>{QUESTION_OBJECT.question}</p>
						<p>Type:</p>
						<p className={styles.modalTxt}>{QUESTION_OBJECT.type}</p>
						<p>Category:</p>
						<p className={styles.modalTxt}>{QUESTION_OBJECT.category}</p>
						{QUESTION_OBJECT.answers.map((answer, id) =>
							<div key={id} style={{ display: 'flex', gap: '10px' }}>
								<div>
									<p>Possible answer {id + 1}:</p>
									<p className={styles.modalTxt}>{answer.answer}</p>
								</div>
								<div>
									<p>Possible reason {id + 1}:</p>
									<p className={styles.modalTxt}>{answer.reason}</p>
								</div>
							</div>
						)}
						<div style={{ display: 'flex', gap: '10px' }}>
							{QUESTION_OBJECT.questionAnswerResult.map((correctAnswer, id) =>
								<div key={id}>
									<p> Correct Answer {id + 1}:</p>
									<p className={styles.modalTxt}>{correctAnswer}</p>
								</div>
							)}
						</div>
						<button type="submit" id='cy-add-question-reset-btn-confirm' className={modal.actionBtn}>Confirm</button>
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

export default ADD_QUESTION;