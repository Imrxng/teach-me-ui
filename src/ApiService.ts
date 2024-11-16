import { Content, RootObject } from './types';

export const fetchCourseTitles = async (): Promise<string[]> => {
	try {
		const response = await fetch('http://localhost:3000/api/get-course-titles');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch course titles:', error);
		throw new Error('Failed to fetch course titles. Please try again.');
	}
};

export const deleteCourse = async (course: string) => {
	try {
		const response = await fetch(`http://localhost:3000/api/delete-course/${course}`, {
			method: 'DELETE'
		});

		if (response.ok) {
			alert(`${course} has been deleted successfully!`);
		} else throw new Error(`Failed to delete course ${course}`);
	}
	catch (error) {
		console.error('Error deleting course:', error);
		alert('Error deleting course. Please try again.');
	}
};

export const addCourse = async (course: Content) => {
	try {
		const response = await fetch('http://localhost:3000/api/create-course', {
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
		if (error instanceof Error) {
			console.error(`Failed to add course: ${error.message}`);
			alert('Failed to add course. Please try again.');
		}
	}
};

export const getCourse = async (course: string): Promise<Content> => {
    let data: Content = {
        id: '',
        name: '',
        category: '',
        passingGrade: 0,
        completeTime: 0,
        questionCategories: [],
        questions: [],
        date: ''
    }
    try {
        const response = await fetch(`http://localhost:3000/api/get-course/${course}`);
        const json: RootObject = await response.json();
        data = json.content;
        if(!response.ok) throw new Error("");
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Failed to get course: ${error.message}`);
            alert('failed to get course');
        }
    }
    return data
};

export const updateCourse = async (data: Content) => {
    try {
        const response = await fetch('http://localhost:3000/api/modify-course', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: failed to update: ${data.name}`);
        }
        alert(`${data.name}, has been updated successfully`)
    } catch (error) {
        if (error instanceof Error) {
            console.error('Failed to update course:', error.message);
            alert('Failed to update course. Please try again.');
        }
    }
}

export const addQuestion = async (data: Content) => {
    try {
        const response = await fetch('http://localhost:3000/api/modify-course', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error: failed to update: ${data.name}`);
        }
        alert(`${data.name}, has been updated successfully`)
    } catch (error) {
        if (error instanceof Error) {
            console.error('Failed to update course:', error.message);
            alert('Failed to update course. Please try again.');
        }
    }
}