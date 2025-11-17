import * as React from 'react';

export const LoaderGif = () => {

    const loaderItem = {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        textAlign: "center"
    };

    return (
        <>
            <div className="loaderItem" style={loaderItem}>
                <img className="img-fluid" src={`/assets/images/Customization/dancingloader.gif`} alt="sedar images" width="auto" height="auto" />
            </div>
        </>
    );

};