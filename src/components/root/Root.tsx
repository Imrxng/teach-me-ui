import { Outlet, useNavigate } from 'react-router-dom';
import HEADER from '../header/Header';
import { useContext, useEffect } from 'react';
import DATACONTEXT from '../../context/DataContext';

const Root = () => {
	const { DARKMODE, LOGIN_SESSION } = useContext(DATACONTEXT);
	const NAVIGATE = useNavigate();

	useEffect(() => {
		if (LOGIN_SESSION === undefined) {
			NAVIGATE('/login');
		} else {
			NAVIGATE('/home');
		}
	}, [LOGIN_SESSION, NAVIGATE]);

	return (
		<div className={DARKMODE ? 'body' : 'body lightmode'}>
			<HEADER/>
			<div className="main">
				<Outlet/>
			</div>
		</div>
	);
};

export default Root;