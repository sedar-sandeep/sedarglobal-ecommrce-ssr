import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Accordion, Card, AccordionContext, useAccordionButton } from 'react-bootstrap';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import parse from 'html-react-parser';
// import './HomePageOurPresence.scss';
import { isMobile } from "react-device-detect";
import { useTranslation } from 'next-i18next';
import axiosInstance from '@utils/axios';
import { cn_iso, countryName, detect_country, langName, userId, visitorId } from '@utils/i18n';



const styles = [
  {
    elementType: "geometry",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f5f5f5" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#dadada" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [{ color: "#e5e5e5" }],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [{ color: "#eeeeee" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#c9c9c9" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
];



function CustomToggle({ children, eventKey, callback }) {
  const currentEventKey = React.useContext(AccordionContext);
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );
  const isCurrentEventKey = currentEventKey.activeEventKey == eventKey;
  return (
    <div onClick={decoratedOnClick} className="faq-question d-flex">
      <div className="question-text pe-3">{children} </div>  <div className="iconcollapse"><em className="border_arrowdown"></em> </div>
    </div>

  );
}

const HomePageOurPresence = (props) => {
  const { t } = useTranslation('common')
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY
  });

  const [map, setMap] = useState(null);
  const [positions, setPosition] = useState([]);
  const [showroom, setShowroom] = useState([]);
  const [popupInfo, setPopupInfo] = useState([]);
  const [mapMarker, setMapMarker] = useState({});
  const [showingInfoWindow, setInfoWindow] = useState(false);
  const [infoPosition, setInfoPosition] = useState(false);
  const [showroomDetail, setshowroomDetail] = useState({});
  const [showroomView, setshowroomView] = useState({});
  const [center, setcenter] = useState({});
  const [zoom, setzoom] = useState({});
  const [activeColor, setactiveColor] = useState('DUBAI');
  // const { isMOBILE } = useDevice();


  const options = { closeBoxURL: '', enableEventPropagation: true };
  const getData = async () => {
    const siteId = process.env.NEXT_PUBLIC_SITE_ID

    await axiosInstance.get(`showroom/fetch?lang=${langName}&site=${process.env.NEXT_PUBLIC_SITE_ID}&country=${countryName}&visitorId=${visitorId}&userId=${userId}&currency=USD&ccy_decimal=2&cn_iso=${cn_iso}&detect_country=${detect_country}`).then(response => {

      setShowroom(response.data.result);
      setshowroomDetail(response.data.position);
      var position = [];
      Object.entries(response.data.position).forEach(([key, value]) => {
        position.push({ lat: parseFloat(value.SSA_LATITUDE), lng: parseFloat(value.SSA_LONGITUDE) });
      });
      setPosition(position);
      setcenter(position[0]);
      setzoom(9);
    }).catch(e => {
      //	setLoading_btn(false);
      console.log(e);
      //setApiError(e.message);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  //const center = positions[0];

  const onLoad = (mapMarker) => {
    setMapMarker(mapMarker);
  };

  const onMarkerClick = (data, key) => {
    setshowroomView(showroomDetail[key]);
    setInfoPosition(data)
    setInfoWindow(true);
  };

  const onInfoWindowClose = () => {
    setInfoWindow(false);
  };

  const showCountry = (data, key) => {
    let datakey = data.SSA_CITY_NAME[key][0];
    let centerdata = { lat: parseFloat(datakey.SSA_LATITUDE), lng: parseFloat(datakey.SSA_LONGITUDE) };
    setcenter(centerdata);
    setzoom(11);
    if (isMobile) {
      window.scrollTo({ top: 150, left: 0, behavior: 'smooth' });
    }
  }
  return (
    <section className="HomePageOurPresence">
      <Container>
        <Row>
          <Col sm={12}>
            <div className="heading-section">
              <span className='border-start border-2 border-end-0 border-warning ps-3 ps-lg-4'>{t("Findlocation")} </span>
              <h1>{t("Weareglobal")} </h1>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="maxwidth map-section">
        <Row>
          <Col className="country" xl={3} lg={4} md={5} sm={12}>
            <div className="country-list">
              <div className="Our-Offices">
                <h2> {t("Our_Stores")} </h2>
              </div>

              <Accordion defaultActiveKey="4" className="country-collapse">
                {showroom && showroom.map((row, key) => (
                  <Card key={key}>
                    <Card.Header className="text-left pe-0">
                      <CustomToggle className="text-left" eventKey={key + 1}>{row.SCN_DESC}</CustomToggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={key + 1}>
                      <Card.Body>
                        <ul className="list-unstyled country-offices-list">
                          {Object.keys(row.SSA_CITY_NAME).map(key => (
                            <li key={key} onClick={() => { showCountry(row, key); setactiveColor(key); }} className={key == activeColor ? 'active' : ''} >{key}</li>
                          ))}
                        </ul>

                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}

              </Accordion>
            </div>
          </Col>
          <Col xl={9} lg={8} md={7} sm={12}>
            {isLoaded ? (
              <GoogleMap id="marker-example" className="mapStyle" center={center} zoom={zoom} options={{ styles }}>

                {positions && positions.map((row, key) => (
                  <Marker
                    icon={{
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: 3,
                    }}
                    position={row}
                    key={key}
                    clickable
                    onClick={() => onMarkerClick(row, key)}
                    onLoad={() => onLoad()}
                  >

                  </Marker>
                ))}

                {showingInfoWindow && (
                  <InfoWindow
                    position={infoPosition}
                    onCloseClick={() => onInfoWindowClose()}
                  >
                    <div>
                      <img src={showroomView.SSA_IMAGE_PATH} alt={showroomView.SSA_CITY_NAME} height={150} width={'100%'}></img>
                      <p>{showroomView.SSA_CITY_NAME}</p>
                      <p>{parse(showroomView.SSA_ADDRESS_DESC)}</p>
                      <p>{showroomView.SSA_PHONE_NO}</p>
                      <a href={showroomView.SSA_GEO_LOCATION} target="_blank" rel="noreferrer">{t("view_on_google_maps")}</a>
                    </div>
                  </InfoWindow>
                )}

              </GoogleMap>
            ) : <></>}
          </Col>
        </Row>
      </Container>


    </section>
  );
}

HomePageOurPresence.propTypes = {};

HomePageOurPresence.defaultProps = {};

export default HomePageOurPresence;
