import React, { useEffect } from 'react'
import MainNavbar from '../Common/MainNavbar';
import UserList from '../Common/UserList';
import MainMessageChat from '../Common/MainMessageChat';

import io from 'socket.io-client';
let socket;
const ENDPOINT = 'http://localhost:3000';

// Hooks do not work on class-based components, so All needs to be a function component
const All = () => {
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit('join', {});
    }, [ENDPOINT]);

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

export default All;
