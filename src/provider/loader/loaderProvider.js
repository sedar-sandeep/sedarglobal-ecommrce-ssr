import React from 'react'
import { LoaderGif } from './loader';
import { LoaderContext } from './loaderContext';
import Router from 'next/router';

const LoaderProvider = ({ children }) => {
    const [show, setShow] = React.useState(true)
    const [loading, setLoading] = React.useState(false);

    Router.onRouteChangeStart = () => {
        setLoading(true);
    };

    Router.onRouteChangeComplete = () => {
        setLoading(false);
    };

    Router.onRouteChangeError = () => {
        setLoading(false);
    };

    return (
        <LoaderContext.Provider value={{ setShow }}>
            {show && loading && <LoaderGif />}
            {children}
        </LoaderContext.Provider>
    )

}

export default LoaderProvider