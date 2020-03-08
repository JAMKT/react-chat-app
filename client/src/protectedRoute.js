import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { AuthContext } from './components/context/authContext';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const auth = useContext(AuthContext);

    return(
        <Route {...rest} render={(props) => {
            if(auth.loggedIn) {
                return <Component {...props}/>
            }
        }
    } />
    )
   
}
