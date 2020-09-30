import React from "react";
import styles from "./GroceryListPage.module.scss";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import Heading from "../../components/atoms/Heading/Heading";
import ButtonIcon from "../../components/atoms/ButtonIcon/ButtonIcon";
import GroceryList from "../../components/organisms/GroceryList/GroceryList";

const GroceryListPage = () => {
  return (
    <UserPageTemplate border="borderTertiary" bgColorLight="bgTertiaryLight">
      <Heading custom={styles.heading}>Grocery list</Heading>
      <div className={styles.wrapper}>
        <GroceryList />
        <div className={styles.buttons}>
          <ButtonIcon bgColor="bgTertiary" custom={styles.button} />
          <ButtonIcon bgColor="bgTertiary" custom={styles.button} />
        </div>
      </div>
    </UserPageTemplate>
  );
};

export default GroceryListPage;
