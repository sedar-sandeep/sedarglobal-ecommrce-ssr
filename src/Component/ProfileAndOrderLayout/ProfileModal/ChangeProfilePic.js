
import React, { Component } from 'react';
import { Col, Form, Modal, Row, Alert } from 'react-bootstrap';
import ApiDataService from '../../../services/ApiDataService';
import GLOBALS from '../../../Globals';
import { connect } from "react-redux";
import $ from 'jquery';
import LaddaButton from 'react-ladda';
import LinkComponent from '@components/Link';
import axios from 'axios';
import parse from 'html-react-parser';
import { useTranslation } from 'next-i18next'
import Cookies from 'js-cookie';

import { countryName, langName } from '@utils/i18n';

const site_id = process.env.NEXT_PUBLIC_SITE_ID; //100001;

let auth_token = Cookies.get('AUTH_TOKEN');
let user_email = Cookies.get('USER_EMAIL');
let user_id = Cookies.get('USER_ID');
const base_url = process.env.NEXT_PUBLIC_API_URL;
const upload_url = `${base_url}dashboard/update_dp/${user_id}`;

class ChangeProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cust_user_id: user_email,
      auth_token: auth_token,
      errors: {},
      avatar: '',
      imagePreviewUrl: '',
      scene_image: '',
      loading_btn: false,
      apiError: '',
      site: site_id,
      lang: langName,
      country: countryName,
      setErrorMgs: false

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  stateChanges = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

  }
  validation = () => {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    if (!fields['cust_user_id']) {
      errors["cust_user_id"] = "User ID is required";
      formIsValid = false;

      this.setState({ setErrorMgs: true })
    }
    if (!fields['auth_token']) {
      errors["auth_token"] = "Auth token is required";
      formIsValid = false;
      this.setState({ setErrorMgs: true })

    }
    let fileFormat = fields.avatar.name.split(".")[1].toLowerCase()

    if (fileFormat == "png" || fileFormat == "jpeg" || fileFormat == "jpg") {
      return true;
    } else {
      errors["file_format"] = "The Image must be a file of type : jpg,png,jpeg";
      formIsValid = false;
      this.setState({ setErrorMgs: true })

    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.validation()) {
      return false;
    }
    var formData = new FormData();
    let Properties = this.state;


    for (var key in Properties) {
      if (['errors', 'imagePreviewUrl', 'scene_image', 'loading_btn', 'apiError'].indexOf(key) < 0) {
        formData.append(key, Properties[key]);
      }
    }
    this.loading_btn = true;
    axios.post(upload_url, formData).then(response => {
      this.loading_btn = false;
      if (response.data.return_status !== "0") {
        if (response.data.error_message === 'Error') {
          //this.props.errorMessage(response.data.result, "ERR-OBJ");
        } else {
          this.apiError = response.data.error_message;
        }
      } else {
        this.props.userprofielfun();
        this.apiError = response.data.error_message;
        this.props.onHide();
      }
    }).catch((error) => {
      this.loading_btn = false;
      console.log(error);
      this.apiError = error.message;
    });


  }


  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        avatar: file,
        scene_image: reader.result,
        setErrorMgs: false
      });
    }
    reader.readAsDataURL(file)
  }


  render() {
    const setValue = this.state;

    let $imagePreview = setValue.scene_image ? (<img src={setValue.scene_image} style={{ width: '100%', maxWidth: "250px", maxHeight: "250px" }} alt="Image" width="auto" height="auto" />) : (<div className="previewText text-center">{this.props.currentImage && <img src={this.props.currentImage} style={{ width: '100%', maxWidth: "250px" }} alt="Image" width="auto" height="auto" />}</div>);

    return (
      <div>
        <Modal
          //{...this.props}
          show={this.props.show}
          onHide={this.props.onHide}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation={false}
          className="formaddeditProfilePhoto"
        >
          <Modal.Body>

            <div className="formaddedit px-4">
              {/* {this.state.errors["cust_user_id"] &&
                <span className='text-danger'></span>
              }
              <input type="hidden" placeholder="auth_token" name="auth_token" onChange={this.stateChanges} value={auth_token} />
              {this.state.errors["auth_token"] &&
                <span className='text-danger'>{this.state.errors["auth_token"]}</span>
              }
              {this.state.errors["file_format"] &&
                <span className='text-danger'>{this.state.errors["file_format"]}</span>
              } */}
              {/* <Form noValidate onSubmit={this.handleSubmit} autoComplete="off">
                {this.state.setErrorMgs ?
                  <>
                    {
                      this.state.errors["cust_user_id"] && <Alert className="api_alert_mgs fs-6 py-2 mt-3" variant={`danger`} onClose={() => this.setState({ setErrorMgs: false })} dismissible>{this.state.errors["cust_user_id"]} </Alert>
                    }
                    {
                      this.state.errors["auth_token"] && <Alert className="api_alert_mgs fs-6 py-2 mt-3" variant={`danger`} onClose={() => this.setState({ setErrorMgs: false })} dismissible>{this.state.errors["auth_token"]} </Alert>
                    }
                    {
                      this.state.errors["file_format"] && <Alert className="api_alert_mgs fs-6 py-2 mt-3" variant={`danger`} onClose={() => this.setState({ setErrorMgs: false })} dismissible>{this.state.errors["file_format"]} </Alert>
                    }
                  </>

                  : ''}
                <Row className="formaddedit">

                  <Col xs={12}>

                    <div> <LinkComponent href="/" onClick={this.props.onHide} className="close-button">✕</LinkComponent> </div>
                    <div className="error_text" style={{ padding: '6px' }}>{this.apiError}</div>
                    <br />
                    <label>{t('profile_img_upload')}</label>
                    <div className="input-group input-group-sm p-0" style={{ overflow: "hidden" }}>
                      <div className="custom-file p-0">
                        <input className="custom-file-input form-control-sm p-0" accept=".jpg,.jpeg,.png" type="file" onChange={(e) => this._handleImageChange(e)} />
                        <label className="custom-file-label">{setValue.avatar ? setValue.avatar.name : ''}</label>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <small className="text-danger fs-6 fw-lighter form-input-error">
                    </small>
                    <div className="imgPreview text-center" style={{ paddingTop: '20px' }}>
                      {$imagePreview}
                    </div>
                  </Col>
                  <Col xs={12}>

                    <input type="hidden" placeholder="cust_user_id" name="cust_user_id" onChange={this.stateChanges} value={user_email} />

                    <div className="color-button">
                      <LaddaButton loading={this.loading_btn} type="submit" className="sub_btn"><span>{t('Upload')}  </span></LaddaButton>
                    </div>
                  </Col>
                </Row>
              </Form> */}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateEmail: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
  }
}

export default connect(null, mapDispatchToProps)(ChangeProfilePic);