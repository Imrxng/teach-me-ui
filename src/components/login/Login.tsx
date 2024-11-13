import { useContext, useEffect, useState } from 'react';
import { LoginRequest, LoginSession } from '../../types';
import picture from '../../assets/images/testop-software-testing.webp';
import DATACONTEXT from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [LOGIN_REQUEST, SET_LOGIN_REQUEST] = useState<LoginRequest | undefined>();
	const [INPUT_USERNAME, SET_INPUT_USERNAME] = useState<string>('');
	const [INPUT_PASSWORD, SET_INPUT_PASSWORD] = useState<string>('');
	const [ERROR_MESSAGE, SET_ERROR_MESSAGE] = useState<string | undefined>(undefined);
	const { SET_LOGIN_SESSION } = useContext(DATACONTEXT);
	const NAVIGATE = useNavigate();

	const checkAdminUsername = (username: string | undefined) => username === 'admin';
	const checkAdminPassword = (password: string | undefined) => password === 'admin';

	const HardCodedLogin = () => {
		const usernameValid = checkAdminUsername(LOGIN_REQUEST?.username);
		const passwordValid = checkAdminPassword(LOGIN_REQUEST?.password);
		handleLogin(usernameValid, passwordValid);
	};

	const handleLogin = (usernameValid: boolean, passwordValid: boolean) => {
		if (usernameValid && passwordValid) {
		  const sessionData: LoginSession = {
				type: 'admin',
				username: 'admin',
		  };
	  
		  const expiryTime = Date.now() + 12 * 60 * 60 * 1000;
	  
		  localStorage.setItem('loginSession', JSON.stringify({
				...sessionData,
				expiryTime
		  }));
	  
		  SET_LOGIN_SESSION(sessionData);
		}
	  };

	useEffect(() => {
		const savedSession = localStorage.getItem('loginSession');
		if (savedSession) {
		  const sessionData = JSON.parse(savedSession);
	  
		  if (sessionData.expiryTime > Date.now()) {
				SET_LOGIN_SESSION(sessionData);
				NAVIGATE('/home');
		  } else {
				localStorage.removeItem('loginSession');
				NAVIGATE('/login');
		  }
		}
	  }, [NAVIGATE, SET_LOGIN_SESSION]);
	  

	useEffect(() => {
		const tryLogin = async () => {
			if (!LOGIN_REQUEST) return;
			const response = await fetch('http://localhost:3000/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(LOGIN_REQUEST)
			});
			const data: LoginSession = await response.json();
			HardCodedLogin();
			if (data.username) {
				SET_LOGIN_SESSION(data);
				SET_ERROR_MESSAGE(undefined);
				localStorage.setItem('loginSession', JSON.stringify(data));  
			} else {
				SET_ERROR_MESSAGE('Username or password incorrect!');
			}
			SET_LOGIN_REQUEST(undefined);
		};
		tryLogin();
	}, [LOGIN_REQUEST, SET_LOGIN_SESSION]);

	const handleLoginClick = () => {
		if (INPUT_USERNAME && INPUT_PASSWORD) {
			SET_LOGIN_REQUEST({ username: INPUT_USERNAME, password: INPUT_PASSWORD });
		} else {
			SET_ERROR_MESSAGE('Please enter both username and password!');
		}
	};

	return (
		<div className='mainLogin'>
			<div className="loginBox">
				<div className='inputBoxes'>
					<div className='inputBox'>
						<label htmlFor="username">Username: </label>
						<input
							type="text"
							value={INPUT_USERNAME}
							onChange={(event) => SET_INPUT_USERNAME(event.target.value)}
							name="username"
							className="input"
						/>
					</div>
					<div className='inputBox'>
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							onKeyDown={(e) => {
								if (e.key === 'Enter') handleLoginClick();
							}}
							value={INPUT_PASSWORD}
							onChange={(event) => SET_INPUT_PASSWORD(event.target.value)}
							name="password"
							className="input"
						/>
					</div>
				</div>
				<button className='startQuizButton' onClick={handleLoginClick}>LOGIN</button>
				{ERROR_MESSAGE && <p id='errorMessage'>{ERROR_MESSAGE} </p>}
			</div>
			<div className="hexagon">
				<img src={picture} alt='decoLogin'/>
			</div>
		</div>
	);
};

export default Login;
