import React, { Fragment, useState } from 'react';
import { CancelLightIcon } from '../../UI/Icon';
import { isFormValidCheck } from '../../Util';

const ContactPopup = (props) => {

    // props
    const { handleContactPopup, addContactInfo } = props;

    // state
    const [contactInfo, setContactInfo] = useState({});
    const [formError, setFormError] = useState({});

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setContactInfo(prevContactInfo => {
            let contactInfo = { ...prevContactInfo };
            contactInfo[name] = value;
            return contactInfo;
        })
        setFormError(prevFormError => {
            let formError = { ...prevFormError };
            delete formError[`${name}_Error`];
            return formError;
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        let checkKey = ['Name', 'Email'];
        const result = isFormValidCheck(checkKey, contactInfo);
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                const keyName = result[i];
                setFormError(prevError => {
                    let formError = { ...prevError };
                    formError[`${keyName}_Error`] = `Please Enter ${keyName}`;
                    return formError;
                })
            }
            return;
        }
        addContactInfo(contactInfo);
        handleContactPopup(false);
    }

    return (
        <Fragment>
            <form onSubmit={(e) => handleFormSubmit(e)}>
                <div className='overlay'>
                    <div className='contact_page_popup'>
                        <div className='contact_page_popup_header'>
                            <div className='title'>Add Contact</div>
                            <div onClick={() => handleContactPopup(false)}>
                                <CancelLightIcon
                                    cssClass='icon'
                                />
                            </div>
                        </div>
                        <div className='contact_page_popup_body'>
                            <input
                                type='text'
                                name='Name'
                                placeholder='Name'
                                value={contactInfo?.Name ?? ''}
                                onChange={(e) => handleInputChange(e)}
                                className='contact_page_input popup sans_font text_950 text_white_one'
                            />
                            {
                                formError['Name_Error'] && <div className='form_error'>{formError['Name_Error']}</div>
                            }
                            <input
                                type='email'
                                name='Email'
                                placeholder='Email Address'
                                value={contactInfo?.Email ?? ''}
                                onChange={(e) => handleInputChange(e)}
                                className='contact_page_input popup sans_font text_950 text_white_one'
                            />
                            {
                                formError['Email_Error'] && <div className='form_error'>{formError['Email_Error']}</div>
                            }
                        </div>
                        <div className='contact_page_popup_footer'>
                            <button type='submit' className='contact_page_popup_btn sans_font text_950 text_white_one'>Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    )

}

export default ContactPopup;
