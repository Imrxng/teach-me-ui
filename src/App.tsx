/* eslint-disable camelcase */
import { RouterProvider } from 'react-router-dom';
import './App.css';
import './Reset.css';
import { DATAPROVIDER } from './context/DataContext';
import ROUTER from './components/router/Router';

function App() {

	return (
		<html>
			<body>
				<DATAPROVIDER>
					<RouterProvider future={{ v7_startTransition: true }} router={ROUTER} />
				</DATAPROVIDER>
			</body>
		</html>
	);
}

export default App;
