import axios from 'axios';

const getCurrentUser = () => {
    axios.get('/api/users/current-user')
      .then((currentUser) => {
        if (currentUser.data.username) {
          console.log("Current User: " + currentUser.data.username);
          const loggedInUser = currentUser.data;
          return loggedInUser;
        } else {
          console.log("No user logged in");
        }
      })
      .catch(err => console.log(err));
  };

export default getCurrentUser;