import React from 'react'
import Input from '../Common/FormElements/Input';
import ImageInput from './FormElements/ImageInput';
import Button from '../Common/Button/Button';
import { useForm } from '../hooks/formHook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../util/validator';
import axios from 'axios';

const SettingItem = (props) => {
    const [formState, inputHandler] = useForm(
        //set inital input state + form validity state
        {
            email: {
                value: props.email,
                isValid: true
            },
            name: {
                value: props.name,
                isValid: true
            },
            username: {
                value: props.username,
                isValid: true
            }
            // profileImage: {
            //     value: props.profileImage,
            //     isValid: true
            // }
        },
        {
            isValid: true
        }
    );

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        const data = {
            email: formState.inputs.email.value,
            name: formState.inputs.name.value,
            username: formState.inputs.username.value
            //profileImage: formState.inputs.profileImage.value
        }
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        axios.post('/api/users/update-user', data, config)
            .then((updatedUser) => {
                console.log(updatedUser);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="row padding-32">
            <div className="col"> 
                <div className="row justify-center padding-20 settings-wrap">
                    <ImageInput 
                        id="profileImage"
                        htmlFor="profileImage"
                        errorText="Please select an image"
                        onInput={inputHandler}
                        labelStyle="image-input-label"
                        errorStyle="img-error"
                        imgStyle="profile-image"
                        errorTextStyle="error-text-image"
                        opacity="opacity-0"
                        />
                </div>

                <div className="row justify-center">
                    <h2>Username</h2>
                </div>

                <div className="row">
                    <h4>Edit Profile</h4>
                </div>

                <div className="align-center row margin-top-s">
                    <form className="row" onSubmit={onSubmitHandler}>
                        <Input 
                            id="name"
                            type="text"
                            label="Name"
                            valid={true}
                            value={props.value}
                            errorText="Please enter your name."
                            validator={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                            inputStyle="hide-text-input-field"
                            inputContainerStyle="margin-s input-field white-bg"
                            labelStyle="input-field-label"
                            errorStyle="error-border"
                            />
                        <Input 
                            id="email"
                            type="email"
                            label="Email"
                            valid={true}
                            errorText="Please enter a valid email."
                            validator={[VALIDATOR_EMAIL()]}
                            onInput={inputHandler}
                            inputStyle="hide-text-input-field"
                            inputContainerStyle="margin-s input-field white-bg"
                            labelStyle="input-field-label"
                            errorStyle="error-border"
                            />

                        <Input 
                            id="username"
                            type="text"
                            label="Username"
                            valid={true}
                            errorText="Please enter a valid username."
                            validator={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                            inputStyle="hide-text-input-field"
                            inputContainerStyle="margin-s input-field white-bg"
                            labelStyle="input-field-label"
                            errorStyle="error-border"
                            />

                        <Button 
                            type="submit"
                            btnStyle="Button margin-xs"
                            disabledBtn={!formState.isValid}>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
        
    )
}

export default SettingItem;