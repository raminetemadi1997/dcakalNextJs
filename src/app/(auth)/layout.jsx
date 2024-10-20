
import React from 'react';
import LoginContextProvider from '../../context/LoginContext';
const LoginLayout = ({children}) => {
    return (
        <LoginContextProvider>
            {children}
        </LoginContextProvider>
    );
};

export default LoginLayout;