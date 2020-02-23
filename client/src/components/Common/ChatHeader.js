import React from 'react'
import { Link } from 'react-router-dom';

export default function ChatHeader() {
    return (
        <div class="row align-center padding-16 chat-header">
            <div class="col">
                 <div class="row align-center ">
                    <img class="chat-header-profile" src="https://via.placeholder.com/64" />
                    <h3>User or Group name</h3>
                </div>
            </div>
           
            <div class="col">
                <div class="row justify-end">
                    <button class="chat-setting-btn">
                        <img src={process.env.PUBLIC_URL + '/icons/cog-solid.svg'} />
                        <div>Chat settings</div>
                    </button>
                </div>
                
            </div>
        </div>
    )
}
