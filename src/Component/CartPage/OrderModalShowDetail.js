import React from 'react';
import { Col, Row, Modal } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { langName } from '@utils/i18n';

function OrderModalShowDetail(props) {
    const { t } = useTranslation("common")
    if (props.data == undefined) {
        return false;
    }
    const { SFP_TITLE, SOL_IMAGE_PATH, info_data, SOL_WIDTH, SOL_HEIGHT, brand_info } = props.data
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h4 className="py-2">{SFP_TITLE}</h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="OrderModalShowDetail py-4 px-2">
                    <Row>
                        <Col lg={5}>
                            <LazyLoadImage className="py-3 w-100 " src={SOL_IMAGE_PATH ? SOL_IMAGE_PATH : `/assets/images/profile/MaskGroup4322.png`} alt="sedarglobal" width="auto" height="auto" />
                        </Col>
                        <Col lg={7} className="p-0">
                            <table className="table">
                                <tbody>
                                    {info_data &&
                                        <>
                                            <tr className="border border-0">
                                                <th className="border border-0 py-1">
                                                    <h6 className="py-1" > {t("ItemCode")} <span className="float-end">:</span></h6>
                                                </th>
                                                <td className="border border-0  py-1"><span className="fs-6 text-secondary">{brand_info && brand_info["SII_ITEM_ID"] && brand_info["SII_ITEM_ID"]}</span></td>
                                            </tr>
                                            <tr className="border border-0 ">
                                                <th className="border border-0 py-1">
                                                    <h6 className="py-1" > {t("Dim")} <span className="float-end">:</span></h6>
                                                </th>
                                                <td className="border border-0   py-1">
                                                    {langName == 'ar' ? <span className="fs-6 text-secondary">{SOL_HEIGHT ? SOL_HEIGHT : 0}<span className='px-1'>x</span>{SOL_WIDTH ? SOL_WIDTH : 0} {t("cmcart")} </span>
                                                        : <span className="fs-6 text-secondary">{SOL_WIDTH ? SOL_WIDTH : 0}<span className='px-1'>x</span>{SOL_HEIGHT ? SOL_HEIGHT : 0} {t("cmcart")} </span>}

                                                </td>
                                            </tr>
                                        </>
                                    }
                                    {info_data && Object.keys(info_data).map((data, index) => {
                                        return (
                                            <React.Fragment key={index}>
                                                {data == "MEASUREMENT" || data == "MATERIAL_SELECTION" ? '' :
                                                    data == "QUANTITY" ?
                                                        <tr className="border border-0">
                                                            <th className="border border-0 py-1">
                                                                <h6 className="py-1" > {t(data)} <span className="float-end">:</span></h6>
                                                            </th>
                                                            <td className="border border-0   py-1"><span className="fs-6 text-secondary">{info_data[data] && info_data[data]['SOI_PCS']}</span></td>
                                                        </tr>
                                                        : data == "LENGTH_OF_WIRE" ?
                                                            <tr className="border border-0">
                                                                <th className="border border-0 py-1">
                                                                    <h6 className="py-1" > {t(data)} <span className="float-end">:</span></h6>
                                                                </th>
                                                                <td className="border border-0   py-1"><span className="fs-6 text-secondary">{info_data[data] && info_data[data]['SOI_WIDTH']} {t('LMT')}</span></td>
                                                            </tr>
                                                            : data == "TYPE_OF_REMOTE" ?
                                                                <tr className="border border-0">
                                                                    <th className="border border-0 py-1">
                                                                        <h6 className="py-1" > {t(data)} <span className="float-end">:</span></h6>
                                                                    </th>
                                                                    <td className="border border-0   py-1"><span className="fs-6 text-secondary">{info_data[data] && info_data[data]['ITEM_ID']}</span></td>
                                                                </tr>
                                                                : data == "WINDOW_DEPTH" ?
                                                                    <tr className="border border-0">
                                                                        <th className="border border-0 py-1">
                                                                            <h6 className="py-1" > {t(data)} <span className="float-end">:</span></h6>
                                                                        </th>
                                                                        <td className="border border-0   py-1"><span className="fs-6 text-secondary">{info_data[data] && info_data[data]['SOI_DEPTH']} {t('CM')}</span></td>
                                                                    </tr>
                                                                    :
                                                                    <tr className="border border-0">
                                                                        <th className="border border-0 py-1">
                                                                            <h6 className="py-1" > {t(data)} <span className="float-end">:</span></h6>
                                                                        </th>
                                                                        <td className="border border-0   py-1"><span className="fs-6 text-secondary">{info_data[data] && info_data[data]['SPS_DESC']}</span>
                                                                            {info_data[data] && info_data[data]['ITEM_ID'] ? <span className='text-secondary'>({info_data[data]['ITEM_ID']})</span> : ''}
                                                                        </td>
                                                                    </tr>
                                                }
                                            </React.Fragment>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </div>

            </Modal.Body>


        </Modal>
    );
}
export default OrderModalShowDetail;