import Cookies from 'js-cookie';
import ApiDataService from '../../services/ApiDataService';

export const initialState = {
    CartBox: false,
    isLoggedIn: Cookies.get('USER_INFO') ? true : false,
    countryLov: ApiDataService.getAll('fetch/country_lov'),
    // countryLov: [],
    megamenu: [],
    topbar: [],
    header_mid_section: []
};

export const HeaderReducer = (state, action) => {
    switch (action.type) {
        case 'MEGAMENU':
            state.megamenu = action.value;
            break;
        case 'TOPBAR':
            state.topbar = action.value;
            break;
        case 'HEADER_MID_SECTION':
            state.header_mid_section = action.value;
            break;
        default:
            break;
    }
    return { ...state };

}