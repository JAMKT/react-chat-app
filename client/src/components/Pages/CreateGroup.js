import React, { useEffect, useContext, useState } from 'react'
import MainNavbar from '../Common/MainNavbar'
import ContactList from '../Common/ContactList';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const CreateGroup = (props) => {
    const auth = useContext(AuthContext);
    const [contacts, setContacts] = useState(null);
    const [users, setUsers] = useState(null);
    const [members, setMembers] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        if(contacts === null){
            getContactList();
        }
        if (auth.currUser === false) {
            props.history.push('/login')
        }
        if (users === null && contacts !== null) {
            contactHandler();
        }
        
    })

    const getContactList = () => {
        axios.get('/api/users/current-user')
            .then(user => {
                setContacts(user.data.contacts);
            })
            .catch(err => console.log(err));
    }

    function contactHandler() {
        setSearching(true);
        let unorderedContactList = [];
        if (contacts){
            contacts.forEach(contact => {
                let contactObj = {
                    username: contact.username
                }
                unorderedContactList.push(contactObj);
            })
        }

        /* Creating an ordered contact list */
        let orderedContactList = unorderedContactList.sort(
            function (a, b) {
                let nameA = a.username.toUpperCase();
                let nameB = b.username.toUpperCase();
                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            }
        );

        /* Creating a list of unique letters from the ordered list */
        let uniqueLetterList = [];
        orderedContactList.forEach(contact => {
            
            let character = contact.username.charAt(0);
            if (!uniqueLetterList.includes(character)) {
                uniqueLetterList.push(character);
            }
        })

        let alphabeticalContactGroupList = [];

        uniqueLetterList.forEach(letter => {
            let alphabeticalContactGroup = {
                letter: '',
                names: []
            }
            alphabeticalContactGroup.letter = letter.toUpperCase();
            if(users === null){
                alphabeticalContactGroup.names = orderedContactList.filter(contact => contact.username.charAt(0).toUpperCase() === letter.toUpperCase());
            } else {
                alphabeticalContactGroup.names = orderedContactList.filter(contact => contact.username.charAt(0).toUpperCase() === letter.toUpperCase() && contact.username.toUpperCase().indexOf((document.getElementById("contact-search").value.toUpperCase())) !== -1);
            }
            
            if(alphabeticalContactGroup.names.length > 0){
                alphabeticalContactGroupList.push(alphabeticalContactGroup);
            }
            
        });

        setUsers(alphabeticalContactGroupList);
        setSearching(false);
    }

    // Get data from UserListItem
    const getMembersData = (data) => {
        setMembers(data);
        console.log(members);
    }

    // Create a group chat
    const createGroupChat = () => {
        const data = {
            members: members
        };

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.post('/api/chats', data, config)
            .then(() => {})
            .catch(err => console.log(err));
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
                            <div className="row margin-top-sm">
                                {/* TODO: Make this section dynamic */}
                                <div className="user-added-to-group justify-center text-center">
                                    <div>
                                        <img src="https://via.placeholder.com/72" alt=""/>
                                        <h5>Username</h5>
                                    </div>
                                    <span className="user-group-remove">X</span>
                                </div>

                                <input type="submit" value="Create group" onClick={createGroupChat}/>
                            </div>
                        </div>
                    </div>
                    <div className="row scrollable">
                        <ContactList type="CREATE_GROUP" listType="GROUP_CHAT" users={ users } getMembersData={getMembersData}/>
                    </div>
                    
                </div>
                <div className="col">
                     
                </div>
            </div>
        </div>
    )
}

export default CreateGroup;
