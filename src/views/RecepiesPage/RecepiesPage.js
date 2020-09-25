import React from "react";
import styles from "./RecepiesPage.module.scss";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import Button from "../../components/atoms/Button/Button";
import RecepiesGrid from "../../components/organisms/RecepiesGrid/RecepiesGrid";
import ButtonIcon from "../../components/atoms/ButtonIcon/ButtonIcon";
import Search from "../../components/atoms/Search/Search";
import AddPlanForm from "../../components/organisms/AddPlanForm/AddPlanForm";
import ToggleOpen from "../../providers/ToggleOpen";

const RecepiesPage = () => {
  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <UserPageTemplate border="borderPrimary">
          <div className={styles.wrapper}>
            <div className={styles.buttons}>
              <Button bgColor="bgPrimary" custom={styles.button}>
                Breakfast
              </Button>
              <Button bgColor="bgPrimary" custom={styles.button}>
                Lunch
              </Button>
              <Button bgColor="bgPrimary" custom={styles.button}>
                Dinner
              </Button>
              <Button bgColor="bgPrimary" custom={styles.button}>
                Snacks
              </Button>
            </div>
            <Search custom={styles.input} />
            <RecepiesGrid meal="breakfast" />
            <div className={styles.buttonWrapper}>
              <ButtonIcon
                bgColor="bgPrimary"
                custom={styles.buttonAdd}
                onClick={toggle}
              />
            </div>
          </div>
          <AddPlanForm classOpen={classOpen} />
        </UserPageTemplate>
      )}
    />
  );
};

export default RecepiesPage;
