/* eslint-disable react-refresh/only-export-components */
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import picture from '../../assets/images/logo.svg';
import pictureDark from '../../assets/images/logo-dark.svg';
import DATACONTEXT from '../../context/DataContext';
import './Header.component.css';

const HEADER = () => {
	const { DARKMODE, SETDARKMODE } = useContext(DATACONTEXT);

	return (
		<div className="header">
			<img src={DARKMODE ? pictureDark : picture} id="logo" alt="logo" />
			<div className="nav">
				<NavLink className={'navLink'} to="/" >Quiz</NavLink>
				<button onClick={() => SETDARKMODE(DARKMODE ? false : true)}>dark</button>
			</div>
		</div>
	);
};

export default HEADER;