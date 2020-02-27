import React from 'react'
import UserListItem from './UserListItem';

export default function UserListGroup(props) {

    const userArray = props.users.map(user => <UserListItem name={user.name} />);

    return (
        <div className="row full-width border-bottom">
            <div className="alphabet-letter-col margin-sm">
                <div>{props.letter}</div>
            </div>
            
            <ul className="col">
                {userArray}
            </ul>
        </div>
    )
}
