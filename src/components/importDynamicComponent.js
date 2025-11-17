import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import { Col, Row } from 'react-bootstrap';

// import dynamic component
// import HomeSkeleton from "src/Preloader/HomeSkeleton";
const HomeSkeleton = dynamic(() => import("src/Preloader/HomeSkeleton"));
const DynamicHomeBanner = dynamic(() => import("src/Component/Banner/Banner"), {
  ssr: true,
  loading: () =>
    <div>
      <Row>
        <Col sm={12}>
          <Skeleton height={'80vh'} count={1} className="my-3" />
        </Col>
      </Row>
    </div>
});

const ProductSliderDynamic = dynamic(
  () => import(`src/Component/ProductSlider/ProductSlider`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const NewCollectionDynamic = dynamic(
  () => import(`src/Component/Offer/NewCollection`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FranchiseDynamic = dynamic(
  () => import(`src/Component/Franchise/Franchise`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const HomeTopCategory = dynamic(
  () => import(`src/Component/HomeTopCategory/HomeTopCategory`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const OurBrandsDynamic = dynamic(
  () => import(`src/Component/OurBrands/OurBrands`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const AboutUsBanner = dynamic(
  () => import(`src/Component/AboutUsBanner/AboutUsBanner`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const AboutusBringWorldDynamic = dynamic(
  () => import(`src/Component/AboutusBringWorld/AboutusBringWorld`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const AboutReferenceSliderDynamic = dynamic(
  () => import(`src/Component/AboutReferenceSlider/AboutReferenceSlider`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const AboutTimeWiseDynamic = dynamic(
  () => import(`src/Component/AboutTimeWise/AboutTimeWise`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const WhySedarDynamic = dynamic(
  () => import(`src/Component/WhySedar/WhySedar`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const AboutHomeAutoMationBoxDynamic = dynamic(
  () => import(`src/Component/AboutHomeAutoMationBox/AboutHomeAutoMationBox`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const OurProjetSliderDynamicDynamic = dynamic(
  () => import(`src/Component/OurProjetSlider/OurProjetSlider.js`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const AccessibiltyDynamic = dynamic(
  () => import(`src/Component/Accessibilty/Accessibilty`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const B2BRegistrationDynamic = dynamic(
  () => import(`src/Component/B2BRegistration/B2BRegistration`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const BlogDynamic = dynamic(
  () => import(`src/Component/Blog/index`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const BlogPostDynamic = dynamic(
  () => import(`src/Component/Blog/post`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);


const BrandPageContentDynamic = dynamic(
  () => import(`src/Component/BrandPageContent/BrandPageContent`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const BrandPageDynamic = dynamic(
  () => import(`src/Component/BrandPage/BrandPage`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ContactFormpageDynamic = dynamic(
  () => import(`src/Component/ContactFormpage/ContactFormpage`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const MoreEnquiresDynamic = dynamic(
  () => import(`src/Component/Contact/MoreEnquires`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const HomePageOurPresenceDynamic = dynamic(
  () => import(`src/Component/HomePageOurPresence/HomePageOurPresence`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ContractsBannerDynamic = dynamic(
  () => import(`src/Component/ContractsBanner/ContractsBanner`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ContractsBringWorldDynamic = dynamic(
  () => import(`src/Component/ContractsBringWorld/ContractsBringWorld`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ExploreProjectSectionDynamic = dynamic(
  () => import(`src/Component/ExploreProjectSection/ExploreProjectSection`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const QualityServicesDynamic = dynamic(
  () => import(`src/Component/QualityServices/QualityServices`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const OurWorkforceDynamic = dynamic(
  () => import(`src/Component/OurWorkforce/OurWorkforce`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ProjectManagementDynamic = dynamic(
  () => import(`src/Component/Categorylist/ProjectManagement`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const CategorylistDynamic = dynamic(
  () => import(`src/Component/Categorylist/Categorylist`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ProjectGalleryDynamic = dynamic(
  () => import(`src/Component/ProjectGallery/ProjectGallery`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const CookiePolicyDynamic = dynamic(
  () => import(`src/Component/CookiePolicy/CookiePolicy`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ProductListDynamic = dynamic(
  () => import(`src/Component/ProductList/ProductList`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FaqpageDynamic = dynamic(() => import(`src/Component/Faqpage/Faqpage`), {
  ssr: true,
  loading: () =>
    <div>
      <HomeSkeleton />
    </div>
});

const PageBannerDynamic = dynamic(
  () => import(`src/Component/PageBanner/PageBanner`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FranchisevisionDynamic = dynamic(
  () => import(`src/Component/Franchisevision/Franchisevision`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const WhyPartnerDynamic = dynamic(
  () => import(`src/Component/WhyPartner/WhyPartner`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FranchisevisionsliderDynamic = dynamic(
  () => import(`src/Component/Franchisevisionslider/Franchisevisionslider`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FranchiseSupportDynamic = dynamic(
  () => import(`src/Component/FranchiseSupport/FranchiseSupport`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FranchiseTestimonialDynamic = dynamic(
  () => import(`src/Component/FranchiseTestimonial/FranchiseTestimonial`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FranchiseTestimonialTabDynamic = dynamic(
  () => import(`src/Component/FranchiseTestimonialTab/FranchiseTestimonialTab`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const MediaCoverageDynamic = dynamic(
  () => import(`src/Component/MediaCoverage/MediaCoverage`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const CommonBannerPageDynamic = dynamic(
  () => import(`src/Component/CommonBannerPage/CommonBannerPage`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FreeConsultationContentListDynamic = dynamic(
  () =>
    import(`src/Component/FreeConsultationContentList/FreeConsultationContentList`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FreeConsultationBookFormDynamic = dynamic(
  () =>
    import(`src/Component/FreeConsultationBookForm/FreeConsultationBookForm`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FreeConsultationSimpleProcessDynamic = dynamic(
  () =>
    import(`src/Component/FreeConsultationSimpleProcess/FreeConsultationSimpleProcess`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FreeSampleDynamic = dynamic(
  () => import(`src/Component/FreeSample/FreeSample`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const HomeAutomationVideoBannerDynamic = dynamic(
  () =>
    import(`src/Component/HomeAutomationVideoBanner/HomeAutomationVideoBanner`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const HomeAutomationBasicContentDynamic = dynamic(
  () =>
    import(`src/Component/HomeAutomationBasicContent/HomeAutomationBasicContent`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const HomeAutomationPartnerForConnectDynamic = dynamic(
  () =>
    import(`src/Component/HomeAutomationPartnerForConnect/HomeAutomationPartnerForConnect`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const HomeAutomationSedarStrengthDynamic = dynamic(
  () =>
    import(`src/Component/HomeAutomationSedarStrength/HomeAutomationSedarStrength`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const HomeAutomationVoiceControlSliderDynamic = dynamic(
  () =>
    import(`src/Component/HomeAutomationVoiceControlSlider/HomeAutomationVoiceControlSlider`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const HomeAutomationServiceDynamic = dynamic(
  () => import(`src/Component/HomeAutomationService/HomeAutomationService`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const MoodBoardFavoritesDynamic = dynamic(
  () => import(`src/Component/MoodBoardView/MoodBoardFavorites`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const MoodBoardViewDynamic = dynamic(
  () => import(`src/Component/MoodBoardView/MoodBoardView`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const PrivacypolicyDynamic = dynamic(
  () => import(`src/Component/Privacypolicy/Privacypolicy`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ReturnsAndRefundDynamic = dynamic(
  () => import(`src/Component/ReturnsAndRefund/ReturnsAndRefund`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ServiceBannerDynamic = dynamic(
  () => import(`src/Component/ServiceBanner/ServiceBanner`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const SimplpiecesDynamic = dynamic(
  () => import(`src/Component/Simplpieces/Simplpieces`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const QualityServices_pageDynamic = dynamic(
  () => import(`src/Component/QualityServices_page/QualityServices_page`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const TermsAndContitionsDynamic = dynamic(
  () => import(`src/Component/TermsAndContitions/TermsAndContitions`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ToolsAndGuidesContentListDynamic = dynamic(
  () =>
    import(`src/Component/ToolsAndGuidesContentList/ToolsAndGuidesContentList`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ToolsAndinstructionsDynamic = dynamic(
  () => import(`src/Component/ToolsAndinstructions/ToolsAndinstructions`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ToolsAndGuidFaqDynamic = dynamic(
  () => import(`src/Component/ToolsAndGuidFaq/ToolsAndGuidFaq`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const WishListDynamic = dynamic(
  () => import(`src/Component/WishList/WishList`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ProjectCategoryGroupBannerDynamic = dynamic(
  () =>
    import(`src/Component/ProjectCategoryGroupBanner/ProjectCategoryGroupBanner`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ProjectCategoryGroupHeadingDynamic = dynamic(
  () =>
    import(`src/Component/ProjectCategoryGroupHeading/ProjectCategoryGroupHeading`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ProjectCategoryGroupGridDynamic = dynamic(
  () =>
    import(`src/Component/ProjectCategoryGroupGrid/ProjectCategoryGroupGrid`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const InquiryFormDynamic = dynamic(
  () => import(`src/Component/InquiryForm/InquiryForm`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FranchiseeContactFormDynamic = dynamic(
  () => import(`src/Component/FranchiseeContactForm/FranchiseeContactForm`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ContractsFormDynamic = dynamic(
  () => import(`src/Component/ContractsForm/ContractsForm`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const QuickContactDynamic = dynamic(
  () => import(`src/Component/QuickContact/QuickContact`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FooterAnnouncementDynamic = dynamic(
  () => import(`src/Component/FooterAnnouncement/FooterAnnouncement`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const InstagramDynamic = dynamic(
  () => import(`src/Component/Instagram/Instagram`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const SuccessDynamic = dynamic(() => import(`src/Component/Utility/Success`), {
  ssr: true,
  loading: () =>
    <div>
      <HomeSkeleton />
    </div>
});

const ItemFilterSideBar = dynamic(
  () => import(`src/Component/ItemFilterSidebar/ItemFilterSidebar`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ProductMaterialDetail = dynamic(
  () => import(`src/Component/ProductMaterialDetail/ProductMaterialDetail`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const LandingPage = dynamic(
  () => import(`src/Component/LandingPage/LandingPage`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const CartPage = dynamic(
  () => import(`src/Component/CartPage/CartPage`),
  {
    ssr: false,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);
const OfferPageDynamic = dynamic(
  () => import(`src/Component/Offer/Offer`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const OfferProductList = dynamic(
  () => import(`src/Component/OfferProductList/Index`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const FullPageBanner = dynamic(
  () => import(`src/Component/Banner/FullPageBanner`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const CountryList = dynamic(
  () => import(`src/Component/LandingPage/CountryList`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);

const ProfileSidebarLayoutDynamic = dynamic(() => import(`src/Component/ProfileAndOrderLayout/ProfileSidebarLayout`), {
  ssr: false,
  loading: () => <div><HomeSkeleton /></div>
});


const CustomizationDynamic = dynamic(() => import(`src/Component/Customization/CustomizationProduct`), {
  ssr: false,
  loading: () => <div><HomeSkeleton /></div>
})


const ShippingPageDynamic = dynamic(() => import(`src/Component/ShippingPage/ShippingPage`), {
  ssr: false,
  loading: () => <div><HomeSkeleton /></div>
})

const SuccessPaymentDynamic = dynamic(() => import(`src/Component/PaymentPage/PaymentPage`), {
  ssr: true,
  loading: () =>
    <div>
      <HomeSkeleton />
    </div>
});

const Modification = dynamic(() => import(`src/Component/Modification/Index`), {
  ssr: false,
  loading: () =>
    <div>
      <HomeSkeleton />
    </div>
});
const TrackingPage = dynamic(() => import(`src/Component/Tracking/Index`), {
  ssr: false,
  loading: () =>
    <div>
      <HomeSkeleton />
    </div>
});
const AutoMation = dynamic(() => import(`src/Component/LandingPage/AutoMation`), {
  ssr: false,
  loading: () =>
    <div>
      <HomeSkeleton />
    </div>
});

const StepsToOwnership = dynamic(
  () => import(`src/Component/Ownership/Ownership`),
  {
    ssr: true,
    loading: () =>
      <div>
        <HomeSkeleton />
      </div>
  }
);
// end import dynamic component

export function ImportDynamicComponent(props) {
  switch (props.url) {
    case "Component/Banner/Banner":
      return <DynamicHomeBanner {...props} />;
    case "Component/ProductSlider/ProductSlider":
      return <ProductSliderDynamic {...props} />;
    case "Component/Offer/NewCollection":
      return <NewCollectionDynamic {...props} />;
    case "Component/HomeTopCategory/HomeTopCategory":
      return <HomeTopCategory {...props} />;
    case "Component/Franchise/Franchise":
      return <FranchiseDynamic {...props} />;
    case "Component/OurBrands/OurBrands":
      return <OurBrandsDynamic {...props} />;
    case "Component/AboutUsBanner/AboutUsBanner":
      return <AboutUsBanner {...props} />;
    case "Component/AboutusBringWorld/AboutusBringWorld":
      return <AboutusBringWorldDynamic {...props} />;
    case "Component/AboutReferenceSlider/AboutReferenceSlider":
      return <AboutReferenceSliderDynamic {...props} />;
    case "Component/AboutTimeWise/AboutTimeWise":
      return <AboutTimeWiseDynamic {...props} />;
    case "Component/WhySedar/WhySedar":
      return <WhySedarDynamic {...props} />;
    case "Component/AboutHomeAutoMationBox/AboutHomeAutoMationBox":
      return <AboutHomeAutoMationBoxDynamic {...props} />;
    case "Component/OurProjetSlider/OurProjetSlider":
      return <OurProjetSliderDynamicDynamic {...props} />;
    case "Component/Accessibilty/Accessibilty":
      return <AccessibiltyDynamic {...props} />;
    case "Component/B2BRegistration/B2BRegistration":
      return <B2BRegistrationDynamic {...props} />;
    case "Component/Blog/post":
      return <BlogPostDynamic {...props} />;
    case "Component/Blog/index":
      return <BlogDynamic {...props} />;
    case "Component/BrandPageContent/BrandPageContent":
      return <BrandPageContentDynamic {...props} />;
    case "Component/BrandPage/BrandPage":
      return <BrandPageDynamic {...props} />;
    case "Component/ContactFormpage/ContactFormpage":
      return <ContactFormpageDynamic {...props} />;
    case "Component/Contact/MoreEnquires":
      return <MoreEnquiresDynamic {...props} />;
    case "Component/HomePageOurPresence/HomePageOurPresence":
      return <HomePageOurPresenceDynamic {...props} />;
    case "Component/ContractsBanner/ContractsBanner":
      return <ContractsBannerDynamic {...props} />;
    case "Component/ContractsBringWorld/ContractsBringWorld":
      return <ContractsBringWorldDynamic {...props} />;
    case "Component/ExploreProjectSection/ExploreProjectSection":
      return <ExploreProjectSectionDynamic {...props} />;
    case "Component/QualityServices/QualityServices":
      return <QualityServicesDynamic {...props} />;
    case "Component/OurWorkforce/OurWorkforce":
      return <OurWorkforceDynamic {...props} />;
    case "Component/Categorylist/ProjectManagement":
      return <ProjectManagementDynamic {...props} />;
    case "Component/Categorylist/Categorylist":
      return <CategorylistDynamic {...props} />;
    case "Component/ProjectGallery/ProjectGallery":
      return <ProjectGalleryDynamic {...props} />;
    case "Component/CookiePolicy/CookiePolicy":
      return <CookiePolicyDynamic {...props} />;
    case "Component/categoryBanner/categoryBanner":
      return <ProductListDynamic {...props} />;
    case "Component/ProductPage/ProductPage":
      return <ProductListDynamic {...props} />;
    case "Component/ProductList/ProductList":
      return <ProductListDynamic {...props} />;
    case "Component/Faqpage/Faqpage":
      return <FaqpageDynamic {...props} />;
    case "Component/PageBanner/PageBanner":
      return <PageBannerDynamic {...props} />;
    case "Component/Franchisevision/Franchisevision":
      return <FranchisevisionDynamic {...props} />;
    case "Component/WhyPartner/WhyPartner":
      return <WhyPartnerDynamic {...props} />;
    case "Component/Franchisevisionslider/Franchisevisionslider":
      return <FranchisevisionsliderDynamic {...props} />;
    case "Component/FranchiseSupport/FranchiseSupport":
      return <FranchiseSupportDynamic {...props} />;
    case "Component/FranchiseTestimonial/FranchiseTestimonial":
      return <FranchiseTestimonialDynamic {...props} />;
    case "Component/FranchiseTestimonialTab/FranchiseTestimonialTab":
      return <FranchiseTestimonialTabDynamic {...props} />;
    case "Component/MediaCoverage/MediaCoverage":
      return <MediaCoverageDynamic {...props} />;
    case "Component/CommonBannerPage/CommonBannerPage":
      return <CommonBannerPageDynamic {...props} />;
    case "Component/FreeConsultationContentList/FreeConsultationContentList":
      return <FreeConsultationContentListDynamic {...props} />;
    case "Component/FreeConsultationBookForm/FreeConsultationBookForm":
      return <FreeConsultationBookFormDynamic {...props} />;
    case "Component/FreeConsultationSimpleProcess/FreeConsultationSimpleProcess":
      return <FreeConsultationSimpleProcessDynamic {...props} />;
    case "Component/FreeSample/FreeSample":
      return <FreeSampleDynamic {...props} />;
    case "Component/HomeAutomationVideoBanner/HomeAutomationVideoBanner":
      return <HomeAutomationVideoBannerDynamic {...props} />;
    case "Component/HomeAutomationBasicContent/HomeAutomationBasicContent":
      return <HomeAutomationBasicContentDynamic {...props} />;
    case "Component/HomeAutomationPartnerForConnect/HomeAutomationPartnerForConnect":
      return <HomeAutomationPartnerForConnectDynamic {...props} />;
    case "Component/HomeAutomationSedarStrength/HomeAutomationSedarStrength":
      return <HomeAutomationSedarStrengthDynamic {...props} />;
    case "Component/HomeAutomationVoiceControlSlider/HomeAutomationVoiceControlSlider":
      return <HomeAutomationVoiceControlSliderDynamic {...props} />;
    case "Component/HomeAutomationService/HomeAutomationService":
      return <HomeAutomationServiceDynamic {...props} />;
    case "Component/MoodBoardView/MoodBoardFavorites":
      return <MoodBoardFavoritesDynamic {...props} />;
    case "Component/MoodBoardView/MoodBoardView":
      return <MoodBoardViewDynamic {...props} />;
    case "Component/Privacypolicy/Privacypolicy":
      return <PrivacypolicyDynamic {...props} />;
    case "Component/ReturnsAndRefund/ReturnsAndRefund":
      return <ReturnsAndRefundDynamic {...props} />;
    case "Component/ServiceBanner/ServiceBanner":
      return <ServiceBannerDynamic {...props} />;
    case "Component/Simplpieces/Simplpieces":
      return <SimplpiecesDynamic {...props} />;
    case "Component/QualityServices_page/QualityServices_page":
      return <QualityServices_pageDynamic {...props} />;
    case "Component/TermsAndContitions/TermsAndContitions":
      return <TermsAndContitionsDynamic {...props} />;
    case "Component/ToolsAndGuidesContentList/ToolsAndGuidesContentList":
      return <ToolsAndGuidesContentListDynamic {...props} />;
    case "Component/ToolsAndinstructions/ToolsAndinstructions":
      return <ToolsAndinstructionsDynamic {...props} />;
    case "Component/ToolsAndGuidFaq/ToolsAndGuidFaq":
      return <ToolsAndGuidFaqDynamic {...props} />;
    case "Component/WishList/WishList":
      return <WishListDynamic {...props} />;
    case "Component/ProjectCategoryGroupBanner/ProjectCategoryGroupBanner":
      return <ProjectCategoryGroupBannerDynamic {...props} />;
    case "Component/ProjectCategoryGroupHeading/ProjectCategoryGroupHeading":
      return <ProjectCategoryGroupHeadingDynamic {...props} />;
    case "Component/ProjectCategoryGroupGrid/ProjectCategoryGroupGrid":
      return <ProjectCategoryGroupGridDynamic {...props} />;
    case "Component/InquiryForm/InquiryForm":
      return <InquiryFormDynamic {...props} />;
    case "Component/FranchiseeContactForm/FranchiseeContactForm":
      return <FranchiseeContactFormDynamic {...props} />;
    case "Component/ContractsForm/ContractsForm":
      return <ContractsFormDynamic {...props} />;
    case "Component/QuickContact/QuickContact":
      return <QuickContactDynamic {...props} />;
    case "Component/FooterAnnouncement/FooterAnnouncement":
      return <FooterAnnouncementDynamic {...props} />;
    case "Component/Instagram/Instagram":
      return <InstagramDynamic {...props} />;
    case "Component/Utility/Success":
      return <SuccessDynamic {...props} />;
    case "Component/ItemFilterSidebar/ItemFilterSidebar":
      return <ItemFilterSideBar {...props} />;
    case "Component/ProductMaterialDetail/ProductMaterialDetail":
      return <ProductMaterialDetail {...props} />;
    case "Component/LandingPage/LandingPage":
      return <LandingPage {...props} />;
    case 'Component/ProfileAndOrderLayout/ProfileSidebarLayout':
      return <ProfileSidebarLayoutDynamic  {...props} />
    case 'Component/CartPage/CartPage':
      return <CartPage  {...props} />
    case 'Component/Customization/CustomizationProduct':
      return <CustomizationDynamic  {...props} />
    case 'Component/ShippingPage/ShippingPage':
      return <ShippingPageDynamic  {...props} />
    case 'Component/PaymentPage/PaymentPage':
      return <SuccessPaymentDynamic  {...props} />
    case 'Component/Modification/Index':
      return <Modification  {...props} />
    case 'Component/Tracking/Index':
      return <TrackingPage  {...props} />
    case "Component/Offer/Offer":
      return <OfferPageDynamic {...props} />;
    case "Component/OfferProductList/Index":
      return <OfferProductList {...props} />;
    case "Component/Banner/FullPageBanner":
      return <FullPageBanner {...props} />;
    case "Component/LandingPage/CountryList":
      return <CountryList {...props} />;
    case "Component/LandingPage/AutoMation":
      return <AutoMation {...props} />;
    case "Component/Ownership/Ownership":
      return <StepsToOwnership {...props} />;
    default:
      return "";
  }
}
