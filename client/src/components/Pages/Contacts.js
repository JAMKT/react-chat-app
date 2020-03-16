import React, { useEffect, useContext, useState } from 'react'
import MainNavbar from '../Common/MainNavbar';
import ContactList from '../Common/ContactList';
import MainMessageChat from '../Common/MainMessageChat';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const Contacts = (props) => {
    const auth = useContext(AuthContext);
    const [contacts, setContacts] = useState(null);
    const [users, setUsers] = useState(null);
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
                setUsers(null);
            })
            .catch(err => console.log(err));
    }

    function contactHandler() {
        setSearching(true);
        let unorderedContactList = [];
        if (contacts){
            contacts.forEach(contact => {
                let contactObj = {
                    id: contact.user,
                    username: contact.username,
                    nickname: contact.nickname
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

    const selectContact = (id) => {
        let redirectObj = {
            id: id,
            location: "CONTACT_PAGE"
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
                                <h1 className="margin-sm">Contacts</h1>
                            </div>
                            <div className="row">
                                <div className="search-field">
                                    <img src={process.env.PUBLIC_URL + '/icons/search-solid.svg'} alt=""/>
                                    <input id="contact-search" className='hide-input-field' type="text" onChange={ contactHandler } />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row scrollable">
                        <ContactList listType="DEFAULT_CHAT" users={ users } selectContact={ selectContact } getContactList={ getContactList }/>
                    </div>
                </div>
                <div className="col hide-on-mobile">
                        
                </div>
            </div>
        </div>
    )
}

export default Contacts;