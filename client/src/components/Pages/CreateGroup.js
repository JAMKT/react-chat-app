import React, { useEffect, useContext, useState } from 'react'
import MainNavbar from '../Common/MainNavbar'
import ContactList from '../Common/ContactList';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import Button from '../Common/Button/Button';

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

    // Get Contact List + update "contacts" state
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
                    username: contact.username,
                    userId: contact.user
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

    // Get data from UserListItem.js
    const getMembersData = (data) => {
        // Update members state with new data
        setMembers(data);
    }
    
    // Display members selected to be in the group chat
    // Loop through members-state and display each member
    let displayMembers = members.map((member, key) => {
        return (
            <div className="user-list-img-col side-padding-8" key={key}>
                <div className="svg-container">
                    <div className="checkbox-wrap">
                        <label 
                            className="checkmark checkmark-checked" 
                            htmlFor={"checkbox_" + member.key + member.name}>
                        </label>
                    </div>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14 svg-avatar-nav svg-group-avatar" role="img" viewBox="0 0 448 512"><path
                        fill={member.color}
                        d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                    </svg>
                </div>
                <h5 className="text-center margin-xs">{member.username}</h5>
            </div>
        )
    });
    

    // Create a group chat
    const createGroupChat = () => {
        // Loop through members-state and return the username of each user
        const memb = members.map((member) => {
            return member.username;
        });
        // Push the current user's username to the array
        memb.push(auth.currUser.username);
       
       const data = {
            members: memb
        };
        
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios.post('/api/chats', data, config)
            .then((createdChat) => {
                selectContact(createdChat.data._id)
            })
            .catch(err => console.log(err));
    };

    const selectContact = (id) => {
        let redirectObj = {
            id: id,
            location: "CREATE_GROUP_PAGE"
        }
        auth.loadFromRedirect = redirectObj;
        props.history.push('/all');
    }

    return (
        <div className="container">
            <div className="row">
                <div className="side-col absolute-center-pin white-bg full-height">
                    <div className="row shadow">
                        <div className="col padding-24 shadow">
                            <MainNavbar />

                            <div className="row">
                                <h1 className="margin-sm">Create a Group</h1>
                            </div>

                            <div className="row">
                                <div className="search-field">
                                    <img src={process.env.PUBLIC_URL + '/icons/search-solid.svg'} alt=""/>
                                    <input id="contact-search" className='hide-input-field' type="text" onChange={ contactHandler }/>
                                </div>
                            </div>
                            
                            <div className="row margin-top-sm selected-members-wrap">
                                {members.length === 0 ? (
                                    <p className="bold-font text-center margin-bot-sm full-width">
                                        Please select members for the group chat
                                    </p>
                                ) : displayMembers}
                            </div>
                     
                            <Button
                                type="submit"
                                value="Create group"
                                btnStyle="Button margin-xs button-submit"
                                disabledBtn={members.length === 0}
                                click={createGroupChat}> Create group
                            </Button>
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
