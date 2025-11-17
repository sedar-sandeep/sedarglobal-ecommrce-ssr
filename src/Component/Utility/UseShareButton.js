
import React, { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Collapse } from 'react-bootstrap';
import { RiFacebookCircleLine, RiTwitterLine } from 'react-icons/ri';
import { FaWhatsapp } from 'react-icons/fa';
import { useRouter } from 'next/router'

export default function UseShareButton(props) {
  const shareProduct = {
    position: "absolute",
    bottom: "7%",
    right: "4%",
    zIndex: "1",

  };
  const shareProductLink = {
    background: "#fff",
    // display: "block",
    borderRadius: "50%",
    padding: props.padding ? props.padding : "8px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItem: "center"
  };
  const [open, setOpen] = useState(false);
  const { locale, asPath } = useRouter()

  const hrefURL = process.env.NEXT_PUBLIC_LOCAL_API_URL + locale + asPath;

  return (
    <div className="UseShareButton" style={{ ...shareProduct, position: props.position != undefined ? props.position : "absolute" }}>
      <>
        {props.clickicon != null ?
          <LazyLoadImage role="button" onClick={() => setOpen(!open)} effect="" className="img-fluid" src={`/assets/images/Customization/${props.clickicon}`} alt="sedarglobal" width="auto" height="auto" />
          :
          <LazyLoadImage role="button" onClick={() => setOpen(!open)} effect="" className="img-fluid" src={`/assets/images/ProductdetailPage/Component 15 – 4.png`} alt="sedarglobal" width="auto" height="auto" />
        }
        <div style={{ position: 'absolute', bottom: '100%', right: 0 }}>
          <Collapse in={open} dimension="width">
            <div id="Share-collapse-text">
              <div className="p-0 mb-3">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${hrefURL}`} target="_blank" style={{ ...shareProductLink, color: '#000' }} rel="noreferrer">
                  <RiFacebookCircleLine size={22} style={{ background: "#fff", borderRadius: "50%" }} />
                </a>
              </div>

              {/* <div className="p-0 mb-3" >
                <a style={{ ...shareProductLink, color: '#000' }} href={`https://web.whatsapp.com/send?text=Sedar Global - Fulfill your home decor ideas with Sedar Global's collection of curtains, roller blinds, room wallpapers, and folding doors have been crafted for each home  ${hrefURL}`} target="_blank" rel="noreferrer">
                  <FaWhatsapp size={22} style={{ background: "#fff", borderRadius: "50%" }} />
                </a>
              </div> */}
              <div className="p-0 mb-3">
                <a style={{ ...shareProductLink, color: '#000' }} href={`https://twitter.com/intent/tweet?text=Sedar Global - Fulfill your home decor ideas with Sedar Global's collection of curtains, roller blinds, room wallpapers, and folding doors have been crafted for each home  ${hrefURL}`} target="_blank" rel="noreferrer">
                  <RiTwitterLine size={22} style={{ background: "#fff", borderRadius: "50%" }} />
                </a>
              </div>
            </div>
          </Collapse>
        </div>
      </>
    </div>
  )
}