import React, { useContext, useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Course, Question, Type } from '../../types';
import './Add_Question.css';
import DATACONTEXT from '../../context/DataContext';
import LoadingSpinner from '../loader/LoadingSpinner';
import { addQuestion, fetchCourseTitles, getCourse } from '../../ApiService';

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
			type: '',
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
		console.log(newType);
		if (e.target.value === 'single') {
			reset({
				...watch(),
				type: newType,
				questionAnswerResult: newType === 'single' ? [''] : watch('questionAnswerResult')
			});
		}
	};

	const resetForm = () => {
		reset({
			question: '',
			type: Type.Single,
			category: '',
			answers: [{ answer: '', reason: '' }],
			questionAnswerResult: [''],
		});
	};

	const onSubmit = async (data: any) => {
		data as Question;
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
				className="btn-delete"
				onClick={() => removeCorrectAnswer(index)}
		  >
			Delete
		  </button>
		);
	  };
	  
	  const renderError = (index: number) => {
		return errors.questionAnswerResult?.[index] && (
		  <div className="error">Correct answer is required</div>
		);
	  };

	if (LOADING) return <LoadingSpinner message='Adding course!' />;

	return (
		<div className="container">
			<div className="form-group">
			    <h1 className="header">Choose Course</h1>
				<label>Course</label>
				<select
					className="form-control"
					value={COURSE}
					onChange={(e) => SET_COURSE(e.target.value)}
					required
				>
					<option value="">--SELECT COURSE--</option>
					{COURSE_TITLES.map((course, index) => <option key={index} value={course}>{course}</option>)}
				</select>
				{COURSE === '' && <div className="error">Course is required</div>}
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="form">
				<h1 className="header">Question Form</h1>

				<div className="form-group">
					<label>Question</label>
					<input
						{...register('question', { required: true })}
						className="form-control"
						placeholder="Enter question"
					/>
					{errors.question && <div className="error">Question is required</div>}
				</div>

				<div className="row">
					<div className="form-group">
						<label>Type</label>
						<select {...register('type', { required: true })} className="form-control" onChange={handleTypeChange}>
							<option value="">-- SELECT TYPE --</option>
							<option value={Type.Single}>Single</option>
							<option value={Type.Multi}>Multiple</option>
						</select>
						{errors.type && <div className="error">Type is required</div>}
					</div>

					<div className="form-group">
						<label>Category</label>
						<input
							{...register('category', { required: true })}
							className="form-control"
							placeholder="Enter question category"
						/>
						{errors.category && <div className="error">Category is required</div>}
					</div>
				</div>

				<div>
					<h5>Possible Answers</h5>
					{answerFields.map((field, index) => (
						<div key={field.id} className="answer-section">
							<div className="form-group">
								<label>Answer</label>
								<input
									{...register(`answers.${index}.answer`, { required: true })}
									className="form-control"
									placeholder="Enter answer"
								/>
								{errors.answers?.[index]?.answer && <div className="error">Answer is required</div>}
							</div>

							<div className="form-group">
								<label>Reason</label>
								<input
									{...register(`answers.${index}.reason`, { required: true })}
									className="form-control"
									placeholder="Enter reason"
								/>
								{errors.answers?.[index]?.reason && <div className="error">Reason is required</div>}
							</div>

							{index > 0 && (
								<button type="button" className="btn-delete" onClick={() => removeAnswer(index)}>
                                    Delete
								</button>
							)}
						</div>
					))}
					{answerFields.length < 4 && (
						<button type="button" className="btn-add" onClick={() => appendAnswer({ answer: '', reason: '' })}>
                            Add Answer
						</button>
					)}
				</div>

				<div>
					{selectedType === 'single' ? <h5>Correct Answer</h5> : <h5>Correct Answers</h5>}
					{CORRECT_ANSWERS.map((_, index) => (
						<div key={index} className="answer-section">
							<label>Correct Answer {index + 1}</label>
							<input
								{...register(`questionAnswerResult.${index}`, { required: true })}
								className="form-control"
								placeholder="Enter correct answer"
							/>
							{renderError(index)}
							{renderDeleteButton(index)}
						</div>
					))}
					{selectedType === Type.Multi && (
						CORRECT_ANSWERS.length < answerFields.length && (
							<button
								type="button"
								className="btn-add"
								onClick={() => appendCorrectAnswer()}
							>
                            Add Correct Answer
							</button>
						)
					)}
				</div>

				<button type="submit" className="btn-submit" disabled={answerFields.length < 2 || COURSE === ''}>
                    Add Question
				</button>
				<button type="button" className="btn-reset" onClick={() => resetForm()}>
                    Reset form
				</button>
			</form>
		</div>
	);
};

export default ADD_QUESTION;
