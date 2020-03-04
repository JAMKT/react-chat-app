import React from 'react'
import UserListItem from './UserListItem';
import UserListGroup from './UserListGroup';
import AlphabeticalSlider from './AlphabeticalSlider';
import axios from 'axios';

export default function ContactList(props) {

    function ContactHandler() {
        /* Dummy data */
        // console.log(props.type)
        const dummyUnorderedContactList = [
            { name: "Maria" },
            { name: "Alessia" },
            { name: "Jose" },
            { name: "Tomas" },
            { name: "Mathias" },
            { name: "Mathew" },
            { name: "Lisa" },
            { name: "Jeff" },
            { name: "Brian" },
            { name: "Alex" },
            { name: "Simon" },
            { name: "Zion" },
            { name: "Dave" }
        ];

        /* Creating an ordered contact list */
        let orderedContactList = dummyUnorderedContactList.sort(
            function (a, b) {
                let nameA = a.name.toUpperCase();
                let nameB = b.name.toUpperCase();
                return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            }
        );

        /* Creating a list of unique letters from the ordered list */
        let uniqueLetterList = new Array();
        orderedContactList.forEach(name => {
            let character = name.name.charAt(0);
            if (!uniqueLetterList.includes(character)) {
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
            alphabeticalContactGroup.names = orderedContactList.filter(name => name.name.charAt(0).toUpperCase() === letter.toUpperCase())
            alphabeticalContactGroupList.push(alphabeticalContactGroup);
        });
        console.log(alphabeticalContactGroupList);

        const UserListGroupItem = alphabeticalContactGroupList.map((group, key) => <UserListGroup key={key} type={props.type} letter={group.letter} users={group.names} />);
        return (
            <div className="contact-list full-width col">
                {UserListGroupItem}
                <AlphabeticalSlider />
            </div>

        )
    }
    return (
        <ContactHandler />
    )
}
