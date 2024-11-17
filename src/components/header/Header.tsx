/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect } from 'react';
import picture from '../../assets/images/logo.svg';
import pictureDark from '../../assets/images/logo-dark.svg';
import DATACONTEXT from '../../context/DataContext';
import './Header.component.css';
import NAV from './Nav';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';
import {  useLocation, useNavigate } from 'react-router-dom';

const HEADER = () => {
	const { DARKMODE, LOGIN_SESSION, SET_LOGIN_SESSION } = useContext(DATACONTEXT);
	const LOCATION = useLocation();	
	
	  useEffect(() => {
		const currentRoute = LOCATION.pathname;
		const persistedRoute = localStorage.getItem('persistedRoute');

		if (persistedRoute !== currentRoute) {
		  localStorage.setItem('persistedRoute', currentRoute);
		}
	  }, [LOCATION]);

	const NAVIGATE = useNavigate();

	useEffect(() => {
		const checkSession = async () => {
			const response = await fetch(`${BASE_URL}/login/session`, {
				method: 'GET',
				credentials: 'include',
			});

			if (response.ok) {
				const sessionData = await response.json();
				SET_LOGIN_SESSION({ username: sessionData.token.USERNAME, type: sessionData.token.TYPE });
			} else {
				NAVIGATE('/login');
				return;
			}
		};

		const handleLoginSession = () => {
			if (!LOGIN_SESSION) {
			  checkSession();
			  return;
			}
		  
			const persistedRoute = localStorage.getItem('persistedRoute');
			const shouldNavigate = getRouteToNavigate(persistedRoute);
			
			if (shouldNavigate) {
			  NAVIGATE(shouldNavigate);
			}
		  };
		  
		  const getRouteToNavigate = (persistedRoute: string | null) => {
			if (persistedRoute === '/login') {
			  return LOCATION.pathname === '/login' ? '/home' : null;
			}
			return persistedRoute;
		  };
		  handleLoginSession();
	}, [LOCATION.pathname, LOGIN_SESSION, NAVIGATE, SET_LOGIN_SESSION]);

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