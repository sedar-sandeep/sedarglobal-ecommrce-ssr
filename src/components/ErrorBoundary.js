import React from 'react';
import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { defaultLocale } from '@utils/i18n';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import * as Sentry from "@sentry/nextjs";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        // Define a state variable to track whether is an error or not
        this.state = { hasError: false };
      //  this.state.headerRes = axiosInstance.get(`header/first?site=${site_id}&lang=${langName}&country=${countryName}&visitorId=${visitorId}&userId=${userId}&content=header&slug_url=header&cn_iso=${cn_iso}&detect_country=${detect_country}&page_name=homepage`);
      //  this.state.footerRes = axiosInstance.get(`footer/first?site=${site_id}&lang=${langName}&country=${countryName}&content=footer&slug_url=footer&cn_iso=${cn_iso}`);

    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI

        console.log(error, 'ErrroPage ErrorBoundary111');
        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        // You can use your own error logging service here
        // console.log(error, 'ErrroPage ErrorBoundary2222');
        // console.log(errorInfo, 'ErrroPage ErrorBoundary3333');
        Sentry.captureException(error, { extra: errorInfo });
        let data = {
            //  error_type: statusCode ? 'Server Side Error' : 'Client Side error',
            url: typeof window !== "undefined" ? window.location.href : 'Window not load',
            error_message: error,
            errorInfo: errorInfo,

        }
    //     if (process.env.NEXT_ENV == 'production') {
    //         axios.post(`${process.env.NEXT_PUBLIC_API_URL}emailFun`, data, {
    //             headers: {
    //                 Accept: "application/json",
    //                 "Content-Type": "application/json;charset=UTF-8",
    //             },
    //         }).then(({ data }) => {
    //             console.log(data, 'ErrroPage');
    //             //  router.push('/');
    //         });
    //    }
    }

    render() {

      //  console.log(  this.state.headerRes,'ErrroPage222');
        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    {/* {this.state.headerRes && this.state.headerRes.data ? <Header props={this.state.headerRes.data} /> : ''} */}
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
                    {/* {this.state.footerRes && this.state.footerRes.data ? <Footer props={this.state.footerRes} /> : ''} */}

                </div >
            )
        }

        // Return children components in case of no error

        return this.props.children
    }
}

export default ErrorBoundary