import React, { useState, useEffect } from 'react';
import { DayNamesAR, DayNamesEN, MonthNamesAR, MonthNamesEN } from './Months';
import { Col, Row } from 'react-bootstrap';
import { cn_iso, langName } from '@utils/i18n';
import { useTranslation } from 'next-i18next';

export default function DeliveryDays({ status_days, status }) {
    //  status_days = 4;
    const { t } = useTranslation("common");
    let to = Number(status_days);
    let from = to > 5 ? to - 2 : to - 1;
    //0=>Sunday
    //5=>Friday
    // console.log(status_days, 'status_days', status);

    let from_date = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * from));
    let to_date = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * to));

    const [f_day, setfday] = useState(from);
    const [t_day, setTday] = useState(to);

    const [fDatFun, setFDatFun] = useState(from_date);
    const [tDatFun, setTDatFun] = useState(to_date);



    // let excludeDates = [new Date("2023-06-21"), new Date("2023-06-22"), new Date("2023-06-23")];
    let excludeDates = [];
    let days = t(`${status}`);

    const checkDayFun = (status_days) => {
        let day_st = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * Number(status_days)));
        console.log(day_st.getDay(), status_days, 'status_days11');
        if (cn_iso == 'AE') {
            switch (day_st.getDay()) {
                case 0:
                    from = Number(status_days) - 2;
                    to = Number(status_days) + 1;
                    break;
                case 2:
                    from = Number(status_days) - 1;
                    to = Number(status_days) + 1;
                    break;
                default:
                    from = Number(status_days) - 2;
                    to = Number(status_days);
                    break;
            }
        } else {
            switch (day_st.getDay()) {
                case 0:
                    from = Number(status_days) - 1;
                    to = Number(status_days) + 1;
                    break;
                case 5:
                    from = Number(status_days) - 2;
                    to = Number(status_days) + 1;
                    break;
                default:
                    from = Number(status_days) - 2;
                    to = Number(status_days);
                    break;
            }

        }
        return { from: from, to: to };
    }
    const excludeDatesFun = (excludeDates, from) => {
        let fDate = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * from));
        let f_date = fDate.getDate();
        let differ_day = from > 5 ? 2 : 1
        let next_date = f_date + differ_day;

        for (let i = 0; i < excludeDates.length; i++) {
            var exclude_date = excludeDates[i].getDate();
            console.log(f_date, next_date, exclude_date, from, 'status_days11');
            if (exclude_date == f_date && excludeDates[i].getMonth() == fDate.getMonth()) {
                ++f_date;
                ++from;
            } else if (exclude_date == next_date && excludeDates[i].getMonth() == fDate.getMonth()) {
                f_date = f_date + differ_day;
                from = from + differ_day;
            }
        }

        return from;
    }
    useEffect(() => {
        to = Number(status_days);
        from = to > 5 ? to - 2 : to - 1;

        from_date = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * from));
        to_date = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * to));

        setfday(from);
        setTday(to);

        setFDatFun(from_date);
        setTDatFun(to_date);
    }, [status])
    useEffect(() => {

        if (status == 'ONDEMAND') {
            console.log('status_days', status_days, from, to);
            let t_date = excludeDatesFun(excludeDates, Number(status_days));
            let { from, to } = checkDayFun(t_date);
            setfday(from);
            setTday(to);
            console.log('status_days', status_days, from, to, t_date);

            let from_date11 = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * from));
            let to_date11 = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * to));

            setFDatFun(from_date11);
            setTDatFun(to_date11);
        }

    }, []);

    return (
        <div className="DeliveryDays">
            {status_days > 0 && (
                <Row>
                    <Col sm={12}>
                        <h6 className={status} style={{ marginTop: '0px' }}>
                            <small>
                                {`${days}`}
                            </small>
                            <span>&nbsp;   {t('DeliveryDays', { from: f_day, to: t_day })}</span>
                            {status == 'ONDEMAND' ?
                                <>
                                    {langName == 'ar' ? <span>&nbsp;({DayNamesAR[fDatFun.getDay()]} {fDatFun.getDate()} {MonthNamesAR[fDatFun.getMonth()]} - {DayNamesAR[tDatFun.getDay()]} {tDatFun.getDate()} {MonthNamesAR[tDatFun.getMonth()]})</span>
                                        :
                                        <span>&nbsp;({DayNamesEN[fDatFun.getDay()]} {fDatFun.getDate()} {MonthNamesEN[fDatFun.getMonth()]} - {DayNamesEN[tDatFun.getDay()]} {tDatFun.getDate()} {MonthNamesEN[tDatFun.getMonth()]})</span>
                                    }
                                </> : ''}
                        </h6>
                    </Col>
                </Row>
            )}
        </div>
    );
}