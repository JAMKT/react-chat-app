import React from 'react';
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
import Error404 from './components/Pages/Error404';


function App() {
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet" />
      <Router>
            <Switch>
              <Route path="/" exact component={ Login }></Route>
              <Route path="/Register" component={ Register }></Route>
              <Route path="/All" component={ All }></Route>
              <Route path="/Chat" component={ Chat }></Route>
              <Route path="/SocialMedia" component={ SocialMedia }></Route>
              <Route path="/Mentions" component={ Mentions }></Route>
              <Route path="/Comments" component={ Comments }></Route>
              <Route path="/Contacts" component={ Contacts }></Route>
              <Route path="/CreateGroup" component={ CreateGroup }></Route>
              <Route path="/AddContact" component={ AddContact }></Route>
              <Route path="/Profile" component={ Profile }></Route>
              <Route path="*" component={ Error404 }></Route>
            </Switch>
          </Router>
    </div>
  );
}

export default App;
