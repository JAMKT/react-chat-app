import React, { useState, useContext } from 'react'
import Input from '../Common/FormElements/Input';
import Button from '../Common/Button/Button';
import { useForm } from '../hooks/formHook';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../util/validator';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import {userSvg} from '../images/user-solid.svg';



const SettingItem = (props) => {
    const [formState, inputHandler] = useForm(
        //set inital input state + form validity state
        {
            email: {
                value: props.auth.email,
                isValid: true
            },
            name: {
                value: props.auth.name,
                isValid: true
            },
            username: {
                value: props.auth.username,
                isValid: true
            }
        },
        {
            isValid: true
        }
    );

    const auth = useContext(AuthContext);

    const [avatarColor, setAvatarColor ] = useState(null);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        const data = {
            email: formState.inputs.email.value,
            name: formState.inputs.name.value,
            username: formState.inputs.username.value,
            avatarColor: avatarColor

        }
        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        axios.post('/api/users/update-user', data, config)
            .then((updatedUser) => {
                // ...
            })
            .catch(err => console.log(err));
    }

    const setColorHandler = (event) => {
        setAvatarColor(event.target.value);
    }

    return (
        <div className="row padding-32">
            <div className="col">
                <div className="row justify-center padding-20 settings-wrap">
                    <div className="avatar-border">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14 absolute-center" role="img" viewBox="0 0 448 512"><path fill={avatarColor ? avatarColor : auth.currUser.avatarColor} d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                    </div>
                </div>

                <div className="row col justify-center margin-xs">
                    <h2 className="text-center">{formState.inputs.name.value}</h2>
                    <h5 className="text-center">{formState.inputs.username.value}</h5>
                </div>

                <div className="flex-container justify-center margin-s" onChange={setColorHandler}>
                    <div className="column side-padding-8">
                        <input 
                            type="radio" 
                            id="PINK"
                            value="#E85AAA" 
                            defaultChecked={auth.currUser.avatarColor == "#E85AAA" ? true : false} 
                            className="radio-btn pink" 
                            name="color"/> 
                        <label 
                            htmlFor="PINK" 
                            className="radio-label">
                            Pink
                        </label>
                    </div>

                    <div className="column side-padding-8">
                        <input 
                            type="radio" 
                            id="GREEN" 
                            value="#5DFFA1" 
                            defaultChecked={auth.currUser.avatarColor == "#5DFFA1" ? true : false} 
                            className="radio-btn green" 
                            name="color"/>
                        <label 
                            htmlFor="GREEN" 
                            className="radio-label">
                            Green
                        </label>
                    </div>

                    <div className="column side-padding-8">
                        <input 
                            type="radio" 
                            id="BLUE" 
                            value="#6363FF" 
                            defaultChecked={auth.currUser.avatarColor == "#6363FF" ? true : false} 
                            className="radio-btn blue" 
                            name="color"/>
                        <label 
                            htmlFor="BLUE" 
                            className="radio-label">
                            Blue
                        </label>
                    </div>
                   
                    <div className="column side-padding-8">
                        <input 
                            type="radio" 
                            id="BLACK" 
                            value="#000" 
                            defaultChecked={auth.currUser.avatarColor == "#000" ? true : false} 
                            className="radio-btn black" 
                            name="color"/>
                        <label 
                            htmlFor="BLACK" 
                            className="radio-label">
                            Black
                        </label>
                    </div>

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
                            value={formState.inputs.name.value}
                            errorText="Please enter your name."
                            validator={[VALIDATOR_REQUIRE()]}
                            onInput={inputHandler}
                            inputStyle="hide-text-input-field"
                            inputContainerStyle="margin-s input-field white-bg"
                            labelStyle="input-field-label-active"
                            errorStyle="error-border"
                            />
                        <Input 
                            id="email"
                            type="email"
                            label="Email"
                            valid={true}
                            value={formState.inputs.email.value}
                            errorText="Please enter a valid email."
                            validator={[VALIDATOR_EMAIL()]}
                            onInput={inputHandler}
                            inputStyle="hide-text-input-field"
                            inputContainerStyle="margin-s input-field white-bg"
                            labelStyle="input-field-label-active"
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