import { NavLink } from 'react-router-dom';
import './Not_Found.component.css';

const NotFound = () => {

	return (
		<div>
      The specified path does not exist. Click <NavLink className='navLink notFoundHere' to='/'>here</NavLink> to return to the home page.
		</div>
	);
};

export default NotFound;
