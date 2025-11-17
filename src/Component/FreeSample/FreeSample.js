import React, { useState, useRef, useEffect } from "react";
// import './FreeSample.scss';
import { Container, Row, Col } from 'react-bootstrap';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Overlay from 'react-bootstrap/Overlay';
import parse from 'html-react-parser';
// import { countryName, langName } from '../../i18n';
import ApiDataService from '../../services/ApiDataService';

// import MaterialList from '../../Component/MaterialList/MaterialList';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'next-i18next';
import MaterialList from "../MaterialList/MaterialList";
import { useRouter } from "node_modules/next/router";

// import { t_lang } from "../../services/i18n";

// const site_id = process.env.REACT_APP_SITE_ID; //100001;
// const lang = langName //i18next.language; //'en';
// const country = countryName;
const API_LOCATION = process.env.NEXT_PUBLIC_API_URL;


const FreeSampleIntro = (props) => {
  return (
    <>
      <Container fluid className="FreeSampleIntro d-none d-sm-block">
        <Row className="intro_content">
          {props.CHILD && props.CHILD.map((row) => {
            return (
              <Col key={`index-${row}`} className="intro_section py-2" sm={6} lg={4}>
                <Row>
                  <Col sm={3} className="intro_section_img d-flex align-items-center">
                    <LazyLoadImage effect="blur" src={row.image_path} className="img-fluid" alt="sedarglobal" style={{ maxWidth: "60px" }} width="auto" height="auto" />
                  </Col>
                  <Col sm={8}>
                    <div className="intro_section_text">
                      {row.description ? parse(row.description) : ''}


                    </div>
                  </Col>
                  <Col sm="1">
                    <p className="border-divider"></p>
                  </Col>
                </Row>
              </Col>
            );
          })
          }

        </Row>
      </Container>
    </>
  );
}

const ChooseProduct = (props) => {
  const { t } = useTranslation("common");
  
  return (
    <Col xs={6} sm={6} md={4} xl={3} onClick={() => {
      props.set_modal(props.product),
        props.set_material({
          'slug_url': props.product[0].link_url,
          'category_slug': props.link_url,
          'type': 'free_sample',
          'page_number': 0,
          'product_name': props.product[0].desc
        });
    }}>
      <div className="choose_product_desc" >
        <div className="choose_product_img ChooseProduct">
          <LazyLoadImage effect="blur" className="img-fluid" src={props.image_path} alt="sedarglobal" width="auto" height="auto" style={{height: '180px', width: '100%', objectFit: 'cover'}} />
          <div className="middle">
            <div className="text">
              {/* {props.more ? parse(props.more) : ''} */}
              <button onClick={(event) => props.handleScroll(event, 'SelectModal', props)} className="btn btn-warning">{t('Explore')}</button>
            </div>
          </div>
        </div>
        <div className="choose_product_text">
          <h5>{props.desc}</h5>
        </div>
      </div>
    </Col>
  )
}

const ChooseModal = (props) => {
  return (
    <Col xs={6} sm={6} md={4} xl={3}  onClick={() => {
      props.set_material({
        'slug_url': props.link_url,
        'type': 'free_sample',
        'category_slug': props.category_slug,
        'page_number': 0,
        'product_name': props.desc,
      })
    }}>
      <div onClick={(event) => props.handleScroll(event, 'SelectProduct', props)} className="choose_product_desc">
        <div className="choose_product_img">
          <LazyLoadImage effect="blur" className="img-fluid" src={props.image_path} alt="sedarglobal" width="auto" height="auto" />
          <div className="middle">
            <div className="text">
              {/* <LazyLoadImage effect="" className="img-fluid" src={`/assets/images/freeSample/Group23632.webp`} alt="sedarglobal" /> */}
              <picture>
                <source srcSet={`/assets/images/freeSample/Group23632.webp`} type="image/webp" />
                <source srcSet={`/assets/images/freeSample/Group23632.png`} type="image/png" />
                <img src={`/assets/images/freeSample/Group23632.png`} alt="Alt text" width="auto" height="auto" />
              </picture>
            </div>
          </div>
        </div>
        <div className="choose_product_text">
          <h5>{props.desc}</h5>
        </div>
      </div>
    </Col>
  )
}



const FreeSample = (props) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const childRef = useRef();
  const [category, set_category] = useState(false);
  const [modal, set_modal] = useState(false);
  const [material, set_material] = useState(false);
  const [category_slug, set_category_slug] = useState(false);
  const [showside, setShowside] = useState(false);

  useEffect(() => {
    if (category == false) {
      ApiDataService.getAll(API_LOCATION + `freesample/category`).then(response => {
        set_category(response.data.result);
        set_modal(response.data.result[0]['product']);
        set_category_slug(response.data.result[0].link_url)
        set_material({
          'slug_url': response.data.result[0]['product'][0].link_url,
          'category_slug': response.data.result[0].link_url,
          'type': 'free_sample',
          'page_number': 0,
          'product_name': response.data.result[0]['product'][0].desc
        });
      }).catch((error) => {
        console.log(error);
      });

    }

  }, [category]);

  const ref = useRef([]);
  //const ref1 = useRef(null);

  const handleScroll = (e, id, props) => {
    console.log(e, 'eventssss');
    // first prevent the default behavior
    e.preventDefault()
    // // get the href and remove everything before the hash (#)
    // const href = e.currentTarget.targetId
    // const targetId = href.replace(/.*\#/, "")
    // // get the element by id and use scrollIntoView
    

    if (id == 'SelectProduct') {
      router.push({
        pathname: router.pathname,
        query: { slug_url: props.link_url, category_slug: props.category_slug },
        shallow: true,
      }, undefined, { scroll: false });
    } else {

      router.push({
        pathname: router.pathname,
        query: { category_slug: props.link_url, slug_url: props.product[0].link_url },
        shallow: true,
      }, undefined, { scroll: false })
    }

    const elem = document.getElementById(id);
    // window.scrollBy(0, 400);
    elem?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
    
  }


  return (
    <section className="FreeSample max1920">
      <FreeSampleIntro {...props} />
      <div className="choose_product" >
        <div className="choose_product_heading  px-3 pb-3 p-sm-3">
          <hr />
          <h2> <span> {t("STEP1")} </span> {t("CHOOSEAPRODUCT")}  </h2>
          <hr />
        </div>
        <Container fluid>
          <Row>
            {category && category.map((row, index) => {
              return (
                <ChooseProduct key={index} {...row} set_modal={set_modal} set_material={set_material} handleScroll={handleScroll} />
              )
            })}
          </Row>

        </Container>
      </div>
      <div className="choose_product" id="SelectModal" ref={(element) => {
        ref.current[0] = element;
      }}>
        <div className="choose_product_heading p-3" >
          <hr />
          <h2> <span> {t("STEP2")} </span> {t("SELECTMODELOFROLLERSHADES", { itemName: material?.category_slug && material?.category_slug?.toUpperCase() })} </h2>
          <hr />
        </div>
        <Container fluid>
          <Row>
            {modal && modal.map((product, index) => {
              return (
                <ChooseModal key={index} {...product} set_material={set_material} category_slug={category_slug} handleScroll={handleScroll} />
              )
            })}

          </Row>

        </Container>
      </div>

      <div className="choose_product order_sample" id="SelectProduct" ref={(element) => {
        ref.current[1] = element;
      }}>

        <Container fluid>
          <Row>
            {material && (
              <MaterialList {...material} materialList={props?.materialList} filterList={props?.filterRes?.result} setShowside={() => setShowside(false)} />
            )}
          </Row>
        </Container>

      </div>
    </section>
  );
}


export default FreeSample;
