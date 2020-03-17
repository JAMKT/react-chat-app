import React, { useState, useEffect } from 'react';
import Popup from '../Common/SuccessErrorPopup/Popup';
import axios from 'axios';

const ChatHeader = (props) => {
    const [color, setColor] = useState(null);
    const [clearChatPopup, setClearChatPopup] = useState(null);

    // Clear Chat Popup
   let clearPopup = 
   clearChatPopup === true ? (
       <Popup clearPopupState={() => clearPopupState()}>
           <h3>Clear Chat</h3>
           <p className="p-popup">Are you sure you want to clear this chat?</p>
          <button className="contact-button-delete margin-xs" onClick={() => clearChat()}>Clear chat</button>
       </Popup> 
       ) : null;

    // Clear Popup state function for when the Popup is closed
    const clearPopupState = () => {
        setClearChatPopup(null);
    }
 
    const clearChat = () => {
        axios.get('/api/chats/clear-chat/' + props.chatId)
            .then((response) => {
                props.getMessages();
                setClearChatPopup(null);
            })
            .catch(err => {
                console.log(err);
            });
    };

    // Get user avatar
    const getAvatarColor = () => {
        axios.get('/api/users/' + props.userId)
            .then((newContact) => {
                setColor(newContact.data.avatarColor);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAvatarColor();
    },[props.userId]);

    return (
        <React.Fragment>
        {clearPopup}
        <div className="row align-center padding-16 chat-header">
            <div className="col">
                 <div className="row align-center ">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14 svg-avatar-nav" role="img" viewBox="0 0 448 512"><path
                        fill={color}
                        d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                    </svg>
                    <h3>{props.name}</h3>
                </div>
            </div>
           
            <div className="col">
                <div className="row justify-end">
                    <button onClick={() => setClearChatPopup(true)} className="back-to-messages">
                        Clear chat
                    </button>
                    <button onClick={props.unselectChat} className="back-to-messages">
                        Back to messages
                    </button>
                </div>
                
            </div>
        </div>
        </React.Fragment>
    )
}

export default ChatHeader;
