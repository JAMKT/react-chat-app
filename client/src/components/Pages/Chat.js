import React, { useEffect, useContext } from 'react'
import { AuthContext } from '../context/authContext';

const Chat = (props) => {
    
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth.currUser === false) {
            props.history.push('/login')
        }
    })

    return (
        <div>
            Chat
        </div>
    )
}

export default Chat;
