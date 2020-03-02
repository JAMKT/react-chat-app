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
                                    <h1 class="margin-sm">Profile</h1>
                                </div>
                            </div>
                        </div>
                        <SettingItem />
                        
                    </div>
                    <div class="col full-width full-height blue-bg">
                         
                    </div>
                </div>
            </div>
        )
    }
}
