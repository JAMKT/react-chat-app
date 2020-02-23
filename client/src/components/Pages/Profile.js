import React, { Component } from 'react'
import MainNavbar from '../Common/MainNavbar';
import SettingItem from '../Common/SettingItem';

export default class Profile extends Component {
    render() {
        return (
             <div class="container">
                <div class="row">
                    <div class="side-col grey-bg full-height">
                        <div class="row shadow">
                            <div class="col padding-32">
                                <MainNavbar />
                                <div class="row">
                                    <h1 class="margin-sm">Settings</h1>
                                </div>
                            </div>
                        </div>
                        <div class="row padding-32">
                            <div class="col"> 
                                <div class="row justify-center padding-20">
                            <img class="setting-profile-image" src="https://via.placeholder.com/160" />
                            </div>
                            <div class="row justify-center">
                                <h2>Username</h2>
                            </div>
                            <div class="row">
                                <h4>Setting group name</h4>
                            </div>
                            <SettingItem />
                            </div>
                        </div>
                        
                    </div>
                    <div class="col full-width full-height blue-bg">
                         
                    </div>
                </div>
            </div>
        )
    }
}
