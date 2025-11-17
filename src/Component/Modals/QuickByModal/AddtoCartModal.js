import React, { useState, useEffect, createContext, useReducer, Fragment, useRef } from 'react';
import { connect } from "react-redux";

import { Modal, Col, Row, Form, ButtonGroup, Button, InputGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import LinkComponent from '@components/Link';
import CurrencyFormat from '../../../services/CurrencyFormat';
import parse from 'html-react-parser';
import ErrorStepPopup from "./Popup/ErrorStepPopup";
import SuccessStepPopup from "./Popup/SuccessStepPopup";
import ValidationPopup from "./Popup/ValidationPopup";
import { useSelector, useDispatch } from "react-redux";
import { VscInfo } from 'react-icons/vsc';
import { CgCalculator } from 'react-icons/cg';
import InfoPopup from "./Popup/InfoPopup";

import ProductMaterialDetailThumbSlider from "../../ProductMaterialDetailThumbSlider/ProductMaterialDetailThumbSlider";
import ApiDataService from '../../../services/ApiDataService';
import { QuickByReducer } from './QuickBy';
//import { ReTagCategoryPage } from '../../../Admitad/AdmitadIndex';
import { free_delivery_price } from './FreeDeliveryCartValue';
import GoogleAnalytics from '../../../services/GoogleAnalytics';
import SnapPixel from '../../../services/SnapPixel';

import { useTranslation } from 'next-i18next';
import { defaultLocale, langName } from '@utils/i18n';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import DeliveryDays from '../../Utility/DeliveryDays';
import { ImageComponent, IconComponent } from '@components/image';
const brand_name = ['The MET'];


export const QuickByContext = createContext();
const mm_unit_val = 10;
const cm_unit_val = 1;
const inch_unit_val = 0.393701;

//let free_delivery_price = 1000;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;
const img_path = BASE_URL + 'uploads/' + site_id + '/item/';
const item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_WEBP_PATH + 'laptop/';
const item_img_path_tile = process.env.NEXT_PUBLIC_ITEM_IMG_WEBP_PATH + 'hover/';
const color_img_path = process.env.NEXT_PUBLIC_S3_COLOR_PATH;
const site = Cookies.get('siteDetail');
let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 0;
let currency = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : 'AED';


const InfoLink = (props) => {
	const [modalShow, setModalShow] = useState(false);
	return (
		<>
			<VscInfo size={15} role="button" onClick={() => setModalShow(true)} />
			<InfoPopup show={modalShow} onHide={() => setModalShow(false)} {...props} />
		</>
	)
}


const AddtoCartModal = (props) => {

	let modification_user_info = props.user_state && props.user_state.modification_user_info ? props.user_state.modification_user_info : [];
	let user_info = props.user_state && props.user_state.user_info ? props.user_state.user_info : [];

	let head_sys_id = modification_user_info && modification_user_info.head_sys_id ? modification_user_info.head_sys_id : '';
	let modify_cust_sys_id = user_info && user_info.cust_type == 'ADMIN' && head_sys_id > 0 ? user_info.cust_id : 0;

	const { t } = useTranslation("common");
	let color_list = props.sfi_ref_colors_list;

	const router = useRouter();
	const listingss = useSelector((store) => store);

	console.log(listingss, 'listingss');
	console.log(props, 'AddtoCartModal', ['100585', '101057', '101060'].indexOf(props.SPI_SC_SYS_ID), props.SPI_SC_SYS_ID);

	React.useEffect(() => {
		if (props.SPI_PR_ITEM_CODE == '' || props.SPI_PR_ITEM_CODE == undefined || color_list.length == 0) {
			//console.log(props.SPI_PR_ITEM_CODE,'dsds');
			return false;
		}
	}, [])

	const { slug } = router.query;

	let category_slug = props.category_slug ? props.category_slug : slug && slug.length && slug[0] ? slug[0] : '';

	let item_slug = slug && slug.length && slug[3] ? slug[3] : '';
	let line_sys_id = slug && slug.length && slug[4] ? slug[4] : '';

	let active_item_id = props.active_item_id ? props.active_item_id : false;
	let colors_item_id = props.sfi_ref_colors_item_id[active_item_id];
	let sii_code = active_item_id ? active_item_id?.split('|')[0] : false;
	let sfi_light_filtering_app_yn = props.SFI_LIGHT_FILTERING_APP_YN ? props.SFI_LIGHT_FILTERING_APP_YN : false;
	let sfi_blackout_lining_app_yn = props.SFI_BLACKOUT_LINING_APP_YN ? props.SFI_BLACKOUT_LINING_APP_YN : false;


	React.useEffect(() => {
		if (line_sys_id && sii_code) {
			if (item_slug != sii_code) {
				return false;
			}
		}
	}, [])

	let searchParams = new URLSearchParams(window.location.search);

	let m_width = searchParams.get('min') ? searchParams.get('min') : '';
	let m_height = searchParams.get('max') ? searchParams.get('max') : '';

	let from_price = Number(props.FROM_PRICE).toFixed(decimalPoints);
	let from_price_old = Number(props.FROM_PRICE_OLD).toFixed(decimalPoints);
	let props_price = Number(props.PRICE).toFixed(decimalPoints);
	let props_price_old = Number(props.PRICE_OLD).toFixed(decimalPoints);

	let price = props.data != undefined && props.data.data && props.data.data.size_filter_value > props.SPI_MINIMUM_CHG_QTY ? from_price * props.data.data.size_filter_value : props_price ? props_price : 0;
	let old_price = props.data != undefined && props.data.data && props.data.data.size_filter_value > props.SPI_MINIMUM_CHG_QTY ? from_price_old * props.data.data.size_filter_value : props_price_old ? props_price_old : 0;

	//let family_code = searchParams.get('family');

	const pro_item_code = props.SPI_PR_ITEM_CODE;

	const history = useRouter();

	const [validationModal, setValidationModal] = useState();
	const [errorModal, setErrorModal] = useState();
	const [successModal, setSuccessModal] = useState();
	const [addtocartBtn, setAddtocartBtn] = useState(false);
	const [numberOfColorShow, setNumberOfColorShow] = useState(6);
	const [divToggle, setDivToggle] = useState(true);

	const [addtocartBtnFirst, setAddtocartBtnFirst] = useState(false);


	const reduxDispatch = useDispatch();

	const initialState = {
		product_info: { m_width: m_width, m_height: m_height },
		selected_steps: {},
		quick_buy_steps: {},
		total_steps: 0,
		missing_step_validation: {},
		error_step_validation: {},
		edit_step_data: {},
		price_array: { SOL_VALUE: price, SOL_OLD_VALUE: old_price, ROLL_CALC: 0 },
		price_zero: [],
		selectStep: {},
		cartItemsList: [],
		countFreeSample: 0,
		cart_count: 0,
		t_lang: t

	};

	const [quickBy_state, quickByDispatch] = useReducer(QuickByReducer, initialState);

	// console.log(quickBy_state, 'quickBy_state');
	const [instShow, setInstShow] = useState(false);
	//const [target, setTarget] = useState(null);

	const [stepsSectionOpocity, setStepsSectionOpocity] = useState(null);
	const ref = useRef(null);


	const handleClick = (event) => {
		setInstShow(!instShow);
		//setTarget(event.target);
	};

	let imageData = [{ image: props.image }, { hover: props.hover }];
	//console.log(color_list[0].split('|')[1]);


	let canvasGallery = props.gallery && props.gallery.length > 0 ? props.gallery.find((row) => {
		return row.SLI_SII_CODE == sii_code ? row : '';
	}) : '';

	const [state, setState] = useState({
		count: props.category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884 ? Number(props.LEADER_QTY) : Number(1),
		category_slug: props.category_slug,
		meas_unit_selected: 'cm',
		meas_unit_val: 1,
		width_other: false,
		height_other: false,
		valid_width: false,
		valid_height: false,
		m_width: m_width,
		m_height: m_height,
		om_width: m_width,
		om_height: m_height,
		convert_width: '',
		convert_height: '',
		item_label: props.category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884 ? 'ADD_TO_CART' : 'QUICK_BUY',
		code: colors_item_id ? colors_item_id?.split('|')[0] : color_list[0]?.split('|')[0],
		canvasImg: canvasGallery?.SLI_IMAGE_PATH || img_path + colors_item_id?.split('|')[7], //colors_item_id ? img_path + colors_item_id?.split('|')[7] : img_path + color_list[0]?.split('|')[7],
		color_item_id: colors_item_id ? colors_item_id?.split('|')[1] : color_list[0]?.split('|')[1],
		PRICE: props_price,
		VALUE: props_price,
		OLD_PRICE: (old_price / (props.category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884 ? Number(props.LEADER_QTY) : Number(1))),
		color_code: colors_item_id ? colors_item_id?.split('|')[5] : color_list[0]?.split('|')[5],
		sii_width: colors_item_id ? colors_item_id?.split('|')[8] : m_width,
		sii_length: colors_item_id ? colors_item_id?.split('|')[9] : m_height,
	});


	console.log('valid_width111..', props, state);
	const [errorShake, setErrorShake] = useState('shake-animation');


	const measurementFun = (e, step_data) => {

		setDivToggle(true);
		let val = e.value;
		step_data['code'] = state.code;
		if (val == 'WIDTH_OTHER') {
			setState({ ...state, width_other: val, m_width: 0, om_width: '' });
		} else if (val == 'HEIGHT_OTHER') {
			setState({ ...state, height_other: val, m_height: 0, om_height: '' });
		} else {
			if (e.name == 'm_width') {
				step_data['m_width'] = val;
				step_data['m_height'] = state.m_height;
				step_data['convert_width'] = e.selectedOptions[0].attributes.convert_width.value;
				step_data['convert_height'] = state.convert_height;
				setState({ ...state, m_width: val, convert_width: e.selectedOptions[0].attributes.convert_width.value, width_other: false, valid_width: false });
				quickByDispatch({ type: 'MEASUREMENT', value: { ...state, m_width: val, convert_width: e.selectedOptions[0].attributes.convert_width.value } });
			} else if (e.name == 'm_height') {
				step_data['m_height'] = val;
				step_data['m_width'] = state.m_width;
				step_data['convert_width'] = state.convert_width;
				step_data['convert_height'] = e.selectedOptions[0].attributes.convert_height.value;
				setState({ ...state, m_height: val, convert_height: e.selectedOptions[0].attributes.convert_height.value, height_other: false });
				quickByDispatch({ type: 'MEASUREMENT', value: { ...state, m_height: val, convert_height: e.selectedOptions[0].attributes.convert_height.value } });
			}
		}
		quickByDispatch({ type: 'ADD-STEP', value: step_data });
	}
	const toggleValidation = (step_data) => {
		let { value, name, min, max } = event.target;

		//const re = /^[0-9\b]+$/;
		const re = /^[0-9]*(\.[0-9]{0,2})?$/;
		step_data['code'] = state.code;

		if (re.test(parseFloat(value))) {

			if ((parseFloat(value) < parseFloat(min) || parseFloat(value) > parseFloat(max)) && name == 'width') {
				let result_val = conversion('cm', { om_width: value });
				step_data['m_width'] = result_val.width ? result_val.width.toFixed(2) : '';
				setState({ ...state, valid_width: true, om_width: value, m_width: step_data['m_width'] });
				setErrorShake('')
				setErrorShake('shake-animation')
			} else if ((parseFloat(value) < parseFloat(min) || parseFloat(value) > parseFloat(max)) && name == 'height') {
				let result_val = conversion('cm', { om_height: value });
				step_data['m_height'] = result_val.height ? result_val.height.toFixed(2) : '';
				setState({ ...state, valid_height: true, om_height: value, m_height: step_data['m_height'] });
				setErrorShake('')
				setErrorShake('shake-animation')
			} else {
				if (name == 'width') {
					let result_val = conversion('cm', { om_width: value });
					step_data['m_width'] = result_val.width ? result_val.width.toFixed(2) : '';
					setState({ ...state, valid_width: false, om_width: value, om_height: state.om_height, m_width: step_data['m_width'], m_height: state.m_height });
					quickByDispatch({ type: 'MEASUREMENT', value: { ...state, m_width: step_data['m_width'], convert_width: value } });
				} else if (name == 'height') {
					let result_val = conversion('cm', { om_height: value });
					step_data['m_height'] = result_val.height ? result_val.height.toFixed(2) : '';
					setState({ ...state, valid_height: false, om_height: value, om_width: state.om_width, m_height: step_data['m_height'], m_width: state.m_width });
					quickByDispatch({ type: 'MEASUREMENT', value: { ...state, m_height: step_data['m_height'], convert_height: value } });
				}
				step_data['REMARKS'] = { width_other: state.width_other, height_other: state.height_other }
				quickByDispatch({ type: 'ADD-STEP', value: step_data });
			}
		} else {
			if (name == 'width') {
				setState({ ...state, valid_width: true, om_width: '' });
			}
			else if (name == 'height') {
				setState({ ...state, valid_height: true, om_height: '' });
			}
		}

	}
	const measuringUnit = (type, val) => {

		let result_val = conversion(type);
		setState({
			...state,
			meas_unit_selected: type,
			meas_unit_val: val,
			om_width: result_val.width ? result_val.width.toFixed(2) : '',
			om_height: result_val.height ? result_val.height.toFixed(2) : ''
		});

		quickByDispatch({ type: 'MEASUREMENT', value: { ...state, meas_unit_selected: type, convert_width: (state.m_width * val).toFixed(2), convert_height: (state.m_height * val).toFixed(2) } });
	}
	const conversion = (type, value = false) => {
		let old_meas_unit_selected = state.meas_unit_selected;

		let old_om_width = value && value.om_width ? value.om_width : state.om_width;
		let old_om_height = value && value.om_height ? value.om_height : state.om_height;

		let width = old_om_width = value && value.om_width ? value.om_width : state.om_width;
		let height = old_om_height = value && value.om_height ? value.om_height : state.om_height;

		if (old_meas_unit_selected == 'mm' && type == 'cm' && (width || height)) {
			old_om_width = width * (cm_unit_val / mm_unit_val);
			old_om_height = height * (cm_unit_val / mm_unit_val);
		} else if (old_meas_unit_selected == 'mm' && type == 'inch' && (width || height)) {
			old_om_width = width * (inch_unit_val / mm_unit_val);
			old_om_height = height * (inch_unit_val / mm_unit_val);

		} else if (old_meas_unit_selected == 'inch' && type == 'mm' && (width || height)) {
			old_om_width = width * (mm_unit_val / inch_unit_val);
			old_om_height = height * (mm_unit_val / inch_unit_val);

		} else if (old_meas_unit_selected == 'inch' && type == 'cm' && (width || height)) {
			old_om_width = width * (cm_unit_val / inch_unit_val);
			old_om_height = height * (cm_unit_val / inch_unit_val);

		} else if (old_meas_unit_selected == 'cm' && type == 'mm' && (width || height)) {
			old_om_width = width * (mm_unit_val / cm_unit_val);
			old_om_height = height * (mm_unit_val / cm_unit_val);

		} else if (old_meas_unit_selected == 'cm' && type == 'inch' && (width || height)) {
			old_om_width = width * (inch_unit_val / cm_unit_val);
			old_om_height = height * (inch_unit_val / cm_unit_val);

		}
		return { width: Number(old_om_width), height: Number(old_om_height) };

	}

	const handleClose = () => {
		props.loginOnHide(false)
	}
	const quantityFun = (val) => {
		if (props.category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884 && (val != quickBy_state.price_array.ROLL_CALC)) {
			setDivToggle(false);
			setState({ ...state, om_width: '', om_height: '', m_width: '', m_height: '', count: Number(val) });
			quickByDispatch({
				type: 'ROLL_CALCULATION', value: {
					...state, om_width: '', om_height: '', m_width: '', m_height: '', count: Number(val), category_slug: props.category_slug
				}
			});
			console.log('valid_width1342', state);

		} else if (props.category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884 && (val == quickBy_state.price_array.ROLL_CALC)) {
			setDivToggle(true);
			setState({ ...state, om_width: '', om_height: '', m_width: '', m_height: '', count: Number(val) });
			console.log('valid_width1353', state);
			// setState({ ...state, om_width: m_width, om_height: m_height, m_width: m_width, m_height: m_height, count: Number(val) });
			// quickByDispatch({
			// 	type: 'ROLL_CALCULATION', value: {
			// 		...state, om_width: m_width, om_height: m_height, m_width: m_width, m_height: m_height, count: Number(val), category_slug: props.category_slug
			// 	}
			// });

			quickByDispatch({
				type: 'ROLL_CALCULATION', value: {
					...state, om_width: '', om_height: '', m_width: '', m_height: '', count: Number(val), category_slug: props.category_slug
				}
			});

		} else {
			setDivToggle(true);
			setState({ ...state, count: Number(val) });
			console.log('valid_width1370', state);
		}

		quickByDispatch({ type: 'QUANTITY', value: val });

	}

	const stepValues = (step_data) => {

		if (step_data && ['CONTROL_TYPE'].indexOf(step_data.SS_CODE_NAME) >= 0 && ['CT02'].indexOf(step_data.SPS_CODE) >= 0 && state.width_other == false) {
			let motorized_min_width = step_data.SPS_MIN_WIDTH && parseInt(step_data.SPS_MIN_WIDTH) > 1 ? parseInt(step_data.SPS_MIN_WIDTH) : 0;
			let width_standard = quickBy_state.product_info.SPI_WIDTH_STANDARD ? quickBy_state.product_info.SPI_WIDTH_STANDARD?.split(',') : [];

			for (var i = 0; i < width_standard.length; i++) {
				if (Number(width_standard[i]) >= motorized_min_width) {
					if (state.m_width < motorized_min_width) {
						setState({
							...state,
							m_width: width_standard[i],
						});
						quickByDispatch({
							type: 'MEASUREMENT', value: {
								...state,
								m_width: width_standard[i],
							}
						});
						break;
					}
				}
			}
		}
		setStepsSectionOpocity(true);
		quickByDispatch({ type: 'ADD-STEP', value: step_data });
		quickByDispatch({ type: 'STEP-SELECTED', value: step_data });
		setTimeout(() => {
			cartAddUpdate();
		}, 1000);


	}

	const fetchSteps = () => {
		let get_data = { sys_id: line_sys_id }

		ApiDataService.getwithSlug(`material/fetch_steps/${pro_item_code}?content=steps`, get_data)
			.then(response => {
				let res_data = response.data;
				if (res_data.error_message == "Success" && res_data.return_status == 0 && res_data.result && res_data.result.product_info && res_data.result.STEPS) {
					quickByDispatch({ type: 'FETCH-STEPS', value: res_data.result });

					setTimeout(() => {
						selectDefaultStep();
					}, 2000);
				} else {
					console.log(res_data.error_message, res_data);
				}
			})
	}

	const selectDefaultStep = () => {
		quickBy_state && quickBy_state.quick_buy_steps && quickBy_state?.quick_buy_steps?.map((row_data, key) => {
			let step_select = true;
			row_data?.CHILD_STEP?.map((data) => {
				if (data.SS_CODE_NAME == 'LINING_OPTION' && data.SPS_CODE == 'LO01' && sfi_blackout_lining_app_yn == 'N') {

				} else if (data.SS_CODE_NAME == 'LINING_OPTION' && data.SPS_CODE == 'LO02' && sfi_light_filtering_app_yn == 'N') {

				} else {

					if (data.SOI_SPS_CODE == data.SPS_CODE && step_select) {
						quickByDispatch({ type: 'ADD-STEP', value: data });
						step_select = false;
						quickByDispatch({ type: 'STEP-SELECTED', value: data });
					} else if (data.SPS_VALUE_DEFAULT === 'Y' && step_select) {
						quickByDispatch({ type: 'ADD-STEP', value: data });
						quickByDispatch({ type: 'STEP-SELECTED', value: data });
					}
				}
			});
			let product_info = quickBy_state.product_info;
			let width_standard = product_info.SPI_WIDTH_STANDARD ? product_info.SPI_WIDTH_STANDARD?.split(',') : [];
			let height_standard = product_info.SPI_HEIGHT_STANDARD ? product_info.SPI_HEIGHT_STANDARD?.split(',') : [];
			let line_result = quickBy_state.edit_step_data && quickBy_state.edit_step_data.line_result ? quickBy_state.edit_step_data.line_result : []
			let info_result = quickBy_state.edit_step_data && quickBy_state.edit_step_data.info_result ? quickBy_state.edit_step_data.info_result : []

			if (['MEASUREMENT', 'ROLL_CALCULATION'].indexOf(row_data.SS_CODE_NAME) >= 0 && state.m_width == '' && state.m_height == '' && state.om_width == '' && state.om_height == '' && quickBy_state.product_info) {

				let width_other = 'WIDTH_OTHER';
				let height_other = 'HEIGHT_OTHER';

				for (var i = 0; i < width_standard.length; i++) {
					if (Number(width_standard[i]) == Number(line_result.SOL_WIDTH)) {
						width_other = false;
						break;
					}
				}
				for (var i = 0; i < height_standard.length; i++) {
					if (Number(height_standard[i]) == Number(line_result.SOL_HEIGHT)) {
						height_other = false;
						break;
					}
				}

				if (line_result && info_result && (info_result['MEASUREMENT'] || info_result['ROLL_CALCULATION']) && line_result.SOL_QTY) {
					if (line_result.SOL_WIDTH > 0 && line_result.SOL_HEIGHT > 0) {
						setDivToggle(true);
					} else {
						setDivToggle(false);
					}
					let unit_value = 1;
					if (line_result.SOL_USER_INPUT_UOM == 'mm') {
						unit_value = mm_unit_val
					} else if (line_result.SOL_USER_INPUT_UOM == 'inch') {
						unit_value = inch_unit_val
					} else {
						unit_value = cm_unit_val;
					}
					setState({
						...state,
						m_width: line_result.SOL_WIDTH,
						m_height: line_result.SOL_HEIGHT,
						count: parseInt(line_result.SOL_QTY),
						meas_unit_selected: line_result.SOL_USER_INPUT_UOM ? line_result.SOL_USER_INPUT_UOM : 'cm',
						meas_unit_val: unit_value,
						//code: info_result['MEASUREMENT']['SOI_ITEM_CODE']
					});
					console.log('valid_width1496', state);
					//row_data['code'] = info_result['MEASUREMENT']['SOI_ITEM_CODE'];
					row_data['m_width'] = line_result.SOL_WIDTH;
					row_data['m_height'] = line_result.SOL_HEIGHT;
					quickByDispatch({ type: 'QUANTITY', value: parseInt(line_result.SOL_QTY) });

					if (info_result['MEASUREMENT']) {

						setState({
							...state,
							m_width: line_result.SOL_WIDTH,
							m_height: line_result.SOL_HEIGHT,
							count: parseInt(line_result.SOL_QTY),
							meas_unit_selected: line_result.SOL_USER_INPUT_UOM ? line_result.SOL_USER_INPUT_UOM : 'cm',
							meas_unit_val: unit_value,
							//code: info_result['MEASUREMENT']['SOI_ITEM_CODE']
							width_other: width_other,
							height_other: height_other,
							om_width: line_result.SOL_WIDTH,
							om_height: line_result.SOL_HEIGHT
						});
						console.log('valid_width1517', state);
						quickByDispatch({
							type: 'MEASUREMENT', value: {
								...state,
								m_width: line_result.SOL_WIDTH,
								m_height: line_result.SOL_HEIGHT,
								count: Number(line_result.SOL_QTY),
								meas_unit_selected: line_result.SOL_USER_INPUT_UOM ? line_result.SOL_USER_INPUT_UOM : 'cm',
								convert_width: (line_result.SOL_WIDTH * unit_value).toFixed(2),
								convert_height: (line_result.SOL_HEIGHT * unit_value).toFixed(2)
							}
						});
						console.log('valid_width1529', Number(line_result.SOL_QTY), line_result.SOL_QTY);

					} else if (info_result['ROLL_CALCULATION']) {
						setState({
							...state,
							m_width: line_result.SOL_WIDTH,
							m_height: line_result.SOL_HEIGHT,
							om_width: line_result.SOL_WIDTH,
							om_height: line_result.SOL_HEIGHT,
							count: parseInt(line_result.SOL_QTY),
							meas_unit_selected: line_result.SOL_USER_INPUT_UOM ? line_result.SOL_USER_INPUT_UOM : 'cm',
							meas_unit_val: unit_value,
							//code: info_result['MEASUREMENT']['SOI_ITEM_CODE']
							width_other: width_other,
							height_other: height_other,
						});
						console.log('valid_width1543', state);
						quickByDispatch({
							type: 'ROLL_CALCULATION', value: {
								...state,
								m_width: line_result.SOL_WIDTH,
								m_height: line_result.SOL_HEIGHT,
								om_width: line_result.SOL_WIDTH,
								om_height: line_result.SOL_HEIGHT,
								count: parseInt(line_result.SOL_QTY),
								meas_unit_selected: line_result.SOL_USER_INPUT_UOM ? line_result.SOL_USER_INPUT_UOM : 'cm',
								convert_width: (line_result.SOL_WIDTH * unit_value).toFixed(2),
								convert_height: (line_result.SOL_HEIGHT * unit_value).toFixed(2)
							}
						});
					}

				} else {
					//console.log(line_result, 'line_result');
					//console.log(Number(state.count), 'Number(state.count)');
					setState({ ...state, m_width: width_standard[0], m_height: height_standard[0] });
					console.log('valid_width1563', state);
					row_data['code'] = state.code;
					row_data['m_width'] = width_standard[0];
					row_data['m_height'] = height_standard[0];
					quickByDispatch({ type: 'QUANTITY', value: Number(state.count) });
					quickByDispatch({
						type: 'MEASUREMENT', value: {
							...state,
							m_width: width_standard[0],
							m_height: height_standard[0],
							convert_width: (width_standard[0] * state.meas_unit_val).toFixed(2),
							convert_height: (height_standard[0] * state.meas_unit_val).toFixed(2)
						}
					});
				}

				quickByDispatch({ type: 'ADD-STEP', value: row_data });

				setTimeout(() => {
					cartAddUpdate();
				}, 1000);
			} else if (['MEASUREMENT', 'ROLL_CALCULATION'].indexOf(row_data.SS_CODE_NAME) >= 0 && state.m_width > 0 && state.m_height > 0 && quickBy_state.product_info) {
				let width_other = 'WIDTH_OTHER';
				let height_other = 'HEIGHT_OTHER';

				for (var i = 0; i < width_standard.length; i++) {
					if (Number(width_standard[i]) == Number(state.m_width)) {
						width_other = false;
						break;
					}
				}
				for (var i = 0; i < height_standard.length; i++) {
					if (Number(height_standard[i]) == Number(state.m_height)) {
						height_other = false;
						break;
					}
				}

				setState({
					...state,
					width_other: width_other,
					height_other: height_other
				});
				console.log('valid_width1606', state);
				if (row_data.SS_CODE_NAME == 'MEASUREMENT') {
					quickByDispatch({
						type: 'MEASUREMENT', value: {
							...state,
							m_width: state.m_width,
							m_height: state.m_height,
							convert_width: (state.m_width * state.meas_unit_val).toFixed(2),
							convert_height: (state.m_height * state.meas_unit_val).toFixed(2)
						}
					});
				} else if (row_data.SS_CODE_NAME == 'ROLL_CALCULATION') {
					quickByDispatch({
						type: 'ROLL_CALCULATION', value: {
							...state,
							m_width: state.m_width,
							m_height: state.m_height,
							convert_width: (state.m_width * state.meas_unit_val).toFixed(2),
							convert_height: (state.m_height * state.meas_unit_val).toFixed(2)
						}
					});
				}

				quickByDispatch({ type: 'ADD-STEP', value: row_data });
				setTimeout(() => {
					cartAddUpdate();
				}, 1000);
			}
			if (quickBy_state.quick_buy_steps && key == (quickBy_state.quick_buy_steps.length - 1)) {
				setTimeout(() => {
					setAddtocartBtnFirst(true);
				}, 2500);
			}

		});

	}

	const addToCartFun = () => {
		let missing = Object.keys(quickBy_state.missing_step_validation).length;
		let validation = Object.keys(quickBy_state.error_step_validation).length;
		let SPI_MAX_HEIGHT = parseInt(quickBy_state.product_info.SPI_MAX_HEIGHT);
		let SPI_MAX_WIDTH = parseInt(quickBy_state.product_info.SPI_MAX_WIDTH);
		let SPI_MIN_HEIGHT = quickBy_state.product_info.SPI_MIN_HEIGHT ? parseInt(quickBy_state.product_info.SPI_MIN_HEIGHT) : 1;
		let SPI_MIN_WIDTH = quickBy_state.product_info.SPI_MIN_WIDTH ? parseInt(quickBy_state.product_info.SPI_MIN_WIDTH) : 1;
		let SPI_RESTRICT_TO_MATERIAL_WIDTH_YN = quickBy_state?.product_info?.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN || 'N';
		let SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN = quickBy_state?.product_info?.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN || 'N';

		if (SPI_RESTRICT_TO_MATERIAL_WIDTH_YN == 'Y' && state.sii_width) {
			SPI_MAX_WIDTH = parseInt(state.sii_width);
		}
		if (SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN == 'Y' && state.sii_length) {
			SPI_MAX_HEIGHT = parseInt(state.sii_length);
		}

		let selectStep = quickBy_state.selectStep;
		let motorized_min_width = false;
		let motorized_max_height = false;
		let motorized_step_status = false;

		let control_step = selectStep && selectStep['CONTROL_TYPE'] ? selectStep['CONTROL_TYPE'] : false;
		if (control_step && ['CONTROL_TYPE'].indexOf(control_step.SS_CODE_NAME) >= 0 && ['CT02'].indexOf(control_step.SPS_CODE) >= 0) {
			motorized_min_width = control_step.SPS_MIN_WIDTH && parseInt(control_step.SPS_MIN_WIDTH) > 1 ? control_step.SPS_MIN_WIDTH : false;
			motorized_max_height = control_step.SPS_MAX_HEIGHT && parseInt(control_step.SPS_MAX_HEIGHT) > 1 ? control_step.SPS_MAX_HEIGHT : false;
			motorized_step_status = ['CT02'].indexOf(control_step.SPS_CODE) >= 0 ? true : false;
			if (motorized_step_status && motorized_min_width) {
				SPI_MIN_WIDTH = state.meas_unit_selected == 'inch' ? (motorized_min_width * state.meas_unit_val).toFixed(2) : motorized_min_width * state.meas_unit_val;
			}
			if (motorized_step_status && motorized_max_height) {
				SPI_MAX_HEIGHT = state.meas_unit_selected == 'inch' ? (motorized_max_height * state.meas_unit_val).toFixed(2) : motorized_max_height * state.meas_unit_val;
			}

		}

		//return false;
		if (missing > 0) {
			setErrorModal(true);
		} else if (validation > 0) {
			setValidationModal(true);
		} else if (missing == 0 && validation == 0 && SPI_MAX_HEIGHT && SPI_MAX_WIDTH && quickBy_state.price_array.SOL_VALUE > 0 && parseInt(state.m_width) >= SPI_MIN_WIDTH && parseInt(state.m_height) >= SPI_MIN_HEIGHT && state.m_width <= SPI_MAX_WIDTH && state.m_height <= SPI_MAX_HEIGHT) {
			setSuccessModal(true);
			cartAddUpdate('COMPLETED');

			GoogleAnalytics.addToCart(props, quickBy_state);
			SnapPixel.addToCart(props, quickBy_state, props?.user_state?.user_info);

			setTimeout(() => {
				if (line_sys_id > 0) {
					history.push(`/${defaultLocale}/cartPage`);
				} else {
					props.user_dispatch('CARTBOX');
					props.loginOnHide(false);
				}
			}, 1500);
		} else if (state.m_width == undefined || state.m_height == undefined || parseInt(state.m_width) == 0 || parseInt(state.m_height) == 0) {
			quickByDispatch({ type: 'ERROR-VALIDATION', value: { key: 'MEASUREMENT', mgs: t('height_width_validation') } });
			setValidationModal(true);

			let v_w = state.m_width == undefined || parseInt(state.m_width) == 0 || parseInt(state.m_width) < SPI_MIN_WIDTH || parseInt(state.m_width) > SPI_MAX_WIDTH ? true : false;
			let v_h = state.m_height == undefined || parseInt(state.m_height) == 0 || parseInt(state.m_height) < SPI_MIN_HEIGHT || parseInt(state.m_height) > SPI_MAX_HEIGHT ? true : false;
			setState({ ...state, valid_width: v_w, valid_height: v_h });
			setErrorShake('');
			setErrorShake('shake-animation');
		} else if (parseInt(state.m_width) < SPI_MIN_WIDTH || parseInt(state.m_height) < SPI_MIN_HEIGHT || parseInt(state.m_width) > SPI_MAX_WIDTH || parseInt(state.m_height) > SPI_MAX_HEIGHT) {
			quickByDispatch({ type: 'ERROR-VALIDATION', value: { key: 'MEASUREMENT', mgs: t('height_width_validation') } });
			setValidationModal(true);
			let v_h = parseInt(state.m_height) < SPI_MIN_HEIGHT || parseInt(state.m_height) > SPI_MAX_HEIGHT ? true : false;
			let v_w = parseInt(state.m_width) < SPI_MIN_WIDTH || parseInt(state.m_width) > SPI_MAX_WIDTH ? true : false;
			setState({ ...state, valid_width: v_w, valid_height: v_h });
			setErrorShake('');
			setErrorShake('shake-animation');
		} else if ((state.m_width == undefined || state.m_height == undefined || state.m_width == '' || state.m_height == '' || parseInt(state.m_width) == 0 || parseInt(state.m_height) == 0) && divToggle) {
			quickByDispatch({ type: 'ERROR-VALIDATION', value: { key: 'MEASUREMENT', mgs: t('height_width_validation') } });
			setValidationModal(true);

			let v_w = divToggle && (state.m_width == '' || state.m_width == undefined || parseInt(state.m_width) == 0 || parseInt(state.m_width) < SPI_MIN_WIDTH || parseInt(state.m_width) > SPI_MAX_WIDTH) ? true : false;
			let v_h = divToggle && (state.m_height == '' || state.m_height == undefined || parseInt(state.m_height) == 0 || parseInt(state.m_height) < SPI_MIN_HEIGHT || parseInt(state.m_height) > SPI_MAX_HEIGHT) ? true : false;
			setState({ ...state, valid_width: v_w, valid_height: v_h });
			setErrorShake('');
			setErrorShake('shake-animation');
		} else {
			if (category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884) {
				setState({ ...state, valid_width: false, valid_height: false });
				setSuccessModal(true);
				cartAddUpdate('COMPLETED');

				GoogleAnalytics.addToCart(props, quickBy_state);
				setTimeout(() => {
					if (line_sys_id > 0) {
						history.push(`/${defaultLocale}/cartPage`);
					} else {
						props.user_dispatch('CARTBOX');
						props.loginOnHide(false);
					}
				}, 1500);
			} else {
				console.log('heree2211')
				alert('Something Error.');
			}
		}
	}



	const addToCartFunApi = (state, cart_status = 'INCOMPLETE') => {

		if (cart_status == 'INCOMPLETE') {
			cart_status = state.edit_step_data.line_result && state.edit_step_data.line_result.SOL_CART_STATUS == 'COMPLETED' ? 'COMPLETED' : 'INCOMPLETE';
		}

		let userId = Cookies.get('USER_ID') ? Cookies.get('USER_ID') : '0';
		let url = state.edit_step_data.line_result && state.edit_step_data.line_result.SOL_SYS_ID ? 'order/cart/update/' + state.edit_step_data.line_result.SOL_SYS_ID : 'order/cart';
		let post_data = { ...state.product_info, STEPS: state.selected_steps, cart_status: cart_status, url: url, CUST_SYS_ID: userId, soh_sys_id: head_sys_id, SOL_MODIFY_CUST_SYS_ID: modify_cust_sys_id, SOL_SOH_SYS_ID: head_sys_id };
		let item_info = state ? state.product_info : [];
		//	console.log(state.selected_steps, 'STEPS...');
		if (state && item_info && item_info.count > 0 && (item_info.m_width > 0 && item_info.m_height > 0 || state.product_info.category_slug == 'wallpaper')) {
			ApiDataService.post(post_data.url, post_data).then(response => {
				let res_data = response.data;
				console.log(res_data, 'res_data');
				console.log(res_data.pricezero, 'pricezero');
				if (res_data.error_message == 'Success' && res_data.return_status == 0) {
					// console.log(res_data, 'ifres_data', res_data.complete);
					reduxDispatch({
						type: 'FETCH_TO_CART',
						payload: {
							cartItems: res_data.complete,
							numberCart: res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0,
							countFreeSample: parseInt(res_data.countFreeSample)
						},
					});
					// console.log('1');
					quickByDispatch({ type: 'STEPS-PRICE-ZERO', value: res_data.pricezero });
					quickByDispatch({ type: 'TOTAL-PRICE', value: res_data.result });
					// console.log('2');
					quickByDispatch({ type: 'COMPLETE-PRODUCT', value: res_data.complete });
					// console.log('3');
					quickByDispatch({ type: 'COUNT-FREE-SAMPLE', value: res_data.countFreeSample });
					// console.log('4');
					quickByDispatch({ type: 'CART-COUNT', value: res_data.cart_count.QTY > 0 ? res_data.cart_count.QTY : 0 });
					// console.log('5');

				} else {
					//setErrorMgs(res_data.error_message);
					console.log(res_data.error_message);
					//alert(res_data.error_message);
				}
				// console.log(res_data, 'lastres_data')
			}).catch(e => {
				console.log(e);
				//alert(e);
			});
		} else {
			console.log('Something error', item_info.m_width, item_info.m_height, state);
		}

	}

	const cartAddUpdate = (cart_status = 'INCOMPLETE') => {

		console.log(cart_status, 'key33');
		setStepsSectionOpocity(true);
		addToCartFunApi(quickBy_state, cart_status);

		setTimeout(() => {
			setStepsSectionOpocity(false);
		}, 1500);
		setTimeout(() => {
			setAddtocartBtn(true)
		}, 3000);
	}

	const chooseFabricFun = (item) => {
		let item_code = item?.split('|')[0];
		let img = img_path + item?.split('|')[7]
		let color_code = item?.split('|')[5];
		let color_id = item?.split('|')[1];
		let canvasGallery = props?.gallery?.find((row) => {
			return row.SLI_SII_CODE == item_code ? row : '';

		});
		setState({ ...state, code: item_code, canvasImg: canvasGallery?.SLI_IMAGE_PATH || img, color_code: color_code, color_item_id: color_id });
		quickByDispatch({
			type: 'MEASUREMENT', value: {
				...state,
				code: item_code,
				canvasImg: canvasGallery?.SLI_IMAGE_PATH || img
			}
		});
	}

	useEffect(() => {
		// console.log(state, 'sssssss')
		setState({
			...state, code: colors_item_id ? colors_item_id?.split('|')[0] : color_list[0]?.split('|')[0],
			canvasImg: colors_item_id ? img_path + colors_item_id?.split('|')[7] : img_path + color_list[0]?.split('|')[7],
			color_code: colors_item_id ? colors_item_id?.split('|')[5] : color_list[0]?.split('|')[5],
			color_item_id: colors_item_id ? colors_item_id?.split('|')[1] : color_list[0]?.split('|')[1],
		});
	}, [active_item_id]);

	useEffect(() => {
		setStepsSectionOpocity(false);

		if (Number(quickBy_state.price_array.SOL_QTY) > 0 && props.category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884) {
			setState({
				...state,
				count: Number(quickBy_state.price_array.SOL_QTY),
				PRICE: Number(quickBy_state.price_array.SOL_PRICE),
				OLD_PRICE: (Number(quickBy_state.price_array.SOL_OLD_PRICE) / Number(quickBy_state.price_array.SOL_QTY)),
				VALUE: Number(quickBy_state.price_array.SOL_VALUE)
			});
			console.log('valid_width1858', state, quickBy_state);
		}
	}, [quickBy_state.price_array.SOL_VALUE]);

	useEffect(() => {
		fetchSteps();
	}, [pro_item_code]);

	useEffect(() => {
		if (quickBy_state.cartItemsList.length > 0) {
			reduxDispatch({
				type: 'FETCH_TO_CART',
				payload: {
					cartItems: quickBy_state.cartItemsList,
					numberCart: quickBy_state.cart_count,
					countFreeSample: parseInt(quickBy_state.countFreeSample)
				},
			});
		}


	}, [quickBy_state.cartItemsList.length]);


	useEffect(() => {
		if ((state.count > 0 && state.m_width > 0 && state.m_height > 0) || props.category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884) {
			setAddtocartBtn(false)
			cartAddUpdate();
		}
	}, [state.m_width, state.m_height, state.count]);

	useEffect(() => {
		//ReTagCategoryPage(props.SPI_DESC);
		GoogleAnalytics.selectItem(props);
		SnapPixel.selectItem(props, props?.user_state?.user_info);
	}, []);


	useEffect(() => {
		if (divToggle && props.category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884) {
			setState({
				...state,
				width_other: 'WIDTH_OTHER',
				height_other: 'HEIGHT_OTHER',
				m_height: '',
				m_width: ''
			});
		}
	}, [divToggle]);

	let status = props.stock_status[state.code] && props.stock_status[state.code] && props.stock_status[state.code]?.split('|')[0] != 'undefined' ? props.stock_status[state.code]?.split('|')[0] : 'INSTOCK';
	let status_days = props.stock_status[state.code] && props.stock_status[state.code] && props.stock_status[state.code]?.split('|')[1] != 'undefined' ? props.stock_status[state.code]?.split('|')[1] : 0;

	if (quickBy_state.total_steps == 0) {

		return (<Fragment>
			<Modal size="xl"
				show={props.loginShow}
				animation={false}
				keyboard={false}
				dialogClassName="AddtoCartPopup"
				fullscreen={true}
				centered>
				<Modal.Body style={{ textAlign: 'center', padding: '20%' }}>
					<img role="button" src={`/assets/images/Customization/dancingloader.gif`} className="img-fluid" alt="sedarglobal" style={{ width: '50px' }} width="auto" height="auto" />
				</Modal.Body>
			</Modal>
		</Fragment>)
	} else {


		let product_info = quickBy_state.product_info;
		let width_standard = product_info.SPI_WIDTH_STANDARD ? product_info.SPI_WIDTH_STANDARD?.split(',') : [];
		let height_standard = product_info.SPI_HEIGHT_STANDARD ? product_info.SPI_HEIGHT_STANDARD?.split(',') : [];

		let pro_min_width = state.meas_unit_selected == 'inch' ? (product_info.SPI_MIN_WIDTH * state.meas_unit_val).toFixed(2) : product_info.SPI_MIN_WIDTH * state.meas_unit_val;
		let pro_max_width = state.meas_unit_selected == 'inch' ? (product_info.SPI_MAX_WIDTH * state.meas_unit_val).toFixed(2) : product_info.SPI_MAX_WIDTH * state.meas_unit_val;
		let pro_min_height = state.meas_unit_selected == 'inch' ? (product_info.SPI_MIN_HEIGHT * state.meas_unit_val).toFixed(2) : product_info.SPI_MIN_HEIGHT * state.meas_unit_val;
		let pro_max_height = state.meas_unit_selected == 'inch' ? (product_info.SPI_MAX_HEIGHT * state.meas_unit_val).toFixed(2) : product_info.SPI_MAX_HEIGHT * state.meas_unit_val;

		let SPI_RESTRICT_TO_MATERIAL_WIDTH_YN = product_info?.SPI_RESTRICT_TO_MATERIAL_WIDTH_YN || 'N';
		let SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN = product_info?.SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN || 'N';

		if (SPI_RESTRICT_TO_MATERIAL_WIDTH_YN == 'Y') {
			pro_max_width = parseInt(state.sii_width);
		}
		if (SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN == 'Y') {
			pro_max_height = parseInt(state.sii_length);
		}



		let selectStep = quickBy_state.selectStep;
		let motorized_min_width = false;
		let motorized_max_height = false;
		let motorized_step_status = false;

		let control_step = selectStep && selectStep['CONTROL_TYPE'] ? selectStep['CONTROL_TYPE'] : false;
		if (control_step && ['CONTROL_TYPE'].indexOf(control_step.SS_CODE_NAME) >= 0 && ['CT02'].indexOf(control_step.SPS_CODE) >= 0) {
			motorized_min_width = control_step.SPS_MIN_WIDTH && parseInt(control_step.SPS_MIN_WIDTH) > 1 ? control_step.SPS_MIN_WIDTH : false;
			motorized_max_height = control_step.SPS_MAX_HEIGHT && parseInt(control_step.SPS_MAX_HEIGHT) > 1 ? control_step.SPS_MAX_HEIGHT : false;
			motorized_step_status = ['CT02'].indexOf(control_step.SPS_CODE) >= 0 ? true : false;
			if (motorized_step_status && motorized_min_width) {
				pro_min_width = state.meas_unit_selected == 'inch' ? (motorized_min_width * state.meas_unit_val).toFixed(2) : motorized_min_width * state.meas_unit_val;
			}
			if (motorized_step_status && motorized_max_height) {
				pro_max_height = state.meas_unit_selected == 'inch' ? (motorized_max_height * state.meas_unit_val).toFixed(2) : motorized_max_height * state.meas_unit_val;
			}

		}


		let per = 100 - (Number(quickBy_state.price_array.SOL_VALUE) / Number(quickBy_state.price_array.SOL_OLD_VALUE)) * 100;
		let val = Math.round(per);
		let validation = Object.keys(quickBy_state.error_step_validation).length;


		return (
			<Fragment>
				<Modal size="xl" show={props.loginShow} animation={false}
					keyboard={false} dialogClassName="AddtoCartPopup" fullscreen={true} centered>
					{line_sys_id ? validation == 0 && !stepsSectionOpocity ? <LinkComponent href={`/cartPage`} className="close-button"><Button >✕</Button></LinkComponent> : ''
						: <div className="close-button" onClick={handleClose}>
							<Button >✕</Button>
						</div>}

					<Modal.Body>
						<QuickByContext.Provider value={{ quickBy_state, quickByDispatch }}>
							<Row>

								<Col sm={12} lg={6}>
									<ProductMaterialDetailThumbSlider {...props} LISTING={imageData} ITEM_CODE={state.code} />
								</Col>

								<Col sm={12} lg={6} className="position-relative py-2">
									<Row>
										{color_list.length > 0 ?
											<Col xl={12} className="choose_fabric py-2 py-md-3 d-md-none">
												<p>{t('ChooseFabric')}</p>
												<ul className="d-flex flex-wrap p-0" role="button">
													{color_list.slice(0, numberOfColorShow).map((row, key) => {
														let item_code = row?.split('|')[0]
														return (
															<li key={key} onClick={() => { chooseFabricFun(row) }} className={item_code == state.code ? 'active' : ''}>
																<IconComponent
																	classprops={`color_image img-fluid`}
																	src={`${item_img_path_tile}${row?.split('|')[6]}`}
																	width={36}
																	height={36}
																	marginLeftRight
																	contains={true}
																/>
															</li>
														)
													})}
													{color_list.length > numberOfColorShow ?
														<li className='more_color fs-6' onClick={() => { setNumberOfColorShow(20) }} > +{color_list.length - 6} {t('More')}</li>
														: ''}
												</ul>
											</Col>
											:
											''}
										<Col xs={12} className="productName py-1 py-sm-3 mt-2 mt-sm-4">
											<Row>
												<Col md={8}>
													{status_days > 0 && (
														<DeliveryDays status_days={status_days} status={status} />
													)}
													<p>{t("ItemCode")} : <span>{state.color_item_id ? state.color_item_id?.split('-')?.splice(1)?.join('-') : ''}</span></p>
													<p>{t("Color")} : <span>{state.color_code}</span></p>
													<h1>{props.SFP_TITLE} <InfoLink sps_desc={props.DESCRIPTION} sps_more={props.SPI_FEATURES} sps_sys_id={props.SFI_CODE} /></h1>
												</Col>
												<Col md="4" className={`${langName === 'ar' ? 'text-md-start' : 'text-md-end'}`} style={{ padding: '0 5px 0 10px' }}>
													<div className="price">
														<p>
															<strong className="price-amount">
																<CurrencyFormat
																	value={Number(quickBy_state.price_array.SOL_VALUE)}
																/>
															</strong>

														</p>
														<p>
															{quickBy_state.price_array.SOL_QTY != undefined && category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884 ? t('total_price_of_rolls', { roll: quickBy_state.price_array.SOL_QTY }) : ''}
														</p>
														{Number(quickBy_state.price_array.SOL_OLD_VALUE) > Number(quickBy_state.price_array.SOL_VALUE) && val >= 10 ? (
															<p>
																<del className='spacing'>
																	<CurrencyFormat
																		value={Number(quickBy_state.price_array.SOL_OLD_VALUE)}
																	/>
																</del>
																&nbsp;
																<span>
																	<GetOffPercentage
																		old_value={Number(quickBy_state.price_array.SOL_OLD_VALUE)}
																		new_value={Number(quickBy_state.price_array.SOL_VALUE)}

																	/>
																</span>
															</p>
														) : ('')}
													</div>
												</Col>
											</Row>
										</Col>
										<div className={stepsSectionOpocity ? 'steps_section with_opacity' : 'steps_section'}>

											{quickBy_state?.quick_buy_steps && quickBy_state?.quick_buy_steps.map((row, key) => {
												if (['MEASUREMENT', 'ROLL_CALCULATION'].indexOf(row.SS_CODE_NAME) >= 0) {
													return (

														<Col xs={12} className="measurement" key={key}>
															<Row className="  py-2 py-sm-3" key={key}>
																{divToggle && (
																	<Col md={6} xs={12} className="">
																		<p>{t("MeasuringUnit")}</p>
																		<Row>
																			<Col>
																				<Form.Check className="me-3" inline label={t('mm')} name="measuring_unit" type="radio" id="mm" value="mm" checked={state.meas_unit_selected == 'mm' ? true : false} onChange={() => { measuringUnit('mm', mm_unit_val) }} />
																			</Col>
																			<Col >
																				<Form.Check className="me-3" inline label={t('cm')} name="measuring_unit" type="radio" id="cm" value="cm" checked={state.meas_unit_selected == 'cm' ? true : false} onChange={() => { measuringUnit('cm', cm_unit_val) }} />
																			</Col>
																			<Col>
																				<Form.Check className="me-3" inline label={t('inch')} name="measuring_unit" type="radio" id="inch" value="inch" checked={state.meas_unit_selected == 'inch' ? true : false} onChange={() => { measuringUnit('inch', inch_unit_val) }} />
																			</Col>
																		</Row>
																	</Col>
																)}
																<Col md={6} xs={12} className="d-none d-md-block">

																	<div className="quantity mb-1" >
																		<p>{t("Quantity")}</p>
																		<div className="quantitycount">
																			<ButtonGroup aria-label="Basic example">
																				<Button variant="light" onClick={() => { quantityFun(state.count - 1) }} disabled={state.count <= 1 ? true : false}>-</Button>
																				<FormControl
																					className="rounded-0"
																					type="text" aria-label="Input group example" aria-describedby="btnGroupAddon" value={state.count} onChange={() => { console.log(state.count, 'QTY') }} />
																				<Button variant="light" onClick={() => { quantityFun(state.count + 1) }} >+</Button>
																			</ButtonGroup>

																		</div>

																		{['ROLL_CALCULATION'].indexOf(row.SS_CODE_NAME) >= 0 && divToggle == false && (
																			<>
																				<br />
																				<p>{t("click_here_required_rolls")}</p>
																				<CgCalculator size={25} role="button" onClick={() => setDivToggle(true)} />
																			</>
																		)}
																	</div>


																</Col>

																{((state.om_width > '0' && state.om_height > '0') || (state.m_width > '0' && state.m_height > '0')) && divToggle && (
																	<Row className="d-none d-md-block">
																		<Col xs={12}>
																			<p className="recommended_mgs" >
																				{['ROLL_CALCULATION'].indexOf(row.SS_CODE_NAME) >= 0 && quickBy_state.price_array.ROLL_CALC > 0 ? t('recommended_roll_msg', { roll: quickBy_state.price_array.ROLL_CALC }) : ''}
																			</p>
																		</Col>
																	</Row>
																)}


																{divToggle && (
																	<>
																		<Col md={6} xs={6} className="">
																			<Form.Group className="mb-1">
																				{width_standard && width_standard.length > 0 ?
																					<div>
																						{category_slug == 'wallpaper' ?
																							(<Form.Label>{t("wall_Width")}</Form.Label>) : (
																								<Form.Label>{t("Width")}</Form.Label>
																							)}
																						<Form.Select name="m_width" value={state.width_other ? state.width_other : state.m_width} onChange={(e) => measurementFun(e.target, row)} className={state.valid_width ? 'motr_error' : ''}>
																							{width_standard.map((val, i) => {
																								let width_val = state.meas_unit_selected == 'inch' ? (val * state.meas_unit_val).toFixed(2) : val * state.meas_unit_val;
																								let mot_dis = false;

																								if (pro_max_width <= parseInt(val) && SPI_RESTRICT_TO_MATERIAL_WIDTH_YN == 'Y') {
																									mot_dis = 'disabled';
																								} else if (motorized_min_width && motorized_step_status && motorized_min_width >= parseInt(val)) {
																									mot_dis = 'disabled';
																								}

																								return <option className={mot_dis ? 't_colorb2 pe-none' : ''} value={val} key={i} convert_width={width_val} motorized_min_width={motorized_min_width ? motorized_min_width : 0} disabled={mot_dis}>{width_val}{t(state.meas_unit_selected)}</option>
																							})

																							}
																							<option value={'WIDTH_OTHER'}>{t('Custom')}</option>
																						</Form.Select>
																					</div> : ''}
																				{state.width_other == 'WIDTH_OTHER' || width_standard.length == 0 ?
																					<>
																						{category_slug == 'wallpaper' ?
																							(<Form.Label>{t("wall_EnterWidth")}{state.valid_width} </Form.Label>) : (
																								<Form.Label>{t("EnterWidth")}{state.valid_width} </Form.Label>
																							)}
																						<Form.Control style={{ height: "42px" }} onAnimationEnd={() => setErrorShake('')} className={state.valid_width ? `border-danger  ${errorShake}` : ''} size="md" type="text" name="width" id="m_width" value={state.om_width} onChange={() => toggleValidation(row)} min={pro_min_width} max={pro_max_width} required />
																						<span className={state.valid_width ? 'notice text-danger' : 'notice'}>
																							{t('pro_min_max_width', { pro_min_width: pro_min_width, pro_max_width: pro_max_width, meas_unit_selected: t(state.meas_unit_selected) })}
																						</span>
																					</>
																					: ''}
																			</Form.Group>
																		</Col>

																		<Col md={6} xs={6} className="">
																			<Form.Group className="mb-1">
																				{height_standard && height_standard.length > 0 ?
																					<div>
																						{category_slug == 'wallpaper' ?
																							(<Form.Label>{t("wall_Height")}</Form.Label>) : (
																								<Form.Label>{t("Height")}</Form.Label>
																							)}
																						<Form.Select name='m_height' value={state.height_other ? state.height_other : state.m_height} onChange={(e) => measurementFun(e.target, row)} className={state.valid_height ? 'motr_error' : ''}>
																							{height_standard.map((val, i) => {
																								let height_val = state.meas_unit_selected == 'inch' ? (val * state.meas_unit_val).toFixed(2) : val * state.meas_unit_val;
																								let h_dis = false;

																								if (pro_max_height <= parseInt(val) && SPI_RESTRICT_TO_MATERIAL_HEIGHT_YN == 'Y') {
																									h_dis = 'disabled';
																								} else if (motorized_max_height && motorized_step_status && motorized_max_height < parseInt(val)) {
																									h_dis = 'disabled';
																								}
																								return <option className={h_dis ? 't_colorb2 pe-none' : ''} value={val} key={i} convert_height={height_val}>{height_val}{t(state.meas_unit_selected)}</option>
																							})
																							}
																							<option value={'HEIGHT_OTHER'}>{t('Custom')}</option>
																						</Form.Select>
																					</div> : ''}
																				{state.height_other == 'HEIGHT_OTHER' || height_standard.length == 0 ?
																					<>
																						{category_slug == 'wallpaper' ?
																							(<Form.Label>{t("wall_EnterHeight")}{state.valid_height} </Form.Label>) : (
																								<Form.Label>{t("EnterHeight")}{state.valid_height} </Form.Label>
																							)}
																						<Form.Control style={{ height: "42px" }} className={state.valid_height ? `border-danger  ${errorShake}` : ''} size="md" type="text" id="m_height" name="height" value={state.om_height} onChange={() => toggleValidation(row)} min={product_info.SPI_MIN_HEIGHT * state.meas_unit_val} max={pro_max_height} required />
																						<span className={state.valid_height ? 'notice text-danger' : 'notice'}>
																							{t('pro_min_max_height', { pro_min_height: pro_min_height, pro_max_height: pro_max_height, meas_unit_selected: t(state.meas_unit_selected) })}
																						</span>
																					</>
																					: ''}
																			</Form.Group>
																		</Col>


																		<Row>
																			{['100585', '101057', '101060'].indexOf(props.SPI_SC_SYS_ID) >= 0 && (
																				<Col>
																					<div className="d-sm-flex justify-content-start recommended_mgs">
																						<p style={{ color: "#e69f23" }}>{t("disclaimer_for_blind")}</p>
																					</div>
																				</Col>
																			)}
																		</Row>
																	</>
																)}
																<Col md={3} xs={12} className="d-md-none" style={{ borderTop: "0.75px solid #70707062", marginTop: "10px" }}>
																	<div className="quantity my-2" >
																		<p>{t("Quantity")}</p>
																		<div className="quantitycount">
																			<ButtonGroup aria-label="Basic example">
																				<Button variant="light" onClick={() => { quantityFun(state.count - 1) }} disabled={state.count <= 1 ? true : false}>-</Button>
																				<FormControl
																					className="rounded-0"
																					type="text" aria-label="Input group example" aria-describedby="btnGroupAddon" value={state.count} onChange={() => { console.log(state.count, 'QTY') }} />
																				<Button variant="light" onClick={() => { quantityFun(state.count + 1) }} >+</Button>
																			</ButtonGroup>
																		</div>
																		{['ROLL_CALCULATION'].indexOf(row.SS_CODE_NAME) >= 0 && divToggle == false && (
																			<>
																				<br />
																				<p>{t("click_here_required_rolls")}</p>
																				<CgCalculator size={25} role="button" onClick={() => setDivToggle(true)} />
																			</>
																		)}
																	</div>
																	<Row>
																		{divToggle && (
																			<Col xs={12}>
																				<p className="recommended_mgs" >
																					{['ROLL_CALCULATION'].indexOf(row.SS_CODE_NAME) >= 0 && quickBy_state.price_array.ROLL_CALC > 0 ? parse(t('recommended_mgs', { roll: quickBy_state.price_array.ROLL_CALC })) : ''}
																				</p>
																			</Col>
																		)}
																	</Row>
																</Col>
															</Row>
														</Col>

													);
												} else {
													return (<Col className="lining   pt-2 py-md-3" key={key}>
														<p>{row.SPS_DESC} {row.SPS_MORE && <InfoLink sps_desc={row.SPS_DESC} sps_more={row.SPS_MORE} sps_sys_id={row.SPS_SYS_ID} />}</p>
														<Row key={`inline-radio-${row.SPS_SYS_ID}`} className="mb-3">
															{
																//console.log(row.CHILD_STEP,'row.CHILD_STEP..')
																row.CHILD_STEP.map((child, key) => {
																	let checked = selectStep && selectStep[child.SS_CODE_NAME] && selectStep[child.SS_CODE_NAME]['SPS_CODE'] == child.SPS_CODE ? 'checked' : '';
																	if (row.SS_CODE_NAME == 'LINING_OPTION') {

																		if (child.SPS_CODE == 'LO01' && sfi_blackout_lining_app_yn == 'N') {

																			return (
																				<Fragment key={key} >
																					<Col sm={6} md={4} className='with_opacity' title={t('blackout_lining_mgs')}>
																						<Form.Check key={key} className="me-3" inline label={child.SPS_DESC} name={row.SPS_SS_CODE} type="radio"
																							id={`inline-radio-${child.SPS_SYS_ID}`} value={child.SPS_CODE} step={child.SPS_SYS_ID} checked={checked} onChange={() => stepValues(child, key)} disabled="true" />
																						{child.SPS_MORE && <InfoLink sps_desc={child.SPS_DESC} sps_more={child.SPS_MORE} sps_sys_id={child.SPS_SYS_ID} />}
																					</Col>
																				</Fragment>
																			)
																		} else if (child.SPS_CODE == 'LO02' && sfi_light_filtering_app_yn == 'N') {

																			return (
																				<Fragment key={key} >
																					<Col sm={6} md={4} className='with_opacity' title={t('light_filtering_lining_mgs')}>
																						<Form.Check key={key} className="me-3" inline label={child.SPS_DESC} name={row.SPS_SS_CODE} type="radio"
																							id={`inline-radio-${child.SPS_SYS_ID}`} value={child.SPS_CODE} step={child.SPS_SYS_ID} checked={checked} onChange={() => stepValues(child, key)} disabled="true" />
																						{child.SPS_MORE && <InfoLink sps_desc={child.SPS_DESC} sps_more={child.SPS_MORE} sps_sys_id={child.SPS_SYS_ID} />}
																					</Col>
																				</Fragment>
																			)
																		} else {
																			return (
																				<Fragment key={key}>
																					<Col sm={6} md={4}>
																						<Form.Check key={key} className="me-3" inline label={child.SPS_DESC} name={row.SPS_SS_CODE} type="radio"
																							id={`inline-radio-${child.SPS_SYS_ID}`} value={child.SPS_CODE} step={child.SPS_SYS_ID} checked={checked} onChange={() => stepValues(child, key)} />
																						{child.SPS_MORE && <InfoLink sps_desc={child.SPS_DESC} sps_more={child.SPS_MORE} sps_sys_id={child.SPS_SYS_ID} />}
																					</Col>
																				</Fragment>
																			)
																		}
																	} else {
																		let min_width_value = state.meas_unit_selected == 'inch' ? (child.SPS_MIN_WIDTH * state.meas_unit_val).toFixed(2) : child.SPS_MIN_WIDTH * state.meas_unit_val;
																		let max_height_value = state.meas_unit_selected == 'inch' ? (child.SPS_MAX_HEIGHT * state.meas_unit_val).toFixed(2) : child.SPS_MAX_HEIGHT * state.meas_unit_val;
																		return (
																			<Fragment key={key}>
																				<Col sm={6} md={row.CHILD_STEP && [2, 4, 5, 6, 7, 8].indexOf(row.CHILD_STEP.length) >= 0 ? 6 : 4}>
																					<Form.Check key={key} className="me-3" inline label={child.SPS_DESC} name={row.SPS_SS_CODE} type="radio" disabled={child.SPS_MIN_WIDTH && parseInt(child.SPS_MIN_WIDTH) > state.m_width || child.SPS_MAX_HEIGHT && parseInt(child.SPS_MAX_HEIGHT) < state.m_height ? true : false}
																						id={`inline-radio-${child.SPS_SYS_ID}`} value={child.SPS_CODE} step={child.SPS_SYS_ID} checked={checked} onChange={() => stepValues(child, key)} />
																					{child.SPS_MORE && <InfoLink sps_desc={child.SPS_DESC} sps_more={child.SPS_MORE} sps_sys_id={child.SPS_SYS_ID} />}
																					{child.SPS_CODE == 'TO04' && quickBy_state.selectStep['TRACK_OPTION'] && quickBy_state.selectStep['TRACK_OPTION']['SPS_CODE'] == 'TO04' ? <p className='text-danger'>{t('track_option_mgs', { desc: t('track') })}</p> : ''}
																					{child.SPS_CODE == 'NO_ROD' && quickBy_state.selectStep['ROD_OPTION'] && quickBy_state.selectStep['ROD_OPTION']['SPS_CODE'] == 'NO_ROD' ? <p className='text-danger'>{t('track_option_mgs', { desc: t('rod') })}</p> : ''}
																					{child.SPS_MIN_WIDTH && state.m_width && parseInt(child.SPS_MIN_WIDTH) > state.m_width ? <p className='text-danger'>{t('min_width_validation', { min: min_width_value, unit: t(state.meas_unit_selected) })}</p> : ''}
																					{child.SPS_MAX_HEIGHT && state.m_height && parseInt(child.SPS_MAX_HEIGHT) < state.m_height ? <p className='text-danger'>{t('max_height_validation', { max: max_height_value, unit: t(state.meas_unit_selected) })}</p> : ''}
																				</Col>
																			</Fragment>
																		)
																	}
																}
																)}
														</Row>

													</Col>);
												}
											}
											)}
										</div>
										{color_list.length > 0 ?
											<Col xl={12} className="choose_fabric py-2 py-md-3 d-none d-md-block">
												<p>{t('ChooseFabric')}</p>
												<ul className="d-flex flex-wrap p-0" role="button">
													{color_list.slice(0, numberOfColorShow).map((row, key) => {
														let item_code = row?.split('|')[0]
														return (
															<li key={key} onClick={() => { chooseFabricFun(row) }} className={item_code == state.code ? 'active' : ''}>
																<IconComponent
																	classprops={`color_image img-fluid`}
																	src={`${item_img_path_tile}${row?.split('|')[6]}`}
																	width={36}
																	height={36}
																	marginLeftRight
																	contains={true}
																/>
															</li>
														)
													})}
													{color_list.length > numberOfColorShow ?
														<li className='more_color fs-6' onClick={() => { setNumberOfColorShow(20) }} > +{color_list.length - 6} {t('More')}</li>
														: ''}
												</ul>
											</Col>
											:
											''}
										<Col xs={12}>
											<Row className="pt-3 d-flex justify-content-between">
												<Col xl={6} lg={12}>
													{category_slug == 'wallpaper' && props.SPI_PR_ITEM_CODE != 1566884 ? (
														<button variant="dark" className="addtocart mb-2 mb-sm-3 btn Add_to_cart_initial" disabled={quickBy_state.price_array.SOL_VALUE > 0 && addtocartBtnFirst ? '' : 'disabled'} onClick={() => addToCartFun()} type="submit"> {line_sys_id ? t('UpdatetoCart') : t('AddtoCart')} </button>
													) : (
														<button variant="dark" className="addtocart mb-2 mb-sm-3 btn" disabled={state.count > 0 && state.m_width > 0 && state.m_height > 0 && quickBy_state.price_array.SOL_VALUE > 0 && addtocartBtn && addtocartBtnFirst ? '' : 'disabled'} onClick={() => addToCartFun()} type="submit"> {line_sys_id ? t('UpdatetoCart') : t('AddtoCart')} </button>
													)}
												</Col>
												{category_slug != 'wallpaper' && props.SPI_ADD_TO_CART_TYPE != 'A5' || props.SPI_ALLOW_CUSTOMIZATION_YN == 'Y' && line_sys_id == undefined && brand_name.indexOf(data.BRAND_DESC) == -1 && (
													<div className="advanceoption d-md-none d-lg-none d-xl-none">
														{line_sys_id ? <LinkComponent href={`${props.url}/${state.code}/customize/edit/${line_sys_id}`}>{t("AdvancedCustomization")} </LinkComponent> :
															<LinkComponent href={`${props.url}/${state.code}/customize`}>{t("AdvancedCustomization")} </LinkComponent>}

													</div>
												)}

												<Col xl={6} lg={12} >
													{quickBy_state.product_info && quickBy_state.product_info.SPI_INSTALLATION_PROVIDE_YN == 'Y' ?
														<div className='delivery_inst mb-1 rounded-0' ref={ref} onMouseEnter={handleClick} onMouseLeave={handleClick}>
															<span>
																<OverlayTrigger
																	placement={`top`}
																	show={instShow}
																	overlay={
																		<Tooltip id={`tooltip-top`}>
																			{/* <p>{t('Price_not_inclusive')}</p> */}
																			<p>{t('Free_delivery_and_installation_for_all_orders_worth', { free_delivery_price: free_delivery_price, currency: currency })}</p>
																		</Tooltip>
																	}
																>
																	<Button className="border-0" style={{ background: "#fff", color: "#000" }}> {t('delivery/installation')} <VscInfo size={18} role="button" /></Button>
																</OverlayTrigger>
															</span>

														</div> : ''}
												</Col>
											</Row>
										</Col>
									</Row>
									<Row>
										{category_slug == 'folding-doors' && (
											<Col xs={12}>
												<div className="d-sm-flex justify-content-start recommended_mgs">
													<p>{t("door_lock_colors_can_be_customized_upon_request")}</p>
												</div>
											</Col>
										)}
										<Col className="d-sm-flex justify-content-end">
											{category_slug != 'wallpaper' && props.SPI_ADD_TO_CART_TYPE != 'A5' || props.SPI_ALLOW_CUSTOMIZATION_YN == 'Y' && line_sys_id == undefined && brand_name.indexOf(data.BRAND_DESC) == -1 && (
												<div className="advanceoption d-none d-lg-block">
													{line_sys_id ? <LinkComponent href={`${props.url}/${state.code}/customize/edit/${line_sys_id}`}>{t("AdvancedCustomization")} </LinkComponent> :
														<LinkComponent href={`${props.url}/${state.code}/customize`}>{t("AdvancedCustomization")} </LinkComponent>}

												</div>
											)}
											{props.SPI_FREE_MEASUREMENT_YN == 'Y' && (
												<div className="advanceoption">
													<LinkComponent href={`free-consultation`}>{t("BookFreeMeasurement")} </LinkComponent>
												</div>
											)}
										</Col>
										<Row>
											{category_slug == 'blinds-shades' && (
												<Col className='quick_buy_upgrade'>
													<div className="d-sm-flex justify-content-start recommended_mgs">
														<p>{t("quick_buy_blind_message")}</p>
													</div>
												</Col>
											)}
											{category_slug == 'curtains-and-drapes' && props.SPI_PR_ITEM_CODE != 1152776 && (
												<Col className='quick_buy_upgrade'>
													<div className="d-sm-flex justify-content-start recommended_mgs">
														<p>{t("quick_buy_curtains_message")}</p>
													</div>
												</Col>
											)}

										</Row>
									</Row>
								</Col>
							</Row>
						</QuickByContext.Provider>

					</Modal.Body>
				</Modal>

				<ErrorStepPopup
					show={errorModal}
					onHide={() => setErrorModal(false)}
					quickBy_state={quickBy_state}
					quickByDispatch={quickByDispatch}
				/>
				<ValidationPopup
					show={validationModal}
					onHide={() => setValidationModal(false)}
					quickBy_state={quickBy_state}
					quickByDispatch={quickByDispatch}
				/>

				<SuccessStepPopup
					show={successModal}
					onHide={() => setSuccessModal(false)}
				/>
			</Fragment>

		);

	}
}



const GetOffPercentage = (props) => {
	const { t } = useTranslation("common");
	let old_value = Number(props.old_value);
	let new_value = Number(props.new_value);

	let per = 100 - (new_value / old_value) * 100;
	let val = Math.round(per);
	return (
		<span className='offer_pct'>
			{val > 0 && langName != 'ar' ? val + '% ' + t("OFF") : val > 0 && langName == 'ar' ? t("OFF") + ' ' + val + '%' : null}
			{/* {t('off_percentage', { val: val })} */}
		</span>
	)
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer, numberCart: state.cart.numberCart });
const mapDispatchToProps = (dispatch) => {
	return {
		user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddtoCartModal)


