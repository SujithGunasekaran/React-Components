import React, { Fragment, lazy, Suspense } from 'react';
import useContactHooks from '../../Hooks/useContactHooks';

const ContactPopup = lazy(() => import('./ContactPopup'));

const ContactHeader = (props) => {

    // props
    const { addContactInfo } = props;

    // Hooks
    const { showContactPopup, handleContactPopup } = useContactHooks();


    return (
        <Fragment>
            <div className='contact_card_header'>
                <div className='contact_card_header_title'>Contact List</div>
                <div className='contact_card_header_add' >
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => handleContactPopup(true)} fill="currentColor" className="bi bi-plus-lg contact_card_header_add" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                    </svg>
                </div>
            </div>
            {
                showContactPopup &&
                <Suspense fallback={<div>Loading...</div>}>
                    <ContactPopup
                        handleContactPopup={handleContactPopup}
                        addContactInfo={addContactInfo}
                    />
                </Suspense>
            }
        </Fragment>
    )

}

export default ContactHeader;
