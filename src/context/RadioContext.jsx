import {createContext, useContext, useEffect, useState} from 'react';

const RadioContext = createContext();

export function RadioContextProvider({ children }) {
  const [radioValue, setRadioValue] = useState('unverified');

  useEffect(() => {
    setRadioValue('unverified');
  }, []);

  return (
    <RadioContext.Provider value={{ radioValue, setRadioValue }}>
      {children}
    </RadioContext.Provider>
  );
}

export function useRadioContext() {
  return useContext(RadioContext);
}