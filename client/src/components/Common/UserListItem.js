import React from 'react'

export default function UserListItem() {
    return (
        <div class="user-list-item padding-20 row">
            <div class="user-list-img-col">
                <img src="https://via.placeholder.com/64" />
            </div>
            
            <div class="col">
                <div class="row height-50 space-between align-center">
                    <h3>Username</h3>
                    <span class="user-blue-dot-active"></span>
                </div>
                <div class="row height-50 space-between aligcenter">
                    <p>Some info text about event...</p>
                    <span>Yesterday 6:32 PM</span>
                </div>
                
                
            </div>

            <div>

            </div>
        </div>
    )
}
