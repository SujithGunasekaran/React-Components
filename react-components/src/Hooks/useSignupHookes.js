import { useState } from 'react';
import { isFormValidCheck } from '../Util';

const useSignupHooks = () => {

    const [toggleEye, setToggleEye] = useState(false);
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    const [formSuccess, setFormSuccess] = useState(false);
    const [passwordValidity, setPasswordValidity] = useState({ 'character': false, 'number': false, 'special': false });

    const showEyeIcon = () => {
        setToggleEye(true);
    }

    const hideEyeIcon = () => {
        setToggleEye(false);
    }

    const handlePasswordCheck = (value) => {
        let numberRegex = /\d/g;
        // eslint-disable-next-line no-useless-escape
        let specialCharacterRegex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        setPasswordValidity(prevPassword => {
            let passwordValidity = { ...prevPassword };
            passwordValidity.character = value.length >= 8 ? true : false;
            passwordValidity.number = numberRegex.test(value) ? true : false;
            passwordValidity.special = specialCharacterRegex.test(value) ? true : false;
            return passwordValidity;
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        const result = isFormValidCheck(['Name', 'Email', 'Password'], formData);
        if (result.length > 0) {
            isValid = false;
            for (let i = 0; i < result.length; i++) {
                const keyName = result[i];
                setFormError(prevFormError => {
                    let formError = { ...prevFormError };
                    formError[`${keyName}_Error`] = `Please Enter ${keyName}`;
                    return formError;
                })
            }
        }
        for (const key of Object.keys(passwordValidity)) {
            if (!passwordValidity[key]) {
                isValid = false;
                setFormError(prevFormError => {
                    let formError = { ...prevFormError };
                    if (!formError['Password_Error']) {
                        formError['Password_Error'] = 'Please match the password conditions';
                    }
                    return formError;
                })
            }
        }
        if (!isValid) return;
        setFormSuccess(true);
    }

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        if (name === 'Password') {
            handlePasswordCheck(value);
        }
        if (formSuccess) {
            setFormSuccess(false);
        }
        setFormError(prevFormError => {
            let formError = { ...prevFormError };
            delete formError[`${name}_Error`];
            return formError;
        })
        setFormData(prevFormData => {
            let formData = { ...prevFormData };
            formData[name] = value;
            return formData;
        })
    }

    return { toggleEye, formData, formError, formSuccess, passwordValidity, showEyeIcon, hideEyeIcon, handleInputChange, handleFormSubmit }

}

export default useSignupHooks;
