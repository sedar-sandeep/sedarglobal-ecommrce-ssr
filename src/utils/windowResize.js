
import { useLayoutEffect, useState } from 'react';

export const WindowResize = (type = '') => {
    const [windowSize, setWindowSize] = useState([0, 0]);
    
    const updateWindowSize = () => {
        let width = window.innerWidth;
        let height = window.innerHeight;
        if (type == 'landingPage') {
            height = window.innerWidth < 1200 ? window.innerHeight - 500 : window.innerHeight - 121;
        }
        setWindowSize([width, height])
    }
    useLayoutEffect(() => {
        window.addEventListener('resize', updateWindowSize);
        updateWindowSize();
        return () => window.removeEventListener('resize', updateWindowSize);
    }, [])
    return [windowSize[0], windowSize[1]]
}