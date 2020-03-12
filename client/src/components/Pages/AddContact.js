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

    // Update "users" the state with users found in the search
    // Load function when input field changes + when the "Add Friend" button is clicked
    const loadUsers = () => {
        if (document.getElementById("username").value && document.getElementById("username").value !== ""){
            setSearching(true);
            
            // get users that have matching letters in the search field
            axios.get('/api/users/searching/' + document.getElementById("username").value)
                .then((response) => {
                    // update "users" the state with the users that have matching letters/are found by the search result
                    setUsers(response.data);
                    setSearching(false);
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="side-col absolute-center-pin white-bg full-height">
                    <div className="row shadow">
                        <div className="col padding-24 shadow">
                            <MainNavbar />
                            <div className="row">
                                <h1 className="margin-sm">Find Friends</h1>
                            </div>
                            <div className="row">
                                <div className="search-field">
                                    <img src={process.env.PUBLIC_URL + '/icons/search-solid.svg'} alt=""/>
                                    <input onChange={loadUsers} id="username" className='hide-input-field' type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row scrollable">
                        <UserList searching={searching} users={users} loadUsers={loadUsers}/>
                    </div>

                </div>
                <div className="col">

                </div>
            </div>
        </div>
    )
}

export default AddContact;