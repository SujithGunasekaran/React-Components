
export const uuid = () => {
    let dateString = Date.now().toString(32);
    let randomString = Math.random().toString(32).substring(2);
    return dateString + randomString;
}


export const isFormValidCheck = (keyList, formData) => {
    let keyMissingList = [];
    for (let i = 0; i < keyList.length; i++) {
        const keyName = keyList[i];
        if (!formData[keyName] || formData[keyName] === '') {
            keyMissingList.push(keyName);
        }
    }
    return keyMissingList;
}
