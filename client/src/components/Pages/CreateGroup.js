import React, { useEffect, useContext, useState } from 'react'
import MainNavbar from '../Common/MainNavbar'
import ContactList from '../Common/ContactList';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const CreateGroup = (props) => {
    const auth = useContext(AuthContext);
    const [memberName, setMemberName] = useState(null);
    const [users, setUsers] = useState([]);
    const [members, setMembers] = useState(null);

    useEffect(() => {
        if (auth.currUser === false) {
            props.history.push('/login')
        }
    });

    useEffect(() => {
        axios.get('/api/users')
            .then(users => { setUsers(users); })
            .catch(err => console.log(err));
    }, []);

    // Get username from UserListItem.js
    const checkedUser = (event) => {
        // getUsers();

        // if (event.target.checked === true && users !== null) {
        //     for (let user = 0; user < users.length; user++) {
        //         if (event.target.id === user.username) {
        //             setMemberName(user.username);
        //             console.log(user.username);
        //         }
        //     }
        // }

        if (event.target.checked === true && users !== []) {
            console.log('-----');
            console.log(event.target.id);
            console.log('-----');

            for (let user = 0; user < users.length; user++) {
                if (event.target.id === user.username) {
                    setMemberName(user.username);
                    console.log(user.username);
                }
            }
        }
    }

    // Create a group chat
    const createGroupChat = (event) => {
        event.preventDefault();

        let membersArray = [];
        membersArray.push(memberName);

        setMembers(membersArray);
        console.log(membersArray);

        // const data = {
        //     members: [members]
        // };

        // const config = {
        //     withCredentials: true,
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // };

        // axios.post('/api/chats', data, config)
        //     .then(() => {})
        //     .catch(err => console.log(err));
    };

    return (
        <div className="container">
            <div className="row">
                <div className="side-col absolute-center-pin grey-bg full-height">
                    <div className="row shadow">
                        <div className="col padding-24">
                            <MainNavbar />
                            <div className="row">
                                <h1 className="margin-sm">Create a Group</h1>
                            </div>
                            <div className="row">
                                <div className="search-field">
                                    <img src={process.env.PUBLIC_URL + '/icons/search-solid.svg'} alt=""/>
                                    <input className='hide-input-field' type="text" />
                                </div>
                            </div>
                            {/* TODO: Make this section dynamic */}
                            <div className="row margin-top-sm">
                                <div className="user-added-to-group justify-center text-center">
                                    <div>
                                        <img src="https://via.placeholder.com/72" alt=""/>
                                        <h5>Username</h5>
                                    </div>
                                    <span className="user-group-remove">X</span>
                                </div>

                                <input type="submit" onClick={createGroupChat}/>
                            </div>
                        </div>
                    </div>
                    <div className="row scrollable">
                        <ContactList type="CREATE_GROUP" listType="GROUP_CHAT" checkedUser={checkedUser}/>
                    </div>
                    
                </div>
                <div className="col">
                     
                </div>
            </div>
        </div>
    )
}

export default CreateGroup;
