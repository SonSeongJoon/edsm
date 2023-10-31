import React, { createContext, useContext, useState } from 'react';

// 새로운 context 생성
const VerificationStatusContext = createContext();

export const VerificationStatusProvider = ({ children }) => {
  const [verificationStatus, setVerificationStatus] = useState('unverified');

  return (
     <VerificationStatusContext.Provider value={{ verificationStatus, setVerificationStatus }}>
       {children}
     </VerificationStatusContext.Provider>
  );
};

export const useVerificationStatus = () => {
  const context = useContext(VerificationStatusContext);
  if (!context) {
    throw new Error('useVerificationStatus must be used within a VerificationStatusProvider');
  }
  return context;
};
