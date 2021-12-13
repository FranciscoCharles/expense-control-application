import React, { useContext, createContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/auth';
import Api from '../api';

const authContext = createContext();

export function useAuthContext() {
	return useContext(authContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(undefined);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const result = authService.getUserData();
			if(result){
				Api.defaults.headers.Authorization = `Bearer ${result.jwtToken}`;
			}
			setUser(() => result);
			setLoading(false);
		})();
	}, []);

	const handlerLogin = useCallback(async function (email, senha, callback) {
		const result = await authService.login(email, senha);
		if (result) {
			setUser(() => result);
			callback?.();
		}
	}, []);

	const handlerLogout = useCallback(async function (callback) {
		setUser(() => undefined);
		callback?.();
	}, []);

	return (
		<authContext.Provider value={{
			isAutenticated: !!user,
			user,
			setUser,
			handlerLogin,
			handlerLogout,
			loading,
		}}>
			{children}
		</authContext.Provider>
	);
}
