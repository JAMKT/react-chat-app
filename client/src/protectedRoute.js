import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './components/context/authContext';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const auth = useContext(AuthContext);

    return(
        <Route {...rest} render={(props) => {
            console.log('is authenticated!')
          
            if(auth.loggedIn) {
                return <Component {...props}/>
            }
            /*
            else{
                return <Redirect to={{pathname: '/login'}}/>
            }*/
           
        }
    } />
    )
   
}
