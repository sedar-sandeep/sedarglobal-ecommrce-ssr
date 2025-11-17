import Cookies from 'js-cookie';
import ApiDataService from '../../../services/ApiDataService';

var step_array = {};
var validation = {};
var validation_steps_type = ['TECH', 'MATL', 'MEASUREMENT', 'ROLL_CALCULATION'];
var minimum_width_validation = ['PANEL_OPTION'];
let img;
let find_index = null;
//const qs = require('qs');

function QuickByReducer(state, action) {
	//const reduxDispatch = useDispatch();
	switch (action.type) {

		case 'FETCH-STEPS':
			state.product_info = action.value.product_info;
			state.quick_buy_steps = action.value.STEPS;
			state.total_steps = action.value && action.value.STEPS ? action.value.STEPS.length : '';
			state.edit_step_data = action.value.tempOrder;
			state.product_info['currency'] = state.product_info['SPI_CCY_CODE'] ? state.product_info['SPI_CCY_CODE'] : '';
			state.product_info['item_label'] = state.product_info.category_slug == 'wallpaper' && state.product_info['SPI_PR_ITEM_CODE'] != 1566884 ? 'ADD_TO_CART' : 'QUICK_BUY';

			break;
		case 'ADD-STEP':
			state.selected_steps[action.value.SS_CODE_NAME] = action.value;
			state.product_info['item_label'] = state.product_info.category_slug == 'wallpaper' && state.product_info['SPI_PR_ITEM_CODE'] != 1566884 ? 'ADD_TO_CART' : 'QUICK_BUY';
			break;
		case 'MEASUREMENT':

			Object.keys(action.value).map((key) => {
				state.product_info[key] = action.value[key];

			});
			break;
		case 'ROLL_CALCULATION':
			Object.keys(action.value).map((key) => {
				state.product_info[key] = action.value[key];

			});
			break;

		case 'QUANTITY':
			state.product_info['count'] = action.value;
			state.product_info['item_label'] = state.product_info.category_slug == 'wallpaper' && state.product_info['SPI_PR_ITEM_CODE'] != 1566884 ? 'ADD_TO_CART' : 'QUICK_BUY';
			let p = state.product_info && state.product_info.PRICE > 1 ? state.product_info.PRICE : 1;
			state.product_info['VALUE'] = p * action.value;
			break;
		case 'STEP-SELECTED':
			state.selectStep[action.value.SS_CODE_NAME] = action.value;
			break;
		case 'TOTAL-PRICE':
			state.price_array = action.value;
			break;
		case 'STEPS-PRICE-ZERO':
			state.price_zero = action.value;
			break;
		case 'COMPLETE-PRODUCT':
			//console.log('COMPLETE-PRODUCT', action, action.value);
			state.cartItemsList = action.value;
			break;
		case 'COUNT-FREE-SAMPLE':
			state.countFreeSample = action.value;
		case 'CART-COUNT':
			state.cart_count = action.value;
		case 'ERROR-VALIDATION':
			// state.error_step_validation[action.value.key] = action.value;
			find_index = null

			state.quick_buy_steps.filter((curElem, i) => {
				curElem.CHILD_STEP.filter((childElem) => {
					if (childElem.SS_CODE_NAME == action.value.key) {
						state.error_step_validation[action.value.key] = { ...action.value, 'parent_index': i }
					} else if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0) {
						findParentIndex(childElem.SUB_CHILD, action.value.key, i);
					}
				})
			});

			minimumWidthValidationFun(state);
			if (find_index) {
				state.error_step_validation[action.value.key] = { ...action.value, 'parent_index': find_index }
			}
			break
		case 'ADD-TO-CART':
			state.quick_buy_steps.filter((curElem, i) => {
				curElem.CHILD_STEP.filter((childElem) => {
					if (validation_steps_type.indexOf(childElem.SS_DATA_SOURCE) >= 0 && childElem.SS_CODE_NAME && state.selected_steps[childElem.SS_CODE_NAME] == undefined) {
						validation[childElem.SS_CODE_NAME] = childElem;
						validation[childElem.SS_CODE_NAME]['parent_index'] = i;
					}
					if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0) {
						filteFun(childElem.SUB_CHILD, childElem, state.selected_steps, i);
					}
				})
			});

			if (Object.keys(validation).length == 0) {
				img = canvasImg();
				// window.open(img, "Final");
				state.product_info['canvasImg'] = img;
			}
			state.missing_step_validation = validation;
			break;
		default:
			break;

	}

	return { ...state };
}
const minimumWidthValidationFun = (state) => {

	console.log(state.selected_steps, 'selected_steps');
	state.selected_steps && minimum_width_validation.map((key, i) => {
		let childElem = state.selected_steps && state.selected_steps[key];
		if (childElem) {
			let sps_min_width = childElem.SPS_MIN_WIDTH && parseInt(childElem.SPS_MIN_WIDTH) > 0 ? parseInt(childElem.SPS_MIN_WIDTH) : false;
			let m_width = state.product_info && state.product_info.m_width && parseInt(state.product_info.m_width) > 0 ? parseInt(state.product_info.m_width) : false;

			if (sps_min_width && m_width && sps_min_width > m_width) {
				state.error_step_validation[key] = { ...childElem, 'mgs': state.t_lang('folding_door_min_width_validation', { min: sps_min_width, unit: state.t_lang('cm') }) };
			} else {
				delete state.error_step_validation[key];
			}
		}
	})

}

const filteFun = (data, parent, steps, parent_index) => {
	data.filter((childElem) => {
		let parent_id = steps[parent.SS_CODE_NAME] ? steps[parent.SS_CODE_NAME].SPS_SYS_ID : 0;
		if (validation_steps_type.indexOf(childElem.SS_DATA_SOURCE) >= 0 && childElem.SS_CODE_NAME && steps[childElem.SS_CODE_NAME] == undefined && parent_id == childElem.SPS_SPS_SYS_ID) {
			validation[childElem.SS_CODE_NAME] = childElem;
			validation[childElem.SS_CODE_NAME]['parent_index'] = parent_index;
		}
		if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0) {
			filteFun(childElem.SUB_CHILD, childElem, steps, parent_index);
		}
	});
}

const findParentIndex = (data, steps, parent_index) => {
	for (let i = 0; i < data.length; i++) {
		if (data[i]['SS_CODE_NAME'] == undefined) {
			continue;
		} else if (data[i]['SS_CODE_NAME'] && data[i]['SS_CODE_NAME'] == steps) {
			find_index = parent_index;
			continue;
		} else if (data[i]['SUB_CHILD'] && data[i]['SUB_CHILD'].length > 0) {
			findParentIndex(data[i]['SUB_CHILD'], steps, parent_index);
		}
	}
}


const addToCartFunApi = (state, dispatch, cart_status = 'INCOMPLETE') => {
	if (cart_status == 'INCOMPLETE') {
		cart_status = state.edit_step_data.line_result && state.edit_step_data.line_result.SOL_CART_STATUS == 'COMPLETED' ? 'COMPLETED' : 'INCOMPLETE';
	}
	let userId = Cookies.get('USER_ID') ? Cookies.get('USER_ID') : '0';
	let url = state.edit_step_data.line_result && state.edit_step_data.line_result.SOL_SYS_ID ? 'order/cart/update/' + state.edit_step_data.line_result.SOL_SYS_ID : 'order/cart';
	let post_data = { ...state.product_info, STEPS: state.selected_steps, cart_status: cart_status, url: url, CUST_SYS_ID: userId };
	let item_info = state ? state.product_info : [];

	if (state && item_info && item_info.count > 0 && (item_info.m_width > 0 && item_info.m_height > 0 || state.product_info.category_slug == 'wallpaper')) {
		ApiDataService.post(post_data.url, post_data).then(response => {
			let res_data = response.data;

			if (res_data.error_message == 'Success' && res_data.return_status == 0) {



				dispatch({ type: 'TOTAL-PRICE', value: res_data.result });
				dispatch({ type: 'COMPLETE-PRODUCT', value: res_data.complete });
				dispatch({ type: 'COUNT-FREE-SAMPLE', value: res_data.countFreeSample });
				dispatch({ type: 'CART-COUNT', value: res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0 });


			} else {
				//setErrorMgs(res_data.error_message);
				//console.log(res_data.error_message);
				alert(res_data.error_message);
			}
			console.log(res_data, 'lastres_data')
		}).catch(e => {
			console.log(e);
			alert(e);
		});
	} else {
		console.log('Something error', item_info.m_width, item_info.m_height, state);
	}

}

export { QuickByReducer, addToCartFunApi };