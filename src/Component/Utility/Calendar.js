//Admitad=>ES005
import React, { useEffect, useState } from 'react'

import DatePicker, { registerLocale } from "react-datepicker";
import ar from "date-fns/locale/ar"; // the locale you want
import { langName, cn_iso } from '@utils/i18n';

export default function Calendar(props) {
    const { selectedCountry } = props;

    const currentDate = new Date();
    let countryHolidayUAE = selectedCountry == 'AE' ? 5 : 0;
    // const countryHoliday = 0;
    // const countryHolidayUAE = 5;

    /* const countryHoliday = cn_iso == 'AE' ? 0 : 5;
     const countryHolidayUAE = cn_iso == 'AE' ? 5 : 0;*/



    /* if ([7, 8, 9, 10, 11, 12, 13].indexOf(currentDate.getDate()) >= 0 && [3].indexOf(currentDate.getMonth()) >= 0) {
         if (selectedCountry == 'AE') {
             skipDay = 15 - currentDate.getDate();
         } else {
             skipDay = 14 - currentDate.getDate();
         }
 
     }*/


    let skipDay = 2;
    let countryHoliday = 0;
    useEffect(() => {

        if (langName == 'ar') {
            registerLocale("ar", ar);
        }
        props.setStartDate(addDays(currentDate, 0));

    }, []);

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== countryHoliday;
    };

    if (currentDate.getHours() >= 18 && getWeekdayNameSaturday(currentDate) == 'Saturday' && selectedCountry == 'AE') {
        skipDay = 3;
        countryHoliday = 3;
    } else {
        skipDay = currentDate.getDay() == countryHolidayUAE ? 3 : 2;
        countryHoliday = selectedCountry == 'AE' ? 0 : 5;
    }




    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }


    function getWeekdayNameSaturday() {
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        const dayIndex = today.getDay();
        return dayNames[dayIndex];
    }
    if ([5, 6, 7, 8, 9].indexOf(currentDate.getDate()) >= 0 && [5].indexOf(currentDate.getMonth()) >= 0) {

        skipDay = 10 - currentDate.getDate();

    }


    //console.log(skipDay, 'skipDay', currentDate.getMonth(), currentDate.getDate());
    return (
        <>
            <DatePicker
                dateFormat="dd-MMM-y"
                selected={props.startDate}
                onChange={(e) => props.setStartDate(e)}
                className="form-control pt-4 mt-1 bg-transparent"
                name="measurement_dt"
                excludeDates={[new Date("2025-06-5"), new Date("2025-06-6"), new Date("2025-06-07"), new Date("2025-06-08"), new Date("2025-06-09")]}
                required
                minDate={currentDate.setDate(currentDate.getDate() + Number(skipDay))}
                withDate
                filterDate={isWeekday}
                onChangeRaw={e => e.preventDefault()}
                locale={langName}
                style={{ width: '100%' }}
            />
        </>
    )
}
