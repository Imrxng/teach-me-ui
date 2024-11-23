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
			<NavLink className={'navLink'} to='home' >Home</NavLink>
			{LOGIN_SESSION && LOGIN_SESSION.type === 'admin' ?
				<NavLink className={'navLink'} to="/administration" >Adminstration</NavLink>
				:
				<></>
			}
			<NavLink className={'navLink'} to='logout' >Logout</NavLink>
			<div onClick={handlerDarkMode} style={{ marginTop: 1, fontSize: 18 }}>{iconsHandler()}</div>
		</div>
	);
};

export default NAV;