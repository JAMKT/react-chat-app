import React, { useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const UserListItem = (props) => {
    const userContext = useContext(AuthContext);

    // Add the selected user as a new contact and create a new chat with them
    const apiCall = (event) => {
        event.preventDefault();

        axios.get('/api/users/new-contact/' + event.target.id)
            .then((newContact) => {
            })
            .catch(err => {
                console.log(err);
            });

<<<<<<< HEAD
    const createChat = (username) => {
        console.log('was clicked');

=======
        createChat(props.name);
    };

    // Create a normal chat
    const createChat = (username) => {
>>>>>>> ffd8116b61d6be6a041bc91448ce573645696c54
        const data = {
            members: [
                { username: username },
                { username: userContext.currUser.username }
            ]
        };

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.post('/api/chats', data, config)
            .then(() => {})
            .catch(err => console.log(err));
    };

<<<<<<< HEAD
    const closePopup = () => {
       console.log('clicked');
    }

    let addFriendButton;
    if (props.alreadyAdded === "Already a friend") {
        addFriendButton = "";
    } else {
        addFriendButton = <button onClick={apiCall} id={props.name}>Add friend</button>;
=======
    // Add user to an array or users if the checkbox is checked
    const addUserToGroup = (event) => {
        if (event.target.checked === true) { 
            return props.name;   
        }
>>>>>>> ffd8116b61d6be6a041bc91448ce573645696c54
    }

    return (
        <div className="user-list-item padding-20 row">
            { /* Column just for the user image */}
            <div className="user-list-img-col">
                <img src="https://via.placeholder.com/64" alt="" />
            </div>
            { /* Column for the main body of the user item */}
            <div className="col">
                { /* Top part of the column */}
                <div className="row height-50 space-between align-center">
                    <h3>{props.name}</h3>
                </div>
                { /* Bottom part of the column */}
                <div className="row height-50 space-between align-center">
                    <p>{props.alreadyAdded}</p>
                </div>
            </div>
            {
                // Determine whether or not this particular user is already one of the curren user's friends
                // If it is, check where the component is being rendered
                // If it isn't, display a button to allow the user to add the contact as a friend
                props.type === "USER_LIST_GROUP" ? 
                    // Determine whether or not this component is rendered in CreateGroup.js or Contacts.js
                    // If it is rendered in CreateGroup.js, display a checkbox next to the user's info
                    props.listType === "GROUP_CHAT" ? (
                        <div className="group-checkbox-col justify-center">
                            <div className="checkbox-wrap">
                                <input className="checkbox" type="checkbox" id={"checkbox_"+ props.index+props.name } onChange={addUserToGroup}/>
                                <label className="checkmark" htmlFor={"checkbox_"+ props.index+props.name} ></label>
                            </div>
                        </div>
                    ) : null 
                : (
                    <div className="user-list-button-col">
                        { props.alreadyAdded === "Already a friend" ? "" : <button onClick={apiCall} id={props.name}>Add friend</button> }
                    </div>
                )
            }

        </div>
    )
}

export default UserListItem;