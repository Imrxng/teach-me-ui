/* eslint-disable react-refresh/only-export-components */
import { useContext, useEffect } from 'react';
import picture from '../../assets/images/logo.svg';
import pictureDark from '../../assets/images/logo-dark.svg';
import DATACONTEXT from '../../context/DataContext';
import {  useLocation, useNavigate } from 'react-router-dom';
import NAV from './Nav';
import './Header.component.css';
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

const HEADER = () => {
	const { DARKMODE, LOGIN_SESSION, SET_LOGIN_SESSION } = useContext(DATACONTEXT);
	const LOCATION = useLocation();	
	
	  useEffect(() => {
		const CURRENT_ROUTE = LOCATION.pathname;
		const PERSISTED_ROUTE = localStorage.getItem('persistedRoute');
		
		if (PERSISTED_ROUTE !== CURRENT_ROUTE) {
		  localStorage.setItem('persistedRoute', CURRENT_ROUTE);
		}
	  }, [LOCATION]);

	const NAVIGATE = useNavigate();

	useEffect(() => {
		const checkSession = async () => {
			try {
				const response = await fetch(`${BASE_URL}/login-session/`, {
					method: 'GET',
					credentials: 'include',
				});
				
				if (response.ok) {
					const sessionData = await response.json();
					SET_LOGIN_SESSION({ username: sessionData.token.USERNAME, type: sessionData.token.TYPE });
					localStorage.setItem('loginSession', JSON.stringify({
						username: sessionData.token.USERNAME,
						type: sessionData.token.TYPE
					}));
				} else {
					NAVIGATE('/login');
					return;
				}
			} catch {
				NAVIGATE('/login');
			}
		};
		

		const handleLoginSession = () => {
			if (!LOGIN_SESSION) {
			  checkSession();
			  return;
			}
		  
			const PERSISTED_ROUTE = localStorage.getItem('persistedRoute');
			const shouldNavigate = getRouteToNavigate(PERSISTED_ROUTE);
			
			if (shouldNavigate) {
			  NAVIGATE(shouldNavigate);
			}
		  };
		  
		  const getRouteToNavigate = (PERSISTED_ROUTE: string | null) => {
			if (PERSISTED_ROUTE === '/login') {
			  return LOCATION.pathname === '/login' ? '/' : null;
			}
			return PERSISTED_ROUTE;
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