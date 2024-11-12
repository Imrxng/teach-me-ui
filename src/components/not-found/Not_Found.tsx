import { NavLink } from 'react-router-dom';
import './Not_Found.component.css';
const NOT_FOUND = () => {
	return (
		<div>
      The specified path does not exist. Click <NavLink className='navLink notFoundHere' to="/" >here</NavLink> to return to home page.
		</div>
	);
};

export default NOT_FOUND;