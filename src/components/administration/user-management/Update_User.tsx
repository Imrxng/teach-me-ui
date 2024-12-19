import { useParams } from 'react-router-dom';
import USER_FORM from './User_Form';

export const UPDATE_USER = () => {
	const { USERNAME } = useParams();

	return (
		<USER_FORM user={USERNAME}/>
	);
};
