import React from "react";
import {
  Modal,
  Form
} from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

function SortProductItem(props) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const filters = props.FILTERS;


  const handleTagChecked = (filter, value, row, product = 0) => {

    let pathname = typeof window !== "undefined" ? window.location.pathname : ""
    router.push({
      pathname, query: {
        ...router.query,
        [filter]: [value.DESCRIPTION_EN]
      },
      undefined,
      scroll: false
    });
    props.onHide()
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="SortItemPopup"
    >
      <Modal.Body>
        <h3 className="py-4 px-3">
          {t("SortBy")}{" "}
        </h3>
        <ul className="ps-3">
          {filters &&
            filters.map(
              (filter, key) =>
                filter.SFT_CODE == "010" &&
                filter.TAGS &&
                filter.TAGS.map((i, tagkey) => { 
                  // let prodDesc = datapush[filter.DESCRIPTION_EN] && datapush[filter.DESCRIPTION_EN].indexOf(i.DESCRIPTION_EN) >= 0 ? true : false;
                  let prodDesc = router?.query && router?.query[filter.DESCRIPTION_EN]?.indexOf(i.DESCRIPTION_EN) >= 0 ? true : false;
                  return (
                    <li
                      className="mb-3"
                      key={tagkey}
                      onClick={() =>
                        handleTagChecked(filter.DESCRIPTION_EN, i, key)}
                    >
                      <Form.Check type="checkbox" id={`check-api-${i.DESCRIPTION_EN}`} className="filtercheckbox" key={tagkey}>
                        <div className="d-flex">
                          <Form.Check.Input type="checkbox" onClick={() => handleTagChecked(filter.DESCRIPTION_EN, i, key)} checked={prodDesc} />
                          <Form.Check.Label>&nbsp;{`${i.DESCRIPTION}`} </Form.Check.Label>
                        </div>
                      </Form.Check>
                    </li>
                  )

                }
                  
                )
            )}
        </ul>
      </Modal.Body>
    </Modal>
  );
}
export default SortProductItem;
