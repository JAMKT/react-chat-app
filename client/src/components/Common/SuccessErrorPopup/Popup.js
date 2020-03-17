import React, { useState } from 'react';
import './Popup.css';

const Popup = (props) => {
    const [close, setClose] = useState(false);

    const closePopup = () => {
        setClose(true);
        //document.getElementById("modal").classList.add("close-modal");
        if(props.clearPopupState){
            props.clearPopupState();
        }
    }

    let successErrorPopup = close === true ? null : (
        <div id="modal" className="modal-container">
            <div className="modal-wrap modal-wrap-mobile">
                <a href="#" className="modal-close" onClick={closePopup}> &times;</a>
                <div>{props.children}</div>
            </div>
        </div>
    );

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target.id == "modal") {
            closePopup();
        }
    }

    /*
    // Clear Popup state function for when the Popup is closed
     const clearPopuState = () => {
        setDeleteUserPopup(null);
        setVisibility(false);
    }

     // Delete User Popup
    let editPopup = 
    visible === true ? (
        <Popup clearPopupState={() => clearPopuState()}>
            <h3>Add a nickname...</h3>
            <form onSubmit={editContact}>
                <input id="nickname" placeholder="Add a nickname..." className="add-nickname-input"/>
                <input type="submit" value="Add" className="add-nickname-edit"/>
                <button onClick={() => setVisibility(false)} className="add-nickname-cancel">Cancel</button>
            </form>
        </Popup> ) : null;
*/
    
    return(
        <React.Fragment>
            {successErrorPopup}
        </React.Fragment>
    )
}

export default Popup;