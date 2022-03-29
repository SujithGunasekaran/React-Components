import React, { Fragment, useState } from 'react';
import { EditIcon, DeleteIcon, SaveIcon, CancelIcon } from '../../UI/Icon';

const ContactItem = (props) => {

    // props
    const { contactInfo } = props;

    // state
    const [isEditEnabled, setIsEditEnabled] = useState(false);
    const [userData, setUserData] = useState({ ...contactInfo });

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
                            <button className='contact_page_btn danger'>
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
                        <input
                            className='contact_page_input'
                            value={userData.Email}
                            name='Email'
                            onChange={(e) => handleInputChange(e)}
                        />
                        <div className='contact_page_item_footer'>
                            <button className='contact_page_btn save'>
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
