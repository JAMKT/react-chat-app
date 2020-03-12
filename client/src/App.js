import React, { useState, useCallback,  useEffect } from 'react';
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
import { AuthContext } from './components/context/authContext';
import { connect } from 'mongoose';

function App() {

  const [loggedIn, setLoggedIn ] = useState(null);
  const [currUser, setCurrUser] = useState(false);

  const login = useCallback((user) => {
    setLoggedIn(true);
    setCurrUser(user);
  }, []);
 

  const logout = () => {
    setLoggedIn(false);
    setCurrUser(null);
    window.location.href = '/login';
  };


  function getCurrentUser(){
    axios.get('/api/users/current-user')
      .then((currentUser) => {
        if (currentUser.data.username) {
          const loggedInUser = currentUser.data;
          login(loggedInUser);
       
          return true;  
        } else {
          return false;
        }
      })
      .catch(err => {
        console.log(err);
        return false;
      });
  };

  async function userStatus() {
    let userStatus = false;
    if (loggedIn === false) {
      userStatus = await getCurrentUser();
    }
    if(loggedIn === null){
      userStatus = await getCurrentUser();
    }
    if(userStatus === undefined){
        userStatus = false;
    }
    if (loggedIn === true) {
      userStatus = true;
    }
    return userStatus;
  }

  // If session cookie exists, keep the user logged in
  useEffect(() => {
    if(document.cookie.sid){
      getCurrentUser();
    }
  }, []);


  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      userStatus() ? <Component {...props} /> : <Redirect to="/login" />
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
            <PrivateRoute path="/chat" component={Chat}></PrivateRoute>
            <PrivateRoute path="/social-media" component={SocialMedia}></PrivateRoute>
            <PrivateRoute path="/mentions" component={Mentions}></PrivateRoute>
            <PrivateRoute path="/comments" component={Comments}></PrivateRoute>
            <PrivateRoute path="/contacts" component={Contacts}></PrivateRoute>
            <PrivateRoute path="/create-group" component={CreateGroup}></PrivateRoute>
            <PrivateRoute path="/add-contact" component={AddContact}></PrivateRoute>
            <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
            <Route path="*" component={Error404}></Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
