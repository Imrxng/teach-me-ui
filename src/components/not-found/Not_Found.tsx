import { useEffect } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import './Not_Found.component.css';

const NotFound = () => {
	const NAVIGATE = useNavigate();
	const LOCATION = useLocation();

	useEffect(() => {
		if (LOCATION.pathname === '/') {
			NAVIGATE('/home');
		}
	}, [LOCATION, NAVIGATE]);

	return (
		<div>
      The specified path does not exist. Click <NavLink className='navLink notFoundHere' to="/home">here</NavLink> to return to the home page.
		</div>
	);
};

export default NotFound;
