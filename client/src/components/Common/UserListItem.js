import React, { useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const UserListItem = (props) => {
    const userContext = useContext(AuthContext);

    const apiCall = (event) => {
        event.preventDefault();

        axios.get('/api/users/new-contact/' + event.target.id)
            .then((newContact) => {
                // ...
            })
            .catch(err => {
                console.log(err);
            });
    }

    const createChat = (username) => {
        console.log('was clicked');

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
            .then(chats => {
                // ...
            })
            .catch(err => console.log(err));
    }

    const closePopup = () => {
       console.log('clicked');
    }

    let addFriendButton;
    if (props.alreadyAdded === "Already a friend") {
        addFriendButton = "";
    } else {
        addFriendButton = <button onClick={apiCall} id={props.name}>Add friend</button>;
    }

    return (
        <div className="user-list-item padding-20 row" onClick={() => createChat(props.name)}>
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
            {props.type === "USER_LIST_GROUP" ? (
                null
            ) : (
                    <div className="user-list-button-col">
                        {addFriendButton}
                    </div>
                )}

        </div>
    )
}

export default UserListItem;