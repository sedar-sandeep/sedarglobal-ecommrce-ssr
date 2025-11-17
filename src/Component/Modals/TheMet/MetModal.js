import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ContactUsModal from '../ContactUsModal';
import ApiDataService from 'src/services/ApiDataService';
import { useDevice } from '../../Utility/useDevice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Grid } from 'swiper';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import { isMobile } from 'react-device-detect';
const MetModal = ({ isOpen, closeModal }) => {
    const { locale } = useRouter();
    const lang = locale.split('-')[1] || 'en';
    const { isMOBILE, isTABLET, isLAPTOP, isDESKTOP } = useDevice();
    const { t } = useTranslation('common');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showLeft, setShowLeft] = useState(false);
    const [selectedLeft, setSelectedLeft] = useState([]);
    const [defautSelectedLeft, setDefaultSelectedLeft] = useState([]);
    const [selectedRight, setSelectedRight] = useState(null);
    const sliderRef = useRef(null);
    const swiperRef = useRef(null);
    const [artDesc, setArtDesc] = useState('');
    const [artCode, setArtCode] = useState('');
    const [productData, setProductData] = useState(null);
    const [gallaryData, setGallaryData] = useState(null);
    const [isOpenShutter, setIsOpenShutter] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [webCurrentIndex, setWebCurrentIndex] = useState(0);
    const [ContactUsModalOpen, setContactUsModalOpen] = useState(false);
    const [selectedDesc, setselectedDesc] = useState(null);
    const [sliderCurrentIndex, setsliderCurrentIndex] = useState(0);
    const [webImagesTotalCount, setWebImagesTotalCount] = useState(0);
    const [artItemCode, setArtItemCode] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [mainImageLoader, setMainImageLoader] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const webImagesPerPage = isMOBILE ? 300 : 15;


    const url = process.env.NEXT_PUBLIC_API_URL;
    useEffect(() => {
        fetchArt(webCurrentIndex);

    }, []);
    const fetchArt = (webCurrentIndex) => {
        setLoading(true);
        try {
            ApiDataService.get(`themet/collection?page=${webCurrentIndex + 1}&limit=${webImagesPerPage}`, '').then(res => {
                if (res.data.result) {
                    setItems(res);
                    setWebImagesTotalCount(res?.data?.count);
                    setArtDesc(res.data.result[0].SII_DESC);
                    setArtCode(res.data.result[0].SII_ITEM_ID);
                    setSelectedRight(res.data.result[0].SII_CODE);
                    setArtItemCode(res.data.result[0].PR_ITEM_CODES);
                    setLoading(false);

                }
            });

        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const slideEvent = (transation = 100) => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: { transation }, behavior: 'smooth' });
        }
    }

    const toggleLeftSection = () => {
        setShowLeft(prev => !prev);
        if (isOpenShutter) {
            setIsOpenShutter(false);
        }
    };
    const handleTouchEnd = (event) => {
        event.preventDefault();
        // Additional handling if needed
    };
    const handleLeftClick = (itemCode, event) => {
        event.preventDefault()
        const itemCodes = itemCode.split(',').map(code => code.trim());

        setSelectedLeft((prevSelected) => {

            const selectedArray = Array.from(new Set(prevSelected.split(',').map(code => code.trim())));
            console.log('itemCode', itemCodes, 'prevSelected', prevSelected, 'selectedArray', selectedArray)
            itemCodes.forEach((code) => {
                if (selectedArray.includes(code)) {

                    const index = selectedArray.indexOf(code);
                    if (index > -1) {
                        selectedArray.splice(index, 1);

                    }
                } else {
                    selectedArray.push(code);
                }
            });
            if (selectedArray.length === 0) {
                return defautSelectedLeft;
            }
            return selectedArray.join(',');
        });
    };

    const handleRightClick = (sectionId, artCode, artDesc, mainImage) => {
        console.log(mainImage);
        setSelectedRight(sectionId);
        setArtCode(artCode);
        setArtDesc(artDesc)
        //setMainImage(mainImage);
    };
    const showGallaryImage = (imagePath) => {
        setMainImageLoader(true);
        setMainImage(imagePath);
        setMainImageLoader(false);
    };
    const fetchProduct = async () => {

        if (selectedRight) {
            try {
                setMainImageLoader(true);

                ApiDataService.get(`themet/product/${selectedRight}?lang=${lang}`, '').then(res => {
                    if (res.data.result) {
                        console.log(res.data.result, 'sdfsdkfsjkdfnsjkdnfsjkdnf');
                        setProductData(res.data.result);
                        setSelectedLeft(res.data.result[0].SC_PR_ITEM_CODE);
                        setDefaultSelectedLeft(res.data.result[0].SC_PR_ITEM_CODE);
                        setLoading(false);
                    }
                });

            } catch (error) {
                console.error('Error fetching section data:', error);
            }
        }
    };
    const fetchData = async () => {
        console.log(selectedLeft, selectedRight, 'check selected left and selected right');
        if (selectedLeft && selectedRight) {
            try {
                setMainImageLoader(true);

                await ApiDataService.get(`themet/gallary/${selectedRight}?pro_item_code=${selectedLeft}`, '').then(res => {

                    if (res.data.result) {
                        setLoading(true);

                        setGallaryData(res.data);

                        const middleImage = res.data?.result[0]?.IMAGE_PATH + '/' + res.data?.result[0]?.SLI_IMAGE_PATH;
                        setMainImage(middleImage);
                        setMainImageLoader(false);
                        console.log('Fetched Data new:', res.data.result);
                        setLoading(false);

                    }
                });

            } catch (error) {
                console.error('Error fetching section data:', error);
            }
        }
    };

    // UseEffect to trigger the API call when both selectedLeft and selectedRight are updated
    useEffect(() => {
        fetchData();

    }, [selectedLeft, selectedRight]);

    useEffect(() => {
        fetchProduct();
    }, [selectedRight]);

    const toggleModal = () => {
        setIsOpenShutter(!isOpenShutter);
        if (showLeft) {
            setShowLeft(false);
        }
    };
    if (!isOpen) return null;
    const images = items?.data?.result || '';

    const imagesPerPage = 100;
    const totalPages = Math.ceil(images.length / imagesPerPage);
    const currentPage = Math.floor(currentIndex / imagesPerPage);



    const webTotalPages = Math.max(1, Math.ceil(webImagesTotalCount / webImagesPerPage));
    const webCurrentPage = Math.floor(webCurrentIndex / webImagesPerPage);

    const handlePageClick = (webCurrentIndex) => {
        setWebCurrentIndex(webCurrentIndex * webImagesPerPage);
        fetchArt(webCurrentIndex);
    };

    const handleEvent = (type = '') => {
        if (type == 'left') {
            if (webCurrentPage < webTotalPages - 1) {
                handlePageClick(webCurrentPage + 1);
            }
        } else {
            if (webCurrentPage > 1) {
                handlePageClick(webCurrentPage - 1);
            }
        }

    };



    const handleRadioChange = (index) => {
        setsliderCurrentIndex(index); // update current index

    };
    const handleToggleTooltip = () => {
        setShowTooltip(!showTooltip);
    };
    return (
        <>

            <div className='metModel'>
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                    <div className="row">
                        {isMOBILE && (
                            <div className="col-sm-12 d-flex align-items-end justify-content-end" style={{ width: '100%', height: "27px" }}>

                                <button className="modal-close bg-black p-2" onClick={closeModal} style={{ margin: "-12px 0px" }}>&times;</button>
                            </div>
                        )}

                    </div>


                    <div className="col-md-12 col-sm-12 bg-black" style={{ height: '70px' }}>
                        <div className={`${isMOBILE ? `bg-black` : `row m-auto`}`} style={isMOBILE ? {} : { backgroundColor: 'rgb(54, 53, 49)', height: '80px' }}> {/*header-section */}
                            <div className="p-2 col-sm-12 col-xs-3 col-md-4 head-content bg-black" style={isMOBILE ? { fontSize: '12px' } : { width: '21%' }} > {/*logo */}
                                {isMOBILE && (
                                    <>
                                        <div className="col-sm-6 col-xs-6 col-md-6 mt-2 text-white head-content bg-black" onClick={toggleLeftSection} style={isMOBILE ? { fontSize: '27px', alignItems: 'center', justifyContent: 'center', marginRight: '10px', color: '#f6bf5a' } : {}}> {/**hamburger-menu */}
                                            &#9776;
                                        </div>

                                        <span style={{ color: 'white' }}>{t('productType')}</span>
                                    </>
                                )}
                                <div style={{ marginLeft: '20px' }}>
                                    <img className={`col-sm-6 col-xs-6 object-fit-cover ${isMOBILE ? `col-md-6` : `col-md-12`}`} src={"/assets/images/themat/met-logo.png"} alt="Logo" style={isMOBILE ? { width: '171px', marginRight: '75px' } : { width: '90%' }} />
                                </div>
                            </div>
                            {!isMOBILE && (
                                <>
                                    <div className=" col-sm-6 col-xs-6 col-md-3 head-content" > {/*met-desc */}

                                        <p class="text-white">{artDesc}</p>
                                    </div>

                                    <div className="col-sm-6 col-xs-6 col-md-4 text-white head-content" style={{ fontSize: '17px' }}> {/*artcodec */}
                                        <span>{t('artCode')}:&nbsp;</span>
                                        <span className='text-danger'>{artCode}</span>
                                    </div>
                                    <div className="col-sm-12 col-xs-12 col-md-1 head-content" style={{ textAlign: `${lang == 'ar' ? 'left' : 'right'}`, padding: '20px 0', display: 'block', right: '0', position: 'relative' }}> {/** d-flex */}

                                        <div className='row'>
                                            {/* <div className="col-sm-9 col-md-9 text-white mt-2" style={{fontSize:"12px"}}> 
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="30px"
                                    width="16px"
                                    version="1.1"
                                    viewBox="0 0 20.967 20.967"
                                    aria-hidden="true"
                                >
                                    <g>
                                        <path
                                            style={{ fill: '#9d9898' }}
                                            d="M20.966,4.305c0-0.467-0.38-0.847-0.848-0.847H0.848C0.381,3.458,0,3.838,0,4.305v1.052   
            c0,0.042,0.004,0.081,0.009,0.115C0.004,5.505,0,5.538,0,5.572v11.09c0,0.467,0.38,0.846,0.848,0.846h19.271   
            c0.468,0,0.848-0.379,0.848-0.846V5.572c0-0.044-0.005-0.084-0.011-0.121c0.007-0.045,0.011-0.091,0.011-0.136L20.966,4.305   
            L20.966,4.305z M2.013,5.152h16.888l-8.419,6.1L2.013,5.152z M19.272,7.217v8.598H1.694V7.217l8.297,5.914   
            c0.289,0.207,0.697,0.205,0.984,0.002L19.272,7.217z"
                                        ></path>
                                    </g>
                                </svg>
                                &nbsp;<span>Share</span>
                            </div> */}
                                            <div className='close-modal'> {/** */}
                                                <button className="modal-close" onClick={closeModal}>&times;</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="mobile-header-section p-2" style={{ fontSize: '14px', position: 'relative' }}>

                        <div style={{width: '70%',wordWrap:'break-word'}}>
                            
                            <p className="text-white" onClick={handleToggleTooltip}
                                title={artDesc.length > 60 ? artDesc : ''}>
                                {artDesc.length > 60 ? `${artDesc.substring(0, 60)}...` : artDesc}
                            </p>
                        </div>
                        {showTooltip && artDesc.length > 60 && (
                            <div className="custom-tooltip">
                                {artDesc}
                            </div>
                        )}
                        <div className="mobile-artcode">
                            <p className='text-white'>{t('artCode')}: &nbsp;</p>
                            <span>{artCode}</span>
                        </div>
                    </div>
                    <div className={`modal-shutter ${isOpenShutter ? 'open' : ''}`}>
                        <div className="modal-content">

                            {/* Image display (6 images per page, 3 per row) */}
                            <div className='image-container mt-2 p-2'>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <Swiper
                                        slidesPerView={3} // 3 images per row
                                        grid={{
                                            rows: 2, // 3 images per column
                                            fill: 'grid', // Fill the grid row by row
                                        }}
                                        spaceBetween={1} // Space between images
                                        pagination={{
                                            clickable: true,
                                            el: '.swiper-pagination',
                                        }}
                                        modules={[Pagination, Navigation, Grid]}

                                    >
                                        {items && items?.data?.result?.map((item, index) => (
                                            <SwiperSlide key={index}>
                                                <div
                                                    style={{ width: isMOBILE ? '110px' : '', marginBottom: isMOBILE ? '8px' : '' }}
                                                    className={`col-md-4 ${selectedRight === item.SII_CODE ? 'art-border' : ''}`}
                                                    data-id={item.SII_CODE}
                                                    onClick={() =>
                                                        handleRightClick(
                                                            item.SII_CODE,
                                                            item.SII_ITEM_ID,
                                                            item.SII_DESC,
                                                            item.IMAGE_PATH + '/' + item.SII_THUMBNAIL_IMAGES
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={item.IMAGE_PATH + '/' + item.SII_THUMBNAIL_IMAGES}
                                                        alt={item.SII_CODE}
                                                        className="grid-image"
                                                        width={'100%'}
                                                        height={'110px'}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                        <div className="swiper-pagination"></div>
                                    </Swiper>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className='mobile-toggle-parent' onClick={toggleModal}>
                        <div className='mobile-toggle' >
                            {isOpenShutter ? (
                                // Up arrow SVG
                                <svg height="14" width="33" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M224 144c-8.5 0-16.6 3.4-22.6 9.4l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 237.3l137.4 137.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160c-6-6-14.1-9.4-22.6-9.4z"></path>
                                </svg>
                            ) : (
                                // Down arrow SVG
                                <svg height="14" width="33" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
                                </svg>
                            )}



                        </div>
                    </div>
                    <div className="modal-top bg-black">
                        <div className={` col-sm-12 col-xs-12 col-md-3 modal-left ${showLeft ? 'show' : ''}`}>
                            <div className="scroll-content p-0">
                                {loading ? (
                                    <p>Loading...</p>
                                ) : (productData?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`section ${selectedLeft.includes(item.SC_PR_ITEM_CODE) ? 'left-border' : ''}`}
                                        dataid={item.SLI_SII_CODE}

                                        onClick={(event) => handleLeftClick(item.SC_PR_ITEM_CODE, event)}
                                        {...(isMOBILE && {
                                            onTouchStart: (event) => handleLeftClick(item.SC_PR_ITEM_CODE, event),
                                            onTouchEnd: handleTouchEnd,
                                        })}

                                    >
                                        <div className="left-image">
                                            <img
                                                src={
                                                    selectedLeft.includes(item.SC_PR_ITEM_CODE)
                                                        ? item.IMAGE_PATH + 'icon/' + item.SC_ICON_PATH_01
                                                        : item.IMAGE_PATH + 'icon/' + item.SC_ICON_PATH_02
                                                }
                                                alt={item.SC_DESC}
                                                style={{
                                                    filter: selectedLeft.includes(item.SC_PR_ITEM_CODE) ? 'contrast(600%)' : 'none' // Use 'none' for no filter
                                                }}
                                            />
                                        </div>
                                        <div className="left-desc">
                                            <span>{item.SC_DESC}</span>
                                        </div>
                                    </div>
                                )))}
                            </div>
                        </div>

                        <div className="modal-middle col-sm-12 col-xs-12 col-md-6">

                            {mainImageLoader ? (
                                <p style={{ lineHeight: '400px' }}>Loading...</p>
                            ) : (
                                <img
                                    src={mainImage ? mainImage : ''}
                                    alt={items[0]?.name || 'Large Display'}
                                    className="large-image"
                                />
                            )}
                        </div>

                        <div className="col-sm-12 col-xs-3 col-md-3 image-gallery">
                            <div className="main-image-slider">
                                <Swiper
                                    navigation
                                    pagination={{ clickable: true }}
                                    modules={[Navigation, Pagination]}
                                    slidesPerView={1}
                                    onSlideChange={(swiper) => handleRadioChange(swiper.activeIndex)}
                                    initialSlide={sliderCurrentIndex} // Set initial slide to current index
                                >
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : (
                                        Array.isArray(gallaryData?.result) && gallaryData.result.length > 0 ? (
                                            gallaryData?.result?.map((item, index) => (
                                                <SwiperSlide key={index}>
                                                    <img
                                                        src={item.IMAGE_PATH ? item.IMAGE_PATH + '/' + item.SLI_IMAGE_PATH : ''}
                                                        alt={`Slide ${index + 1}`}
                                                        className="gallery-image"
                                                    />
                                                </SwiperSlide>
                                            ))
                                        ) : (
                                            <p>Loading...</p> // Custom fallback when result is not an array or is empty
                                        )
                                    )}

                                </Swiper>


                            </div>
                        </div>

                        <div className='col-sm-12 col-xs-3 col-md-3 ' style={{ width: isMOBILE ? '' : '21%' }}
                        >
                            {!isMobile &&
                                <div className="row px-3" >
                                    {items?.data?.result?.map((item, index) => (
                                        <div
                                            key={index}
                                            style={{ padding: '2px', textAlign: 'center' }}
                                            className={`col-md-4 mb-1 ${selectedRight === item.SII_CODE ? 'art-border' : ''}`}
                                            dataid={item.SII_CODE}
                                            onClick={() => handleRightClick(item.SII_CODE, item.SII_ITEM_ID, item.SII_DESC, item.IMAGE_PATH + '/' + item.SII_THUMBNAIL_IMAGES)}
                                        >
                                            <img src={item.IMAGE_PATH + '/' + item.SII_THUMBNAIL_IMAGES} alt={item.SII_ITEM_ID} width={'100%'} height={'69px'} style={{ objectFit: 'cover' }} />
                                        </div>
                                    ))}

                                </div>
                            }
                            <div className='row'>
                                <div className="col-md-12 mt-2 mb-2 carousel-pagination">
                                    <button
                                        className="pagination-arrow"
                                        onClick={() => handleEvent('right')}
                                        disabled={webCurrentPage === 1}
                                    >
                                        ‹
                                    </button>
                                    {/* Pagination numbers */}
                                    {Array.from({ length: webTotalPages }).map((_, pageIndex) => {
                                        const isVisible = pageIndex === webCurrentPage ||
                                            pageIndex === webCurrentPage - 1 ||
                                            pageIndex === webCurrentPage + 1 ||
                                            pageIndex === 1 ||
                                            pageIndex === webTotalPages - 1;

                                        if (isVisible) {
                                            return (
                                                <button
                                                    key={pageIndex}
                                                    className={`pagination-number ${pageIndex === webCurrentPage ? "active" : ""}`}
                                                    onClick={() => handlePageClick(pageIndex)}
                                                >
                                                    {pageIndex + 1}
                                                </button>
                                            );
                                        } else if (pageIndex === webCurrentPage - 2 || pageIndex === webCurrentPage + 2) {
                                            return <span key={pageIndex} className="pagination-dots text-white">...</span>;
                                        }

                                        return null;
                                    })}
                                    <button
                                        className="pagination-arrow"
                                        onClick={() => handleEvent('left')}
                                        disabled={webCurrentPage === webTotalPages - 1}
                                    >
                                        ›
                                    </button>
                                </div>

                                <div className='col-md-9 m-auto order-yours' onClick={() => {
                                    const selectedItems = productData?.filter(item => selectedLeft.includes(item.SC_PR_ITEM_CODE));
                                    const selectedDescriptions = selectedItems.map(item => item.SC_DESC).join(', ');

                                    setselectedDesc(selectedDescriptions || ''); // Set comma-separated descriptions
                                    setContactUsModalOpen(true); // Open the modal
                                }}>
                                    {t('orderYours')}
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="modal-bottom">
                        <div className={lang == 'ar' ? "swipe-right" : "swipe-left"} onClick={() => slideEvent(-100)}>
                            &lt;
                        </div>

                        <div className="image-slider" ref={sliderRef}>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (gallaryData && Array.isArray(gallaryData?.result) && gallaryData?.result.length > 0 ? (
                                gallaryData?.result?.map((product, productIndex) => (
                                    <img
                                        key={productIndex}
                                        src={product.IMAGE_PATH ? product.IMAGE_PATH + '/' + product.SLI_IMAGE_PATH : ''}
                                        alt={`Product ${productIndex}`}
                                        onClick={() => showGallaryImage(product.IMAGE_PATH ? product.IMAGE_PATH + '/' + product.SLI_IMAGE_PATH : '')}
                                        className='object-fit-cover'
                                    />
                                ))
                            ) : (
                                <p></p>
                            ))}
                        </div>

                        <div className={lang == 'ar' ? "swipe-left" : "swipe-right"} onClick={() => slideEvent(100)}>
                            &gt;
                        </div>
                    </div>
                </div>

            </div>
            {ContactUsModalOpen && (
                <ContactUsModal
                    show={ContactUsModalOpen}
                    onHide={() => setContactUsModalOpen(false)}
                    formType="A"
                    type="Art"
                    selectedLeft={selectedLeft}
                    selectedRight={selectedRight}
                    selectedDesc={selectedDesc}
                    selectedArt={artCode}
                />
            )}
            </div>
        </>
    );
};

export default MetModal;
