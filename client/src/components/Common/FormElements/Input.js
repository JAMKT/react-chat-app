import React, { useReducer, useEffect } from 'react';
import { validate } from '../../util/validator';
import './Input.css';

// update inputState with useReducer()
const inputReducer = (state, action) => {
    switch(action.type){
        case 'CHANGED':
            return {
                // copy old state
                ...state,
                // override selected properties of the state(value, isValid)
                value: action.inputVal,
                isValid: validate(action.inputVal, action.validators)
            }
        case 'TOUCHED':
                return {
                    ...state,
                    isTouch: true
                }
        default: 
            return state;
    }
}

const Input = props => {

    // UseReducer(): same as UseState but used to update more complex states
    // You get two elements from useReducer() => current state(inputState) + function (dispatch/inputReducer)
    const [inputState, dispatch] = useReducer(inputReducer, {
        //set inital state values
        value: props.value || '',
        isValid: props.valid || false,
        isTouch: false
    });

    // Emit new input values to where they are used in the Input component => Auth.js
    // use object destructuring to avoid infinite loop
    const { id, onInput } = props;
    const { value, isValid } = inputState;

    // UseEffect() Hook => Similar to componentDidMount() and componentDidUpdate()
    // It runs both after the first render and after every update (after every render)
    useEffect(() => {
        // recieve a function from the props.onInput => inputHandler()
        // pass on the id, value, isValid to the Auth component
        onInput(id, value, isValid);
        // [] => array of dependencies: when should the useEffect() be triggered
        // function runs whenever the id, onInput props + value, isValid state changes
    }, [id, value, isValid, onInput]);

    const onChangeHandler = (event) => {
        // dispatch to the useReducer() onChange
        // pass in "action" object (type, val, validators) to the inputReducer()
        dispatch({
            type: 'CHANGED',
            inputVal: event.target.value,
            validators: props.validator
        });

        if(event.target.value.length > 0){
            document.getElementById(event.target.id).nextElementSibling.classList.add('input-field-label-active');
        }
    }

    const onTouchHandler = () => {
        // dispatch the useReducer() onBlur
        // pass in "action" object
        dispatch({
            type: 'TOUCHED'
        });
    }

    return(
        <React.Fragment>
            <div  className={[props.inputContainerStyle].join(' ')}>
                <input 
                    className={[props.inputStyle].join(' ')}
                    id={props.id}
                    element={props.element}
                    type={props.type}
                    placeholder={props.placeholder}
                    onChange={onChangeHandler}
                    onBlur={onTouchHandler}
                    value={props.value}/>

                    <label  
                        htmlFor={props.id}
                        className={[props.labelStyle].join(' ')}>{props.label}
                    </label>
                    
                    <span className={`${inputState.isTouch && !inputState.isValid && props.errorStyle}`}></span>
                
            </div>
            {inputState.isTouch && !inputState.isValid && <p className="error-text">{props.errorText}</p>}
        </React.Fragment>
    );
}

export default Input;