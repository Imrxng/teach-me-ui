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

interface Answer {
	id: number;
	answer: string;
	reason: string;
};

const ADD_QUESTION = () => {
	const [SELECTED_TYPE, SET_SELECTED_TYPE] = useState<Type>(Type.Single);
	const [CONFIRMATION_MODAL, SET_CONFIRMATION_MODAL] = useState<boolean>(false);
	const [RESPONSE_MODAL, SET_RESPONSE_MODAL] = useState<boolean>(false);
	const [MESSAGE, SET_MESSAGE] = useState<string>('');
	const { LOADING, SET_LOADING, DARKMODE } = useContext(DATACONTEXT);
	// const [CORRECT_ANSWERS, SET_CORRECT_ANSWERS] = useState<string[]>([]);
	const [CORRECT_ANSWERS, SET_CORRECT_ANSWERS] = useState<Answer[]>([]);
	const { ID } = useParams();

	const [COURSE, SET_COURSE] = useState<Course>({
		id: '',
		name: '',
		category: '',
		passingGrade: 0,
		completeTime: 0,
		questionCategories: [''],
		questions: [],
		date: ''
	});

	const [QUESTION_OBJECT, SET_QUESION_OBJECT] = useState<Question>({
		question: '',
		type: SELECTED_TYPE,
		category: '',
		answers: [{ answer: '', reason: '' }],
		questionAnswerResult: ['']
	});

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
			type: SELECTED_TYPE,
			category: '',
			answers: [{ id: Date.now(), answer: '', reason: '' }],
			questionAnswerResult: [''],
		},
	});

	const { fields: answerFields, append: appendAnswer, remove: removeAnswer } = useFieldArray({
		control,
		name: 'answers',
	});

	const loadCourse = async () => {
		try {
			SET_LOADING(true);
			const DATA = await getCourse(ID as string);
			SET_COURSE(DATA);
			reset({
				question: '',
				type: SELECTED_TYPE,
				category: '',
				answers: [{ id: Date.now(), answer: '', reason: '' }],
				questionAnswerResult: [''],
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
		loadCourse();
	}, []);

	const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const CURRENT_TYPE = e.target.value as Type;
		SET_SELECTED_TYPE(CURRENT_TYPE);
		SET_CORRECT_ANSWERS([]);
		reset({
			...watch(),
			type: CURRENT_TYPE
		});
	};

	const resetForm = () => {
		reset({
			question: '',
			type: Type.Single as Type,
			category: '',
			answers: [{ answer: '', reason: '' }],
			questionAnswerResult: [''],
		});
		SET_CORRECT_ANSWERS([]);
		SET_SELECTED_TYPE(Type.Single);
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

	const answerFieldDeleteButton = (index: number) => {
		return index > 0 && (
			<button
				type="button"
				id='cy-add-question-delete-answer-btn'
				className={styles.btnDelete}
				onClick={() => {
					const answerToDelete = watch(`answers.${index}`);
					SET_CORRECT_ANSWERS((prev) =>
						prev.filter((answer) => answer.id !== answerToDelete.id)
					);
					removeAnswer(index);
				}}
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
				onClick={() => appendAnswer({ id: Date.now(), answer: '', reason: '' })}
			>
				Add Answer
			</button>
		);
	};

	const handleSingleCheckBox = (
		event: React.ChangeEvent<HTMLInputElement>,
		answerObject: Answer
	): void => {
		const updatedCorrectAnswers = event.target.checked ? [answerObject] : [];
		SET_CORRECT_ANSWERS(updatedCorrectAnswers);
	};

	const handleMultiCheckBox = (
		event: React.ChangeEvent<HTMLInputElement>,
		answerObject: Answer
	): void => {
		const UPDATED_CORRECT_ANSWER = event.target.checked
			? [...CORRECT_ANSWERS, answerObject]
			: CORRECT_ANSWERS.filter((answer) => answer.id !== answerObject.id);

		SET_CORRECT_ANSWERS(UPDATED_CORRECT_ANSWER);
	};

	const handleCheckboxChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		index: number
	): void => {
		const ANSWER_OBJECT: Answer = watch(`answers.${index}`) as Answer;

		if (SELECTED_TYPE === Type.Single) {
			handleSingleCheckBox(event, ANSWER_OBJECT);
		} else if (SELECTED_TYPE === Type.Multi) {
			handleMultiCheckBox(event, ANSWER_OBJECT);
		}
	};

	const checkForDuplicateAnswers = (correctAnswers: Answer[]): boolean => {
		const double = new Set();
		for (const answer of correctAnswers) {
			if (double.has(answer.answer)) {
				SET_RESPONSE_MODAL(true);
				SET_MESSAGE('You have a duplicate answer');
				return true;
			}
			double.add(answer.answer);
		}
		return false;
	};

	const isCorrectAnswersEmpty = (correctAnswers: Answer[]): boolean => {
		return !correctAnswers || correctAnswers.length === 0;
	};

	const isAnyValidAnswer = (correctAnswers: Answer[]): boolean => {
		return correctAnswers.some(answer => answer);
	};

	const validateCorrectAnswers = (correctAnswers: Answer[]): boolean => {
		if (isCorrectAnswersEmpty(correctAnswers)) {
			SET_RESPONSE_MODAL(true);
			SET_MESSAGE('You have to pick a correct answer');
			return false;
		}

		if (!isAnyValidAnswer(correctAnswers)) {
			SET_RESPONSE_MODAL(true);
			SET_MESSAGE('You have to pick a correct answer');
			return false;
		}

		return true;
	};

	const handleFormSubmission = (correctAnswers: Answer[]): void => {
		reset({
			...watch(),
			questionAnswerResult: correctAnswers.map(correctAnswer => correctAnswer.answer)
		});
		const currentAnswers = watch('answers');
		const updatedCorrectAnswers = correctAnswers.filter(correctAnswer =>
			currentAnswers.some(answer => answer.answer === correctAnswer.answer)
		);

		SET_CORRECT_ANSWERS(updatedCorrectAnswers);
		SET_QUESION_OBJECT({
			...watch(),
			questionAnswerResult: updatedCorrectAnswers.map(correctAnswer => correctAnswer.answer),
			answers: [...watch('answers')]
		});
		SET_CONFIRMATION_MODAL(true);
	};

	const handleAddQuestionBtn = () => {

		if (checkForDuplicateAnswers(CORRECT_ANSWERS)) {
			return;
		}

		if (!validateCorrectAnswers(CORRECT_ANSWERS)) {
			return;
		}

		handleFormSubmission(CORRECT_ANSWERS);
	};

	useEffect(() => {
		const answers = watch('answers');
		const validCorrectAnswers = CORRECT_ANSWERS.filter((correctAnswer) =>
			answers.some((answer: Answer) => answer.id === correctAnswer.id)
		);

		const updatedCorrectAnswers = validCorrectAnswers.map((correctAnswer) => {
			const matchingAnswer = answers.find((answer: Answer) => answer.id === correctAnswer.id);
			return matchingAnswer || correctAnswer;
		});

		SET_CORRECT_ANSWERS(updatedCorrectAnswers);
	}, [watch('answers')]);

	useEffect(() => {
		reset({
			...watch(),
			type: SELECTED_TYPE,
		});
	}, [SELECTED_TYPE]);

	const lightModeStyle = () => {
		return `${!DARKMODE ? styles.lightMode : ''}`;
	};

	if (LOADING) return <LoadingSpinner message='Getting Course / Adding Question!' />;

	return (
		<div className={`${lightModeStyle()} ${styles.container}`}>
			<h1 className={styles.addQuesionTitle}>Add Question:<br />{ID}</h1>

			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

				<ADD_QUESTION_INPUT register={register} errors={errors} />

				<ADD_TYPE_CATEGORY_INPUT register={register} errors={errors} selectedType={SELECTED_TYPE} handleTypeChange={handleTypeChange} />

				<div>
					<h5 className={styles.subTitle}>Possible Answers</h5>
					{answerFields.map((field, index) => (
						<div key={field.id} className={styles.answerSection}>

							<ADD_ANSWER_INPUT register={register} errors={errors} index={index} />

							<ADD_REASON_INPUT register={register} errors={errors} index={index} />

							<div>
								<label>Correct answer?</label>
								<input
									id={`cy-add-question-correct-answer-checkbox-${index}`}
									type="checkbox"
									className={styles.AddQuestionCheckbox}
									checked={CORRECT_ANSWERS.some((answer) => answer.id === watch(`answers.${index}`).id)}
									onChange={(event) => handleCheckboxChange(event, index)}
								/>
							</div>

							{answerFieldDeleteButton(index)}
						</div>
					))}
					{answersFieldAddButton()}
				</div>

				<button
					type="button"
					onClick={() => handleAddQuestionBtn()}
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
					<div className={modal.modal}>
						<p className={modal.modalTitle}>Verify question</p>
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