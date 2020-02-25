import React, { Component } from 'react'
import UserListItem from './UserListItem';

export default class UserList extends Component {
    render() {
        return (
            <div class="user-list col">
                <UserListItem />
                <UserListItem />
            </div>
        )
    }
}
