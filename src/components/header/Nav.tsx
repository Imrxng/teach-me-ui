/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import DATACONTEXT from '../../context/DataContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const NAV = () => {
	const { DARKMODE, SET_DARKMODE, LOGIN_SESSION } = useContext(DATACONTEXT);

	const handlerDarkMode: React.MouseEventHandler<HTMLDivElement> = () => {
		SET_DARKMODE(DARKMODE ? false : true);
		localStorage.setItem('darkmode', DARKMODE ? 'false' : 'true');
	};

	const iconsHandler = () => {
		return DARKMODE ? <MdLightMode id='modeButton' /> : <MdDarkMode className='lightmode' id='modeButton'/>;
	};

	return (
		<div className="nav">
			<NavLink id='cy-nav-home-link' className={'navLink'} to='/' >Home</NavLink>
			{LOGIN_SESSION && LOGIN_SESSION.type === 'admin' ?
				<NavLink id='cy-nav-admin-link' className={'navLink'} to="/settings" >Settings</NavLink>
				:
				<></>
			}
			<NavLink id='cy-nav-home-logout' className={'navLink'} to='/logout' >Logout</NavLink>
			<div onClick={handlerDarkMode} style={{ marginTop: 1, fontSize: 18 }}>{iconsHandler()}</div>
		</div>
	);
};

export default NAV;