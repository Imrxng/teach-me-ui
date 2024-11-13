/* eslint-disable camelcase */
/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import Root from '../root/Root';
import NOT_FOUND from '../not-found/Not_Found';
import HOME from '../home/Home';
import QUIZ from '../quiz-detail/Quiz';
import Login from '../login/Login';
import LOGOUT from '../logout/Logout';

export const ROUTER = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '',
				element: <Login/>
			},
			{
				path: 'home',
				element: <HOME />
			},
			{
				path: 'quiz/:ID',
				element: <QUIZ />
			},
			{
				path: '/login',
				element: <Login />
			},
			{
				path: '/logout',
				element: <LOGOUT />
			},
			{
				path: '*',
				element: <NOT_FOUND />
			}
		]
	}
], {
	future: {
		v7_relativeSplatPath: true,
		v7_fetcherPersist: true,
		v7_normalizeFormMethod: true,
		v7_partialHydration: true,
		v7_skipActionErrorRevalidation: true
	},
});

export default ROUTER;
