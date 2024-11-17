/* eslint-disable camelcase */
import { RouterProvider } from 'react-router-dom';
import './App.css';
import './Reset.css';
import { DATAPROVIDER } from './context/DataContext';
import ROUTER from './components/router/Router';

function App() {

	return (
		<DATAPROVIDER>
			<RouterProvider future={{ v7_startTransition: true }} router={ROUTER} />
		</DATAPROVIDER>
	);
}

export default App;
