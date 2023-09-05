import React, { ReactNode } from 'react';
import MyContext, { contextType } from './context';

interface MyContextProviderProps {
  children: ReactNode;
  initialValue: contextType; // Define the type for the initial value
}

const MyContextProvider: React.FC<MyContextProviderProps> = ({ children, initialValue }) => {
  return <MyContext.Provider value={initialValue}>{children}</MyContext.Provider>;
};

export default MyContextProvider;
