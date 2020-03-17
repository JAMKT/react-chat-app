import React from 'react';
import Input from '../Common/FormElements/Input';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL } from '../util/validator';
import { useForm } from '../hooks/formHook';
import { Link } from 'react-router-dom';
import Button from '../Common/Button/Button';
import axios from 'axios';

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
            address: {
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

        const data = {
            username: formState.inputs.username.value,
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            address: formState.inputs.address.value,
            avatarColor: 'BLACK',
            password: formState.inputs.password.value
        }

        axios.post('/api/users/register', data)
            .then((data) => {
                window.location.href = "/login";
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="side-col padding-32 white-bg mobile-full-height">
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
                            id="address"
                            type="address"
                            label="Address"
                            errorText="Please enter a valid address."
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

                        <Button 
                            type="submit"
                            btnStyle="Button margin-xs"
                            disabledBtn={!formState.isValid}>Sign Up
                        </Button>
                    
                    </form>
                    <p className="margin-s link-text">Already have an account? Login <Link to="/login">here!</Link></p>
                </div>

                <div className="col blue-bg full-height padding-32 mobile-hide"></div>

            </div>
        </div>
    );
};

export default Register;