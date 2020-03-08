import React, { useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext';

export default function UserListItem(props) {
    const userContext = useContext(AuthContext);

    const apiCall = (event) => {
        event.preventDefault();

        axios.get('/api/users/new-contact/' + event.target.id)
            .then((newContact) => {
            })
            .catch(err => {
                console.log(err);
            });

        createChat(props.name);
    }

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
            .then(chats => {
                // ...
            })
            .catch(err => console.log(err));
    }

    let addFriendButton;
    if (props.alreadyAdded === "Already a friend") {
        addFriendButton = "";
    } else {
        addFriendButton = <button onClick={apiCall} id={props.name}>Add friend</button>;
    }

    let createGroupChatBtn;
    if (props.listType === "GROUP_CHAT") {
        createGroupChatBtn = (
            <div className="group-checkbox-col justify-center">
                <div className="checkbox-wrap">
                    <input className="checkbox" type="checkbox" id={"checkbox_"+ props.index+props.name } />
                    <label className="checkmark" htmlFor={"checkbox_"+ props.index+props.name} ></label>
                </div>
            </div>
        );
    } else {
        createGroupChatBtn = "";
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
            {props.type === "USER_LIST_GROUP" ? (
                    {createGroupChatBtn}
            ) : (
                    <div className="user-list-button-col">
                        {addFriendButton}
                    </div>
                )
            }

        </div>
    )
}
