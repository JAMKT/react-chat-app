import { createContext } from 'react';

// the Context can be shared between components
// when the Context gets updated, the components also get the update
export const AuthContext = createContext({
    loggedIn: null,
    login: () => {},
    logout: () => {},
    currUser: null,
    loadFromRedirect: null
});