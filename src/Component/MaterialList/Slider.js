// import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';


// // import required modules
// import { FreeMode, Navigation, Thumbs } from "swiper";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import LocalizedLink from "../../Redux-Config/LocalizedLink";

// const color_img_path = process.env.REACT_APP_S3_COLOR_PATH;
// const item_img_path = process.env.NEXT_PUBLIC_ITEM_IMG_WEBP_PATH + 'laptop/';


// export default function ImageThumbSlider(props) {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);

//   return (
//     <div className="">
//       <LocalizedLink to={props.link && props.link ? props.link : "#"}>
//         <Swiper
//           spaceBetween={0}
//           thumbs={{ swiper: thumbsSwiper }}
//           modules={[FreeMode, Navigation, Thumbs]}
//           className="imageslider"
//           pagination={{ "clickable": true, dynamicBullets: true }}
//         >
//           {props.image?.split(',').map((row, key) => (
//             <SwiperSlide key={key}>
//               <LazyLoadImage src={`${item_img_path}${row?.split('|')[0]}.webp`} width={`100%`} effect="blur" className="browseImage" height="auto" />
//             </SwiperSlide>
//           ))}

//         </Swiper>
//       </LocalizedLink>
//       <Swiper
//         onSwiper={setThumbsSwiper}
//         spaceBetween={5}
//         slidesPerView={4}
//         freeMode={true}
//         watchSlidesProgress={true}
//         modules={[FreeMode, Navigation, Thumbs]}
//         className="p-1 metarial_list_mob_slider"

//       >
//         {props.image?.split(',').map((row, key) => (
//           <SwiperSlide key={key}>
//             <LazyLoadImage effect="blur" className="color_image img-fluid" src={`${color_img_path}${row?.split('|')[2]}`} alt="" data-toggle="tooltip" data-html="true" title={row?.split('|')[1]} width="auto" height="auto" />
//             {/* <LazyLoadImage effect="blur" className="color_image img-fluid" src={`https://dummyimage.com/50x50/000/fff`} alt="" data-toggle="tooltip" data-html="true" title={row.split('|')[1]} /> */}
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div >
//   );
// }
