import React, { useContext } from 'react'
import UserListItem from './UserListItem';
import UserListGroup from './UserListGroup';
import AlphabeticalSlider from './AlphabeticalSlider';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

export default function ContactList(props) {

    function ContactHandler() {
        const userContext = useContext(AuthContext);
        let unorderedContactList = new Array;
        if (userContext.currUser.contacts){
            
            userContext.currUser.contacts.forEach(contact => {
                let contactObj = {
                    username: contact.username
                }
                unorderedContactList.push(contactObj);
            })
        }
        console.log(unorderedContactList)
        

        /* Creating an ordered contact list */
        let orderedContactList = unorderedContactList.sort(
            function (a, b) {
                console.log(a)
                console.log(b)
                let nameA = a.username.toUpperCase();
                let nameB = b.username.toUpperCase();
                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            }
        );

        /* Creating a list of unique letters from the ordered list */
        let uniqueLetterList = new Array();
        orderedContactList.forEach(contact => {
            
            let character = contact.username.charAt(0);
            if (!uniqueLetterList.includes(character)) {
                console.log(character);
                uniqueLetterList.push(character);
            }
        })

        let alphabeticalContactGroupList = new Array();

        uniqueLetterList.forEach(letter => {
            let alphabeticalContactGroup = {
                letter: '',
                names: []
            }
            alphabeticalContactGroup.letter = letter.toUpperCase();
            alphabeticalContactGroup.names = orderedContactList.filter(contact => contact.username.charAt(0).toUpperCase() === letter.toUpperCase())
            alphabeticalContactGroupList.push(alphabeticalContactGroup);
        });
        console.log(alphabeticalContactGroupList);

        const UserListGroupItem = alphabeticalContactGroupList.map((group, key) => <UserListGroup key={key} type="USER_LIST_GROUP" letter={group.letter} users={group.names} />);
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
