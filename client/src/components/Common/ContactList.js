import React, { useContext, useState, useEffect  } from 'react';
import UserListGroup from './UserListGroup';
import { AuthContext } from '../context/authContext';

export default function ContactList(props) {
    const auth = useContext(AuthContext);
    const [members, setMembers] = useState([]);

    let UserListGroupItem;

    // Receive user-data from UserListItem.js via getMembersData()
    const getData = (data, bool, color, index) => {
        // If the user is checked, add it to the members state
        if (bool === true) {
            let memberObj = {
                    color: color, 
                    username: data, 
                    key: index, 
                    name: data
                };
            setMembers([...members, memberObj]);
        }
        // If the user is not checked anymore, remove it from the members state
        if (bool === false){
            let m = members.findIndex(x => x.username === data);
            if (m > -1) {
                members.splice(m, 1);
            }
            setMembers([...members]);
        }
    };

    useEffect(() => {
        // Pass in members to GreateGroup.js through the getMembersData() 
        if (props.listType === "GROUP_CHAT") {
            props.getMembersData(members);
        }
    },[members]);

    // Check if there are any users
    if (props.users !== null && typeof props.users !== 'undefined') {
        // Check if it's a group chat
        if (props.listType === "GROUP_CHAT") {
            UserListGroupItem = props.users.map((user, key) =>{
                return (
                    <UserListGroup 
                        key={key} 
                        type="USER_LIST_GROUP" 
                        listType={props.listType} 
                        letter={user.letter} 
                        users={user.names} 
                        getMembersData={getData}
                        selectContact={props.selectContact}/>
                )
            });
        } else {
            // Not a group chat
            UserListGroupItem = props.users.map((user, key) =>
                <UserListGroup 
                    key={key} 
                    type="USER_LIST_GROUP" 
                    listType={props.listType} 
                    letter={user.letter} 
                    users={user.names}
                    selectContact={ props.selectContact }
                    getContactList={ props.getContactList }/>
            );
        }
    } else {
        // No users
        UserListGroupItem = <div>Nothing here...</div>;
    }
    
    return (
        <div className="contact-list full-width col">
            { UserListGroupItem }
        </div>
    );
}
