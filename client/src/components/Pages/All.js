import React, { useEffect, useContext, useState } from 'react'
import MainNavbar from '../Common/MainNavbar';
import ChatList from '../Common/ChatList';
import MainMessageChat from '../Common/MainMessageChat';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const All = (props) => {
    const auth = useContext(AuthContext);
    console.log(auth);
  
    useEffect(() => {
        if (auth.currUser === false) {
            props.history.push('/login')
        }
    });


    const [searching, setSearching] = useState(false);
    const [chats, setChats] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);

    const loadChats = () => {
        // if (document.getElementById("username").value && document.getElementById("username").value !== ""){
        //     setSearching(true);

        //     axios.get('/api/chats/searching/' + document.getElementById("username").value)
        //         .then((response) => {
        //             console.log(response);
        //             setChats(response.data);
        //             setSearching(false);
        //         })
        //         .catch(err => console.log(err));
        // }
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
        console.log('Loading selected chat')
        var selected = undefined;
        chats.forEach(chat => {
            if(chat.members.length <= 2){
                chat.members.forEach(member => {
                    if (member.user === auth.loadFromContacts){
                        console.log('HERE HERE HERE')
                        console.log(chat)
                        setSelectedChat(chat)
                        return true;
                    } else {
                        return false
                    }
                })
            } else {
                return false
            }
        })
    }

    const retrieveChatId = (event) => {
        event.preventDefault();
        // filter through the chats in the chat state and find the one that has the matching id
    
        var selected = chats.filter(function(chat) {
            return chat._id === event.target.id;
        });

        // set the matching chat as the selected chat state
        setSelectedChat(selected[0]);
    }

    useEffect(() => {
        renderChats();
        if (auth.currUser === false) {
            props.history.push('/login')
        }
        if (selectedChat === null && auth.loadFromContacts !== null && auth.loadFromContacts !== undefined && chats !== null) {
            automaticChatLoaderFromContactsPage()
        }
    })

    return (
        <div className="container">
            <div className="row">
                <div className="side-col grey-bg full-height">
                    <div className="row shadow">
                        <div className="col padding-24">
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
                    <MainMessageChat chat={selectedChat}/>
                </div>
            </div>
        </div>
    );
}

export default All;
