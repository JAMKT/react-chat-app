import React, { Component } from 'react'
import MainNavbar from '../Common/MainNavbar'
import UserList from '../Common/UserList';

export default class All extends Component {
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="side-col grey-bg full-height">
                        <div class="row shadow">
                            <div class="col padding-32">
                                <MainNavbar />
                                <div class="row">
                                    <h1 class="margin-sm">Messages</h1>
                                </div>
                                <div class="row">
                                    <div class="search-field">
                                        <img src={process.env.PUBLIC_URL + '/icons/search-solid.svg'} />
                                        <input class='hide-input-field' type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <UserList />
                        </div>
                        
                    </div>
                    <div class="col">
                         All Chat
                    </div>
                </div>
            </div>
        )
    }
}
