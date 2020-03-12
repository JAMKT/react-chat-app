import React, { useEffect, useContext } from 'react'
import MainNavbar from '../Common/MainNavbar';
import SettingItem from '../Common/SettingItem';
import { AuthContext } from '../context/authContext';
import logoutSVG from '../images/sign-out-alt-solid.svg';

const Profile = (props) => {
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth.currUser === false) {
            props.history.push('/login')
        }
    })

    return (
            <div className="container">
            <div className="row">
                <div className="side-col white-bg full-height">
                    <div className="row shadow">
                        <div className="col padding-24 shadow">
                            <MainNavbar />

                            <div className="row space-between">
                                <h1 className="margin-sm">Profile</h1>
                                <div className="text-center cursor-pointer margin-sm" onClick={() => auth.logout()}>
                                    <img  className="svg-inline--fa fa-sign-out-alt fa-w-16" src={logoutSVG}/>
                                    <p>Logout</p>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <SettingItem auth={auth.currUser} />
                </div>
                <div className="col full-width full-height blue-bg">
                        
                </div>
            </div>
        </div>
    )
}

export default Profile;