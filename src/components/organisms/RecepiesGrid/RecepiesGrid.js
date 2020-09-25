import React from "react";
import styles from "./RecepiesGrid.module.scss";
import RecepieCard from "../../molecules/RecepieCard/RecepieCard";
import { recepies } from "../../../dummyData/index";

const RecepiesGrid = ({ meal }) => {
  const recepiesArray = recepies[meal];
  return (
    <div className={styles.wrapper}>
      {recepiesArray.map((item) => {
        return (
          <div key={item.id}>
            <RecepieCard item={item} bgColor="bgPrimary" />
          </div>
        );
      })}
    </div>
  );
};

export default RecepiesGrid;
