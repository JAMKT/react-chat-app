import React from 'react'
import { Link } from 'react-router-dom';

export default function MainNavbar() {
    return (
        <nav class="row">
            <div class="navbar-profile">
                <Link to="/Profile">
                    <img src="https://via.placeholder.com/78" />
                </Link>
            </div>
            <ul class="remove-list-style navbar-icon-list">
                <li class="absolute-center-pin">
                    <Link to="/All"><img class="absolute-center" src={process.env.PUBLIC_URL + '/icons/comment-solid.svg'} /></Link>
                </li>
                <li class="absolute-center-pin">
                    <Link to="/Contacts"><img class="absolute-center" src={process.env.PUBLIC_URL + '/icons/address-book-solid.svg'} /></Link>
                </li>
                <li class="absolute-center-pin">
                    <Link to="/CreateGroup"><img class="absolute-center" src={process.env.PUBLIC_URL + '/icons/group-plus.svg'} /></Link>
                </li>
                <li class="absolute-center-pin">
                    <Link to="/AddContact"><img class="absolute-center" src={process.env.PUBLIC_URL + '/icons/contact-plus.svg'} /></Link>
                </li>
            </ul>
        </nav>
    )
}
