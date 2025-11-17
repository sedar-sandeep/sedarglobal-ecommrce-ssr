import React from 'react';
import LinkComponent from '@components/Link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'next-i18next';

const ProjectCategoryGroupBanner = (props) => {
  const { t } = useTranslation("common");
  return (
    <section className="ProjectCategoryGroupBanner max1920">
      <div className="bannerImage">
        <LinkComponent href={props.link_url ? props.link_url : '#'}>
          <LazyLoadImage effect="" src={props.image_path} alt="sedarglobal" width="auto" height="auto" />
        </LinkComponent>
        <div className="breadcrumb  d-none d-md-block">
          <LinkComponent href={"/"}>{t('home')} &nbsp;</LinkComponent> / 
          <LinkComponent href="/contracts">&nbsp; {t('projects')} &nbsp;</LinkComponent> / {props.title}</div>
      </div>
    </section>
  )
};

ProjectCategoryGroupBanner.propTypes = {};

ProjectCategoryGroupBanner.defaultProps = {};

export default ProjectCategoryGroupBanner;
