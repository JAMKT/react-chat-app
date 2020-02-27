import React from 'react'
import { Link } from 'react-router-dom';

export default function ChatHeader() {
    return (
        <div className="row align-center padding-16 chat-header">
            <div className="col">
                 <div className="row align-center ">
                    <img className="chat-header-profile" src="https://via.placeholder.com/64" />
                    <h3>User or Group name</h3>
                </div>
            </div>
           
            <div className="col">
                <div className="row justify-end">
                    <button className="chat-setting-btn">
                        <img src={process.env.PUBLIC_URL + '/icons/cog-solid.svg'} />
                        <div>Chat settings</div>
                    </button>
                </div>
                
            </div>
        </div>
    )
}
