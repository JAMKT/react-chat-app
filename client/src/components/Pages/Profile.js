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

                                <div class="row">
                                    <h1 class="margin-sm">Profile</h1>
                                </div>
                            </div>
                        </div>
                        <SettingItem />
                        
                    </div>
                    <div className="col full-width full-height blue-bg">
                         
                    </div>
                </div>
            </div>
        )
    }
}
