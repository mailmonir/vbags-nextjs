import React from "react";
import Link from "next/link";

import { FaChevronRight, FaHome } from "react-icons/fa";

const Breadcrumb = ({ bcitems }) => {
  return (
    <div className="breadcrumb">
      <Link className="breadcrumb__link" href="/">
        <span className="breadcrumb__homeicon">
          <FaHome />
        </span>
        Home
      </Link>

      {bcitems.map((bcitem, index) =>
        bcitem.link ? (
          <React.Fragment key={index}>
            <span className="breadcrumb__separator">
              <FaChevronRight size="1.2rem" />
            </span>
            <Link href={bcitem.link}>{bcitem.text}</Link>
          </React.Fragment>
        ) : (
          <React.Fragment key={index}>
            <span className="breadcrumb__separator">
              <FaChevronRight size="1.2rem" />
            </span>
            <span>{bcitem.text}</span>
          </React.Fragment>
        )
      )}
    </div>
  );
};

export default Breadcrumb;
