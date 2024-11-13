/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DATACONTEXT from '../../context/DataContext';

const LOGOUT = () => {
	const { SET_LOGIN_SESSION } = useContext(DATACONTEXT);
	const NAVIGATE = useNavigate();

	const handleLogout = () => {
		SET_LOGIN_SESSION(undefined);
		localStorage.removeItem('loginSession');
		NAVIGATE('/login');
	};
	useEffect(() => {
		handleLogout();
	}, []);

	return (
		<>
		</>
	);
};

export default LOGOUT;