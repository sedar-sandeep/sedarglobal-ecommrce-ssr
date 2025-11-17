import { countryName, langName, defaultLocale } from '@utils/i18n';
import GLOBALS from '../../Globals'
import ApiDataService from '../../services/ApiDataService';

const per_user_sample = process.env.NUMBER_OF_SAMPLE_PER_USER ? process.env.NUMBER_OF_SAMPLE_PER_USER : 10;

//remove item action
export const removeItem = (id) => {
  return {
    type: GLOBALS.cart.REMOVE_ITEM,
    id
  }
}
//subtract qt action
export const subtractQuantity = (id) => {
  return {
    type: GLOBALS.cart.SUB_QUANTITY,
    id
  }
}
//add qt action
export const addQuantity = (id) => {
  return {
    type: GLOBALS.cart.ADD_QUANTITY,
    id
  }
}


export const reset = () => {
  return {
    type: GLOBALS.cart.RESET,
  };
};

export const changeLocale = (locale) => ({
  type: GLOBALS.others.CHANGE_LOCALE,
  locale
})

export const setUiTranslationsLoading = () => ({
  type: GLOBALS.others.SET_UI_TRANSLATIONS_LOADING
})

export const setUiTranslationsLoaded = isLoaded => ({
  type: GLOBALS.others.SET_UI_TRANSLATIONS_LOADED,
  isLoaded
})


const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;
const lang = langName //i18next.language; //'en';
const country = countryName;
const API_LOCATION = process.env.NEXT_PUBLIC_API_URL;
const API_PATH = `?site=${site_id}&lang=${lang}&country=${country}&content=item_info_listing&filters=&_page=0&_limit=20`;



export const alertMgs = (message) => {
  return ({
    type: "ALERT_MESSAGE",
    message
  })
}

export const addNewListings = (listings, listing_limit, breadcrumb, loadmore) => {
  return ({
    type: "ADD_NEW_LISTINGS",
    listings,
    listing_limit,
    breadcrumb,
    loadmore
  })
}

export const noDataFound = () => {
  return ({
    type: "NO_DATA_FOUND"
  })
}

export const noStructure = () => {
  return ({
    type: "STRUCTURE_NOT_CREATED"
  })
}


export const addNewfilter = (filter) => {
  return ({
    type: "ADD_NEW_FILTERS",
    filter
  })
}

export const loadingfilter = (filter) => {
  return ({
    type: "LOADING_FILTERS",
  })
}


export const addListings = (listings, listing_limit, breadcrumb) => {
  return ({
    type: "ADD_LISTINGS",
    listings,
    listing_limit,
    breadcrumb
  })
}

export const updateListings = (listings, listing_limit) => {
  return ({
    type: "UPDATE_LISTINGS",
    listings,
    listing_limit
  })
}

export const similarColor = (listings) => {
  return ({
    type: "SIMILAR_COLOR",
    payload: { similar_color: listings }
  })
}


export const quick_buy_price = (data) => {
  return ({
    type: "QUICK_BUY_PRICE",
    data
  })
}



export const addMoodListings = (data) => {
  return ({
    type: "MOOD_LISTING",
    data,
  })
}

export const addFavorites = (data) => {
  return ({
    type: "MOOD_FAVORITES",
    data,
  })
}


export const material_detail = (listings, breadcrumb) => {
  //
  return ({
    type: "MATERIAL_DETAIL",
    listings,
    breadcrumb
  })
}


export const products_listing = (listings) => {
  //
  return ({
    type: "PRODUCTS_LISTING",
    listings
  })
}


export const showListing = listing => {
  return ({
    type: "SHOW_LISTING",
    listing
  })
}

export const loadingListings = () => {
  return ({
    type: "LOADING_LISTINGS"
  })
}

export const filterLoading = () => {
  return ({
    type: "FILTER_LOADING"
  })
}

export const redirected = () => {
  return ({
    type: "REDIRECTED"
  })
}

export const resetAllLoaded = () => {
  return ({
    type: "RESET_ALL_LOADED",
    listings: []
  })
}

export const priceReset = (data = '') => {
  return ({
    type: "PRICE_RESET",
    data
  })
}

export const fetchItems = ($_page, $_slug) => async (dispatch) => {
  const res = await fetch(`${API_LOCATION + `material/third` + API_PATH + `&slug_url=` + $_slug}`);
  const data = await res.json();
  dispatch({
    type: GLOBALS.item_type.FETCH_ITEMS,
    payload: data.result.COMPONENT[0].PARENT,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: GLOBALS.item_type.FILTER_ITEM_SORT_BY,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a.code > b.code ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
          ? -1
          : 1
    );
  }
  dispatch({
    type: GLOBALS.item_type.ORDER_ITEM_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};


export const addToCart = (state) => (dispatch, getState) => {

  // alert(212);
  //return false;
  const items = state.page_name == 'detail' ? getState().material_detail.latest : getState().items.latest;
  const favoritesReducer = getState().favoritesReducer.data;
  let countFreeSample = parseInt(getState().cart.countFreeSample);

  console.log(countFreeSample, per_user_sample, 'countFreeSample...');
  if (countFreeSample >= per_user_sample) {

    dispatch(
      alertMgs({
        message_type: 'Error',
        message: 'maximum_limit_for_free_sample',
        variant: 'error',
        position: 'top-end',
        show: true
      })
    )

    return false;
  }


  delete state.sfi_ref_colors_item_id;
  delete state.lifestyle;
  delete state.setLoader;
  delete state.cartItems;
  delete state.data;
  delete state.user_state;
  delete state.gallery;
  delete state.sfi_ref_colors_list;


  console.log(state, 'countFreeSample...');

  ApiDataService.post('order/cart', state).then(response => {
    let res_data = response.data;
    console.log(res_data, 'res_data2')
    if (res_data.error_message == 'Success' && res_data.return_status == 0) {
      const cartItems = res_data.complete ? res_data.complete : [];
      const numberCart = res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0;
      let countFreeSample = res_data.countFreeSample;

      dispatch({
        type: GLOBALS.cart.FETCH_TO_CART,
        payload: { cartItems, numberCart, countFreeSample },
      });

    }
  }).catch(e => {
    console.log(e);

  });
};


export const removeFromCart = (state) => (dispatch, getState) => {

  const id = state.item_label == 'SAMPLE' ? state.sys_id : '';
  ///let itemCode = id + '|' + state.code;
  ApiDataService.delete(`order/cart/` + id)
    .then(response => {
      let res_data = response.data;

      if (res_data.error_message == 'Success' && res_data.return_status == 0) {
        const cartItems = res_data.complete ? res_data.complete : [];
        const numberCart = res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0;
        let countFreeSample = res_data.countFreeSample;

        dispatch({
          type: GLOBALS.cart.FETCH_TO_CART,
          payload: { cartItems, numberCart, countFreeSample },
        });

      }
      /*  if (res_data.error_message == 'Success' && res_data.return_status == 0) {
          if (state.cart_status == 'COMPLETED') {
            const cartItems = res_data.complete ? res_data.complete : [];
            const numberCart = res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0;
            let countFreeSample = res_data.countFreeSample;
  
            //item_label
            if (state.item_label == 'ADD_TO_CART') {
              items.forEach((x, key) => {
                if (x.SFI_CODE == state.SFI_CODE) {
                  items[key].ADDTOCART_SYS_ID = '';
                }
              });
  
              dispatch(
                updateListings(items, items.length)
              )
  
            }
            if (state.item_label == 'SAMPLE') {
  
  
              if (items.LISTING != undefined) {
                items.LISTING.forEach((x, key) => {
                  if (x.SFI_CODE == state.SFI_CODE) {
                    //items.LISTING[key].SAMPLE_LIST = '';
                    const index = items.LISTING[key].SAMPLE_LIST.indexOf(itemCode);
                    if (index > -1) {
                      items.LISTING[key].SAMPLE_LIST.splice(index, 1);
                      state.sampleItem.splice(index, 1);
                    }
                  }
                });
  
  
  
                dispatch(
                  material_detail(items, items.BREADCRUMB)
                )
              } else {
  
                items.forEach((x, key) => {
                  if (x.SFI_CODE == state.SFI_CODE) {
                    const index = items[key].SAMPLE_LIST.indexOf(itemCode);
                    if (index > -1) {
                      items[key].SAMPLE_LIST.splice(index, 1);
                      state.sampleItem.splice(index, 1);
                    }
                  }
                });
  
                dispatch(
                  updateListings(items, items.length)
                )
              }
  
            }
           // console.log(cartItems, 'props115555');
            console.log('addToCartFun55', { cartItems, numberCart, countFreeSample });
            dispatch({
              type: GLOBALS.cart.FETCH_TO_CART,
              payload: { cartItems, numberCart, countFreeSample },
            });
            dispatch(
              alertMgs({
                message_type: 'Success',
                message: (state.item_label == 'SAMPLE' ? 'sample' : state.DESCRIPTION) + ' ' + 'is_remove_to_cart',
                variant: 'success',
                position: 'top-end',
                show: true
              })
            )
          }
        } */

      // if (res_data.return_status == 0 && res_data.error_message == 'Success') {
      //   setErrorMgs(res_data.error_message);
      //   setVariant('success');
      // } else {
      //   setErrorMgs(res_data.error_message);
      //   setVariant('danger');
      // }
    }).catch(e => {
      console.log(e);
      // dispatch(
      //   alertMgs({
      //     message_type: 'Error',
      //     message: e.message,
      //     variant: 'danger',
      //     position: 'top-end',
      //     show: true
      //   })
      // )
    });


}




const addToCartInDatabase = (post_data) => (dispatch, getState) => {

  //return (dispatch) => {
  ApiDataService.post(post_data.url, post_data).then(response => dispatch => {
    let res_data = response.data;
    //return res_data;
    if (res_data.error_message == 'Success' && res_data.return_status == 0) {
      //
      dispatch(
        alertMgs(res_data.error_message, 'success')
      )
    } else {
      //
      dispatch(
        alertMgs(res_data.error_message, 'danger')
      )
    }

  }).catch(e => {
    //console.log(e);
    dispatch(
      alertMgs(e.message, 'danger')
    )
  });
  //}
}



export const fetchListings = (url, page_type = '', pageNumber = '', loadmore = '') => {
  return (dispatch) => {
    dispatch(loadingListings());
    dispatch(resetAllLoaded());

    ApiDataService.getwithSlug(url)
      .then(response => {
        let res_data = response.data;
        console.log(url, '333');

        if (res_data.return_status == '-333') {
          dispatch(noDataFound())
        } else {
          if (res_data.result) {
            if (pageNumber == 0 && page_type != '') {
              dispatch(
                addNewListings(res_data.result.MATERIAL[0], res_data.result.MATERIAL[1], res_data.result.BREADCRUMB, loadmore)
              )
            } else {
              if (pageNumber > 0 && page_type != '') {
                dispatch(
                  addListings(res_data.result.MATERIAL[0], res_data.result.MATERIAL[1], res_data.result.BREADCRUMB)
                )
              } else {
                dispatch(
                  material_detail(res_data.result.COMPONENT[0].PARENT, res_data.result.COMPONENT[0].PARENT.BREADCRUMB)
                )
              }
            }
          } else {
            dispatch(noStructure())
          }
        }
      }
      )
  }
}

export const fetchProductListings = (url) => {
  return (dispatch) => {
    dispatch(loadingListings())
    ApiDataService.getwithSlug(url)
      .then(response => {

        let res_data = response.data;
        if (res_data.return_status == '-333') {
          dispatch(noDataFound())
        } else {
          // console.log(response.data,"action data")
          if (res_data.result.COMPONENT) {
            dispatch(
              products_listing(res_data.result.COMPONENT[0].PARENT)
            )
            // setlisting(res_data.result.COMPONENT[0].PARENT.LISTING);
            // setBreadcrumb(res_data.result.COMPONENT[0].PARENT.BREADCRUMB);
          }
        }
      }
      )
  }
}
export const fetchFilters = (url) => {
  return (dispatch) => {
    // const { result } = data;
    // dispatch(filterLoading())
    // if (result.PRODUCT && result.PRODUCT.length > 0) {
    //   dispatch(addNewfilter(result))
    // }
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        if (result.result.PRODUCT && result.result.PRODUCT.length > 0) {
          dispatch(addNewfilter(result.result))
        } else {
          location.replace(`/${defaultLocale}`);
        }
      }
      );
  }
}
/*export const fetchFilters = (url) => {
  return (dispatch) => {
    dispatch(filterLoading())
    fetch(url)
      .then(res => res.json())
      .then((result) => {
        dispatch(addNewfilter(result.result))
      }
      );
  }
}*/


export const moodListings = (url) => {
  return (dispatch) => {
    ApiDataService.getAll(url)
      .then(response => {
        let res_data = response.data;
        dispatch(addMoodListings(res_data));
      }
      )
  }
}

let mood_sys_id = [];

export const postMood = (state) => (dispatch, getState) => {
  const items = state.page_name == 'detail' ? getState().material_detail.latest : getState().items.latest;
  const similar_color = getState().similar_color;
  //console.log(similar_color);
  ApiDataService.post(state.url, { ...state }).then(response => {
    const res_data = response.data;
    //return res_data;
    if (res_data.error_message == 'Success' && res_data.return_status == 0) {
      //

      if (state.item_label == 'ADD_TO_MOOD') {
        if (items.LISTING != undefined) {
          items.LISTING.forEach((x, key) => {
            if (x.SFI_CODE == state.SFI_CODE) {
              //items.LISTING[key].SMB_SYS_ID = res_data.sys_id;

              if (items.LISTING[key].MOOD_LIST != null) {
                mood_sys_id.push(res_data.sys_id + '|' + state.code);
                items.LISTING[key].MOOD_LIST = mood_sys_id;
              } else {
                mood_sys_id = [res_data.sys_id + '|' + state.code];
                items.LISTING[key].MOOD_LIST = res_data.sys_id + '|' + state.code;
              }
            }
          });

          dispatch(
            material_detail(items, items.BREADCRUMB)
          )
        } else {
          items.forEach((x, key) => {
            if (x.SFI_CODE == state.SFI_CODE) {
              if (items[key].MOOD_LIST != null) {
                mood_sys_id.push(res_data.sys_id + '|' + state.code);
                items[key].MOOD_LIST = mood_sys_id;
              } else {
                mood_sys_id = [res_data.sys_id + '|' + state.code];
                items[key].MOOD_LIST = res_data.sys_id + '|' + state.code;
              }
            }
          });

          dispatch(
            updateListings(items)
          )
        }
      }





      dispatch(
        alertMgs({
          message_type: 'Success',
          message: (state.item_label == 'ADD_TO_MOOD' ? 'mood_board' : state.desc) + ' ' + 'is_added',
          variant: 'success',
          position: 'top-end',
          show: true
        })
      )
    } else {
      //
      // dispatch(
      //   alertMgs({
      //     message_type: 'Error',
      //     message: res_data.error_message,
      //     variant: 'danger',
      //     position: 'top-end',
      //     show: true
      //   })
      // )
    }

  }).catch(e => {
    console.log(e);
    // dispatch(
    //   alertMgs({
    //     message_type: 'Error',
    //     message: e.message,
    //     variant: 'danger',
    //     position: 'top-end',
    //     show: true
    //   })
    // )
  });
}

export const removeMood = (state) => (dispatch, getState) => {
  const favoritesReducer = getState().favoritesReducer.data;
  const items = state.page_name == 'detail' ? getState().material_detail.latest : getState().items.latest;

  const similar_color = getState().similar_color;
  let itemCode = state.sys_id + '|' + state.code;
  ApiDataService.delete('mood_board/send/' + state.sys_id).then(response => {
    let res_data = response.data;
    //return res_data;
    if (res_data.error_message == 'Success' && res_data.return_status == 0) {
      //
      const cartItems = res_data.complete ? res_data.complete : [];
      const numberCart = cartItems.length ? cartItems.length : 0;

      // console.log(state.page_name);

      if (state.page_name == 'moodboards-favorites') {
        if (favoritesReducer.length > 0) {
          favoritesReducer.forEach((x, key) => {
            x.material.forEach((j, row) => {
              if (j.SFI_CODE == state.code) {
                if (state.item_label == 'REMOVE_TO_MOOD') {
                  favoritesReducer[key].material[row].SMB_SYS_ID = '';
                }
              }
            });

          });

          dispatch(addFavorites(favoritesReducer));
        }
      } else {


        //item_label
        // if (items.length > 0) {

        // if (state.item_label == 'REMOVE_TO_MOOD') {
        if (items.LISTING != undefined) {
          items.LISTING.forEach((x, key) => {
            if (x.SFI_CODE == state.SFI_CODE) {
              //items.LISTING[key].SMB_SYS_ID = '';

              const index = items.LISTING[key].MOOD_LIST.indexOf(itemCode);
              if (index > -1) {
                items.LISTING[key].MOOD_LIST.splice(index, 1);
                state.moodItem.splice(index, 1);
              }
            }
          });

          dispatch(
            material_detail(items, items.BREADCRUMB)
          )
        } else {

          items.forEach((x, key) => {
            if (x.SFI_CODE == state.SFI_CODE) {
              const index = items[key].MOOD_LIST.indexOf(itemCode);

              if (index > -1) {
                items[key].MOOD_LIST.splice(index, 1);
                state.moodItem.splice(index, 1);
              }
            }
          });


          dispatch(
            updateListings(items, items.length)
          )
        }
        // }
      }


      dispatch(
        alertMgs({
          message_type: 'Success',
          message: (state.item_label == 'REMOVE_TO_MOOD' ? 'mood_board' : state.desc) + ' ' + 'is_removed',
          variant: 'success',
          position: 'top-end',
          show: true
        })
      )
    } else {
      //
      // dispatch(
      //   alertMgs({
      //     message_type: 'Error',
      //     message: res_data.error_message,
      //     variant: 'danger',
      //     position: 'top-end',
      //     show: true
      //   })
      // )
    }

  }).catch(e => {
    console.log(e);
    // dispatch(
    //   alertMgs({
    //     message_type: 'Error',
    //     message: e.message,
    //     variant: 'danger',
    //     position: 'top-end',
    //     show: true
    //   })
    // )
  });
}

export const fetchFavorites = () => {
  return (dispatch) => {
    ApiDataService.getAll('mood_board/fetch')
      .then(response => {
        dispatch(addFavorites(response.data.result));
      }
      )
  }
}

