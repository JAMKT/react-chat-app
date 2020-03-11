import React from 'react'
import UserListItem from './UserListItem';

export default function UserListGroup(props) {

    const userArray = props.users.map((user, key, index )=> 
        <UserListItem 
            type={props.type} 
            listType={props.listType} 
            key={key} 
            index={key} 
            name={user.username}
            getMembersData={props.getMembersData}
            id={user.id}
            selectContact={ props.selectContact }
        />
    );

    return (
        <div className="row full-width border-bottom">
            <div className="alphabet-letter-col margin-sm">
                <div>{props.letter}</div>
            </div>
            
            <ul className="col">
                { userArray }
            </ul>
        </div>
    )
}
