/*

import axios from 'axios';

const getCurrentUser = () => {
    axios.get('/api/users/current-user')
      .then((currentUser) => {
        console.log(currentUser.data);
        if (currentUser.data.username) {
          console.log("Current User: " + currentUser.data.username);
          const loggedInUser = currentUser.data;
          console.log(loggedInUser);
          return loggedInUser;
        } else {
          console.log("No user logged in");
          return false;
        }
      })
      .catch(err => console.log(err));
  };

export default getCurrentUser;

*/