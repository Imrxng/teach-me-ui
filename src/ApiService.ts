import { Course, RootObject, User } from './types';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

export const fetchCourseTitles = async (): Promise<string[]> => {
	try {
		const RESPONSE = await fetch(`${BASE_URL}/get-course-titles`);
		const DATA = await RESPONSE.json();
		return DATA;
	} catch (error) {
		console.error('Failed to fetch course titles:', error);
		throw new Error('Failed to fetch course titles. Please try again.');
	}
};

export const deleteCourse = async (course: string) => {
	try {
		const RESPONSE = await fetch(`${BASE_URL}/delete-course/${course}`, {
			method: 'DELETE'
		});

		if (!RESPONSE.ok) {
			throw new Error(`Failed to delete course ${course}`);
		} 
	}
	catch (error) {
		handleError(error, 'Error deleting course. Please try again.');
		return `Failed to delete course ${course}`;
	}
};

const handleError = (error: unknown, errorMessage: string): void => {
	if (error instanceof Error) {
		console.error(`error: ${error.message}${errorMessage}`);
	}
};

export const addCourse = async (course: Course): Promise<string> => {
	try {
		const RESPONSE = await fetch(`${BASE_URL}/create-course`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(course),
		});

		if (RESPONSE.ok) {
			return `${course.name}, has been created successfully`;
		} else throw new Error(`Failed to create course: ${course}`);
		
	} catch (error) {
		handleError(error, 'Failed to add course. Please try again.');
		return `Failed to create "${course.name}". Please try again.`;
	}
};

export const getCourse = async (course: string): Promise<Course> => {
	let DATA: Course = {
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
		const RESPONSE = await fetch(`${BASE_URL}/get-course/${course}`);
		const JSON: RootObject = await RESPONSE.json();
		DATA = JSON.content;
		if(!RESPONSE.ok) throw new Error('');
	} catch (error) {
		handleError(error, 'Failed to get course');
	}
	return DATA;
};

export const updateCourse = async (data: Course): Promise<string> => {
	try {
		const RESPONSE = await fetch(`${BASE_URL}/modify-course`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!RESPONSE.ok) {
			throw new Error(`Error: failed to update: ${data.name}`);
		}
		return `${data.name}, has been updated successfully`;
	} catch (error) {
		handleError(error, 'Failed to update course. Please try again.');
		return `Failed to update "${data.name}". Please try again.`;
	}
};

export const addQuestion = async (data: Course) => {
	try {
		const RESPONSE = await fetch(`${BASE_URL}/modify-course`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (!RESPONSE.ok) {
			throw new Error(`Error: failed to update: ${data.name}`);
		}
	} catch (error) {
		handleError(error, 'Failed to add question. Please try again.');
	}
};

export const createUser = async (user: User) => {
	try {
		const RESPONSE = await fetch(`${BASE_URL}/add-user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		if (!RESPONSE.ok) {
			throw new Error(`Failed to create user: ${user.username}`);
		} 
	} catch (error) {
		handleError(error, 'Failed to create user. Please try again.');
	}
};

export const GET_ALL_USERS = async (): Promise<string[]> => {
	try {
		const RESPONSE = await fetch(`${BASE_URL}/get-all-usernames`);
		const DATA: string[] = await RESPONSE.json();
		return DATA; 
	} catch (error) {
		handleError(error, 'Failed to get all user. Please try again.');
		throw Error;
	}
};

export const DELETE_USER_FROM_DB = async (username: string) => {
	try {
		const RESPONSE = await fetch(`${BASE_URL}/delete-user/${username}`, {
			method: 'DELETE'
		});
		if (!RESPONSE.ok) {
			throw new Error(`Failed to delete course ${username.toUpperCase()}`);
		}
	} catch (error) {
		handleError(error, `Failed to user: ${username.toUpperCase()}. Please try again.`);
	}
};