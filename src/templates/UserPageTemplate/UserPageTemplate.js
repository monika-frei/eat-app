import React from "react";
import styles from "./UserPageTemplate.module.scss";
import Sidebar from "../../components/organisms/Sidebar/Sidebar";
import PageType from "../../providers/PageType";

import cx from "classnames";

const UserPageTemplate = ({ children, bgColor, border, bgColorLight }) => {
  const cardClass = cx(styles.card, bgColor, border);
  const containerClass = cx(styles.container);
  const wrapperClass = cx(styles.wrapper, border, bgColorLight);
  return (
    <PageType
      render={(type) => (
        <div className={containerClass}>
          <div className={cardClass}>
            <Sidebar pageType={type} />
            <div className={wrapperClass}>
              <div className={styles.page}>{children}</div>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default UserPageTemplate;
