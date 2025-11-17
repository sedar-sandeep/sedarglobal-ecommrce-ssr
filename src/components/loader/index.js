// import * as React from 'react';
// import Router from 'next/router';

// export const LoaderGif = () => {
//   const [loading, setLoading] = React.useState(false);

//   const loaderItem = {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     textAlign: "center"
//   };

//   Router.onRouteChangeStart = () => {
//     setLoading(true);
//   };

//   Router.onRouteChangeComplete = () => {
//     setLoading(false);
//   };

//   Router.onRouteChangeError = () => {
//     setLoading(false);
//   };

//   return (
//     <>
//       {loading && <div className="loaderItem" style={loaderItem}>
//         <img className="img-fluid" src={`/assets/images/Customization/dancingloader.gif`} alt="sedar images" />
//       </div>}
//     </>
//   );
// };