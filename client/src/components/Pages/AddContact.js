import React, { useEffect, useState, useContext } from 'react';
import MainNavbar from '../Common/MainNavbar';
import UserList from '../Common/UserList';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const AddContact = (props) => {

    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth.currUser === false) {
            props.history.push('/login')
        }
    })

    const [searching, setSearching] = useState(false);
    const [users, setUsers] = useState(null);

    const loadUsers = () => {
        if (document.getElementById("username").value && document.getElementById("username").value != ""){
            setSearching(true);
            
            axios.get('/api/users/searching/' + document.getElementById("username").value)
                .then((response) => {
                    console.log(response);
                    setUsers(response.data);
                    setSearching(false);
                })
                .catch(err => console.log(err));
        }
    }

    useEffect(() => {

    })

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
                                    <input onChange={loadUsers} id="username" className='hide-input-field' type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row scrollable">
                        <UserList searching={searching} users={users} />
                    </div>

                </div>
                <div className="col">

                </div>
            </div>
        </div>
    )
}

export default AddContact;