import { useForm } from 'react-hook-form';
import './Create_From.css';
import { Content } from '../../types';
import { useContext, useState } from 'react';
import DATACONTEXT from '../../context/DataContext';
import LoadingSpinner from '../loader/LoadingSpinner';
import { addCourse } from '../../ApiService';

const handleAddCategory = (
	questionCategories: string[], 
	setQuestionCategories: React.Dispatch<React.SetStateAction<string[]>>
) => setQuestionCategories([...questionCategories, '']);

const handleRemoveCategory = (
	index: number,
	questionCategories: string[],
	setQuestionCategories: React.Dispatch<React.SetStateAction<string[]>> 
) => setQuestionCategories(
	questionCategories.filter((_, i) => i !== index)
);

const uploadCourse = async (
	data: Content,
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

const CREATE_FORM = () => {
	const { LOADING, SET_LOADING } = useContext(DATACONTEXT);
	const [QUESTION_CATEGORIES, SET_QUESTION_CATEGORIES] = useState<string[]>(['']);
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Content>({
		defaultValues: {
			id: new Date().getTime().toString(),
			name: '',
			category: '',
			passingGrade: 50,
			completeTime: 0,
			questionCategories: [''],
			questions: [],
			date: ''
		},
	});

	if (LOADING) return <LoadingSpinner message='Adding course!' />;

	return (
		<div className="create-form-container" style={{ minWidth: '5rem' }}>
			<h1 className="form-title">Create Course</h1>
			<form className="create-form" onSubmit={handleSubmit((data) =>
				uploadCourse(data, QUESTION_CATEGORIES, SET_LOADING, reset, SET_QUESTION_CATEGORIES)
			)}>

				<div style={{ display: 'flex', gap: '2rem' }}>
					{/* Course title input */}
					<div className="form-group">
						<label className="form-label">Course</label>
						<input
							{...register('name', { required: 'Course title is required' })}
							className="form-input"
							placeholder="Enter course title"
						/>
						{errors.name && <div className="error-message">{errors.name.message}</div>}
					</div>

					{/* Category input */}
					<div className="form-group">
						<label className="form-label">Category</label>
						<input
							{...register('category', { required: 'Category is required' })}
							className="form-input"
							placeholder="Enter category"
						/>
						{errors.category && <div className="error-message">{errors.category.message}</div>}
					</div>
				</div>

				<div style={{ display: 'flex', gap: '2rem' }}>
					{/* PassingGrade input */}
					<div className="form-group">
						<label className="form-label">Passing Grade</label>
						<input
							type="number"
							{...register('passingGrade', {
								required: 'Passing grade is required',
								min: { value: 50, message: 'Passing grade must be between 50 and 100' },
								max: { value: 100, message: 'Passing grade must be between 50 and 100' },
							})}
							className="form-input"
							placeholder="Enter passing grade"
						/>
						{errors.passingGrade && <div className="error-message">{errors.passingGrade.message}</div>}
					</div>

					{/* CompleteTime input */}
					<div className="form-group">
						<label className="form-label">Complete Time</label>
						<input
							type="number"
							{...register('completeTime', {
								required: 'Complete time is required',
								min: { value: 0, message: 'Complete time must be between 0 and 120' },
								max: { value: 120, message: 'Complete time must be between 0 and 120' },
							})}
							className="form-input"
							placeholder="Enter complete time"
						/>
						{errors.completeTime && <div className="error-message">{errors.completeTime.message}</div>}
					</div>
				</div>

				{/* Date input */}
				<div className="form-group">
					<label className="form-label">Date</label>
					<input
						type="date"
						{...register('date', {
							required: 'Complete time is required'
						})}
						className="form-input"
						placeholder="Enter complete time"
					/>
					{errors.completeTime && <div className="error-message">{errors.completeTime.message}</div>}
				</div>

				{/* Question Categories */}
				<div className="question-categories">
					<h5 className="question-categories-title">Question Categor(y)(ies)</h5>
					{QUESTION_CATEGORIES.map((category, index) => (
						<div key={index} style={{ display: 'flex', flexDirection: 'row' }}>
							<div className="question-category-item">
								<label className="form-label">Question Category {index + 1}</label>
								<input
									value={category}
									onChange={(e) => {
										const newCategories = [...QUESTION_CATEGORIES];
										newCategories[index] = e.target.value;
										SET_QUESTION_CATEGORIES(newCategories);
									}}
									className="form-input"
									placeholder="Enter question category"
									required
								/>
								<button
									type="button"
									onClick={() => handleRemoveCategory(index, QUESTION_CATEGORIES, SET_QUESTION_CATEGORIES)}
									className="delete-category-button"
								>
                                    Delete
								</button>
							</div>
						</div>
					))}

					<button
						type="button"
						onClick={() => handleAddCategory(QUESTION_CATEGORIES, SET_QUESTION_CATEGORIES)}
						className="add-category-button"
					>
                        Add Question Category
					</button>
				</div>

				{/* Submit form button */}
				<button
					type="submit"
					className={`submit-button ${Object.keys(errors).length === 0 ? 'valid' : 'invalid'}`}
				>
                    Add Questions
				</button>
			</form>
		</div>
	);
};

export default CREATE_FORM;
