import React from 'react';
import Image from 'next/legacy/image';


export default function akamaiLoader({ src, width, height, quality }) {
    return `${src}`
   // return `${src}?imwidth=${width}`
    //return `${src}?width=${width}&width=${width}&height=${height}`
}


export const ImageComponent = (props) => {
    const { classprops, src, alt, width, height, title, quality, contains, unoptimized, size, objectfit, style, layout } = props;

    return (
        <React.Fragment>
            <Image
                loader={akamaiLoader}
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA...'
                // placeholder='blur' 
                className={contains ? `${classprops || 'no_class'}` : `contains_img ${classprops || 'no_class'}` || 'no_class'}
                src={src || ''}
                alt={alt || ''}
                width={width || 250}
                height={height || 250}
                layout={layout || 'responsive'}
                // sizes={size || '100vw'}
                // sizes="100vw"
                unoptimized={unoptimized || false}
                //  unoptimized
                quality={quality || 85}
                lazy="true"
            // fill
            />
            {title && <div className="overly-color"></div>}
            {title && <div className="slider-text"> <p> {title} </p> </div>}
        </React.Fragment>

    );
};

export const IconComponent = (props) => {
    const { classprops, src, alt, width, height, content, spanClass, quality, contains, unoptimized, marginLeftRight, content_align, padding } = props;
    let marginLR = marginLeftRight ? `auto 2px` : 'auto';
    let paddingLR = padding ? padding : '';
    return (
        <div style={{ display: 'flex', margin: marginLR, justifyContent: props?.justifyContent ? props?.justifyContent : 'center', padding: paddingLR }}>
            {content && content_align == 'left' && <span className={spanClass ? spanClass : 'img_with_text'}>{content}</span>}
            <Image
                loader={akamaiLoader}
                blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA...'
                // placeholder='blur' 
                className={contains ? `${classprops}` : `contains_img ${classprops}` || ''}
                src={src || ''}
                alt={alt || ''}
                width={width || 250}
                height={height || 250}
                // priority
                // fill
                quality={quality || 85}
                unoptimized={unoptimized || false}
                // unoptimized
                lazy="true"
            />
            {content && content_align != 'left' && <span className={spanClass ? spanClass : 'img_with_text'}>{content}</span>}
        </div>

    );
};


