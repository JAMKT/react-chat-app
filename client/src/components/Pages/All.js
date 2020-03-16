import React, { useEffect, useContext, useState } from 'react'
import MainNavbar from '../Common/MainNavbar';
import ChatList from '../Common/ChatList';
import MainMessageChat from '../Common/MainMessageChat';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const All = (props) => {
    const auth = useContext(AuthContext);
    const [searching, setSearching] = useState(false);
    const [chats, setChats] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);

    const loadChats = () => {
        if (document.getElementById("username").value){
            setSearching(true);

            axios.get('/api/chats/searching/' + document.getElementById("username").value)
                .then((response) => {
                    setChats(response.data);
                    setSearching(false);
                })
                .catch(err => console.log(err));
        } else {
            renderChats()
        }
    }

    const unselectChat = () => {
        auth.loadFromRedirect = null;
        removeActiveUserItem(selectedChat._id);
        setSelectedChat(null)
    }

    const renderChats = () => {
        axios.get('/api/chats/')
            .then(chats => {
                setChats(chats.data);
                setSearching(false);
            })
            .catch(err => console.log(err));
    }


    const automaticChatLoaderFromContactsPage = () => {
        
        if (selectedChat !== null) {
            removeActiveUserItem(selectedChat._id)
        }
        setSearching(true);
        if (auth.loadFromRedirect.location === "CONTACT_PAGE"){
            chats.forEach(chat => {
                if(chat.members.length <= 2){
                    chat.members.forEach(member => {
                        if (member.user === auth.loadFromRedirect.id) {
                            setSelectedChat(chat);
                            applyActiveUserItem(chat._id);
                            setSearching(false);
                            return true;
                        } else {
                            setSearching(false);
                            return false
                        }
                    })
                } else {
                    setSearching(false);
                    return false
                }
            })
        }
        if(auth.loadFromRedirect.location === "CREATE_GROUP_PAGE"){
            //Get chat based on chat id
            var selected = undefined;
            
            selected = chats.filter( chat => chat._id === auth.loadFromRedirect.id )

            if(selected !== undefined){
                setSelectedChat(selected[0]);
                applyActiveUserItem(selected[0]._id);
                setSearching(false);
            } else {
                setSearching(true);
            }
        }
        
    }

    const retrieveChatId = (event) => {
        event.preventDefault();
        // filter through the chats in the chat state and find the one that has the matching id
    
        if (selectedChat !== null){
            removeActiveUserItem(selectedChat._id)
        }
        var selected = chats.filter(function(chat) {
            return chat._id === event.target.id;
        });

        // set the matching chat as the selected chat state
        setSelectedChat(selected[0]);
        applyActiveUserItem(selected[0]._id)
    }

    const applyActiveUserItem = (id) => {
        document.getElementById("chat-item-"+id).classList.add('user-list-item-active');
    }
    const removeActiveUserItem = (id) => {
        document.getElementById("chat-item-" + id).classList.remove('user-list-item-active');
    }
    
    useEffect(() => {
        if(chats === null){
            renderChats();
        }
        if (auth.currUser === false) {
            props.history.push('/login')
        }
        if (selectedChat === null && auth.loadFromRedirect !== null && auth.loadFromRedirect !== undefined && chats !== null) {
            automaticChatLoaderFromContactsPage()
        }
    })

    return (
        <div className="container">
            <div className="row">
                <div className="side-col white-bg full-height">
                    <div className="row shadow">
                        <div className="col padding-24 shadow">
                            <MainNavbar />
                            <div className="row">
                                <h1 className="margin-sm">Messages</h1>
                            </div>
                            <div className="row">
                                <div className="search-field">
                                    <img src={process.env.PUBLIC_URL + '/icons/search-solid.svg'} alt=""/>
                                    <input onChange={loadChats} id="username" className='hide-input-field' type="text" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row scrollable">
                        <ChatList retrieveChatId={retrieveChatId} searching={searching} chats={chats}/>
                    </div>
                </div>
                <div className="col hide-on-mobile">
                    {selectedChat === null ? 
                        null:
                        <MainMessageChat chat={selectedChat} unselectChat={unselectChat} />
                    }
                </div>
            </div>
        </div>
    );
}

export default All;
