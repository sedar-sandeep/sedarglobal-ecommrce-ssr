import { useTranslation } from 'next-i18next';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { defaultLocale } from '@utils/i18n';

const CartEmpty = () => {
    const { t } = useTranslation("common");

    return (
        <section className="PaymentError">
            <div>
                <Container>
                    <Row>
                        <Col sm={12} className="my-5 py-5 text-center">
                            <div className="my-5 py-5">
                                <LazyLoadImage src={`/assets/images/Error/Group24625.png`} alt="1" className="my-4" width="auto" height="auto" />
                                <h2 className="my-2" >{t("YourCartisEmpty")} </h2>
                                <p className="my-4"><b> {t("YourCartisEmptyAddItemstoyourcart")}</b></p>
                                <Col sm={10} md={4} lg={3} className="mx-auto">
                                    <a href={'/' + defaultLocale} type="button" className="btn btn-Primary bg-sg-primary py-3 py-sm-4 my-4 w-sm-25 w-100 fw-bold">{t("Back")}</a>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </section>
    )
}
export default CartEmpty;