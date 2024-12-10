/* eslint-disable react-refresh/only-export-components */
import { useNavigate } from 'react-router-dom';
import { RootObject } from '../../../types';
import { useContext, useState } from 'react';
import DATACONTEXT from '../../../context/DataContext';
import modal from '../../administration/modal/Modal.module.css';
import MODAL from '../../administration/modal/Modal';
import { deleteCourse } from '../../../ApiService';

interface TABLE_Props {
    COURSES: RootObject[];
    CURRENT_INDEX: number;
	REFRESH_COURSES: () => Promise<void>;
}

const TABLE = ({ COURSES, CURRENT_INDEX, REFRESH_COURSES }: TABLE_Props) => {
	const { SET_LOADING, LOGIN_SESSION } = useContext(DATACONTEXT);
	const startIndex = (CURRENT_INDEX - 1) * 5;
	const navigate = useNavigate();
	const [CONFIRMATION_MODAL, SET_CONFIRMATION_MODAL] = useState<boolean>(false);
	const [RESPONSE_MODAL, SET_RESPONSE_MODAL] = useState<boolean>(false);
	const [MESSAGE, SET_MESSAGE] = useState<string>('');
	const [SELECTED_COURSE, SET_SELECTED_COURSE] = useState<string>('');

	const DELETE_THIS_COURSE = async (course: string) => {
		try {
			SET_LOADING(true);
			await deleteCourse(course);
			await REFRESH_COURSES();
			SET_MESSAGE(`"${course}" deleted succesfully`);
		} catch (error: unknown) {
			console.error(error);
			SET_MESSAGE(`Failed to delete "${course}". Please try again.`);
		} finally {
			SET_LOADING(false);
			SET_CONFIRMATION_MODAL(false);
			SET_RESPONSE_MODAL(true);
		}
	};
	
	if (COURSES.length === 0) {
		return (
			<>
                Geen cursussen gevonden
			</>
		);
	}

	if ( LOGIN_SESSION && LOGIN_SESSION.type === 'admin') {
		return (
			<>
				<button id='cy-settings-create-course-btn' onClick={() => navigate('/settings/create-course')}>Add New Course</button>
				<table>
					<thead>
						<tr>
							<th>Course</th>
							<th>Category</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{
							COURSES.map((course, index) => {
								if (index >= startIndex && index < startIndex + 5) {
									return (
										<tr key={index}>
											<td>{course.content.name}</td>
											<td>{course.content.category}</td>
											<td>{course.content.date}</td>
											<td>
												<button id={`cy-settings-start-quiz-btn-${index}`} className="mainButton" onClick={() => navigate(`/quiz/${course.key}`)} >Start</button>

												<button id={`cy-settings-edit-course-${index}`} className="mainButton settingsCourseEdit" onClick={() => navigate(`/settings/edit/${course.key}`)} >Edit</button>

												<button id={`cy-settings-add-course-question-${index}`} className="mainButton settingsCourseAddQuestion" onClick={() => navigate(`/settings/add-question/${course.key}`)} >Add Question</button>

												<button id={`cy-settings-delete-course-${index}`} className="mainButton settingsCourseDelete" onClick={() => {
													SET_SELECTED_COURSE(course.content.name);
													SET_CONFIRMATION_MODAL(true);
												}} >Delete</button>
											</td>
										</tr>
									);
								}

							})
						}
					</tbody>
				</table>
				
				<MODAL open={CONFIRMATION_MODAL} onClose={() => SET_CONFIRMATION_MODAL(false)}>
					<div className={modal.modal} style={{ color: 'black' }}>
						<p className={modal.modalTitle} style={{ color: 'black' }}>Confirm Delete</p>
						<p className={modal.modalTxt}>Are you sure you want to delete this course?</p>
						<p>{SELECTED_COURSE}</p>
						<button
							type="button"
							id='cy-delete-course-btn-confirm'
							className={modal.actionBtn}
							onClick={() => DELETE_THIS_COURSE(SELECTED_COURSE)}
						>
							Delete
						</button>
					</div>
				</MODAL>
				<MODAL open={RESPONSE_MODAL} onClose={() => SET_RESPONSE_MODAL(false)}>
					<div className={modal.responseModal} style={{ color: 'black' }}>
						<p>{MESSAGE}</p>
					</div>
				</MODAL>
			</>
		);
	}

	

	return (
		<table>
			<thead>
				<tr>
					<th>Course</th>
					<th>Category</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{
					COURSES.map((course, index) => {
						if (index >= startIndex && index < startIndex + 5) {
							return (
								<tr key={index}>
									<td>{course.content.name}</td>
									<td>{course.content.category}</td>
									<td>{course.content.date}</td>
									<td><button id={`cy-home-start-quiz-btn-${index}`} className="mainButton" onClick={()=> navigate(`/quiz/${course.key}`)} >Start</button></td>
								</tr>
							);
						}

					})
				}
			</tbody>
		</table>
	);
};

export default TABLE;