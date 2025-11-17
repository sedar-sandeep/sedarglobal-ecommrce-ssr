import { useRouter } from 'next/router';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { cn_iso } from '@utils/i18n';
import { connect } from "react-redux";
import Cookies from 'js-cookie';

const whatsaap_email_show = ['gulam.dyer@sedarglobal.com', 'sandeep.kumar@sedarglobal.com'];

const WhatsAppChat = (props) => {
    const router = useRouter();

    //    const currentHour = new Date().getHours();

    const whatsappNumber = '+971502313453';//currentHour >= 9 && currentHour < 18 ? '+971502313453' : '+971506342193';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    let customClass = router.asPath.indexOf('/customize') >= 0 ? "whatsAppChat text-end left" : "whatsAppChat text-end"

    let user_email = props.user_state && props.user_state.user_email ? props.user_state.user_email : Cookies.get('USER_EMAIL');
    user_email = user_email && user_email.length > 1 ? user_email.replace(/ /g, '') : user_email;

    if (router.asPath.indexOf('/profile/orders') >= 0 && whatsaap_email_show.indexOf(user_email) >= 0) {
        return false;
    }
    return (
        <div className={`${customClass} bg-green rounded-circle`}>

            <a target="_blank" href={whatsappLink} rel="noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} size="2x" color="#fff" />
            </a>



            {/* {['KW'].indexOf(cn_iso) >= 0 ?
                <a target="_blank" href="https://wa.me/+96566770182" rel="noreferrer">
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" color={'#fff'} />
                </a>
                : ['SA'].indexOf(cn_iso) >= 0 ?
                    <a target="_blank" href="https://wa.me/+966920000359" rel="noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} size="2x" color={'#fff'} />
                    </a> :
                    ['EG'].indexOf(cn_iso) >= 0 ?
                        <a target="_blank" href="https://wa.me/+201116003331" rel="noreferrer">
                            <FontAwesomeIcon icon={faWhatsapp} size="2x" color={'#fff'} />
                        </a> :
                        <a target="_blank" href="https://wa.me/971506342193?text=.مرحبًا%20سيدار،%20أود%20أن%20أعرف%20المزيد%20عن%20عروضكم%0AHello%20Sedar,%20I’d%20like%20to%20inquire%20about%20your%20offers." rel="noreferrer">
                            <FontAwesomeIcon icon={faWhatsapp} size="2x" color={'#fff'} />
                        </a>
            } */}
        </div>
    )
}

const mapStateToProps = (state) => ({ user_state: state.UserReducer });
const mapDispatchToProps = (dispatch) => {
    return {
        user_dispatch: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WhatsAppChat);
