import React from 'react'

const ChatListItem = (props) => {
    return (
        <div className="user-list-item padding-20 row clickable">
            <div className="user-list-img-col">
                <img src="https://via.placeholder.com/64" />
            </div>
            <div className="col">
                <div className="row height-50 space-between align-center">
                    <h3>{props.name}</h3>
                    {
                        props.unread !== undefined ? <span className="user-blue-dot-active"></span> : null
                    }
                    
                </div>
                <div className="row height-50 space-between align-center">
                    <p>{props.id}</p>
                    {
                        props.lastUpdate !== undefined ? <span>Yesterday 6:32 PM</span> : null
                    }

                    
                </div>
            </div>
            {
                props.type == "CREATE_GROUP"?
                <div className="group-checkbox-col justify-center">
                    <div className="checkbox-wrap">
                        <input className="checkbox" type="checkbox" id={"checkbox_"+ props.index+props.name } />
                        <label className="checkmark" htmlFor={"checkbox_"+ props.index+props.name} ></label>
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}

export default ChatListItem;
