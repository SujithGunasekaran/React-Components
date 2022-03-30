import { useState } from 'react';
import { uuid } from '../Util';

const useContactHooks = () => {

    const [contactList, setContactList] = useState([{ id: uuid(), Name: 'John', Email: 'john@gmail.com' }]);
    const [showContactPopup, setShowContactPopup] = useState(false);

    const addContactInfo = (info) => {
        info.id = uuid();
        setContactList(prevContactList => {
            let contactList = JSON.parse(JSON.stringify(prevContactList));
            contactList.push(info);
            return contactList;
        })
    }

    const updateContactInfo = (info) => {
        setContactList(prevContactList => {
            let contactList = prevContactList.map(contact => {
                if (contact.id === info.id) {
                    let updatedInfo = { ...contact };
                    updatedInfo = info;
                    return updatedInfo;
                }
                return contact;
            })
            return contactList;
        })
    }

    const deleteContactInfo = (info) => {
        setContactList(prevContactList => {
            let contactList = prevContactList.filter(contact => contact.id !== info.id);
            return contactList;
        })
    }

    const handleContactPopup = (value) => {
        setShowContactPopup(value);
    }

    return { contactList, showContactPopup, handleContactPopup, addContactInfo, deleteContactInfo, updateContactInfo };
}

export default useContactHooks;
