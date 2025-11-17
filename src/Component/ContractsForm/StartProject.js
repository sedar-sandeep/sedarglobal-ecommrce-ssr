import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useRouter } from "next/router";
import AddressLov from '../Utility/AddressLov';
import { Col, Row, Form, Button, FloatingLabel, FormControl } from 'react-bootstrap';
import 'react-intl-tel-input/dist/main.css';
import 'react-phone-number-input/style.css'
import en from 'react-phone-number-input/locale/en';
import ar from 'react-phone-number-input/locale/ar';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { useTranslation } from 'next-i18next';
import ReCAPTCHA from "react-google-recaptcha"
import { ccy_code, ccy_decimals, cn_iso, countryName, langName, visitorId } from '@utils/i18n';
const sitekey = process.env.NEXT_PUBLIC_SITE_KEY_CAPTCHA;

const enquiry_t_list = {
    M: 'measurement_consultation',
    V: 'virtual_consultation',
    H: 'phone_consultation',
    C: 'contact',
    F: 'franchise',
    S: 'contracts',
    Q: 'get_a_quote',
    D: 'special_offer',
    N: 'newsletter',
    I: 'Inquiry',
    E: 'enquiry',
    PWD: 'password',
    REMAIL: 'email',
    U: 'upholstery_studio',
    P: 'Professionals'
}

const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;


export default function StartProject(props) {
    const { t } = useTranslation('common');

    const formPage = props?.form || 'EnquiryForm';
    const enq_type = props.form && props.form == 'professionals' ? 'P' : 'S';

    const fileType = ["text/csv", "text/xls", "text/tsv", "application/vnd.ms-excel", 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    const schema = yup.object().shape({
        long_name: yup.string().required(t('Thisfieldisrequired')),
        email: yup.string().required(t('Thisfieldisrequired')).email(t('Email_validation')),
        phone: yup.string().required(t('Thisfieldisrequired')),
        country: yup.string().required(t('Thisfieldisrequired')),
        state: yup.string().required(t('Thisfieldisrequired')),
        city: yup.string().required(t('Thisfieldisrequired')),
        // ProjectType: yup.string().required(t('Thisfieldisrequired')),
        //budget: yup.string().required(t('Thisfieldisrequired')),

        ProjectType: yup.string().when([], {
            is: () => formPage != 'professionals',
            then: yup.string().required(t("Youneedtoprovideafile")),
            otherwise: yup.string()
        }),
        budget: yup.string().when([], {
            is: () => formPage != 'professionals',
            then: yup.string().required(t("Youneedtoprovideafile")),
            otherwise: yup.string()
        }),
        company_name: yup.string().when([], {
            is: () => formPage == 'professionals',
            then: yup.string().required(t("Youneedtoprovideafile")),
            otherwise: yup.string()
        }),
        professional_type: yup.string().when([], {
            is: () => formPage == 'professionals',
            then: yup.string().required(t("Youneedtoprovideafile")),
            otherwise: yup.string()
        }),
        current_project: yup.string().when([], {
            is: () => formPage == 'professionals',
            then: yup.string().required(t("Youneedtoprovideafile")),
            otherwise: yup.string()
        }),

        documentfile: yup.mixed()
            .test('notRequired', t("Youneedtoprovideafile"), (value) => {

                return true;
                //return value && value.length
            })
            .test("fileSize", t("Youneedtoprovideafilevalidsize"), (value, context) => {
                if (value && value.length > 0) {
                    return value && value[0] && value[0].size <= 500000;
                } else {
                    return true;
                }

            })
            .test("type", t("Youneedtoprovideafilevalidformat"), function (value) {
                if (value && value.length > 0) {
                    return value && value[0] && fileType.includes(value[0].type);
                } else {
                    return true;
                }
            }),
    });

    const { register, handleSubmit, watch, formState: { errors }, setValue, reset, getValues, clearErrors } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            myCountry: "AE",
            country: cn_iso,
            phone: ""
        }
    });

    let router = useRouter();
    const [apiError, setApiError] = useState();
    const [phoneNo, setphoneNumber] = useState();

    const [successMessage, setSuccessMessage] = useState();

    const [submit_disable, set_submit_disable] = useState(true);

    const [mobileNo, setMobileNo] = useState()
    const phoneNoFun = (status, phoneNumber, country_info) => {
        if (status && phoneNumber.length > 8) {
            if (phoneNumber.charAt(0) == '0') {
                setMobileNo('+' + country_info.dialCode + phoneNumber.substring(1));
            } else if (phoneNumber.charAt(0) == '+') {
                setMobileNo(phoneNumber);
            } else {
                setMobileNo('+' + country_info.dialCode + phoneNumber);
            }

        } else {
            setMobileNo('');
        }
    }



    const childRef = useRef();
    const onSubmit = (data) => {

        if (!isValidPhoneNumber(phoneNo)) {
            return true;
        }
        // const captcha = childRef?.current?.doSubmit();
        const captcha = childRef.current.getValue();

        if (captcha) {
            set_submit_disable(true);
            const formData = new FormData()
            for (var key in data) {
                if (key == "documentfile") {
                    formData.append("documentfile", data.documentfile[0])
                } else {
                    formData.append(key, data[key]);
                }
            }


            let path_url = `?lang=${langName}&site=${site_id}&country=${countryName}&content=contracts&"visitorId"=${visitorId}&currency=${ccy_code}&ccy_decimal=${ccy_decimals}&cn_iso=${cn_iso}`;
            //  var enq_type = data.enquiry_type;

            fetch(`${process.env.NEXT_PUBLIC_API_URL}user/enquiry${path_url}`, {
                method: "POST",
                body: formData
            }).then(response => {
                set_submit_disable(false);
                let res_data = response.status;
                if (res_data == 200) {
                    setSuccessMessage(t('we_will_get_back'));

                    let page_name = enquiry_t_list[enq_type] ? enquiry_t_list[enq_type] : 'done';
                    router.push({
                        pathname: `/success/${page_name}`,
                        query: { email: data.email }
                    });
                    reset();
                } else {
                    setApiError(res_data.error_message);
                }
            }).catch((error) => {
                setApiError(error);
            });
        } else {
            console.log('captcha error');
        }
    }

    const checkCaptchaFun = () => {
        let captcha_val = childRef.current.getValue();
        if (captcha_val && captcha_val.length > 10) {
            set_submit_disable(false);
        } else {
            set_submit_disable(true);
        }

        ApiDataService.post('user/googleCapatchaValidate', { token: captcha_val, content: 'Project' }).then(response => {

        }).catch(e => {
            // setApiError(e.message);
        });
    }

    //console.log(errors, 'errors', enq_type);

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" >
                <Form.Control
                    type="hidden"
                    name="enquiry_type"
                    {...register('enquiry_type')}
                    defaultValue={enq_type}
                    value={enq_type}
                />
                <Row>
                    <Col sm="6" >
                        <FloatingLabel className="my-2 my-md-4 border-none bg-transparent" label={t("FullName")} >
                            <Form.Control
                                className="bg-transparent border-0 border-bottom border-dark rounded-0"
                                type="text"
                                placeholder={t("FullName")}
                                name="long_name" // ref={register({ required: true })}
                                {...register('long_name', { required: true })}
                            />
                            {errors?.long_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                        </FloatingLabel>
                    </Col>
                    {formPage && formPage == 'professionals' ?
                        <Col sm="6" >
                            <FloatingLabel className="my-2 my-md-4 border-none bg-transparent" label={t("Company_Name")} >
                                <Form.Control
                                    className="bg-transparent border-0 border-bottom border-dark rounded-0"
                                    type="text"
                                    placeholder={t("Company_Name")}
                                    name="company_name" // ref={register({ required: true })}
                                    {...register('company_name', { required: true })}
                                />
                                {errors?.company_name && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                            </FloatingLabel>
                        </Col>
                        : ''}

                    <Col sm="6" >
                        <FloatingLabel className="my-2 my-md-4 border-none bg-transparent" label={t("Email")} >
                            <Form.Control
                                className="bg-transparent border-0 border-bottom border-dark rounded-0"
                                type="text"
                                placeholder={t("Email")}
                                name="email" // ref={register({ required: true })}
                                {...register('email', { required: true })}
                            />

                            {errors?.email && <><span className="text-danger fs-6 fw-lighter form-input-error">{errors?.email.message}</span></>}

                        </FloatingLabel>
                    </Col>

                    <Col sm="6">
                        <FloatingLabel className="my-2 my-md-4 border-none" label={t('Phonenumber')}>
                            <PhoneInput
                                international
                                countryCallingCodeEditable={false}
                                defaultCountry={cn_iso && cn_iso != 'XX' ? cn_iso.toUpperCase() : 'US'}
                                labels={langName == 'ar' ? ar : en}
                                className="signupmobile inputText form-control d-flex border-0 border-bottom rounded-0 border-dark"
                                placeholder="Enter phone number"
                                value={phoneNo}
                                onChange={(value) => {
                                    setValue("phone", value)
                                    setphoneNumber(value)
                                }}
                                error={phoneNo ? (isValidPhoneNumber(phoneNo) ? undefined : 'Invalid phone number') : 'Phone number required'}
                            />
                            <br />
                            <Form.Control
                                type="hidden"
                                placeholder={t('Phonenumber')}
                                name="phone"
                                value={phoneNo}
                                {...register("phone", { required: true, value: phoneNo })}
                                className="d-none"
                            />
                            {phoneNo && !isValidPhoneNumber(phoneNo) && (
                                <>
                                    <span className="text-danger fs-6 fw-lighter form-input-error">
                                        {t('please_enter_a_valid_number')}
                                    </span>
                                    <br />
                                </>
                            )}
                            {errors?.phone && <span className="text-danger fs-6 fw-lighter form-input-error">{t(errors?.phone.message)}</span>}


                        </FloatingLabel>
                    </Col>
                    <AddressLov register={register} errors={errors} setValue={setValue} getValues={getValues} />

                    {formPage && formPage == 'professionals' ?
                        <>
                            <Col sm="6">
                                <FloatingLabel controlId="floatingSelectGrid" label={t("Are_you_a")} className="my-4">
                                    <Form.Select {...register('professional_type', { required: true })} as="select" name="professional_type" className="form-control inputText bg-transparent border-0 border-bottom border-dark rounded-0">
                                        <option value="" >{t("Please_select_profession")}</option>
                                        <option value="Interior Designer" >{t("Interior_Designer")}</option>
                                        <option value="Architect">{t("Architect")} </option>
                                        <option value="Contractor / Fit-Out" >{t("Contractor_Fit_Out")} </option>
                                        <option value="Procurement / FF&E Consultan" >{t("Procurement")} </option>
                                        <option value="Other" >{t("Other")}</option>

                                    </Form.Select>
                                    {errors?.professional_type && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                                </FloatingLabel>
                                {watch('professional_type') && watch('professional_type') == 'Other' &&
                                    <FloatingLabel className="my-2 my-md-4 border-none bg-transparent" label={t("Other")} >
                                        <Form.Control
                                            className="bg-transparent border-0 border-bottom border-dark rounded-0"
                                            type="text"
                                            placeholder={t("Other")}
                                            name="professional_type_other" // ref={register({ required: true })}
                                            {...register('professional_type_other', { required: true })}
                                        />
                                        {errors?.professional_type_other && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                                    </FloatingLabel>
                                }
                            </Col>

                            <Col sm="6">
                                <FloatingLabel controlId="floatingSelectGrid" label={t("Company_Type")} className="my-4">
                                    <Form.Select {...register('company_type', { required: true })} as="select" name="company_type" className="form-control inputText bg-transparent border-0 border-bottom border-dark rounded-0">
                                        <option value="" >{t("Please_select_company_type")}</option>
                                        <option value="Independent / Freelance" >{t("Independent_Freelance")}</option>
                                        <option value="Studio / Boutique Firm">{t("Studio_Boutique_Firm")} </option>
                                        <option value="Large Design Firm" >{t("Large_Design_Firm")} </option>
                                        <option value="Retail / Real Estate Developer" >{t("Retail_Real_Estate_Developer")} </option>
                                        <option value="Hospitality / Commercial Client" >{t("Hospitality_Commercial_Client")} </option>

                                    </Form.Select>
                                    {errors?.company_type && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                                </FloatingLabel>

                            </Col>
                        </>
                        : ''}
                    <Col sm="6">
                        <FloatingLabel controlId="floatingSelectGrid" label={t("ProjectType")} className="my-4">
                            <Form.Select {...register('ProjectType', { required: true })} as="select" name="ProjectType" className="form-control inputText bg-transparent border-0 border-bottom border-dark rounded-0">
                                <option value="" >{t("Please_select_project_type")}</option>
                                <option value="Hospitality" >{t("Hospitality")}</option>
                                <option value="Educational Institutions">{t("EducationalInstitutions")} </option>
                                <option value="Government Institutions" >{t("GovernmentInstitutions")} </option>
                                <option value="Healthcare" >{t("Healthcare")} </option>
                                <option value="Residential" >{t("Residential")} </option>
                                <option value="Retail" >{t("Retail")} </option>
                                <option value="Other" >{t("Other")} </option>

                            </Form.Select>
                            {errors?.ProjectType && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                        </FloatingLabel>

                        {watch('ProjectType') && watch('ProjectType') == 'Other' &&
                            <FloatingLabel className="my-2 my-md-4 border-none bg-transparent" label={t("Other")} >
                                <Form.Control
                                    className="bg-transparent border-0 border-bottom border-dark rounded-0"
                                    type="text"
                                    placeholder={t("Other")}
                                    name="project_type_other"
                                    {...register('project_type_other', { required: true })}
                                />
                                {errors?.project_type_other && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                            </FloatingLabel>
                        }

                    </Col>

                    {formPage && formPage == 'professionals' &&
                        <>
                            <Col sm={6}>
                                <Row className="addresstype">
                                    <Col className="" lg={12}>
                                        <label >{t('Do_you_have_a_current_project')} </label>
                                    </Col>
                                    <Col lg={12} className="p-5">
                                        <Row>
                                            <Col className="border-0 p-0">
                                                <Form.Check
                                                    type="radio"
                                                    name="current_project"
                                                    label={t('Yes')}
                                                    value="Y"
                                                    {...register('current_project', { required: true })}
                                                    id="Yes"
                                                />

                                            </Col>
                                            <Col className="border-0 p-0">
                                                <Form.Check
                                                    type="radio"
                                                    name="current_project"
                                                    label={t('No')}
                                                    value="N"
                                                    {...register('current_project', { required: true })}
                                                    id="No"
                                                />

                                            </Col>
                                        </Row>
                                    </Col>
                                    {errors?.current_project && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                                </Row>

                                {watch('current_project') && watch('current_project') == 'Y' &&
                                    <FloatingLabel className="my-2 my-md-4 border-none bg-transparent" label={t("Project_Details")} >
                                        <Form.Control
                                            className="bg-transparent border-0 border-bottom border-dark rounded-0"
                                            type="text"
                                            placeholder={t("Project_Details")}
                                            name="project_details"
                                            {...register('project_details', { required: true })}
                                        />
                                        {errors?.ProjectTypeOther && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                                    </FloatingLabel>
                                }
                            </Col>

                            <Col sm="6">
                                <FloatingLabel controlId="floatingSelectGrid" label={t("How_did_you_hear")} className="my-4">
                                    <Form.Select {...register('referral_source', { required: true })} as="select" name="referral_source" className="form-control inputText bg-transparent border-0 border-bottom border-dark rounded-0">
                                        <option value="" >{t("Please_select")}</option>
                                        <option value="ES011" >{t("Instagram")}</option>
                                        <option value="ES012">{t("TikTok")} </option>
                                        <option value="ES019" >{t("Referred_by_a_colleague")} </option>
                                        <option value="ES020" >{t("Sedar_Store_Sales_Rep")} </option>
                                        <option value="ES021" >{t("Newsletter_Event")} </option>
                                        <option value="ES022" >{t("Other")} </option>

                                    </Form.Select>
                                    {errors?.referral_source && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                                </FloatingLabel>

                                {watch('referral_source') && watch('referral_source') == 'Other' &&
                                    <FloatingLabel className="my-2 my-md-4 border-none bg-transparent" label={t("Other")} >
                                        <Form.Control
                                            className="bg-transparent border-0 border-bottom border-dark rounded-0"
                                            type="text"
                                            placeholder={t("Other")}
                                            name="referral_source_other" // ref={register({ required: true })}
                                            {...register('referral_source_other', { required: true })}
                                        />
                                        {errors?.referral_source_other && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}
                                    </FloatingLabel>
                                }

                            </Col>
                        </>
                    }
                    {formPage && formPage != 'professionals' ? <Col sm="6"  >
                        <FloatingLabel controlId="floatingSelectGrid" label={t("Doyouhavebudgetinmind")} className="my-4">
                            <Form.Select {...register('budget', { required: true, defaultValue: "$100,000" })} as="select" name="budget" className="form-control inputText bg-transparent border-0 border-bottom border-dark rounded-0">
                                <option value="$100,000">{t("Lessthen")}  10,000$</option>
                                <option value="$200,000">10,000$ - 50,000$</option>
                                <option value="$200,000">50,000$ - 100,000$</option>
                                <option value="$200,000">100,000$ - 250,000$</option>
                                <option value="$300,000 - More">{t("Morethen")}  250,000$  </option>
                            </Form.Select>
                            {errors?.budget && <span className="text-danger fs-6 fw-lighter form-input-error">{t('Thisfieldisrequired')}</span>}

                        </FloatingLabel>

                    </Col>
                        : ''}

                    {formPage && formPage != 'professionals' ?
                        <>
                            <Col sm="6" >
                                <div className="form-group">
                                    <span className="label text-secondary">{t("UploadYourfileorURLLink")} </span>
                                    <input type="file" className="form-control bg-transparent border-0 border-bottom border-dark rounded-0" placeholder="" name="documentfile" {...register("documentfile", {})} />
                                    <span className="labes label"> {t("MaximumFileMBFileFormatTSVorXLS")} </span>
                                    {errors?.documentfile && <p className="text-danger fs-6 fw-lighter form-input-error">{errors?.documentfile.message}</p>}
                                    {/* {errors?.documentfile && <p>{errors?.documentfile.message}</p>} */}
                                </div>
                            </Col>


                            <Col sm="6" >
                                <FloatingLabel className="my-2 my-md-4" label={t("YourURLLink")} >
                                    <Form.Control
                                        className="bg-transparent border-0 border-bottom border-dark rounded-0"
                                        type="text"
                                        placeholder={t("YourURLLink")}
                                        name="urllink" // ref={register()}
                                    />

                                </FloatingLabel>
                            </Col>
                        </>
                        : ''}
                    <Col sm="12" >
                        <FloatingLabel className="my-2 my-md-4" label={t("Message")} >
                            <Form.Control
                                type="text"
                                placeholder={t("Message")}
                                name="remarks" // ref={register()}
                                className="bg-transparent border-0 border-bottom border-dark rounded-0"
                            />

                        </FloatingLabel>
                    </Col>

                    <Col sm={12}>
                        {successMessage && <div className="alert alert-success my-2 alert-dismissible fade show" role="alert">
                            <p className="fs-6 fw-lighter form-input-error">{successMessage}</p>
                            <button type="button " className="btn-close btn-sm" onClick={() => setSuccessMessage(false)}></button>
                        </div>}
                        {apiError && <div className="alert alert-danger my-2 alert-dismissible fade show" role="alert">
                            <p className="fs-6 fw-lighter form-input-error">{apiError}</p>
                            <button type="button" className="btn-close btn-sm" onClick={() => setApiError(false)}></button>
                        </div>}
                    </Col>

                    <Col sm="12">
                        <Row>
                            <Col md="8 py-2">
                                <div className="form-check labelstylecheckbox">
                                    <input name="i_agree" type="checkbox" className="form-check-input" id="exampleCheck1" defaultChecked={true} />
                                    <label className="form-check-label" htmlFor="exampleCheck1">{t('IagreetoreceiveothercommunicationsfromSedarInnovation')} </label>
                                </div>
                            </Col>
                            <Col md="4">
                                <ReCAPTCHA
                                    sitekey={sitekey}
                                    ref={childRef}
                                    hl={langName}
                                    className="google_captcha"
                                    onChange={checkCaptchaFun}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={12} className={`${langName == 'ar' ? 'text-start' : 'text-end'}`}>
                        <Button type="submit" className="btn sedar-btn border-0 rounded-0" disabled={submit_disable}>{t('Submit')}</Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}
