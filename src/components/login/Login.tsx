import { useContext, useEffect, useState } from 'react';
import picture from '../../assets/images/testop-software-testing.webp';
import DATACONTEXT from '../../context/DataContext';
import { LoginRequest, LoginSession } from '../../types';

const Login = () => {
	const [LOGIN_REQUEST, SET_LOGIN_REQUEST] = useState<LoginRequest | undefined>();
	const [INPUT_USERNAME, SET_INPUT_USERNAME] = useState<string>('');
	const [INPUT_PASSWORD, SET_INPUT_PASSWORD] = useState<string>('');
	const [ERROR_MESSAGE, SET_ERROR_MESSAGE] = useState<string | undefined>(undefined);
	const { SET_LOGIN_SESSION } = useContext(DATACONTEXT);
	const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';


	useEffect(() => {
		const tryLogin = async () => {
			if (!LOGIN_REQUEST) return;
			const response = await fetch(`${BASE_URL}/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ USERNAME: INPUT_USERNAME, PASSWORD: INPUT_PASSWORD }),
			});
			console.log(response);

			if (response.ok) {
				const data: LoginSession = await response.json();
				SET_LOGIN_SESSION(data);
				SET_ERROR_MESSAGE(undefined);
				localStorage.setItem('loginSession', JSON.stringify(data));
			} else {
				const message = await response.json();
				SET_ERROR_MESSAGE(message);
			}
			SET_LOGIN_REQUEST(undefined);
		};
		tryLogin();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [INPUT_PASSWORD, INPUT_USERNAME, LOGIN_REQUEST, SET_LOGIN_SESSION]);

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
						<label className='usernameLabel' htmlFor="username">Username: </label>
						<input
							type="text"
							value={INPUT_USERNAME}
							onChange={(event) => SET_INPUT_USERNAME(event.target.value)}
							name="username"
							id='cy-login-username-input'
							className="input"
						/>
					</div>
					<div className='inputBox'>
						<label className='passwordLabel' htmlFor="password">Password: </label>
						<input
							type="password"
							onKeyDown={(e) => {
								if (e.key === 'Enter') handleLoginClick();
							}}
							value={INPUT_PASSWORD}
							onChange={(event) => SET_INPUT_PASSWORD(event.target.value)}
							name="password"
							id='cy-login-password-input'
							className="input"
						/>
					</div>
				</div>
				<button id='cy-login-btn' className='mainButton' onClick={handleLoginClick}>LOGIN</button>
				{ERROR_MESSAGE && <p id='errorMessage'>{ERROR_MESSAGE} </p>}
			</div>
			<div className="hexagon">
				<img src={picture} alt='decoLogin' />
			</div>
		</div>
	);
};

export default Login;
