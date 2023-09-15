import {createContext, useContext, useEffect, useState} from "react";
import {login, logout, onUserStateChange} from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({children}) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true); // 추가된 상태

	useEffect(() => {
		onUserStateChange((user) => {
			setUser(user);
			setIsLoading(false); // 사용자 상태가 설정되면 로딩 상태를 false로 설정
		});
	}, []);

	return (
		<AuthContext.Provider value={{user, isLoading, login, logout}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
