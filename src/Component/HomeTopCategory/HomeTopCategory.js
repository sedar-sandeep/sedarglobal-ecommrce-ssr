import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import SwiperCore, {
    Pagination
} from 'swiper';

import { isMobile } from "react-device-detect";
SwiperCore.use([Pagination]);
import { connect } from "react-redux";
import LinkComponent from '@components/Link';

const HomeTopCategoryConfig = {
    loop: false,
    slidesPerView: 4,
    autoHeight: false, //enable auto height
    //effect: "fade",
    spaceBetween: 30,
    pagination: { clickable: true },
    slidesPerGroup: 4,
    observer: true,
    observeParents: true,
};

const HomeTopCategory = (props) => {
    // const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();

    return (
        <>
            {isMobile ?
                <section className="HomeTopCategory max1920 pt-3 mt-n1">
                    <div className="HomeTopCategory-slider">
                        <Swiper className="top-category" {...HomeTopCategoryConfig}>
                            {props && props?.MenusItems && props?.MenusItems?.megamenu?.CHILD && props?.MenusItems?.megamenu?.CHILD.map((row, index) => {

                                return (
                                    <SwiperSlide key={index}>
                                        {row.SUB_CHILD ? (
                                            <LinkComponent href={row.redirect_to_type == 'OTHER' ? row.redirect_url : row.link_url}>
                                                <LazyLoadImage effect="" className="img-fluid" src={row.image_path} alt="sedarglobal" width="auto" height="auto" />
                                                <p> {row.content}</p>
                                            </LinkComponent>
                                        ) : (
                                            <LinkComponent href={row.redirect_to_type == 'OTHER' ? row.redirect_url : row.link_url}>
                                                <LazyLoadImage effect="" className="img-fluid" src={row.image_path} alt="sedarglobal" width="auto" height="auto" />
                                                <p> {row.content}</p>
                                            </LinkComponent>
                                        )}
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </section>
                : ""}
        </>
    )
}
const mapStateToProps = (state) => ({ MenusItems: state.MenusItemReduser });


const mapDispatchToProps = (dispatch) => {
    return {
        menuitemlist: (action_type, data_info) => { dispatch({ type: action_type, payload: data_info }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTopCategory);