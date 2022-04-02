
const useDebounceHooks = (callback, waitTime) => {

    const debounce = () => {
        let timerId = null;
        return function () {
            const { target = null } = this;
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                callback(target ? target.value : '');
            }, waitTime)
        }
    }

    const debounceCallBack = debounce();

    return { debounceCallBack };

}

export default useDebounceHooks;
