import { canvasImg } from './Scene';

var validation = {};
var validation_steps_type = ['TECH', 'MATL', 'MEASUREMENT'];
var minimum_width_validation = ['PANEL_OPTION'];
let img;
let find_index = null;
//const qs = require('qs');

function customizeReducer(state, action) {
    validation = {};
    if (action.SS_CODE_NAME) {
        state.steps[action.SS_CODE_NAME] = action;
        //state.product_info = { ...state.product_info };
        state.product_info = state.product_info;

        state.product_info['currency'] = state.product_info['SPI_CCY_CODE'] ? state.product_info['SPI_CCY_CODE'] : '';
        state.product_info['component_type'] = action.SS_CODE_NAME;

        if (action.SS_CODE_NAME === 'MEASUREMENT') {
            state.product_info['m_width'] = state.steps['MEASUREMENT'] && state.steps['MEASUREMENT']['m_width'] ? state.steps['MEASUREMENT']['m_width'] : 0
            state.product_info['m_height'] = state.steps['MEASUREMENT'] && state.steps['MEASUREMENT']['m_height'] ? state.steps['MEASUREMENT']['m_height'] : 0
        } else if (action.SS_CODE_NAME === 'ROLL_CALCULATION') {
            state.product_info['m_width'] = state.steps['ROLL_CALCULATION'] && state.steps['ROLL_CALCULATION']['m_width'] ? state.steps['ROLL_CALCULATION']['m_width'] : 0
            state.product_info['m_height'] = state.steps['ROLL_CALCULATION'] && state.steps['ROLL_CALCULATION']['m_height'] ? state.steps['ROLL_CALCULATION']['m_height'] : 0
        } else if (action.SS_CODE_NAME === 'MATERIAL_SELECTION') {
            state.product_info['code'] = state.steps['MATERIAL_SELECTION'] && state.steps['MATERIAL_SELECTION']['material_info']['SII_CODE'] ? state.steps['MATERIAL_SELECTION']['material_info']['SII_CODE'] : 0
            state.product_info['PRICE'] = state.steps['MATERIAL_SELECTION'] && state.steps['MATERIAL_SELECTION']['material_info']['PRICE'] ? state.steps['MATERIAL_SELECTION']['material_info']['PRICE'] : 0
        } else if (action.SS_CODE_NAME === 'QUANTITY') {
            state.product_info['count'] = state.steps && state.steps.QUANTITY ? state.steps.QUANTITY.QTY : 1;
            let p = state.product_info && state.product_info.PRICE > 1 ? state.product_info.PRICE : 1;
            state.product_info['VALUE'] = p * state.product_info['count'];
        } else if (action.SS_CODE_NAME === 'DELIVERY_OPTION') {
            state.product_info['carrier_code'] = state.steps && state.steps.DELIVERY_OPTION ? state.steps.DELIVERY_OPTION.SPS_CODE : '';
            state.product_info['SOL_LOCN_CODE'] = state.steps && state.steps.DELIVERY_OPTION ? state.steps.DELIVERY_OPTION.SOL_LOCN_CODE : '';

        }
        state = { ...state }
    }
    switch (action.type) {
        case 'OBJECT':
            state.object_load = action.object_load;
            break;
        case 'PRESENT-STEP':
            state.active_step = parseInt(action.value);
            // img = canvasImg();
            // state.product_info['canvasImg'] = img;
            break;
        case 'NEXT-STEP':
            state.active_step = parseInt(state.active_step) + 1;
            // img = canvasImg();
            // state.product_info['canvasImg'] = img;
            break;
        case 'PREV-STEP':
            state.active_step = parseInt(state.active_step) - 1;
            // img = canvasImg();
            // state.product_info['canvasImg'] = img;
            break;
        case 'FILTER':
            state.filter_data = { ...state.filter_data, ...action.value };
            break;
        case 'SERACH-WITH-ITEM':
            state.search_item_code = action.value;
            break;
        case 'PRICE-UPDATE':
            state.product_info = { ...action.value };
            //  state.total_price = priceCalculation(state.steps);
            break;
        case 'TOTAL-PRICE':
            state.price_array = action.value;
            break;
        case 'ERROR-VALIDATION':
            // state.error_step_validation[action.value.key] = action.value;
            find_index = null;

            if (action.value && action.value.key) {
                state.all_step_list.filter((curElem, i) => {
                    curElem.CHILD_STEP.filter((childElem) => {
                        if (childElem.SS_CODE_NAME == action.value.key) {
                            state.error_step_validation[action.value.key] = { ...action.value, 'parent_index': i }
                        } else if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0) {
                            findParentIndex(childElem.SUB_CHILD, action.value.key, i);
                        }
                    })
                });
            }

            minimumWidthValidationFun(state);
            if (find_index) {
                state.error_step_validation[action.value.key] = { ...action.value, 'parent_index': find_index }
            }
            break
        case 'ADD-TO-CART':
            state.all_step_list.filter((curElem, i) => {
                curElem.CHILD_STEP.filter((childElem) => {
                    if (validation_steps_type.indexOf(childElem.SS_DATA_SOURCE) >= 0 && childElem.SS_CODE_NAME && state.steps[childElem.SS_CODE_NAME] == undefined) {
                        validation[childElem.SS_CODE_NAME] = childElem;
                        validation[childElem.SS_CODE_NAME]['parent_index'] = i;
                    }
                    if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0) {
                        filteFun(childElem.SUB_CHILD, childElem, state.steps, i);
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
        case 'RESET-CUSTOMIZE-REDUCER':
            state.product_info = action.value
            //  state = action.value;
            break;
        default:

    }
    return { ...state };
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

const minimumWidthValidationFun = (state) => {

    state.steps && minimum_width_validation.map((key, i) => {
        let childElem = state.steps && state.steps[key];
        if (childElem) {
            let sps_min_width = childElem.SPS_MIN_WIDTH && parseInt(childElem.SPS_MIN_WIDTH) > 0 ? parseInt(childElem.SPS_MIN_WIDTH) : false;
            let m_width = state.product_info && state.product_info.m_width && parseInt(state.product_info.m_width) > 0 ? parseInt(state.product_info.m_width) : false;

            if (sps_min_width && m_width && sps_min_width > m_width) {
                let parent_step_info = state.all_step_list.filter((e) => {
                    return e.SPS_SYS_ID == childElem.grand_parent_id;
                })
                let parent_id = parent_step_info[0] && parent_step_info[0]['SPS_ORDERING'] ? parseInt(parent_step_info[0]['SPS_ORDERING']) - 1 : 1;

                state.error_step_validation[key] = { ...childElem, 'mgs': state.t_lang('folding_door_min_width_validation', { min: sps_min_width, unit: state.t_lang('cm') }), 'parent_index': parent_id };
            } else {
                delete state.error_step_validation[key];
            }
        }
    })

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


/*
const findParentIndex = (data, steps, parent_index) => {
    let find_index = false;
    data.filter((childElem) => {
        if (childElem.SS_CODE_NAME && childElem.SS_CODE_NAME == steps) {
            find_index = parent_index;
            return parent_index;
        }
        else if (childElem.SUB_CHILD && childElem.SUB_CHILD.length > 0 && find_index==false) {
            
            findParentIndex(childElem.SUB_CHILD, steps, parent_index);
        }
        return false;
    });
   // return find_index;
}
*/

export { customizeReducer };