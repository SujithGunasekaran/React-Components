
export const uuid = () => {
    let dateString = Date.now().toString(32);
    let randomString = Math.random().toString(32).substring(2);
    return dateString + randomString;
}
