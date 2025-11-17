// import React from 'react';
// import { Col, Container, Row, Tab, Nav, Button, Modal, Form } from 'react-bootstrap';
// import LocalizedLink from '../../../Redux-Config/LocalizedLink';
// import { t_lang } from '../../../services/i18n';

// const ProfileAccountInfoEdit = (props) => {
//   return (
//     <Modal
//       {...props}
//       size="md"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//       animation={false}
//     >
//       <Modal.Body>

//         <div className="formaddedit py-5 px-4">
//           <div> <span onClick={props.onHide} className="close-button">✕</span> </div>
//           <Form>
//             <Row>

//               <Col sm={12}>
//                 <Form.Group className="floating-field">
//                   <Form.Control
//                     type="text"
//                     placeholder=" "
//                   />
//                   <label  >{t_lang('Phonenumber')} </label>
//                 </Form.Group>
//               </Col>
//               <Col sm={4} >
//                 <div className="color-button">
//                   <LocalizedLink className="" to="#" ><span>{t_lang('Submit')}</span></LocalizedLink>
//                 </div>
//               </Col>
//             </Row>

//           </Form>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// }
// ProfileAccountInfoEdit.propTypes = {};

// ProfileAccountInfoEdit.defaultProps = {};

// export default ProfileAccountInfoEdit;
