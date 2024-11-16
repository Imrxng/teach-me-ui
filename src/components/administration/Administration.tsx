import  { useContext, useEffect } from 'react';
import './administration.css';
import { useNavigate } from 'react-router-dom';
import DATACONTEXT from '../../context/DataContext';

const ADMINISTRATION = () => {
	const { DARKMODE, LOGIN_SESSION } = useContext(DATACONTEXT);
	const NAVIGATE = useNavigate();
	useEffect(() => {
		if ( LOGIN_SESSION && LOGIN_SESSION.type === 'user') {
			NAVIGATE('/home');
		}
	}, [LOGIN_SESSION, NAVIGATE]);
	return (
		<div className={!DARKMODE ? 'light-mode' : ''}>
			<h1>Hello Admin,<br/>what would you like to do?</h1>
			<div className='btn-list'>
				<button onClick={() => NAVIGATE('/administration/create-course')} className='btn'>Create Course</button>
				<button onClick={() => NAVIGATE('/administration/update-course')} className='btn'>Update Course</button>
				<button onClick={() => NAVIGATE('/administration/delete-course')} className='btn'>Delete Course</button>
				<button onClick={() => NAVIGATE('/administration/add-question')} className='btn'>Add Question</button>
			</div>
		</div>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export default ADMINISTRATION;