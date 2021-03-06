import React, { Suspense, lazy, Fragment } from 'react';
import useContactHooks from '../../Hooks/useContactHooks.js';
import ContactItem from './ContactItem.js';

const ContactHeader = lazy(() => import('./ContactHeader.js'));


const Contact = () => {

    const {
        contactList,
        addContactInfo,
        deleteContactInfo,
        updateContactInfo
    } = useContactHooks();

    return (
        <Fragment>
            <div className='contact_page_main'>
                <div className='container-fluid'>
                    <div className='row justify-content-md-center'>
                        <div className='col-md-5'>
                            <div className='contact_card_container'>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <ContactHeader
                                        addContactInfo={addContactInfo}
                                    />
                                </Suspense>
                                {
                                    contactList.length > 0 &&
                                    contactList.map((contactInfo) => (
                                        <Fragment key={contactInfo.id}>
                                            <ContactItem
                                                contactInfo={contactInfo}
                                                deleteContactInfo={deleteContactInfo}
                                                updateContactInfo={updateContactInfo}
                                            />
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )

}

export default Contact;
