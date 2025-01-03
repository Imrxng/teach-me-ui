/* eslint-disable camelcase */
/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from 'react-router-dom';
import ADD_QUESTION from '../administration/add-question/Add_Question';
import ADMINISTRATION from '../administration/Administration';
import CREATE_COURSE from '../administration/create-course/Create_Course';
import HOME from '../home/Home';
import Login from '../login/Login';
import LOGOUT from '../logout/Logout';
import NOT_FOUND from '../not-found/Not_Found';
import QUIZ from '../quiz/provider/QuizProvider';
import Root from '../root/Root';
import UPDATE_COURSE from '../administration/update-course/Update_Course';
import CREATE_USER from '../administration/user-management/User_Form';
import { UPDATE_USER } from '../administration/user-management/Update_User';

export const ROUTER = createBrowserRouter(
	[
	  {
			path: '/',
			element: <Root />,
			children: [
		  { path: '', element: <HOME /> },
		  { path: 'quiz/:ID', element: <QUIZ /> },
		  { path: 'login', element: <Login /> },
		  { path: 'logout', element: <LOGOUT /> },
		  { path: 'settings', element: <ADMINISTRATION /> },
		  { path: 'settings/create-course', element: <CREATE_COURSE /> },
		  { path: 'settings/add-question/:ID', element: <ADD_QUESTION /> },
		  { path: 'settings/edit/:ID', element: <UPDATE_COURSE /> },
		  { path: 'settings/create-user', element: <CREATE_USER /> },
		  { path: 'settings/edit-user/:USERNAME', element: <UPDATE_USER /> },
		  { path: 'not-found', element: <NOT_FOUND /> },
		  { path: '*', element: <NOT_FOUND /> },
			],
	  },
	],
	{
	  basename: '/teach-me-ui',
	  future: {
			v7_relativeSplatPath: true,
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
			v7_skipActionErrorRevalidation: true,
	  },
	}
);
  

export default ROUTER;
