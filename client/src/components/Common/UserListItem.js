import React from 'react'

export default function UserListItem(props) {
    return (
        <div className="user-list-item padding-20 row">
            <div className="user-list-img-col">
                <img src="https://via.placeholder.com/64" />
            </div>
            <div className="col">
                <div className="row height-50 space-between align-center">
                    <h3>{props.name}</h3>
                    {
                    props.unread !== undefined ? 
                        <span className="user-blue-dot-active"></span>
                        :
                        null
                    }
                    
                </div>
                <div className="row height-50 space-between aligcenter">
                    <p>Some info text about event...</p>
                    {
                    props.time !== undefined ? 
                        <span>Yesterday 6:32 PM</span>
                        :
                        null
                    }
                    
                </div>
            </div>
        </div>
    )
}
