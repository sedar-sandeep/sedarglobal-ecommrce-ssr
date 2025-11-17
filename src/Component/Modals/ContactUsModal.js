import React, { useEffect, useState } from 'react'
import EnquiryForm from '../Utility/EnquiryForm'
import { Modal } from 'react-bootstrap';
import axios from "axios";
import { countryName, langName, visitorId } from '@utils/i18n';
import Cookies from 'js-cookie';



const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;
const site = Cookies.get('siteDetail');
let decimalPoints = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_decimals >= 0 ? parseInt(JSON.parse(site).show_decimals) : 2;
let ccy_code = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).show_ccy_code ? JSON.parse(site).show_ccy_code : '';
let cn_iso = site != 'undefined' && site && JSON.parse(site) != null && JSON.parse(site).primary_ref_cn_iso ? JSON.parse(site).primary_ref_cn_iso : '';


export default function ContactUsModal(props) {

	let form_name = props.form_name ? props.form_name : 'contact';
	let hideField = props.hideField ? props.hideField : "A";

	let path_url = `?lang=${langName}&site=${site_id}&country=${countryName}&content="contact"&visitorId=${visitorId}&currency=${ccy_code}&ccy_decimal=${decimalPoints}&cn_iso=${cn_iso}`;


	const [ContactCategory, setContactCategory] = useState();
	const getContactCategory = async () => {
		axios
			.get(`${process.env.NEXT_PUBLIC_API_URL}content/fetch_enquiry${path_url}`)
			.then((response) => {
				setContactCategory(response.data);
			})
			.catch((err) => {
				console.log(err);
				setContactCategory("")
			});

	};



	useEffect(() => {
		getContactCategory()
	}, []);
	const artData = {
		type: props.type,
		selectedLeft: props.selectedLeft,
		selectedRight: props.selectedRight,
		selectedDesc: props.selectedDesc,
		selectedArt: props.selectedArt
	}
	return (
		<>  <Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered

			//backdrop={false}
			className="ContactUsModal"
			style={{ background: "#00000075" }}
		>
			<Modal.Header closeButton className='border-0 border'>

			</Modal.Header>
			<Modal.Body>
				<EnquiryForm form={form_name} type={props?.formType || 'C'} hideField={hideField} ContactCategoryList={ContactCategory && ContactCategory} stage={artData} />
			</Modal.Body>

		</Modal>

		</>
	)
}
