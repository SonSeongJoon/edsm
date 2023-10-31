import React, { createContext, useContext, useState } from 'react';

// 새로운 context 생성
const YearMonthContext = createContext();

export const YearMonthContextProvider = ({ children }) => {
	const [ yearMonth, setYearMonth ] = useState('');

	return (
		<YearMonthContext.Provider value={{ yearMonth, setYearMonth }}>
			{children}
		</YearMonthContext.Provider>
	);
};

export const useYearMonthContext = () => {
	const context = useContext(YearMonthContext);
	if (!context) {
		throw new Error('useVerificationStatus must be used within a VerificationStatusProvider');
	}
	return context;
};
