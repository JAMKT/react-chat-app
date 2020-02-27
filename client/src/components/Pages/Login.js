import React from 'react';
import Input from '../Common/FormElements/Input';
import Button from '../Common/Button/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../util/validator';
import { useForm } from '../hooks/formHook';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [formState, inputHandler, setFormData] = useForm(
        //set inital input state + form validity state
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        {
            isValid: false
        }
    );
   
   const onSubmitHandler = (event) => {
       event.preventDefault();

       axios({
        method: 'post',
        url: '/api/users/login',
        data: {
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
        }
    });
   }

    return (
        <div className="container">
            <div className="row">
                <div className="padding-32 side-col white-bg">
                    <h1 className="margin-s text-center">Log in</h1>
                    <form onSubmit={onSubmitHandler}>
                        <Input 
                            id="email"
                            type="email"
                            label="Email"
                            errorText="Please enter a valid email."
                            validator={[VALIDATOR_EMAIL()]}
                            onInput={inputHandler}
                            inputStyle="hide-text-input-field"
                            inputContainerStyle="margin-s input-field"
                            labelStyle="input-field-label"
                            errorStyle="error-border"
                            />
                        
                        <Input 
                            id="password"
                            type="password"
                            label="Password"
                            errorText="Password must be at least 6 characters."
                            validator={[VALIDATOR_MINLENGTH(6)]}
                            onInput={inputHandler}
                            inputStyle="hide-text-input-field"
                            inputContainerStyle="margin-s input-field"
                            labelStyle="input-field-label"
                            errorStyle="error-border"
                        />

                            <Button 
                                type="submit"
                                btnStyle="Button margin-xs"
                                disabledBtn={!formState.isValid}>Log in</Button>
                    </form>
                    <p className="margin-s link-text">Don't have an account yet? Register <Link to="/register">here!</Link></p>
                    <Link to="/All">Go to main page</Link>
                </div>

                <div className="col blue-bg full-height padding-32">
                   
                </div>
            </div>
        </div>
    );
};

export default Login;