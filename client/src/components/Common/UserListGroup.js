import React from 'react'
import UserListItem from './UserListItem';

export default function UserListGroup(props) {

    const userArray = props.users.map((user ,key, index )=> <UserListItem type={props.type} key={key} index={key} name={user.username} />);

    return (
        <div className="row full-width border-bottom clickable">
            <div className="alphabet-letter-col margin-sm">
                <div>{props.letter}</div>
            </div>
            
            <ul className="col">
                { userArray }
            </ul>
        </div>
    )
}
