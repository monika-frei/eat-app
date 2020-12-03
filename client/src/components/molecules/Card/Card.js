import React from "react";
import styles from "./Card.module.scss";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";

const Card = ({ meal, savedRecepies, handleAddRecepie, handleDelete }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <h3>{meal}</h3>
        {handleAddRecepie && (
          <ButtonIconSmall
            bgImage="buttonAdd"
            btnSize="btn30"
            onClick={(e) => handleAddRecepie(e, meal)}
            type="button"
          ></ButtonIconSmall>
        )}
      </div>
      {savedRecepies && savedRecepies.length > 0 && (
        <ul className={styles.list}>
          {savedRecepies.map((recepie, index) => (
            <li
              key={`${recepie.title}-${recepie.id}-${meal}-${index}`}
              className={styles.listItem}
            >
              {handleDelete && (
                <ButtonIconSmall
                  bgImage="buttonDelete"
                  btnSize="btn20"
                  custom={styles.buttonDelete}
                  onClick={() => handleDelete(meal, recepie)}
                ></ButtonIconSmall>
              )}
              <div>{recepie.title}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Card;
