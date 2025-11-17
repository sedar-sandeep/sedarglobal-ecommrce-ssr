import { ImportDynamicComponent } from '@components/importDynamicComponent';
import React from 'react';
import Footer from 'src/Component/Footer/Footer';
import Header from 'src/Component/Header/Header';


function Layout(props) {
    return (
        <div>
            <Header props={props.headerData} />
            <div>
                {
                    props?.page && props.page?.map((data, index) => (
                        <React.Fragment key={index}>
                            {data?.data?.subreddit ?
                                (<ImportDynamicComponent url={data?.data?.subreddit}  {...data?.data} />)
                                :
                                (<ImportDynamicComponent url={data?.PARENT?.component_url}  {...data?.PARENT} />)
                            }

                        </React.Fragment>
                    ))
                }
            </div>
            <Footer props={props.footerData} />
        </div>
    )
}

export default Layout

