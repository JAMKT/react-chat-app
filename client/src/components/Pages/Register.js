import React, { useState } from 'react';
import Input from '../Common/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../util/validator';
import { useForm } from '../hooks/formHook';
import { Link } from 'react-router-dom';
import Button from '../Common/Button/Button';
import ImageInput from '../Common/FormElements/ImageInput';

const Register = () => {

    const [formState, inputHandler] = useForm(
        //set inital input state + form validity state
        {
            email: {
                value: '',
                isValid: false
            },
            name: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
            username: {
                value: '',
                isValid: false
            },
            profileImage: {
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
       console.log('Singup!');
       console.log(formState.inputs, formState.isValid);
   }

    return (
        <div className="container">
            <div className="row">
                <div className="side-col padding-32">
                    <h1 className="margin-s text-center">Create your account</h1>
                    <form onSubmit={onSubmitHandler}>
                        <Input 
                            id="name"
                            type="text"
                            label="Name"
                            errorText="Please enter your name."
                            validator={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                            inputStyle="hide-text-input-field"
                            inputContainerStyle="margin-s input-field"
                            labelStyle="input-field-label"
                            errorStyle="error-border"
                            
                            
                            />

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
                            id="username"
                            type="username"
                            label="Username"
                            errorText="Please enter a valid username."
                            validator={[VALIDATOR_REQUIRE()]}
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

                        <ImageInput 
                            id="profileImage"
                            label="Profile Picture"
                            htmlFor="profileImage"
                            errorText="Please select an image"
                            onInput={inputHandler}
                            inputStyle="hide-text-input-field"
                            inputContainerStyle="margin-s input-field file-input"
                            labelStyle="input-field-label file-type-lable"
                            errorStyle="error-border"
                            imgStyle="img-preview"
                            errorTextStyle="error-text"
                            opacity="1"
                        />  

                        <Button 
                            type="submit"
                            btnStyle="Button margin-xs"
                            disabledBtn={!formState.isValid}>Sign Up
                        </Button>
                    
                    </form>
                    <p className="margin-s link-text">Already have an account? Login <Link to="/login">here!</Link></p>
                    <Link to="/All">Go to main page</Link>
                </div>

                <div className="col blue-bg full-height padding-32"></div>
            </div>
        </div>
    );
};

export default Register;