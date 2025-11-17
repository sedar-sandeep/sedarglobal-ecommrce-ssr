import React, { useState, useContext } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { connect } from "react-redux";

// import './CartListMenu.scss';

import { LazyLoadImage } from 'react-lazy-load-image-component';
// import LinkComponent from '../../Redux-Config/LinkComponent';
import CurrencyFormat from '../../services/CurrencyFormat';
import { useTranslation } from 'next-i18next';
import LinkComponent from '@components/Link';
import { IconComponent } from '@components/image';
let img_path = "/assets/images/";

function CartListMenu(props) {
	const { t } = useTranslation("common");
	let user_info = props.user_state ? props.user_state.user_info : false;
	let head_sys_id = props.user_state && props.user_state.modification_user_info && props.user_state.modification_user_info.head_sys_id > 0 ? props.user_state.modification_user_info.head_sys_id : false;

	return (
		<>
			<div className={`CartListMenu`} onClick={() => props.user_dispatch('CARTBOX')}>
				<div className="max_content Cartmenu_sec">
					<div className="Cartmenu_content">
						<Card>
							{props.cartItems.length > 0 ?
								<Card.Header>
									<p> <img className="img-fluid pe-4" src={`/assets/images/cart/Group22649.png`} alt="sedarglobal" width="auto" height="auto" />{t('AddedtoYourCart')} </p>
								</Card.Header>
								: ''}
							<div className="close-button">
								<img className="img-fluid pe-4" src={`/assets/images/closecart.png`} alt="sedarglobal" width="auto" height="auto" />
							</div>
							<Card.Body>
								<Row className="cartItemList">

									{props.cartItems.length > 0 ? props.cartItems.map((row, key) => (
										<Col sm={12} className='mb-2' key={key}>

											<div className="media item d-flex p-2" style={row.SOL_ITEM_LABEL && row.SOL_ITEM_LABEL == "SAMPLE" ? { background: "#f1fafa" } : {}}>
												{/* <LazyLoadImage className="px-2 item_image" effect="blur" src={row.SOL_IMAGE_PATH} alt="sedarglobal" width="auto" height="auto" /> */}
												<IconComponent
													classprops={`px-2 item_image`}
													src={row.SOL_IMAGE_PATH ? row.SOL_IMAGE_PATH : img_path + 'noimage.jpg'}
													alt={'Sedar Global'}
													width={120}
													height={110}
													marginLeftRight
													contains={true}
												/>
												<Col className="media-body">
													{row.info_data ? (
														<h6> {t('ItemCode')}  : <span>{row.info_data.MEASUREMENT && row.info_data.MEASUREMENT.ITEM_ID ? row.info_data.MEASUREMENT.ITEM_ID?.split('-')?.splice(1)?.join('-') : row.info_data.ROLL_CALCULATION ? row.info_data.ROLL_CALCULATION.ITEM_ID?.split('-')?.splice(1)?.join('-') : ''} </span></h6>
													) : ''}
													<p>{row.SFP_TITLE}</p>
													{row.SOL_ITEM_LABEL != "SAMPLE" ? (
														<>
															<h6>{t('QTY')}  : <span>{row.SOL_QTY}</span></h6>
															<h6>{t('Value')}  : <span> <CurrencyFormat
																value={row.SOL_VALUE ? row.SOL_VALUE : 0}
															/> </span></h6>
														</>) : ""}
													{row.SOL_ITEM_LABEL && row.SOL_ITEM_LABEL == "SAMPLE" ?
														<div>
															<h6 className="fw-normal text-9e6493"> {t('free_sample')}</h6>
														</div>
														: ''
													}
												</Col>
											</div>
										</Col>
									)
									) :
										<Col sm={12} className='mb-2'>
											<div className="text-center p-3">
												<img className="img-fluid pe-4 w-25" src={`/assets/images/Error/Group24625.png`} alt="sedarglobal" width="auto" height="auto" />
											</div>
										</Col>
									}
								</Row>
								<Row>
									<Col sm={12}>
										<Row className="pt-2">
											<Col md={12} lg={props.cartItems.length > 0 ? 6 : 12} className="pe-xl-2">
												<div className="border-button">
													<LinkComponent className="" href="/blinds-and-shades/roller-shades"  ><span> {t('ContinueShopping')} </span></LinkComponent>
												</div>
											</Col>
											{props.cartItems.length > 0 ?
												<Col md={12} lg={6} className="ps-xl-2">
													<div className="color-button">
														<LinkComponent className="" href={user_info && user_info.cust_type == 'ADMIN' && head_sys_id > 0 ? '/modification?head_sys_id=' + head_sys_id : "/cartPage"} ><span>{t('ViewCart')} </span></LinkComponent>
													</div>
												</Col>
												: ''}
										</Row>
									</Col>
								</Row>
							</Card.Body>
						</Card>
					</div>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state) => ({ cartItems: state.cart.cartItems, numberCart: state.cart.numberCart, user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
	return {
		user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CartListMenu);

