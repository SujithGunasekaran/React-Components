import React, { Fragment, useState } from 'react';
import { isFormValidCheck } from '../../Util';
import { EditIcon, DeleteIcon, SaveIcon, CancelIcon } from '../../UI/Icon';

const ContactItem = (props) => {

    // props
    const { contactInfo, deleteContactInfo, updateContactInfo } = props;

    // state
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [userData, setUserData] = useState({ ...contactInfo });
    const [formError, setFormError] = useState({});

    const handleEditOption = (value) => {
        setIsEditEnabled(value);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevUserData => {
            let userData = { ...prevUserData };
            userData[name] = value;
            return userData;
        })
        setFormError(prevFormError => {
            let formError = { ...prevFormError };
            delete formError[`${name}_Error`];
            return formError;
        })
    }

    const handleEditContactInfo = () => {
        let checkKey = ['Name', 'Email'];
        const result = isFormValidCheck(checkKey, userData);
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                const keyName = result[i];
                setFormError(prevFormError => {
                    let formError = { ...prevFormError };
                    formError[`${keyName}_Error`] = `Please Enter your ${keyName}`;
                    return formError;
                })
            }
            return;
        }
        handleEditOption(false);
        updateContactInfo(userData);
    }

    return (
        <Fragment>
            <div className='contact_page_item'>
                {
                    !isEditEnabled &&
                    <Fragment>
                        <div className='contact_page_item_title'>{contactInfo.Name}</div>
                        <div className='contact_page_item_email'>{contactInfo.Email}</div>
                        <div className='contact_page_item_footer'>
                            <button className='contact_page_btn edit' onClick={() => handleEditOption(true)}>
                                <EditIcon
                                    cssClass={'contact_page_btn_icon'}
                                />
                                Edit
                            </button>
                            <button className='contact_page_btn danger' onClick={() => deleteContactInfo(contactInfo)}>
                                <DeleteIcon
                                    cssClass={'contact_page_btn_icon'}
                                />
                                Delete
                            </button>
                        </div>
                    </Fragment>
                }
                {
                    isEditEnabled &&
                    <Fragment>
                        <input
                            className='contact_page_input'
                            value={userData.Name}
                            name='Name'
                            onChange={(e) => handleInputChange(e)}
                        />
                        {
                            formError['Name_Error'] && <div className='form_error'>{formError['Name_Error']}</div>
                        }
                        <input
                            className='contact_page_input'
                            value={userData.Email}
                            name='Email'
                            onChange={(e) => handleInputChange(e)}
                        />
                        {
                            formError['Email_Error'] && <div className='form_error'>{formError['Email_Error']}</div>
                        }
                        <div className='contact_page_item_footer'>
                            <button className='contact_page_btn save' onClick={() => handleEditContactInfo()}>
                                <SaveIcon
                                    cssClass={'contact_page_btn_icon'}
                                />
                                Save
                            </button>
                            <button className='contact_page_btn cancel' onClick={() => handleEditOption(false)}>
                                <CancelIcon
                                    cssClass={'contact_page_btn_icon'}
                                />
                                Cancel
                            </button>
                        </div>
                    </Fragment>
                }
            </div>
        </Fragment>
    )

}

export default ContactItem;
