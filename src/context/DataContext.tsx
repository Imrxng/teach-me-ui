/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, useState } from 'react';
import { LoginSession } from '../types';


interface IDataContext {
    DARKMODE: boolean;
    SET_DARKMODE: React.Dispatch<React.SetStateAction<boolean>>;
    LOADING: boolean;
    SET_LOADING: React.Dispatch<React.SetStateAction<boolean>>;
	LOGIN_SESSION: LoginSession | undefined;
	SET_LOGIN_SESSION: React.Dispatch<React.SetStateAction<LoginSession | undefined>>;
}

const DATACONTEXT = React.createContext<IDataContext>({ DARKMODE: true, SET_DARKMODE: () => {}, LOADING: false, SET_LOADING: () => {}, LOGIN_SESSION: undefined, SET_LOGIN_SESSION: ()  => {} });

export const DATAPROVIDER = ({ children } : {children: ReactNode}) => {
	const [DARKMODE, SET_DARKMODE] = useState<boolean>(true);
	const [LOADING, SET_LOADING] = useState<boolean>(false);
	const [LOGIN_SESSION, SET_LOGIN_SESSION] = useState<LoginSession | undefined>();
	return (
		<DATACONTEXT.Provider value={{ DARKMODE: DARKMODE, SET_DARKMODE: SET_DARKMODE, LOADING: LOADING, SET_LOADING: SET_LOADING, LOGIN_SESSION: LOGIN_SESSION, SET_LOGIN_SESSION: SET_LOGIN_SESSION }}>
			{children}
		</DATACONTEXT.Provider>
	);
};

export default DATACONTEXT;