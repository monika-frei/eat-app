import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./PopUpDelete.module.scss";
import Button from "../../atoms/Button/Button";

const PopUpDelete = ({ setOpen, deleteItem }) => {
  return (
    <div className={styles.container}>
      <h3>Do you really want to delete this item?</h3>
      <div className={styles.buttons}>
        <Button bgColor="bgGrey" custom={styles.button} onClick={deleteItem}>
          Yes
        </Button>
        <Button bgColor="bgSecondary" custom={styles.button} onClick={setOpen}>
          No!
        </Button>
      </div>
    </div>
  );
};

PopUpDelete.propTypes = {
  setOpen: PropTypes.func.isRequired,
  deleteRecepie: PropTypes.func.isRequired,
};

export default PopUpDelete;
