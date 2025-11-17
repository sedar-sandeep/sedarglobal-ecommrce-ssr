import React from 'react';
import LinkComponent from '@components/Link';
import { Container, Row, Col, Image } from 'react-bootstrap';
import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Virtual, Navigation, Pagination } from "swiper";
import { LazyLoadImage } from 'react-lazy-load-image-component';

SwiperCore.use([Virtual, Navigation, Pagination]);





const WhySedar = (props) => {

  if (props.CHILD == undefined) {

    return false;
  }
  return (
    <>
      <div className="WhySedar destop_view">
        <Container className="max-content">
          <Row>
            <Col>
              <h3 className="offer-title border-start border-2 border-warning ps-3 ps-lg-4">{props.title}</h3>
            </Col>
            <Col sm={12} className="WhySedar-heading">

              {props.description ? parse(props.description) : ''}


            </Col>

            {props.CHILD.map((data, index) => {
              return (
                <Container className="whysedarCollection" key={index}>
                  <Row className="Whysedar_Collection">
                    <Col sm={6} className="WhysedarCollection-text">
                      <LinkComponent href={data.link_url ? data.link_url : '#'}>
                        <picture>
                          <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                          <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                          <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                          <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                          <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                          <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="imsg" width="auto" height="auto" />
                        </picture>
                      </LinkComponent>
                    </Col>
                    <Col sm={6} className="Whysedar-text-S">
                      <h2 className="Whysedar-title ">{data.title}</h2>
                      <div className="desc">
                        {data.description ? parse(data.description) : ''}
                      </div>
                    </Col>
                  </Row>
                </Container>
              )
            })
            }



          </Row>
        </Container>

      </div>

      <section className="WhySedar   mobile_view max1920">
        <Row className="mobile_heading">
          <Col>
            <h2 className="offer-title border-start border-2 border-warning ps-3 ps-lg-4">{props.title}</h2>
          </Col>
          <Col sm={12} className="WhySedar-heading">

            {props.description ? parse(props.description) : ''}


          </Col>
        </Row>
        <div className="swiperslider-about p-5">

          <Swiper
            spaceBetween={100}
            slidesPerView={1}
            pagination={{ clickable: true }}
            observer={true}
            observeParents={true}
          >

            {props.CHILD.map((data, index) => {
              return (

                <SwiperSlide key={index}>
                  <LinkComponent href={data.link_url ? data.link_url : '#'}>
                    <picture>
                      <source media="(max-width: 575.98px)" srcSet={data.image_path_portrait} />
                      <source media="(min-width: 576px) and (max-width: 767.98px)" srcSet={data.image_path_landscape} />
                      <source media="(min-width: 768px) and (max-width: 991.98px)" srcSet={data.image_path_03} />
                      <source media="(min-width: 992px) and (max-width: 1200px)" srcSet={data.image_path_02} />
                      <source media="(min-width: 1201px) and (max-width: 1400px)" srcSet={data.image_path_01} />
                      <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} className="imsg" width="auto" height="auto" />
                    </picture>
                  </LinkComponent>
                  {/* <LazyLoadImage effect="" src={data.image_path} alt={data.image_alt_seo} title={data.title} /> */}
                  {/* <Image src={`/assets/images/WhySedar/Group 25819.jpg`} /> */}
                  <div className="heading-section">
                    <span>{data.title}</span>
                    <div className="desc">
                      {data.description ? parse(data.description) : ''}
                    </div>
                  </div>

                </SwiperSlide>
              )
            })
            }

          </Swiper>




          {/* <Swiper
      spaceBetween={100}
      slidesPerView={1}
      pagination={{ clickable: true }}
      onSlideChange={(event) => console.log(event)}
      onSwiper={(swiper) => //console.log(swiper)
        
      }
    >
      <SwiperSlide>

             <Image src={`/assets/images/WhySedar/Group 25819@2x.png`} />
              
             <div  className="heading-section">
            <span>Quality</span>
            
           <p>
              There’s nothing more exciting to us than working with go-getters to turn their vision into something tangible, putting it out into the world and watching others experience it.There’s nothing more exciting to us than working with go-getters</p>


              </div>
              

      </SwiperSlide>
      <SwiperSlide>

                    <Image src={`/assets/images/WhySedar/Group 25820@2x.png`} />
                    
                    <div  className="heading-section">
                    <span>Trendsetter</span>

                    <p>
                    There’s nothing more exciting to us than working with go-getters to turn their vision into something tangible, putting it out into the world and watching others experience it.There’s nothing more exciting to us than working with go-getters</p>


                    </div>
                    

                    </SwiperSlide>
                    <SwiperSlide>

                    <Image src={`/assets/images/WhySedar/Group 25821@2x.png`} />
                    
                    <div  className="heading-section">
                    <span>Professionalism</span>

                    <p>
                    There’s nothing more exciting to us than working with go-getters to turn their vision into something tangible, putting it out into the world and watching others experience it.There’s nothing more exciting to us than working with go-getters</p>


                    </div>
                    

                    </SwiperSlide>
                    <SwiperSlide>

                    <Image src={`/assets/images/WhySedar/Group 25828@2x.png`} />
                    
                    <div  className="heading-section">
                    <span>Years of Experience</span>

                    <p>
                    There’s nothing more exciting to us than working with go-getters to turn their vision into something tangible, putting it out into the world and watching others experience it.There’s nothing more exciting to us than working with go-getters</p>


                    </div>
                    

                    </SwiperSlide>
                    <SwiperSlide>

                    <Image src={`/assets/images/WhySedar/Group 25829@2x.png`} />
                    
                    <div  className="heading-section">
                    <span>Trendsetter</span>

                    <p>
                    There’s nothing more exciting to us than working with go-getters to turn their vision into something tangible, putting it out into the world and watching others experience it.There’s nothing more exciting to us than working with go-getters</p>


                    </div>
                    

                    </SwiperSlide>
      
    </Swiper> */}

        </div>
      </section>
    </>
  );
}


WhySedar.propTypes = {};

WhySedar.defaultProps = {};

export default WhySedar;
