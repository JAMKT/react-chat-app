import React, { Component } from 'react'
import MainNavbar from '../Common/MainNavbar';
import ContactList from '../Common/ContactList';
import MainMessageChat from '../Common/MainMessageChat';

export default class Contacts extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="side-col absolute-center-pin grey-bg full-height">
                        <div className="row shadow">
                            <div className="col padding-24">
                                <MainNavbar />
                                <div className="row">
                                    <h1 className="margin-sm">Contacts</h1>
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
                            <ContactList />
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
