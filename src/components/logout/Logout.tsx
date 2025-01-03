/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DATACONTEXT from '../../context/DataContext';
const BASE_URL = process.env.BASE_URL || 'https://teach-me-backend.vercel.app/api';

const LOGOUT = () => {
	const { SET_LOGIN_SESSION } = useContext(DATACONTEXT);
	const NAVIGATE = useNavigate();

	const handleLogout = async () => {
		const response = await fetch(`${BASE_URL}/logout`, {
			method: 'POST',
			credentials: 'include', 
		});
		if (response.ok) {
			SET_LOGIN_SESSION(undefined);
			localStorage.removeItem('persistedRoute');
			NAVIGATE('/login');	
		}
	};
	useEffect(() => {
		handleLogout();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
		</>
	);
};

export default LOGOUT;