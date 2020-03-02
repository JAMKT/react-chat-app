import React, { Component } from 'react';
import MainNavbar from '../Common/MainNavbar';
import UserList from '../Common/UserList';
import axios from 'axios';

const AddContact = () => {
    const apiCall = (event) => {
        event.preventDefault();
        
        axios.get('/api/users/new-contact/' + document.getElementById("username").value)
            .then((newContact) => {
                if (newContact.data.newContact) {
                    window.location.href = "/all";
                } else {
                    window.location.href = "/login";
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="side-col absolute-center-pin grey-bg full-height">
                    <div className="row shadow">
                        <div className="col padding-24">
                            <MainNavbar />
                            <div className="row">
                                <h1 className="margin-sm">Find Friends</h1>
                            </div>
                            <div className="row">
                                <div className="search-field">
                                    <img src={process.env.PUBLIC_URL + '/icons/search-solid.svg'} />
                                    <form onSubmit={apiCall}>
                                        <input id="username" className='hide-input-field' type="text" />
                                        <input type="submit" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row scrollable">
                        <UserList />
                    </div>

                </div>
                <div className="col">

                </div>
            </div>
        </div>
    )
}

export default AddContact;