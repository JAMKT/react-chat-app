import React, { useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../context/authContext';

export default function UserListItem(props) {
    const userContext = useContext(AuthContext);

    const apiCall = (event) => {
        event.preventDefault();

        axios.get('/api/users/new-contact/' + event.target.id)
            .then((newContact) => {
                console.log(newContact)
            })
            .catch(err => {
                console.log("ERRORING HERE")
                console.log(err)
            });
    }


    const createChat = (username) => {

        const data = {
            members: [
                {username: username},
                {username: userContext.currUser.username}
            ]
        }
        
        console.log(data);

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.post('/api/chats', data, config)
            .then(
                (shit) => {
                    console.log(shit);
                }
            )
            .catch(err => console.log(err));
    }

    return (
        <div className="user-list-item padding-20 row" onClick={() => createChat(props.name)}>
            { /* Column just for the user image */}
            <div className="user-list-img-col">
                <img src="https://via.placeholder.com/64" />
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
                        <button onClick={apiCall} id={props.name}>Add friend</button>
                    </div>
                )}

        </div>
    )
}
