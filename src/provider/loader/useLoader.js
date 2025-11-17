import * as React from 'react'
import { LoaderContext } from './loaderContext'

export const useLoader = () => {
    const loader = React.useContext(LoaderContext);
    return loader;
}