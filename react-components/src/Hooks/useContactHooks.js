import { useState } from 'react';
import { uuid } from '../Util';

const useContactHooks = () => {

    const [contactList, setContactList] = useState([{ id: uuid(), Name: 'John', Email: 'john@gmail.com' }]);

    return { contactList, setContactList };
}

export default useContactHooks;
