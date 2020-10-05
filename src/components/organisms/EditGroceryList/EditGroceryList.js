import React, { useEffect, useState } from "react";
import styles from "./EditGroceryList.module.scss";
import IngredientsList from "../../molecules/IngredientsList/IngredientsList";
import Button from "../../atoms/Button/Button";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";
import { connect } from "react-redux";

const EditGroceryList = ({ list }) => {
  const [editedList, setEditedList] = useState([]);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Grocery List</h2>
      <IngredientsList ingredients={list} edit setEditedList={setEditedList} />
      <Button bgColor="bgTertiary" custom={styles.button}>
        Save
      </Button>
      <ButtonIconSmall
        bgImage="buttonDelete"
        btnSize="btn40"
        custom={styles.btnDelete}
      ></ButtonIconSmall>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    plan: state.plan,
  };
};

export default connect(mapStateToProps)(EditGroceryList);
