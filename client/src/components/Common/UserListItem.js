import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const UserListItem = (props) => {
    const userContext = useContext(AuthContext);
    const [color, setColor] = useState(null);
    
    // Update the current user's "contacts" when "Add Friend" button is clicked
    const apiCall = (event) => {
        event.preventDefault();
        console.log('button was clicked');
        console.log(event.target.id);

        // Get the user that was "Added as Friend" + update the current user's "contacts" in the database
        axios.get('/api/users/new-contact/' + event.target.id)
            .then((newContact) => {
                // Once the database has updated, call the "loadUsers()" function
                // The "loadUsers()" will update the users-state with the updated data
                props.loadUsers(); 
            })
            .catch(err => {
                console.log(err);
            });
        createChat(props.name);
        
    };

    //Get user avatar
    const getAvatarColor = () => {
        if (props.id !== undefined) {
            axios.get('/api/users/' + props.id)
            .then((newContact) => {
                if (newContact.data.avatarColor !== null && newContact.data.avatarColor !== undefined){
                    setColor(newContact.data.avatarColor);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
        
    }

    useEffect(() => {
        getAvatarColor();
    },[]);

    // Create a normal chat
    const createChat = (username) => {
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
            .then(() => { })
            .catch(err => console.log(err));
    };

    // Add user to an array or users if the checkbox is checked
    const addUserToGroup = (event) => {
        if (event.target.checked === true) {
            return props.name;
        }
    }

    return (
        <div className="user-list-item padding-20 row" onClick={ () => props.selectContact(props.id) }>
            { /* Column just for the user image */}
            <div className="user-list-img-col">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14 svg-avatar-nav" role="img" viewBox="0 0 448 512"><path
                    fill={color}
                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
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
                                <input className="checkbox" type="checkbox" id={"checkbox_" + props.index + props.name} onChange={addUserToGroup} />
                                <label className="checkmark" htmlFor={"checkbox_" + props.index + props.name} ></label>
                            </div>
                        </div>
                    ) : null
                    : (
                        <div className="user-list-button-col">
                            {props.alreadyAdded === "Already a friend" ? "" : <button onClick={apiCall} id={props.name} >Add friend</button>}
                        </div>
                    )
            }

        </div>
    )
}

export default UserListItem;