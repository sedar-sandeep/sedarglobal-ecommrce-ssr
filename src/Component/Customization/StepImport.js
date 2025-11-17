import React, { lazy, useEffect, useState, Suspense } from 'react';

import Skeleton from "react-loading-skeleton";


const importView = subreddit =>
  lazy(() =>
    import(`./${subreddit}`).catch(() => import(`../../Component/ComponentNotFound/ComponentNotFound`))
  );

const ContentLoader = () => {
  return (
    <>
      <Skeleton height={400} count={4} className="contentloader" style={{ marginBottom: "60px" }} />
    </>
  )
}

function DisplayComponent(props) {
  //window.scrollTo(0, 0);
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function loadViews() {
      const importChild = props.CHILD_STEP.map(data => {
        const View = importView(data.SS_HTML_TEMPLATE_PATH);
        return <View {...data} key={data.SPS_SYS_ID} />;
      });
      Promise.all(importChild).then(setViews, setLoading(false));
    }
    loadViews();
    setLoading(false);
  }, []);

  if (props.CHILD_STEP && props.CHILD_STEP.length == 0) {
    return false;
  }

  return (
    <Suspense fallback="">
      {loading ? <ContentLoader /> : views}
    </Suspense>
  );
}

export default function StepImport(props) {

  return (
    <>
      <DisplayComponent {...props} />
    </>
  );

}
