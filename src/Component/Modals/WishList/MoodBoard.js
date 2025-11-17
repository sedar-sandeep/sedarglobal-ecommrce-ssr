import React, { useEffect } from 'react';
import { Modal, Form, InputGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

import { countryName, langName } from '@utils/i18n';
import { addMoodListings, moodListings, postMood } from 'src/Redux-Config/Actions/index';
import { useTranslation } from 'next-i18next';

const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;
const lang = langName //i18next.language; //'en';
const country = countryName;
const API_LOCATION = process.env.NEXT_PUBLIC_API_URL;

const API_PATH = API_LOCATION + `mood_board/type`;
function MoodBoard(props) {
    const { t } = useTranslation("common");

    const mood_list = useSelector(store => store.mood_board.data);
    const dispatch = useDispatch();
    let Selectedmood = {};
    let moodData = {
        ...props,
        'code': props.active_item_id,
        'SPI_PR_ITEM_CODE': props.SPI_PR_ITEM_CODE,
        'item_label': 'ADD_TO_MOOD',
        'url': 'mood_board/send',
        'page_name': props.page_name
    }

    useEffect(() => {
        moodListings(API_PATH)(dispatch)
    }, [])

    const setMood = (e) => {
        const { value } = e.target;
        //setSingleSelections(value)


        Selectedmood = {
            'value': value,
            'name': e.target.selectedOptions[0].text,
        };
    }

    // $_line_data = $_data;
    // $_code = isset($_line_data['code']) ? $_line_data['code'] : ''; // Material Code
    // $_P_SMB_CUST_SYS_ID = isset($_line_data['CUST_SYS_ID']) ? $_line_data['CUST_SYS_ID'] : 0;
    // $_P_SMB_VSL_CODE = isset($_line_data['mood'][0]['value']) ? $_line_data['mood'][0]['value'] : 0;
    // $_P_SMB_PR_ITEM_CODE = isset($_line_data['SPI_PR_ITEM_CODE']) ? $_line_data['SPI_PR_ITEM_CODE'] : '';
    // $_P_SMB_MOOD_DESC = isset($_line_data['mood'][0]['name']) ? $_line_data['mood'][0]['name'] : '';
    // $_visitorId = isset($_line_data['visitorId']) ? $_line_data['visitorId'] : '';
    // $_site = isset($_REQUEST['site']) ? $_REQUEST['site'] : '';
    // $_lang = isset($_REQUEST['lang']) ? $_REQUEST['lang'] : 'en';



    //console.log(options);
    return (
        <>
            <Modal
                {...props}
                // size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="MoodBoard"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h4>{t("CreateNewMoodBoard")} </h4>
                        <h4>{t("Addthisitemtoalist")}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="py-4">

                        <InputGroup className="mb-3">

                            {/* <Typeahead
                                id="basic-typeahead-single"
                                labelKey="name"
                                onChange={setSingleSelections}
                                options={mood_list}
                                placeholder={t("ChooseaMoodBoard")}
                                selected={singleSelections}
                            /> */}

                            <Form.Select as="select" name="mood" className="form-control inputText" onChange={setMood}>
                                <option value="">{t("ChooseaMoodBoard")}</option>
                                {mood_list && mood_list.map((row, key) => (
                                    <option value={row.value} key={key} desc={row.name}>{row.name}</option>
                                ))}

                            </Form.Select>

                            <span onClick={props.onHide} role="button">
                                <InputGroup.Text id="basic-addon2" className="bg-sg-primary border-0 ms-2  rounded-0" onClick={() => dispatch(postMood({ ...moodData, 'mood': Selectedmood }))}>
                                    {t("Add")}
                                </InputGroup.Text>
                            </span>
                        </InputGroup>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <div className=""><p>Already you Have List? <span>Log in</span></p> </div>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}
export default MoodBoard;