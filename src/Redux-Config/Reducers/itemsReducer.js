
// export const itemsReducer = (state = {}, action) => {
//     switch (action.type) {
//       case GLOBALS.item_type.FILTER_ITEM_SORT_BY:
//         return {
//           ...state,
//           size: action.payload.size,
//           filteredItems: action.payload.items,
//         };
//       case GLOBALS.item_type.ORDER_ITEM_BY_PRICE:
//         return {
//           ...state,
//           sort: action.payload.sort,
//           filteredItems: action.payload.items,
//         };
//       case GLOBALS.item_type.FETCH_ITEMS:
//         return { 
//           items: action.payload,
//           filteredItems: action.payload 
//         };
//       case 'LOAD_MORE_DATA':
//         return { items: action.payload, filteredItems: action.payload };
//       default:
//         return state;
//     }
//   };


export default function listingReducer(state = {
    latest: [],
    latestPageNumber: 0,
    local: [],
    localPageNumber: 0,
    countLimit: 0,
    filter: "latest",
    show: {},
    allLoaded: false,
    loading: true,
    shouldRedirect: false,
    breadcrumb: '',
    noDataFound: false,
    noStructure: false
}, action) {
    //console.log(action);
    // console.log(action, 'lllllllllllllllllllllll');
    // console.log(state, 'lllllllllllllllllllllll');

    switch (action.type) {
        case "LOADING_LISTINGS":
            return { ...state, loading: true }
        case "NO_DATA_FOUND":
            return { ...state, noDataFound: true }
        case "STRUCTURE_NOT_CREATED":
            return { ...state, noStructure: true }
        case "ADD_LISTINGS":
            return {
                ...state,
                countLimit: action.listing_limit,
                [state.filter + "PageNumber"]: action.listing_limit > 20 ? action.loadmore == 'load_more' ? state[state.filter + "PageNumber"] + 20 : action.listings.length : action.listing_limit,
                [state.filter]: [...state[state.filter], ...action.listings],
                allLoaded: action.listings.length < action.listing_limit ? true : false,
                loading: false,
                show: {}
            }
        case "ADD_NEW_LISTINGS":
            return {
                ...state,
                countLimit: action.listing_limit,
                [state.filter + "PageNumber"]: action.listing_limit > 20 ? action.loadmore == 'load_more' ? state[state.filter + "PageNumber"] + 20 : action.listings.length : action.listing_limit < 20 ? 0 : action.listing_limit,
                [state.filter]: [...action.listings],
                allLoaded: action.listings.length < action.listing_limit ? true : false,
                breadcrumb: action.breadcrumb ? action.breadcrumb : '',
                loading: false,
                show: {}
            }

        case "UPDATE_LISTINGS":
            return {
                ...state,
                countLimit: action.listing_limit,
                [state.filter + "PageNumber"]: action.listing_limit > 20 ? action.loadmore == 'load_more' ? state[state.filter + "PageNumber"] + 20 : action.listings.length : action.listing_limit,
                [state.filter]: [...action.listings],
                allLoaded: action.listings.length < action.listing_limit ? true : false,
                loading: false,
                show: {}
            }
        case 'UDPATE_LISTING':
            return { ...state };
        case 'CART_ADD_LISTING':
            return {
                ...state
            };
        case "ADD_ERRORS":
            return { ...state, loading: false }
        case "MOOD_LISTING":
            return { ...state, loading: false }

        case "RESET_ALL_LOADED":
            return {
                ...state,
                loading: true,
            }

        // case "DELETE_LISTING":
        //     const index = state.findIndex(r=>r.id===action.id)
        //     return [...state.slice(0,index), ...state.slice(index+1)]

        default:
            return state
    }
}

export const materialDetailReducer = (state = {
    latest: [],
    latestPageNumber: 0,
    local: [],
    localPageNumber: 0,
    countLimit: 0,
    filter: "latest",
    show: {},
    allLoaded: false,
    loading: false,
    shouldRedirect: false,
    breadcrumb: '',
    noDataFound: false,
    noStructure: false
}, action) => {
    //console.log(action, 'ooooooooooooooooooooo');

    switch (action.type) {
        case "LOADING_LISTINGS":
            return { ...state, loading: true }
        case "NO_DATA_FOUND":
            return { ...state, noDataFound: true }
        case "STRUCTURE_NOT_CREATED":
            return { ...state, noStructure: true }
        case "MATERIAL_DETAIL":
            return {
                ...state,
                [state.filter]: action.listings,
                breadcrumb: action.breadcrumb ? action.breadcrumb : '',
                loading: false,
                show: {}
            }
        case "UPDATE_LISTINGS":
            return {
                ...state,
                countLimit: action.listing_limit,
                [state.filter + "PageNumber"]: action.listing_limit > 20 ? action.loadmore == 'load_more' ? state[state.filter + "PageNumber"] + 20 : action.listings.length : action.listing_limit,
                [state.filter]: [...action.listings],
                allLoaded: action.listings.length < action.listing_limit ? true : false,
                loading: false,
                show: {}
            }
        case "ADD_ERRORS":
            return { ...state, loading: false }
        case "MOOD_LISTING":
            return { ...state, loading: false }
        case "RESET_ALL_LOADED":
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}

export const filterReducer = (state = {
    loading: false
}, action) => {

    switch (action.type) {
        case "FILTER_LOADING":
            return { ...state, loading: true }
        case "ADD_NEW_FILTERS":
            return {
                ...action.filter,
                loading: false
            }
        default:
            return state;
    }


};

export const quickbuypriceReducer = (state = {}, action) => {
    //console.log(action)
    switch (action.type) {
        case "QUICK_BUY_PRICE":
            return {
                ...action.data
            }
        case "PRICE_RESET":
            return { state };
        default:
            return state;
    }
};

export const alertReducer = (state = {}, action) => {
    // console.log(action, 'aaaaaaaaaction');
    switch (action.type) {
        case "ALERT_MESSAGE":
            return {
                ...action.message,
            }

        default:
            return state;
    }


};

export const moodReducer = (state = { data: [] }, action) => {

    switch (action.type) {
        case "MOOD_LISTING":
            return {
                data: [...action.data.result],
            }

        default:
            return state;
    }


};

export const favoritesReducer = (state = { data: [] }, action) => {
    // console.log(action)
    switch (action.type) {
        case "MOOD_FAVORITES":
            return {
                data: [...action.data],
            }
        default:
            return state;
    }
};

export const productsListing = (state = { isLoaded: false }, action) => {
    //console.log(action, 'action')
    switch (action.type) {
        case "PRODUCTS_LISTING":
            return { ...action.listings, isLoaded: true }

        default:
            return state;
    }
};

export const seo = (state = { isLoaded: false }, action) => {
    //console.log(action, 'action')
    switch (action.type) {
        case "SEO":
            return { ...action.payload.pageseo }
        default:
            return state;
    }
};

export const similar_color = (state = { isLoaded: false }, action) => {
    // console.log(action.payload, 'action')
    switch (action.type) {
        case "SIMILAR_COLOR":
            return { ...action.payload.similar_color }
        default:
            return state;
    }
};
