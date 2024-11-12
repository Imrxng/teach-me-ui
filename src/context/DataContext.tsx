/* eslint-disable react-refresh/only-export-components */
import React, { ReactNode, useState } from 'react';


interface IDataContext {
    DARKMODE: boolean;
    SETDARKMODE: React.Dispatch<React.SetStateAction<boolean>>;
    LOADING: boolean;
    SETLOADING: React.Dispatch<React.SetStateAction<boolean>>;
}

const DATACONTEXT = React.createContext<IDataContext>({ DARKMODE: true, SETDARKMODE: () => {}, LOADING: false, SETLOADING: () => {} });

export const DATAPROVIDER = ({ children } : {children: ReactNode}) => {
	const [DARKMODE, SETDARKMODE] = useState<boolean>(true);
	const [LOADING, SETLOADING] = useState<boolean>(false);
	return (
		<DATACONTEXT.Provider value={{ DARKMODE: DARKMODE, SETDARKMODE: SETDARKMODE, LOADING: LOADING, SETLOADING: SETLOADING }}>
			{children}
		</DATACONTEXT.Provider>
	);
};

export default DATACONTEXT;