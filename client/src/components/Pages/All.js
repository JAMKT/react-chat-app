import React, { Component } from 'react'
import MainNavbar from '../Common/MainNavbar';
import UserList from '../Common/UserList';
import MainMessageChat from '../Common/MainMessageChat';
import axios from 'axios';

export default class All extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="side-col grey-bg full-height">
                        <div className="row shadow">
                            <div className="col padding-24">
                                <MainNavbar />
                                <div className="row">
                                    <h1 className="margin-sm">Messages</h1>
                                </div>
                                <div className="row">
                                    <div className="search-field">
                                        <img src={process.env.PUBLIC_URL + '/icons/search-solid.svg'} />
                                        <input className='hide-input-field' type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row scrollable">
                            <UserList />
                        </div>

                    </div>
                    <div className="col hide-on-mobile">
                        <MainMessageChat />
                    </div>
                </div>
            </div>
        )
    }
}
