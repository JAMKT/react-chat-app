import React, { useEffect, useContext } from 'react'
import MainNavbar from '../Common/MainNavbar';
import SettingItem from '../Common/SettingItem';
import { AuthContext } from '../context/authContext';


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
                <div className="side-col grey-bg full-height">
                    <div className="row shadow">
                        <div className="col padding-32">
                            <MainNavbar />

                            <div className="row">
                                <h1 className="margin-sm">Profile</h1>
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