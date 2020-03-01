import Cookies from "js.cookie";
export const LOCAL_STYPE = 'lStorage'
export const COOKIES_STYPE = 'cookieStorage'

const lStorage = {
    setItem: (key,value) => localStorage.setItem(key, value),
    getItem: (key) => localStorage.getItem(key)
}

const cookieStorage = {
    setItem: (key,value) => Cookies.set(key, value),
    getItem: (key) => Cookies.get(key)
}

const types = {
    lStorage,
    cookieStorage
}

const storage = (type = LOCAL_STYPE) => {

    if (Storage !== undefined){
         return types[type]
    }
    return types[COOKIES_STYPE]
}

export default storage