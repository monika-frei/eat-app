import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./PopupRecepies.module.scss";
import Search from "../../atoms/Search/Search";
import { RecepiesContext } from "../../../context/RecepiesContext";

const PopupRecepies = ({ meal, handleSaveRecepie, handleClose }) => {
  const [inputContent, setInputContent] = useState("");
  const { getAllRecepies, recepies } = useContext(RecepiesContext);

  useEffect(() => {
    getAllRecepies();
  }, []);

  const handleInputChange = (e) => {
    setInputContent(e.target.value);
  };

  return (
    <div className={styles.recepies}>
      <button
        className={styles.closeIcon}
        onClick={handleClose}
        type="button"
      />
      <Search
        custom={styles.search}
        value={inputContent}
        onChange={handleInputChange}
      />
      <ul className={styles.list}>
        {recepies
          .filter((item) => item.title.includes(inputContent.toLowerCase()))
          .map((item) => {
            return (
              <li className={styles.listItem} key={item._id}>
                <button
                  data-title={item.title}
                  onClick={() => handleSaveRecepie(item, meal)}
                  type="button"
                >
                  {item.title}
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default PopupRecepies;
