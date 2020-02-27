import React, { Component } from 'react'
import MainNavbar from '../Common/MainNavbar';
import SettingItem from '../Common/SettingItem';


export default class Profile extends Component {
    render() {
        return (
             <div className="container">
                <div className="row">
                    <div className="side-col grey-bg full-height">
                        <div className="row shadow">
                            <div className="col padding-32">
                                <MainNavbar />
                                <div className="row">
                                    <h1 className="margin-sm">Settings</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row padding-32">
                            <div className="col"> 
                                <div className="row justify-center padding-20">
                            <img className="setting-profile-image" src="https://via.placeholder.com/160" />
                            </div>
                            <div className="row justify-center">
                                <h2>Username</h2>
                            </div>
                            <div className="row">
                                <h4>Edit Profile</h4>
                            </div>
                            <SettingItem />
                            </div>
                        </div>
                        
                    </div>
                    <div className="col full-width full-height blue-bg">
                         
                    </div>
                </div>
            </div>
        )
    }
}
