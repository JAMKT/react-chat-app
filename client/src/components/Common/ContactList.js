import React, { useContext, useState, useEffect  } from 'react';
import UserListGroup from './UserListGroup';
import AlphabeticalSlider from './AlphabeticalSlider';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

export default function ContactList(props) {

    const [contacts, setContacts] = useState([]);

    const getContactList = () => {
        axios.get('/api/users/current-user')
            .then(user => {
                setContacts(user.data.contacts);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getContactList();
    })

    function ContactHandler() {
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
            alphabeticalContactGroup.names = orderedContactList.filter(contact => contact.username.charAt(0).toUpperCase() === letter.toUpperCase())
            alphabeticalContactGroupList.push(alphabeticalContactGroup);
        });

        const UserListGroupItem = alphabeticalContactGroupList.map((group, key) => <UserListGroup key={key} type="USER_LIST_GROUP" listType={props.listType} letter={group.letter} users={group.names} checkedUser={props.checkedUser}/>);
        
        return (
            <div className="contact-list full-width col">
                { UserListGroupItem }
                <AlphabeticalSlider />
            </div>
        )
    }

    return (
        <ContactHandler />
    )
}
