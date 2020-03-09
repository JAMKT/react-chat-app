import React, { useContext } from 'react'
import ChatHeader from './ChatHeader';
import ResponseMessage from './ResponseMessage';
import Message from './Message';
import { useForm } from '../hooks/formHook';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const MainMessageChat = (props) => {
    const auth = useContext(AuthContext);

    const [formState, inputHandler] = useForm(
        //set inital input state + form validity state
        {
            message: {
                value: '',
                isValid: false
            }
        },
        {
            isValid: false
        }
    );

    const sendMessage = (event) => {
        event.preventDefault();


        const data = {
            content: document.getElementById("message").value,
            author: {
                id: auth.currUser._id,
                username: auth.currUser.username
            }
        }
        
        document.getElementById("message").value = "";

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const chatId = props.chat._id;

        axios.post('/api/chats/' + chatId + '/messages', data, config)
            .then((newMessage) => {
                if (newMessage) {
                    console.log("Full Message");
                    console.log(newMessage);
                }
            })
            .catch(err => console.log(err));
    }

    if (props.chat !== null) {
        return (
            <div className="col main-message-chat absolute-center-pin full-height">
                <ChatHeader />
                <div className="row padding-16 scrollable">
                    <ResponseMessage />
                    <ResponseMessage />
                    <ResponseMessage />
                    <Message />
                </div>
                <div>

                </div>
                <form className="padding-16 chat-input-field-position" onSubmit={sendMessage}>
                    <input type="message" id="message" className="chat-input-field" placeholder="Type your message..." onInput={inputHandler} />
                </form>
            </div>
        );
    } else {
        return (
            <div>Select a chat</div>
        );
    }

}

export default MainMessageChat;
