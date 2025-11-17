// import { connect } from 'react-redux'
// import React, { Component } from 'react'

// // import { prefixPath } from '../services/util'
// // import { admitad_utm_source_url } from '../Admitad/AdmitadIndex';
// import Link from 'next/link';

// class LocalizedLink extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         const { className, children } = this.props;
//         let searchParams = new URLSearchParams(window.location.search);

//         // let utm_source = searchParams.get('utm_source') ? searchParams.get('utm_source') : false;
//         // let tagtag_uid = searchParams.get('tagtag_uid') ? searchParams.get('tagtag_uid') : false;
//         // let admitad_utm = admitad_utm_source_url() && admitad_utm_source_url().length > 15 ? true : false;

//         let utm_source = false;
//         let tagtag_uid = false;
//         let admitad_utm = true;
//         let to = ["http://"]

//         if (to && (to.indexOf('http://') === 0 || to.indexOf('https://') === 0)) {
//             return (
//                 <a
//                     className={className}
//                     href={to}
//                     target={"_blank"} rel="noreferrer"
//                 >
//                     {children}
//                 </a>
//             )
//         }
//         // } else if (utm_source && tagtag_uid && admitad_utm) {
//         //     return (
//         //         <Link
//         //             className={className}
//         //             to={prefixPath(to, locale) + window.location.search}
//         //             target={`${this.props.target && this.props.target ? "_blank" : "_self"}`}
//         //         >
//         //             {children}
//         //         </Link>
//         //     )
//         // } else {
//         //     return (
//         //         <Link
//         //             className={className}
//         //             to={prefixPath(to, locale)}
//         //             target={`${this.props.target && this.props.target ? "_blank" : "_self"}`}
//         //         >
//         //             {children}
//         //         </Link>
//         //     )
//         // }

//     }
// }

// export default 
//     state => ({ locale: state.l10n.locale })
// )(LocalizedLink)
