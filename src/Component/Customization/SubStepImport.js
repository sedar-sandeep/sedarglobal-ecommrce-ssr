import React, { lazy, useEffect, useState, Suspense } from 'react';

import Skeleton from "react-loading-skeleton";


const importView = subreddit =>
  lazy(() =>
    import(`./${subreddit}`).catch(() => import(`../../Component/ComponentNotFound/ComponentNotFound`))
  );

const ContentLoader = () => {
  return (
    <>
      <Skeleton height={200} count={1} className="contentloader" />
    </>
  )
}

function DisplayComponent(props) {
  //window.scrollTo(0, 0);
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadViews() {
      const importChild = props.SUB_CHILD.map(data => {
        const View = importView(data.SS_HTML_TEMPLATE_PATH);
        return <View key={data.SPS_SYS_ID} {...data} />;
      });
      Promise.all(importChild).then(setViews, setLoading(false));
    }
    loadViews();
    setLoading(false);
  }, []);

  if (props.SUB_CHILD && props.SUB_CHILD.length == 0) {
    return false;
  }

  return (
    <Suspense fallback="">
      {loading ? <ContentLoader /> : views}
    </Suspense>
  );
}

export default function SubStepImport(props) {

  return (
    <>
      <DisplayComponent {...props} />
    </>
  );

}
