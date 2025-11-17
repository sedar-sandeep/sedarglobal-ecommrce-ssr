
import { combineReducers } from 'redux'

import l10n from './l10n'
import { cartReducer } from "./AddtoCart";
import listingReducer, { filterReducer, alertReducer, moodReducer, favoritesReducer, materialDetailReducer, quickbuypriceReducer, productsListing, seo, similar_color } from "./itemsReducer";
import UserReducer from "./UserReducer";
import MenusItemReduser from "./MenusItemReduser";


const sedarApp = combineReducers({
    quick_buy_price: quickbuypriceReducer,
    material_detail: materialDetailReducer,
    items: listingReducer,
    cart: cartReducer,
    filter: filterReducer,
    alert: alertReducer,
    mood_board: moodReducer,
    favoritesReducer: favoritesReducer,
    l10n, UserReducer,
    MenusItemReduser,
    products: productsListing,
    seo: seo,
    similar_color: similar_color
})

export default sedarApp

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
