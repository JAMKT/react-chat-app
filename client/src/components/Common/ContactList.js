import React, { useContext, useState, useEffect  } from 'react';
import UserListGroup from './UserListGroup';
import AlphabeticalSlider from './AlphabeticalSlider';

export default function ContactList(props) {
    var UserListGroupItem = <div>Nothing here...</div>;

    if(props.groups !== null){
        UserListGroupItem = props.groups.map((group, key) => <UserListGroup key={key} type="USER_LIST_GROUP" listType={props.listType} letter={group.letter} users={group.names} />);
    }
    
    return (
        <div className="contact-list full-width col">
            { UserListGroupItem }
            <AlphabeticalSlider />
        </div>
    );
}
