import React from 'react'
import UserListItem from './UserListItem';

export default function UserListGroup(props) {

    const userArray = props.users.map((user, key, index ) => {
        console.log(user);
        return (
            <UserListItem 
            type={props.type} 
            listType={props.listType} 
            key={key} 
            index={key} 
            name={user.username}
            getMembersData={props.getMembersData}
            id={user.id}
            userId={user.userId}
            selectContact={ props.selectContact }
            nickname={user.nickname}
            getContactList={props.getContactList}

        />
        );
    });

    return (
        <div className="row full-width border-bottom z-index--1">
            <div className="alphabet-letter-col margin-sm">
                <div>{props.letter}</div>
            </div>
            <ul className="col">
                { userArray }
            </ul>
        </div>
    )
}
