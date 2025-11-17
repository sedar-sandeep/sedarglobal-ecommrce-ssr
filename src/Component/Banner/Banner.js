import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import LinkComponent from '@components/Link';
import { isMobile, isTablet } from "react-device-detect";
import { Navigation, Autoplay } from "swiper";
import 'swiper/css'
import { ImageComponent } from '@components/image';

// SwiperCore.use([Virtual, Navigation, Pagination]);

const Banner = (props) => {

  const BannerSlideConfig = {
    loop: true,
    observer: true,
    observeParents: true,

    slidesPerView: 1,
    autoHeight: true, //enable auto height    
    // pagination: {
    //   clickable: true
    // },
    navigation: {
      nextEl: '.Banner .swiper-next',
      prevEl: '.Banner .swiper-prev'
    },
    autoplay: {
      delay: props?.autoplay && props?.autoplay == 'Y' ? props.timer && props.timer != null ? `${props.timer}000` : 3000 : 3000000000000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    //rewind: true
  }


  const BannerSlideContent = (props) => {
    const { ItemContentLink, SlideLink, AltSeo } = props;
    // console.log(ItemContentLink?.split('.')[3], 'ItemContentLink...');
    return (
      <>
        {ItemContentLink && ItemContentLink?.split('.') && ItemContentLink?.split('.')[3] && ['mp4'].indexOf(ItemContentLink?.split('.')[3]) >= 0 ?
          <>
            {/* <video
              className='react-player video'
              src={ItemContentLink}
              height="100%"
              width="100%"
              controls
              playing={true}
              muted={true}
              loop={true}
              playsInline={true}
              poster={ItemContentLink}
              data-setup='{}'
            >
              <source src={ItemContentLink} type="video/mp4"></source>
              <source src={ItemContentLink} type="video/webm"></source>
              <source src={ItemContentLink} type="video/ogg"></source>
            </video> */}

            <video width="100%" height="100%" src={ItemContentLink} muted={true} playsInline={true} controls>
              <source src={ItemContentLink} type="video/mp4"></source>
              <source src={ItemContentLink} type="video/ogg"></source>
              Your browser does not support the video tag.
            </video>


            {/* <video
              className='react-player video'
              height="100%"
              width="100%"
              controls
              preload="auto"
              playing={true}
              muted={true}
              loop={true}
              playsInline={true}
              poster={ItemContentLink}
              data-setup='{}'>
              <source src={ItemContentLink} type="video/mp4"></source>
              <source src={ItemContentLink} type="video/webm"></source>
              <source src={ItemContentLink} type="video/ogg"></source>
            </video> */}
          </>
          :
          <LinkComponent target={false} title={SlideLink && SlideLink} href={SlideLink && SlideLink} style={SlideLink && SlideLink == null ? { pointerEvents: "none" } : {}}  >
            <ImageComponent
              classprops="imsg w-100"
              src={ItemContentLink}
              alt={AltSeo}
              width={1920}
              height={isMobile ? 920 : 510}
              contains={true}
              quality={70}
            />
          </LinkComponent>
        }

      </>
    )
  }


  return (
    <section className="Banner max1920">
      {props.CHILD &&
        <Swiper modules={[Navigation, Autoplay]} {...BannerSlideConfig}

          onSwiper={(swiper) => {
            // setTimeout(() => {
            //   if (!swiper.navigation) return;
            //   swiper.navigation.init()
            //   swiper.navigation.update()
            //   if (props.autoplay && props.autoplay == 'N') {
            //     swiper.autoplay.stop()
            //   }
            // }, 800)
            swiper?.autoplay?.stop()
          }}
          autoplay={{
            delay: props?.autoplay && props?.autoplay == 'Y' ? props.timer && props.timer != null ? `${props.timer}000` : 3000 : 3000000000000,
            disableOnInteraction: true,
            pauseOnMouseEnter: false,
          }}
        >

          {props.CHILD && props.CHILD.map((slideContent, index) => {

            return (
              isMobile && isMobile ? <SwiperSlide key={'a' + index} className="videoslides">
                <BannerSlideContent
                  AltSeo={slideContent.image_alt_seo}
                  SlideLink={slideContent.link_url && slideContent.link_url}
                  ItemContentLink={slideContent.image_path_portrait && slideContent.image_path_portrait}
                />
              </SwiperSlide> :

                isTablet && isTablet ? <SwiperSlide key={'b' + index} className="videoslide">
                  <BannerSlideContent
                    AltSeo={slideContent.image_alt_seo}
                    SlideLink={slideContent.link_url && slideContent.link_url}
                    ItemContentLink={slideContent.image_path_03 && slideContent.image_path_03}
                  />
                </SwiperSlide> :
                  <SwiperSlide key={'c' + index} className="videoslide">
                    <BannerSlideContent
                      AltSeo={slideContent.image_alt_seo}
                      SlideLink={slideContent.link_url && slideContent.link_url}
                      ItemContentLink={slideContent.image_path && slideContent.image_path}
                    />
                  </SwiperSlide>
            )
          })
          }

          <div className="sliderNavigation d-none d-lg-flex" >
            <div className="swiper-prev pe-3" style={{ position: 'absolute', top: '12px', left: '-35px' }}>
              {/* <LazyLoadImage effect="" src={`/assets/icon/Group 91.png`} alt="1" className="nexticon" width="auto" height="auto" /> */}
              <ImageComponent
                classprops="nexticon"
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}assets/icon/Group 91.png`}
                width={19}
                height={10}
                quality={70}
              />
            </div>
            <div className="swiper-next ps-3">
              {/* <LazyLoadImage effect="" src={`/assets/images/homepage/Component28.png`} alt="1" className="nexticon" width="auto" height="auto" /> */}

              <ImageComponent
                classprops="nexticon"
                src={`/assets/images/homepage/Component28.png`}
                width={55}
                height={55}
                quality={70}
              />
            </div>
          </div>

        </Swiper>
      }

    </section>

  );

}




export default Banner;
