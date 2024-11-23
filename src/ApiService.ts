import { Course, RootObject, User } from './types';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

export const fetchCourseTitles = async (): Promise<string[]> => {
	try {
		const response = await fetch(`${BASE_URL}/get-course-titles`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch course titles:', error);
		throw new Error('Failed to fetch course titles. Please try again.');
	}
};

export const deleteCourse = async (course: string) => {

	try {
		const response = await fetch(`${BASE_URL}/delete-course/${course}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			alert(`${course} has been deleted successfully!`);
		} else throw new Error(`Failed to delete course ${course}`);
	}
	catch (error) {
		handleError(error,'Error deleting course. Please try again.');
	}
};

const handleError = (error: unknown, errorMessage: string): void => {
	if (error instanceof Error) {
		console.error('error: '+error.message);
		alert(errorMessage);
	}
};

export const addCourse = async (course: Course) => {
	try {
		const response = await fetch(`${BASE_URL}/create-course`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(course),
		});

		if (response.ok) {
			alert(`${course.name}, has been created successfully!`);
		} else throw new Error(`Failed to create course: ${course}`);
	} catch (error) {
		handleError(error, 'Failed to add course. Please try again.');
	}
};

export const getCourse = async (course: string): Promise<Course> => {
	let data: Course = {
		id: '',
		name: '',
		category: '',
		passingGrade: 0,
		completeTime: 0,
		questionCategories: [],
		questions: [],
		date: ''
	};
	try {
		const response = await fetch(`${BASE_URL}/get-course/${course}`);
		const json: RootObject = await response.json();
		data = json.content;
		if(!response.ok) throw new Error('');
	} catch (error) {
		handleError(error, 'Failed to get course');
	}
	return data;
};

export const updateCourse = async (data: Course) => {
	try {
		const response = await fetch(`${BASE_URL}/modify-course`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`Error: failed to update: ${data.name}`);
		}
		alert(`${data.name}, has been updated successfully`);
	} catch (error) {
		handleError(error, 'Failed to update course. Please try again.');
	}
};

export const addQuestion = async (data: Course) => {
	try {
		const response = await fetch(`${BASE_URL}/modify-course`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`Error: failed to update: ${data.name}`);
		}
		alert(`${data.name}, has been updated successfully`);
	} catch (error) {
		handleError(error, 'Failed to add question. Please try again.');
	}
};

export const createUser = async (user: User) => {
	try {
		const response = await fetch(`${BASE_URL}/add-user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (response.ok) {
			alert(`${user.username}, has been created successfully!`);
		} else throw new Error(`Failed to create user: ${user.username}`);
	} catch (error) {
		handleError(error, 'Failed to create user. Please try again.');
	}
};