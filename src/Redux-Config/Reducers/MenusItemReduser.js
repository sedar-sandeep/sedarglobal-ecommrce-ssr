//import * from '../../Globals';
import Cookies from 'js-cookie';
import GLOBALS from '../../Globals';

const initialState = {
    megamenu: [], 
   // mid_section: []
};


const MenusItemReduser = (state = initialState, action) => {
    switch (action.type) {
        case GLOBALS.menusItem.MEGAMENU:
            state.megamenu = action.payload;
            break;
        case GLOBALS.menusItem.MID_SECTION:
            state.mid_section = action.payload;
            break;
        case GLOBALS.menusItem.TOPBAR_SECTION:
            state.topbar = action.payload;
            break;
        case 'SITE_DETAIL':
            state.siteDetail = action.payload;
            // Cookies.set('siteDetail', JSON.stringify(action.payload));
        default:
            break;
    }
    return { ...state };
};

export default MenusItemReduser;


