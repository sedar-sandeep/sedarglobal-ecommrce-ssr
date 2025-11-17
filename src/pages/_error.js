import * as Sentry from "@sentry/nextjs";

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import { defaultLocale } from '@utils/i18n';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Error({ statusCode, err, headers, pathname }) {
  const router = useRouter();
  // console.log(statusCode, 'ErrroPage--22',pathname);

  useEffect(() => {
    try {
      // console.log(pathname, 'ErrroPage--2222_A ');
      let data = {
        error_type: statusCode ? 'Server Side Error' : 'Client Side error',
        url: typeof window !== "undefined" ? window.location.href : 'Window not load',
        error_message: err,
        statusCode: statusCode,
        headers: headers ? headers : 'Not found header',
        pathname: pathname ? pathname : 'NO'
      }
      // if (process.env.NEXT_ENV == 'production') {
      //   axios.post(`${process.env.NEXT_PUBLIC_API_URL}emailFun`, data, {
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json;charset=UTF-8",
      //     },
      //   }).then(({ data }) => {
      //     console.log(data);
      //     router.push('/');
      //   });
      // }
      // console.log(pathname, 'ErrroPage--333 ');
      setTimeout(() => {
        // console.log(err, 'ErrroPage--4444 ');
        router.push('/');
      }, 500);
    } catch (e) {
      // console.log(e, 'ErrroPage--4444--A ');
      setTimeout(() => {
        // console.log(err, 'ErrroPage--4444 ');
        router.push('/');
      }, 500);
    }


  }, []);

  return (
    <div>
      <section className="PaymentError">
        <div>
          <Container>
            <Row>
              <Col sm={12} className="my-5 py-5 text-center">
                <div className="my-5 py-5">
                  <LazyLoadImage src={`/assets/images/Error/Group25786.png`} alt="1" className="my-4" width="auto" height="auto" />
                  <h2>Uh-oh, something went wrong here!</h2>
                  <p>Just keep browsing to get back on track</p>
                  <Col sm={10} md={4} lg={3} className="mx-auto">
                    <Link href={'/' + defaultLocale} className="btn btn-Primary bg-sg-primary py-3 py-sm-4 my-4 w-sm-25 w-100 fw-bold">Back To Home Page</Link>
                  </Col>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

      </section >

    </div >
  )
}

Error.getInitialProps = async (contextData) => {
  const { res, err, req, pathname } = contextData;
  await Sentry.captureUnderscoreErrorException(contextData);

 // console.log(err, 'ErrroPage--1',pathname);
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  let headers = req.headers;
  return { statusCode, err, headers, pathname }
}

export default Error