/* eslint-disable camelcase */
/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import Root from '../root/Root';
import NOT_FOUND from '../not-found/Not_Found';
import HOME from '../home/Home';
import QUIZ from '../quiz-detail/Quiz';
import Login from '../login/Login';
import LOGOUT from '../logout/Logout';
import ADMINISTRATION from '../administration/Administration';
import CREATE_COURSE from '../create-course/Create_Course';
import DELETE_COURSE from '../delete-course/Delete_Course';
import ADD_QUESTION from '../add-question/Add_Question';
import UPDATE_COURSE from '../update-course/Update_Course';

export const ROUTER = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '',
				element: <NOT_FOUND/>
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
				path:'/administration',
				element: <ADMINISTRATION />
			},
			{
				path:'/administration/create-course',
				element: <CREATE_COURSE />
			},
			{
				path:'/administration/delete-course',
				element: <DELETE_COURSE />
			},
			{
				path:'/administration/add-question',
				element: <ADD_QUESTION />
			},
			{
				path:'/administration/update-course',
				element: <UPDATE_COURSE />
			},
			{
				path: '/not-found',
				element: <NOT_FOUND />
			},{
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
