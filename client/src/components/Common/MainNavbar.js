import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const MainNavbar = (props) => {
    var user = useContext(AuthContext);

    const highlightNavbarIcon = () => {
        let path = window.location.pathname;
        if (path === '/all' || path === '/contacts' || path === '/create-group' || path === '/add-contact') {
            document.getElementById('link'+window.location.pathname).classList.add('blue-shadow');
        }
        
    }
    
    useEffect(() => {
        highlightNavbarIcon()
    })

    return (
        <nav className="row">
            <div className="navbar-profile navbar-profile-mobile">
                <Link to="/profile">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14 svg-avatar-nav absolute-center svg-avatar-nav-mobile" role="img" viewBox="0 0 448 512"><path fill={user.currUser.avatarColor} d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                </Link>
            </div>
            <ul id='link-list' className="remove-list-style navbar-icon-list nav-bar-iconlist-mobile">
                <li id={"link/all"} className="absolute-center-pin">
                    <Link to="/all"><img className="absolute-center" src={process.env.PUBLIC_URL + '/icons/comment-solid.svg'} alt=""/></Link>
                </li>
                <li id={"link/contacts"} className="absolute-center-pin">
                    <Link to="/contacts"><img className="absolute-center" src={process.env.PUBLIC_URL + '/icons/address-book-solid.svg'} alt=""/></Link>
                </li>
                <li id={"link/create-group"} className="absolute-center-pin">
                    <Link to="/create-group"><img className="absolute-center" src={process.env.PUBLIC_URL + '/icons/group-plus.svg'} alt=""/></Link>
                </li>
                <li id={"link/add-contact"} className="absolute-center-pin">
                    <Link to="/add-contact"><img className="absolute-center" src={process.env.PUBLIC_URL + '/icons/contact-plus.svg'} alt=""/></Link>
                </li>
            </ul>
        </nav>
    )
}

export default MainNavbar;