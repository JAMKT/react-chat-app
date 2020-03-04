import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import All from './components/Pages/All';
import Chat from './components/Pages/Chat';
import SocialMedia from './components/Pages/SocialMedia';
import Mentions from './components/Pages/Mentions';
import Comments from './components/Pages/Comments';
import Contacts from './components/Pages/Contacts';
import CreateGroup from './components/Pages/CreateGroup';
import AddContact from './components/Pages/AddContact';
import Profile from './components/Pages/Profile';
import LandingPage from './components/Pages/LandingPage';
import Error404 from './components/Pages/Error404';
import axios from 'axios';
import './styles/base.css'
//import getCurrentUser from './currentUser';
import { AuthContext } from './components/context/authContext';

function App() {
    
  const [loggedIn, setLoggedIn ] = useState(false);
  const [currUser, setCurrUser] = useState(false);

  const login = useCallback((user) => {
    console.log('loggin!');
    setLoggedIn(true);
    console.log(user.username);
    setCurrUser(user);
    console.log('this is the user data:' + currUser);
  }, []);

  const logout = useCallback(() => {
    console.log('logging out');
    setLoggedIn(false);
  }, []);

  const getCurrentUser = () => {
    
    axios.get('/api/users/current-user')
      .then((currentUser) => {
        console.log(currentUser);
        if (currentUser.data.username) {
          console.log("Current User: " + currentUser.data.username);
          const loggedInUser = currentUser.data;
          console.log(loggedInUser);
          login(loggedInUser);
          //userData(loggedInUser);
          
          return loggedInUser;
        } else {
          console.log("No user logged in");
       
        }
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const userStatus = () => {
    let loggedInUser = loggedIn;
    console.log(loggedIn);
    if(loggedIn){
      return true;
    }else{
      return false;
    }
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      userStatus() ? <Component {...props} /> : <Redirect to='/Login' />
    )} />
  )

  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet" />
      <AuthContext.Provider value={{loggedIn: loggedIn, login: login, logout: logout, currUser: currUser}}>
        <Router>
        <Switch>
          <Route path="/" exact component={LandingPage}></Route>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <PrivateRoute path="/all" component={All}></PrivateRoute>
          <PrivateRoute path="/" exact component={LandingPage}></PrivateRoute>
          <Route path="/chat" component={Chat}></Route>
          <Route path="/social-media" component={SocialMedia}></Route>
          <Route path="/mentions" component={Mentions}></Route>
          <Route path="/comments" component={Comments}></Route>
          <Route path="/contacts" component={Contacts}></Route>
          <Route path="/create-group" component={CreateGroup}></Route>
          <Route path="/add-contact" component={AddContact}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="*" component={Error404}></Route>
        
        </Switch>

        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
