import React, { useState, useEffect } from 'react';
import './Input.css';

const ImageInput = (props) => {
    // declare two state variables (file + isValid)
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    // fire useEffect() hook whenever the file state changes
    // generate an image preview in the useEffect hook
    useEffect(() => {
        // check if file is undefined
        if(!file){
            return;
        }

        // fileReader() => used to read files and convert them into readable image URL
        const fileReader = new FileReader();
        // once the url is created, load the onload function
        fileReader.onload = () => {
            // the state is updated and file result set to the previewUrl
            setPreviewUrl(fileReader.result);
        };
        // create an outputtable URL
        fileReader.readAsDataURL(file);
    }, [file]);

    const imgUploadHandler = (event) => {
        event.preventDefault();
        
        let selectedFile;
        let validFile = isValid;

        if( event.target.files.length === 0){
            setIsValid(false);
            validFile = false;
            document.getElementById("error-span").classList.add(props.errorStyle);

            document.getElementById("error-paragraph").classList.remove("no-error-text");
            document.getElementById("error-paragraph").classList.add(props.errorTextStyle);
            document.getElementById("img-label-id").classList.remove(props.opacity);
        }else{
            document.getElementById("error-paragraph").classList.add("no-error-text");
            document.getElementById("error-paragraph").classList.remove(props.errorTextStyle);
            document.getElementById("error-span").classList.remove(props.errorStyle);
            document.getElementById("img-label-id").classList.add(props.opacity);
            
        }

        // check if an image has been selected and ensure only one image is uploaded
        if(event.target.files && event.target.files.length === 1){
            // get the selected file
            selectedFile = event.target.files[0];

            // update the state with the selected file + validity
            setFile(selectedFile);
            setIsValid(true);
            validFile = true;
        }else{
            setIsValid(false);
            validFile = false;
        }
        // forward the id, file validity and file with the function passed onInput
        props.onInput(props.id, selectedFile, validFile);
    }

    return(
        <React.Fragment>
            <div className={[props.inputContainerStyle].join(' ')}>
                <input 
                    className={[props.inputStyle].join(' ')}
                    id={props.id}
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    value={props.value}
                    label={props.label} 
                    onChange={imgUploadHandler}
                    />

                    <label  
                        htmlFor={props.id}
                        id="img-label-id"
                        className={[props.labelStyle].join(' ')}>{props.label}
                    </label>

                    <div>
                        {// if there is previewUrl, output the image 
                        isValid && previewUrl && <img className={[props.imgStyle].join(' ')} src={previewUrl}/>}
                        
                    </div>
                    
                    <span id="error-span"></span>
                   
            </div>
            {<p id="error-paragraph" className="no-error-text"> {props.errorText}</p>}
    </React.Fragment>
    );
    
}

export default ImageInput;