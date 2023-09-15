import React from 'react';
import {useAuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

export default function ProtectRoute({children, requireAdmin}) {
	const {user, isLoading} = useAuthContext();

	if (isLoading) {
		return null;
	}

	if (!user) {
		return <Navigate to='/login' replace={true}/>;
	}

	if((requireAdmin && !user.isAdmin)) {
		return <Navigate to="/" replace={true}/>;
	}

	return children;
}
