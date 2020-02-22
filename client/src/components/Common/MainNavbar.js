import React from 'react'
import { Link } from 'react-router-dom';

export default function MainNavbar() {
    return (
        <div>
            <Link to="/All">All</Link>
            <Link to="/Contacts">Contacts</Link>
            <Link to="/CreateGroup">CreateGroup</Link>
            <Link to="/AddContact">AddContact</Link>
        </div>
    )
}
