/* eslint-disable react-refresh/only-export-components */
import { useContext } from 'react';
import picture from '../../assets/images/logo.svg';
import pictureDark from '../../assets/images/logo-dark.svg';
import DATACONTEXT from '../../context/DataContext';
import './Header.component.css';
import NAV from './Nav';

const HEADER = () => {
	const { DARKMODE, LOGIN_SESSION } = useContext(DATACONTEXT);

	return (
		<div className="header">
			<img src={DARKMODE ? pictureDark : picture} id="logo" alt="logo" />
			{ LOGIN_SESSION ?
				<NAV/>
				:
				<></>
			}
		</div>
	);
};

export default HEADER;