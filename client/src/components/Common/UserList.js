import React, { useContext, useEffect } from 'react'
import UserListItem from './UserListItem';
import { AuthContext } from '../context/authContext';

const UserList = (props) => {
    const userContext = useContext(AuthContext);

    if (props.searching === true) {
        return (
            <div className="user-list col padding-20 align-center">
                Searching...
            </div>
        )
    } else if (props.users === null || props.users.length === 0 || props.users === undefined) {
        return (
            <div className="user-list col padding-20 align-center">
                Here you can search for users.
            </div>
        )
    } else if (props.users !== null && props.users.length !== 0 && props.users !== undefined) {
        return (
            <div className="user-list col">
                {
                    // map through all the users found in the search results
                    props.users.map((user, index) => {

                        // check if it's not the curret in user
                        if (userContext.currUser._id !== user._id) {
                            let newUserContactsArray = [];

                            // loop through each user's contacts
                            user.contacts.forEach(contact => {
                                let contactId = contact.user;
                                // push each user's contacts user-id to the newUserContactsArray
                                // (all of the id's of the specific user's contacts, e.g. test_user123's contacts, will be pushed to the array)
                                return newUserContactsArray.push(contactId);
                            });
                            
                            // check if the user has the current-user's-id in their newUserContactsArray
                            if (newUserContactsArray.includes(userContext.currUser._id)) {
                                // if current user is in the other user's contacts list => user is "Already a friend"
                                return <UserListItem key={index} name={user.username} id={user._id} alreadyAdded="Already a friend"/>
                            } else {
                                // if user is not in the contacts list => alreadyAdded is empty
                                return <UserListItem key={index} name={user.username} id={user._id} alreadyAdded="" loadUsers={props.loadUsers}/>
                            }
                        }
                    })
                }
            </div>
        )
    } else {
        return (
            <div className="user-list col">
                Sorry, we found no users T_T
                <br></br>
            </div>
        )
    }
}

export default UserList;
