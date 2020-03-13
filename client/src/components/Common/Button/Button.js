import React from 'react';
import './Button.css';

const Button = (props) => {
    return(
        <button 
            onClick={props.click}
            disabled={props.disabledBtn}
            className={[props.btnStyle].join(' ')}>
            {props.children}
        </button>
    );
}

export default Button;