import React, { useContext } from 'react'
import UserListItem from './UserListItem';
import { AuthContext } from '../context/authContext';

const UserList = (props) => {
    const userContext = useContext( AuthContext );

    if(props.searching === true){
        return (
            <div className="user-list col">
                Searching...
            </div>
        )
    } else if(props.users === null || props.users === [] || props.users === undefined){
        return(
            <div className="user-list col">
                Here you can search for users.
            </div>
        )
    } else if (props.users !== null && props.users !== [] && props.users !== undefined) {
        return (
            <div className="user-list col">
                {
                    props.users.map((user, index) => {
                        if (userContext.currUser.contacts) {
                            let newUserContactsArray = new Array();
                            userContext.currUser.contacts.forEach(contact => {
                                
                                let contactId = contact.user;
                                newUserContactsArray.push(contactId);
                            });
                            console.log(user);
                            console.log(newUserContactsArray);
                             if (newUserContactsArray.includes(user._id)) {
                                return <UserListItem key={index} name={user.username} id={user._id} alreadyAdded="Already a friend" />
                            } else {
                                return <UserListItem key={index} name={user.username} id={user._id} alreadyAdded=""/>
                            }
                        }
                       
                        
                    })
                }
            </div>
    )} else {
        return(
            
            <div className="user-list col">
                Sorry, we found no users T_T
                <br></br>
                
            </div>
        )
    }
}

export default UserList;
