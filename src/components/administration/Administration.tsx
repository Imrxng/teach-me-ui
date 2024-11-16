import React, { useContext } from 'react';
import './administration.css';
import { useNavigate } from 'react-router-dom';
import DATACONTEXT from '../../context/DataContext';

const ADMINISTRATION = () => {
	const { DARKMODE } = useContext(DATACONTEXT);
	const navigate = useNavigate();
	return (
		<div className={!DARKMODE ? 'light-mode' : ''}>
			<h1>Hello Admin,<br/>what would you like to do?</h1>
			<div className='btn-list'>
				<button onClick={() => navigate('/administration/create-course')} className='btn'>Create Course</button>
				<button onClick={() => navigate('/administration/update-course')} className='btn'>Update Course</button>
				<button onClick={() => navigate('/administration/delete-course')} className='btn'>Delete Course</button>
				<button onClick={() => navigate('/administration/add-question')} className='btn'>Add Question</button>
			</div>
		</div>
	);
};

export default ADMINISTRATION;