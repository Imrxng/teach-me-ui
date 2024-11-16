/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import DATACONTEXT from '../../context/DataContext';

const NAV = () => {
	const { DARKMODE, SET_DARKMODE, LOGIN_SESSION } = useContext(DATACONTEXT);
	console.log(LOGIN_SESSION);
	
	return (
		<div className="nav">
			<NavLink className={'navLink'} to='logout' >Home</NavLink>
			{ LOGIN_SESSION && LOGIN_SESSION.type === 'admin' ? 
				<NavLink className={'navLink'} to="/administration" >Adminstration</NavLink>
				:
				<></>
			}
			<NavLink className={'navLink'} to='logout' >Logout</NavLink>
			<button onClick={() => SET_DARKMODE(DARKMODE ? false : true)}>dark</button>
		</div>
	);
};

export default NAV;