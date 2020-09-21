import React from "react";
import styles from "./UserPageTemplate.module.scss";
import Sidebar from "../../components/organisms/Sidebar/Sidebar";
import Heading from "../../components/atoms/Heading/Heading";
import PageType from "../../providers/PageType";

import cx from "classnames";

const UserPageTemplate = ({ children, bgColor, border }, props) => {
  const cardClass = cx(styles.card, bgColor, border);
  return (
    <PageType
      render={(type) => (
        <div className={styles.container}>
          <div className={cardClass}>
            <Sidebar pageType={type} />
            <div className={styles.wrapper}>
              <Heading custom={styles.heading}>
                {type === "plan" && "Weekly plan"}
                {type === "recepies" && "Recepies"}
                {type === "grocerylist" && "Grocery list"}
              </Heading>
              {children}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default UserPageTemplate;
