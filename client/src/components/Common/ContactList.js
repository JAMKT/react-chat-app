import React, { useContext, useState, useEffect  } from 'react';
import UserListGroup from './UserListGroup';
import { AuthContext } from '../context/authContext';

export default function ContactList(props) {
    const auth = useContext(AuthContext);
    const [members, setMembers] = useState([auth.currUser.username]);

    let UserListGroupItem;

    const getData = (data, bool) => {
        // If the user is checked, push it to the members array
        // If the user is not checked anymore, remove it from the array
        if (bool === true) {
            setMembers([...members, data]);
        } else {
            const m = members.indexOf(data);
            if (m > -1) {
                members.splice(m, 1);
            }
        }
    };

    useEffect(() => {
        if (props.listType === "GROUP_CHAT") {
            props.getMembersData(members);
        }
    });

    if (props.users !== null && typeof props.users !== 'undefined') {
        if (props.listType === "GROUP_CHAT") {
            UserListGroupItem = props.users.map((user, key) =>
                <UserListGroup 
                    key={key} 
                    type="USER_LIST_GROUP" 
                    listType={props.listType} 
                    letter={user.letter} 
                    users={user.names} 
                    getMembersData={getData}
                    selectContact={ props.selectContact }
                />
            );
        } else {
            UserListGroupItem = props.users.map((user, key) =>
                <UserListGroup 
                    key={key} 
                    type="USER_LIST_GROUP" 
                    listType={props.listType} 
                    letter={user.letter} 
                    users={user.names}
                    selectContact={ props.selectContact }
                />
            );
        }
    } else {
        UserListGroupItem = <div>Nothing here...</div>;
    }
    
    return (
        <div className="contact-list full-width col">
            { UserListGroupItem }
        </div>
    );
}
