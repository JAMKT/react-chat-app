import React from 'react'
import { Link } from 'react-router-dom';

export default function MainNavbar() {
    return (
        <nav className="row">
            <div className="navbar-profile">
                <Link to="/profile">
                    <img src="https://via.placeholder.com/78" />
                </Link>
            </div>
            <ul className="remove-list-style navbar-icon-list">
                <li className="absolute-center-pin">
                    <Link to="/all"><img className="absolute-center" src={process.env.PUBLIC_URL + '/icons/comment-solid.svg'} /></Link>
                </li>
                <li className="absolute-center-pin">
                    <Link to="/contacts"><img className="absolute-center" src={process.env.PUBLIC_URL + '/icons/address-book-solid.svg'} /></Link>
                </li>
                <li className="absolute-center-pin">
                    <Link to="/create-group"><img className="absolute-center" src={process.env.PUBLIC_URL + '/icons/group-plus.svg'} /></Link>
                </li>
                <li className="absolute-center-pin">
                    <Link to="/add-contact"><img className="absolute-center" src={process.env.PUBLIC_URL + '/icons/contact-plus.svg'} /></Link>
                </li>
            </ul>
        </nav>
    )
}
