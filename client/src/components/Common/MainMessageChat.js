import React from 'react'
import ChatHeader from './ChatHeader';
import ResponseMessage from './ResponseMessage';
import Message from './Message';
import { useForm } from '../hooks/formHook';
import axios from 'axios';

const MainMessageChat = (props) => {

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
            content: formState.inputs.message.value
        }
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const chatId = ''; // TODO: Add chat id as value of this const
        
        axios.post('/api/chats/' + chatId + '/messages', data, config)
            .then((newMessage) => {
                if (newMessage) {
                    // ...
                }
            })
            .catch(err => console.log(err));
    }
    if(props.chat !== null){
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
                <form className="padding-16 chat-input-field-position" onEnter={sendMessage}>
                    <input type="message" className="chat-input-field" placeholder="Type your message..." onInput={inputHandler} />
                </form>      
            </div>
        );
    }else{
        return(
            <div>Select a chat</div>
        );
    }
    
}

export default MainMessageChat;
