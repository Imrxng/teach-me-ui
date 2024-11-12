import { Outlet } from 'react-router-dom';
import HEADER from '../header/Header';
import { useContext } from 'react';
import DATACONTEXT from '../../context/DataContext';

const Root = () => {
	const { DARKMODE } = useContext(DATACONTEXT);
	return (
		<div className={DARKMODE ? 'body' : 'body lightmode'}>
			<HEADER/>
			<div className="main">
				<Outlet/>
			</div>
		</div>
	);
};

export default Root;