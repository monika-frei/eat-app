import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./PopupRecepies.module.scss";
import Search from "../../atoms/Search/Search";

const PopupRecepies = ({ recepies, meal, handleSaveRecepie, handleClose }) => {
  const [inputContent, setInputContent] = useState("");
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
          .filter((item) => item.title.includes(inputContent))
          .map((item) => {
            const appUrl = `/recepies/:${item.id}`;
            const recepie = {
              meal,
              id: item.id,
              title: item.title,
              ingredients: item.ingredients,
              appUrl,
            };
            return (
              <li className={styles.listItem} key={appUrl}>
                <button
                  data-appUrl={appUrl}
                  data-title={item.title}
                  onClick={() => handleSaveRecepie(recepie)}
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

const mapStateToProps = (state) => {
  const { recepies } = state;
  return {
    recepies,
  };
};

PopupRecepies.propTypes = {
  recepies: PropTypes.array.isRequired,
  meal: PropTypes.string.isRequired,
  handleSaveRecepie: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PopupRecepies);
