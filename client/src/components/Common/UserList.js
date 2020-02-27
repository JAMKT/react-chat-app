import React, { Component } from 'react'
import UserListItem from './UserListItem';

export default class UserList extends Component {
    render() {
        return (
            <div className="user-list col">
                <UserListItem name="placeholder" time="placeholder" unread="placeholder" />
                <UserListItem name="placeholder" time="placeholder" unread="placeholder" />
                <UserListItem name="placeholder" time="placeholder" unread="placeholder" />
                <UserListItem name="placeholder" time="placeholder" unread="placeholder" />
                <UserListItem name="placeholder" time="placeholder" unread="placeholder" />
                <UserListItem name="placeholder" time="placeholder" unread="placeholder" />
                <UserListItem name="placeholder" time="placeholder" unread="placeholder" />
                <UserListItem name="placeholder" time="placeholder" unread="placeholder" />
            </div>
        )
    }
}
