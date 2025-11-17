import { ThemeProvider } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { langName } from '@utils/i18n';

const BootstrapThemeProvider = ({ children }) => {
    const langCode = langName === 'ar';

    return (
        <ThemeProvider
            breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
            minBreakpoint="xxs"
            dir={langCode ? "rtl" : "ltr"}>
            {children}
        </ThemeProvider>
    )
}

BootstrapThemeProvider.propTypes = {
    children: PropTypes.node,
};
export default BootstrapThemeProvider