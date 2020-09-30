import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./QuickAdd.module.scss";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";
import AddRecepies from "../../../providers/AddRecepies";
import cx from "classnames";
import { connect } from "react-redux";
import { quickAddRecepie as quickAddAction } from "../../../redux/actions/index";

const QuickAdd = ({ item, setOpen, quickAdd, custom }) => {
  const [day, setDay] = useState("");
  const [meal, setMeal] = useState("");
  const wrapperClass = cx(styles.wrapper, custom);
  const handleAddRecepie = (day, meal, item) => {
    quickAdd(day, meal, item);
  };
  return (
    <AddRecepies
      render={() => (
        <div className={wrapperClass}>
          <h2 className={styles.heading}>Add recepie to your plan</h2>
          <div>
            <p className={styles.paragraph}>
              Selected recepie: <b>{item.title}</b>
            </p>
            <select
              name="day"
              className={styles.select}
              value={day}
              onChange={(event) => setDay(event.target.value)}
            >
              <option value="">select a day</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
            <select
              name="day"
              className={styles.select}
              value={meal}
              onChange={(event) => setMeal(event.target.value)}
            >
              <option value="">select a meal</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>
          <div className={styles.buttons}>
            <ButtonIconSmall
              bgImage="buttonDelete"
              btnSize="btn20"
              onClick={() => setOpen(false)}
            />
            <ButtonIconSmall
              bgImage="buttonAdd"
              btnSize="btn30"
              onClick={() => handleAddRecepie(day, meal, item)}
            />
          </div>
        </div>
      )}
    />
  );
};

QuickAdd.propTypes = {
  item: PropTypes.object,
  setOpen: PropTypes.func,
  quickAdd: PropTypes.func,
};

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    quickAdd: (day, meal, item) => dispatch(quickAddAction(day, meal, item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickAdd);
