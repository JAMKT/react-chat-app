
/*
import { useContext } from 'react';
import axios from 'axios';
import { Context } from '../context/authContext';

export const useGetCurrentUser = () => {

    const authenticate = useContext(Context);
    const getCurrentUser = () => {

        axios.get('/api/users/current-user')
        .then((currentUser) => {
            if (currentUser.data.username) {
                console.log("Current User: " + currentUser.data.username);
                const loggedInUser = currentUser.data;
                console.log(loggedInUser);
                authenticate.login();
                return loggedInUser;
            } else {
                console.log("No user logged in");
            }
        })
        .catch(err => console.log(err));
        }

    return [getCurrentUser];
}

*/
