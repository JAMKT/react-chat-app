import React, { Component, useContext } from 'react'
import MainNavbar from '../Common/MainNavbar';
import SettingItem from '../Common/SettingItem';
import { AuthContext } from '../context/authContext';


const Profile = () => {
        const auth = useContext(AuthContext);

        return (
          
             <div className="container">
                 {console.log('this is the current user from the profile page')}
                 {console.log(auth.currUser)}
                 {auth.loggedIn && <div>logged in!</div>}
                 {!auth.loggedIn && <div>not logged in!</div>}

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

export default Profile;