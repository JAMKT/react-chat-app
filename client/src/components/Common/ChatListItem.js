import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const ChatListItem = (props) => {
    
    const [color, setColor] = useState(null);

    //Get user avatar
    const getAvatarColor = () => {
        axios.get('/api/users/' + props.userId)
            .then((newContact) => {
                setColor(newContact.data.avatarColor);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAvatarColor();
    },[]);

    return (
        <div className="user-list-item padding-20 row clickable" id={"chat-item-"+props.id}>
           { /* Column just for the user image */}
            <div className="user-list-img-col">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14 svg-avatar-nav" role="img" viewBox="0 0 448 512"><path
                    fill={color}
                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
            </div>
            <div className="col">
                <div className="row height-50 space-between align-center">
                    <h3>{props.name}</h3>
                    {
                        props.unread !== undefined ? <span className="user-blue-dot-active"></span> : null
                    }
                    
                </div>
                <div className="row height-50 space-between align-center">
                    <p>
                        { 
                            props.lastUpdate !== undefined ? moment(props.lastUpdate).calendar() : moment(props.created).calendar()
                        }
                    </p> 
                </div>
            </div>
            {
                props.type === "CREATE_GROUP"?
                <div className="group-checkbox-col justify-center">
                    <div className="checkbox-wrap">
                        <input className="checkbox" type="checkbox" id={"checkbox_"+ props.index+props.name } />
                        <label className="checkmark" htmlFor={"checkbox_"+ props.index+props.name} ></label>
                    </div>
                </div>
                :
                null
            }
            <div id={props.id} className="user-list-item-overlay" onClick={props.retrieveChatId}></div>
        </div>
    )
}

export default ChatListItem;
