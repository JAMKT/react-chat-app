import React, { useContext } from 'react'
import UserListItem from './UserListItem';
import { AuthContext } from '../context/authContext';

const UserList = (props) => {
    const userContext = useContext(AuthContext);
    console.log(userContext);
    if(props.searching === true){
        return (
            <div className="user-list col">
                Searching
            </div>
        )
    } else if(props.users === null || props.users === []){
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
                        return <UserListItem key={index} name={user.username} id={user._id} />
                    })
                }
            </div>
    )} else {
        console.log(props.users)
        return(
            
            <div className="user-list col">
                Sorry, we found no users T_T
                <br></br>
                
            </div>
        )
    }
}

export default UserList;
