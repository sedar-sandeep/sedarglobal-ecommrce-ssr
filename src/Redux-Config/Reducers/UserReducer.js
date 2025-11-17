//import * from '../../Globals';
import Cookies from 'js-cookie';
import GLOBALS from '../../Globals';
import ApiDataService from '../../services/ApiDataService';

const initialState = {
    isLoggedIn: Cookies.get('USER_INFO') ? true : false,
    auth_token: Cookies.get('AUTH_TOKEN') || null,
    user_id: Cookies.get('USER_ID') || null,
    user_email: Cookies.get('USER_EMAIL') || null,
    user_info: Cookies.get('USER_INFO') && Cookies.get('USER_INFO') != 'undefined' ? JSON.parse(Cookies.get('USER_INFO')) : [],
    // countryLov: ApiDataService.getAll('fetch/country_lov'),
    countryLov: [],
    CartBox: false,
    modification_user_info: Cookies.get('MODIFICATION_USER') && Cookies.get('MODIFICATION_USER') != 'undefined' ? JSON.parse(Cookies.get('MODIFICATION_USER')) : [],
};


const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALS.user_reducer.LOGIN_USER:
            state.isLoggedIn = true;

            let user_info = action.payload;
            state.auth_token = user_info.auth_token;
            state.user_info = user_info;
            state.user_id = user_info.cust_id;
            state.user_email = user_info.cust_email_id;

            Cookies.set('AUTH_TOKEN', user_info.auth_token);
            Cookies.set('USER_ID', user_info.cust_id);
            Cookies.set('USER_EMAIL', user_info.cust_email_id);
            Cookies.set('USER_INFO', JSON.stringify(user_info));

            break;
        case GLOBALS.user_reducer.LOGOUT_USER:
            state.isLoggedIn = false
            // Cookies.clear();
            Cookies.remove('AUTH_TOKEN');
            Cookies.remove('USER_ID');
            Cookies.remove('USER_INFO');
            Cookies.remove('MODIFICATION_USER');
            // window.location.reload();
            break;
        case GLOBALS.user_reducer.UPDATE_EMAIL:
            let email_id = action.payload;

            state.user_info.cust_email_id = email_id;
            state.user_email = email_id;
            Cookies.set('USER_EMAIL', user_info.cust_email_id);
            Cookies.set('USER_INFO', JSON.stringify(user_info));
            break;
        case GLOBALS.user_reducer.UPDATE_USER_PROFILE:
            state.user_info = action.payload;
            Cookies.set('USER_INFO', JSON.stringify(action.payload));
            break;
        case 'CARTBOX':
            state.CartBox = !state.CartBox;
            state.CartBox ? document.body.classList.add('overflowhidden') : document.body.classList.remove('overflowhidden');
            break;
        case 'MODIFICATION_USER_INFO':
            Cookies.set('MODIFICATION_USER', JSON.stringify(action.payload));
            state.modification_user_info = action.payload;
    }
    return { ...state };
};

export default UserReducer;


