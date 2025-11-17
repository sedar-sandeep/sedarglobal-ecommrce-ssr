import { useTranslation } from 'next-i18next';
import React from 'react'

const LocaleTranslation = (locale) => {
    const { t } = useTranslation("common");
    return (
        t(locale)
    )
}

export default LocaleTranslation;