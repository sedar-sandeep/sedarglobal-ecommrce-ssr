import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
// import LocationPicker from 'react-location-picker';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
// import { t_lang } from '../../services/i18n';


export default function GeoLocation(props) {
  const { t } = useTranslation("common");
  const schema = yup.object().shape({
    geo_location: yup.string().required(t('Thisfieldisrequired')),
  })
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  // const [place, setPlace] = useState('')
  const [cord, setCord] = useState({
    lat: 25.308488,
    lng: 55.392905
  })
  const ReactLocation = dynamic(() => import('react-location-picker'), {
    ssr: false,
  });
  // const [update, setUpdate] = useState(0)
  // function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  //   var R = 6371; // Radius of the earth in km
  //   var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  //   var dLon = deg2rad(lon2 - lon1);
  //   var a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
  //     Math.sin(dLon / 2) * Math.sin(dLon / 2)
  //     ;
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   var d = R * c; // Distance in km
  //   if (d < 1) {
  //     //console.log(d)
  //   }
  //   else if (d < 5) {
  //     //console.log(d)
  //   }
  //   else if (d > 5) {
  //     //console.log(d)
  //   }
  // }

  // function deg2rad(deg) {
  //   return deg * (Math.PI / 180)
  // }
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value)
    const latLng = await getLatLng(results[0])
    // //console.log(latLng)
    setCord(latLng)
    // setPlace(value)
    // getDistanceFromLatLonInKm(45.4, -75.69, cord.lat, cord.lng)
    // setUpdate(prev => prev + 1)
  }
  const [state, setState] = useState(
    {
      address: "895V+H4G - Industrial Area - Industrial Area 2 - Sharjah - United Arab Emirat",
    });
  function handleLocationChange(e) {

    // Set new location 
    const { address } = e
    setState({ address });
    //  setCord({ lat: e.position.lat, lng: e.position.lng })
    // //console.log(e, "walla");

  }
  // //console.log(cord, "walla", state);
  return (
    <div >
      {/* {JSON.stringify(state)} */}


      <Form.Group className="my-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className='fs-6'>{t("Enteralocation")}</Form.Label>

        <PlacesAutocomplete onSelect={handleSelect} value={state.address} onChange={e => setState({ address: e })}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              {/* {//console.log(getInputProps)} */}
              {/* <p>Latitude: {cord.lat}</p>
            <p>Long: {cord.lng}</p> */}
              <input className='form-control mb-4' name="geo_location"
                // ref={props.register({ required: true })}  
                {...register('geo_location', { required: true })}
                {...getInputProps({ placeholder: state.address })} />

              <div>
                {loading && <div>loading</div>}

                {suggestions.map(suggestion => {
                  //  //console.log(suggestion)
                  const style = {
                    backgroundColor: suggestion.active ? '#fafafa' : '#fff'
                  }
                  return <div key={`index-${suggestion}`} {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </Form.Group>
      {props.errors && props.errors.geo_location && <p className="text-danger fs-6 fw-lighter form-input-error mb-3">{t('Thisfieldisrequired')}</p>}
      <ReactLocation
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '400px' }} />}
        defaultPosition={cord}
        onChange={(e) => handleLocationChange(e)}
      />

    </div>
  )

}