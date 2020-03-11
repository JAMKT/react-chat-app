import React, { useContext, useState, useEffect  } from 'react';
import UserListGroup from './UserListGroup';

export default function ContactList(props) {
    var UserListGroupItem = <div>Nothing here...</div>;

    if(props.groups !== null && typeof props.groups !== 'undefined'){
        UserListGroupItem = props.groups.map((group, key) => <UserListGroup key={key} type="USER_LIST_GROUP" listType={props.listType} letter={group.letter} users={group.names} />);
    }
    
    return (
        <div className="contact-list full-width col">
            { UserListGroupItem }
        </div>
    );
}
