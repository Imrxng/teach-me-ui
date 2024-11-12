/* eslint-disable camelcase */
/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import Root from '../root/Root';
import NOT_FOUND from '../not-found/Not_Found';
import HOME from '../home/Home';
import QUIZ from '../quiz-detail/Quiz';

export const ROUTER = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '',
				element: <HOME />
			},
			{
				path: 'quiz/:ID',
				element: <QUIZ />
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
