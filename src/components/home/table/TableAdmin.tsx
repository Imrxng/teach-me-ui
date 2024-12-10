import {  useNavigate } from 'react-router-dom';
import { deleteCourse } from '../../../ApiService';
import { useContext, useState } from 'react';
import { LoginSession, RootObject } from '../../../types';
import modal from '../../administration/modal/Modal.module.css';
import MODAL from '../../administration/modal/Modal';
import DATACONTEXT from '../../../context/DataContext';

interface TableAdminProps {
    LOGIN_SESSION: LoginSession | undefined;
    COURSES: RootObject[];
    START_INDEX: number;
    REFRESH_COURSES: () => Promise<void>;
}

const TableAdmin = ({ LOGIN_SESSION, COURSES, START_INDEX, REFRESH_COURSES }: TableAdminProps) => {
	const [CONFIRMATION_MODAL, SET_CONFIRMATION_MODAL] = useState<boolean>(false);
	const [RESPONSE_MODAL, SET_RESPONSE_MODAL] = useState<boolean>(false);
	const [MESSAGE, SET_MESSAGE] = useState<string>('');
	const [SELECTED_COURSE, SET_SELECTED_COURSE] = useState<string>('');

	const { SET_LOADING } = useContext(DATACONTEXT);
	const NAVIGATE = useNavigate();

	const deleteThisCourse = async (course: string) => {
		try {
			SET_LOADING(true);
			await deleteCourse(course);
			await REFRESH_COURSES();
			SET_MESSAGE(`"${course}" deleted succesfully`);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			SET_MESSAGE(`Failed to delete "${course}". Please try again.`);
		} finally {
			SET_LOADING(false);
			SET_CONFIRMATION_MODAL(false);
			SET_RESPONSE_MODAL(true);
		}
	};

	if (LOGIN_SESSION && LOGIN_SESSION.type === 'admin') {
		return (
			<>
				<button id='cy-settings-create-course-btn' onClick={() => NAVIGATE('/settings/create-course')}>Add New Course</button>
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
								if (index >= START_INDEX && index < START_INDEX + 5) {
									return (
										<tr key={index}>
											<td>{course.content.name}</td>
											<td>{course.content.category}</td>
											<td>{course.content.date}</td>
											<td>
												<button id={`cy-settings-start-quiz-btn-${index}`} className="mainButton" onClick={() => NAVIGATE(`/quiz/${course.key}`)} >Start</button>

												<button id={`cy-settings-edit-course-${index}`} className="mainButton settingsCourseEdit" onClick={() => NAVIGATE(`/settings/edit/${course.key}`)} >Edit</button>

												<button id={`cy-settings-add-course-question-${index}`} className="mainButton settingsCourseAddQuestion" onClick={() => NAVIGATE(`/settings/add-question/${course.key}`)} >Add Question</button>

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
							onClick={() => deleteThisCourse(SELECTED_COURSE)}
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
						if (index >= START_INDEX && index < START_INDEX + 5) {
							return (
								<tr key={index}>
									<td>{course.content.name}</td>
									<td>{course.content.category}</td>
									<td>{course.content.date}</td>
									<td><button id={`cy-home-start-quiz-btn-${index}`} className="mainButton" onClick={() => NAVIGATE(`/quiz/${course.key}`)} >Start</button></td>
								</tr>
							);
						}

					})
				}
			</tbody>
		</table>
	);
};

export default TableAdmin;