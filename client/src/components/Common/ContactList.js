import React, { useContext, useState, useEffect  } from 'react';
import UserListGroup from './UserListGroup';

export default function ContactList(props) {
    var UserListGroupItem = <div>Nothing here...</div>;

    if (props.users !== null && typeof props.users !== 'undefined') {
        UserListGroupItem = props.users.map((group, key) => <UserListGroup key={key} type="USER_LIST_GROUP" listType={props.listType} letter={group.letter} users={group.names} />);
    }
    
    return (
        <div className="contact-list full-width col">
            { UserListGroupItem }
        </div>
    );
}
