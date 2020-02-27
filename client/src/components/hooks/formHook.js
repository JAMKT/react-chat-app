import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
    switch(action.type){
        case 'INPUT_CHANGED':
            let formValid = true;
            // loop through all inputs and check if they are valid
            for(const input in state.inputs){
                // if inputId is undefined => skip the input and continue to the next inputId
                if(!state.inputs[input]){
                    continue;
                }
                // check if inputId is the inputId getting updated through the current action
                if(input === action.inputId){
                    // check if the input is valid
                    formValid = formValid && action.isValid;
                }else{
                    // check the stored value of the input (not the current input being updated)
                    formValid = formValid && state.inputs[input].isValid;
                }
            }
            return {
                // copy existing state
                ...state,
                inputs: {
                    // copy current input state
                   ...state.inputs,
                   // override the input state that is being updated with the action
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                // set the state of the overall form validity
                isValid: formValid
            };
            default:
                return state;
        }
};


// Custom made hook (useForm()) => custom made hooks should alwasy start with 'use'
// Pass in inital state (inputs + validity) from component the hook is being used in (Auth.js)
export const useForm = (initalInputs, initalFormVal) => {
    
    // UseReducer(): same as UseState() Hook, but used to update more complex states
    // You get two elements from useReducer() => current state(formState) + function (dispatch/formReducer)
    const [formState, dispatch] = useReducer(formReducer, {
        // state validation for individal inputs
        inputs: initalInputs,
        // validation for overall form
        isValid: initalFormVal
    });


    // use the useCallback() hook to prevent the function from being re-created when the component renders. 
    // The function will be re-used and useEffect wont run again + prevents infinite loop
    const inputHandler = useCallback((id, value, isValid) => {
        // dispatch to the useReducer()
        // Pass in an "action" object to the formReducer() function
        dispatch({
            type: 'INPUT_CHANGED', 
            value: value, 
            isValid: isValid, 
            inputId: id
        });
    }, [dispatch]);


    // return formState + inputHandler to share it with the component that uses the useForm() hook
    return [formState, inputHandler];

};