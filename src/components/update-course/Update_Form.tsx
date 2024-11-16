import { useForm, UseFormReset } from 'react-hook-form';
import './Update_Form.css';
import { Content } from '../../types';
import { useContext, useEffect, useState } from 'react';
import DATACONTEXT from '../../context/DataContext';
import LoadingSpinner from '../loader/LoadingSpinner';
import { fetchCourseTitles, getCourse, updateCourse } from '../../ApiService';

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

const loadCourseTitles = async (setLoading: (loading: boolean) => void,
	setCourseTitles: (titles: string[]) => void
) => {
	try {
		setLoading(true);
		const data = await fetchCourseTitles();
		setCourseTitles(data);
	} catch (error) {
		if (error instanceof Error) {
			console.log(`Error: ${error.message}`);
			alert('Failed to fetch course titles.');
		}
	} finally {
		setLoading(false);
	}
};

const onSubmit = async (
	data: Content,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setQuestionCategories: React.Dispatch<React.SetStateAction<string[]>>,
	questionCategories: string[],
	setCourse: React.Dispatch<React.SetStateAction<string>>,
	reset: UseFormReset<Content>
) => {
	const confirmation: boolean = confirm('Are you sure you want to update this course?');
	if (confirmation) {
		setLoading(true);
		data.questionCategories = questionCategories;
		await updateCourse(data);
		reset({
			id: new Date().getTime().toString(),
			name: '',
			category: '',
			passingGrade: 50,
			completeTime: 0,
			questionCategories: [''],
			questions: [],
			date: ''
		});
		setQuestionCategories(['']);
		setCourse('');
		setLoading(false);
		console.log(data);
	}
};

const onSelect = async (
	selectedCourse: string,
	setCourse: React.Dispatch<React.SetStateAction<string>>,
	setLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setQuestionCategories: React.Dispatch<React.SetStateAction<string[]>>,
	reset: UseFormReset<Content>
) => {
	setCourse(selectedCourse);
	setLoading(true); 

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

			setQuestionCategories(course.questionCategories);
		} catch (error) {
			console.error('Error fetching course details:', error);
			alert('Failed to fetch course details.');
		} finally {
			setLoading(false); 
		}
	} else {
		setLoading(false); 
	}
};

const UPDATE_FORM = () => {
	const { LOADING, SET_LOADING } = useContext(DATACONTEXT);
	const [QUESTION_CATEGORIES, SET_QUESTION_CATEGORIES] = useState<string[]>(['']);
	const [COURSE_TITLES, SET_COURSE_TITLES] = useState<string[]>([]);
	const [COURSE, SET_COURSE] = useState('');
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

	useEffect(() => {
		loadCourseTitles(SET_LOADING, SET_COURSE_TITLES);
	}, [SET_LOADING]);

	if (LOADING) return <LoadingSpinner message='Getting courses!' />;

	return (
		<div className="create-form-container update-form-container">
			<div>
				<div className="form-group">
					<h1 className="header">Choose Course</h1>
					<label>Course</label>
					<select
						className="form-control"
						value={COURSE}
						onChange={(e) => onSelect(e.target.value, SET_COURSE, SET_LOADING, SET_QUESTION_CATEGORIES, reset)}
						required
					>
						<option value="">--SELECT COURSE--</option>
						{COURSE_TITLES.map((course, index) => <option key={index} value={course}>{course}</option>)}
					</select>
					{COURSE === '' && <div className="error">Course is required</div>}
				</div>
			</div>
			<form className="create-form" onSubmit={handleSubmit((data) =>
				onSubmit(data, SET_LOADING, SET_QUESTION_CATEGORIES, QUESTION_CATEGORIES, SET_COURSE, reset)
			)}>
				<h1 className="form-title">Create Course</h1>
				<div style={{ display: 'flex', gap: '2rem' }}>
					<div className="form-group">
						<label className="form-label">Course</label>
						<input
							{...register('name', { required: 'Course title is required' })}
							className="form-input"
							placeholder="Enter course title"
							disabled
						/>
						{errors.name && <div className="error-message">{errors.name.message}</div>}
					</div>

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

				<div className="form-group">
					<label className="form-label">Date</label>
					<input
						type="date"
						{...register('date', {
							required: 'Date is required'
						})}
						className="form-input"
					/>
					{errors.completeTime && <div className="error-message">{errors.completeTime.message}</div>}
				</div>

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

				<button
					type="submit"
					className={`submit-button ${Object.keys(errors).length === 0 ? 'valid' : 'invalid'}`}
				>
                    Update Course
				</button>
			</form>
		</div>
	);
};

export default UPDATE_FORM;
