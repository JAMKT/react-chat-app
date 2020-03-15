import React, { useState } from 'react';
import './Popup.css';

const Popup = (props) => {
    const [close, setClose] = useState(false);

    const closePopup = () => {
        setClose(true);
        
        document.getElementById("modal").classList.add("close-modal");

        if(props.clearPopupState){
            props.clearPopupState();
        }
        
    }

    let successErrorPopup = close === true ? null : (
        <div id="modal" className="modal-container" onClick={closePopup}>
            <div className="modal-wrap">
                <a href="#" className="modal-close" onClick={closePopup}> &times;</a>
                <div>{props.children}</div>
            </div>
        </div>
    );
    
    return(
        <React.Fragment>
            {successErrorPopup}
        </React.Fragment>
    )
}

export default Popup;