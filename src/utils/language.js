export const setlang = (value) => {
    localStorage.setItem('i18nextLng', value)
}

export const getLang = () => {
    let langStorage = 'en';

    if (typeof window !== 'undefined') {
        langStorage = localStorage.getItem('i18nextLng') || 'en';
    }

    return langStorage
}