import React, { Component } from "react";
import styles from "./AddRecepieForm.module.scss";
import cx from "classnames";
import FormAddTemplate from "../../../templates/FormAddTemplate/FormAddTemplate";
import ButtonIconSmall from "../../atoms/ButtonIconSmall/ButtonIconSmall";
import Button from "../../atoms/Button/Button";
import { connect } from "react-redux";
import { createRecepie as createRecepieAction } from "../../../redux/actions/index";

class AddRecepieForm extends Component {
  constructor(props) {
    this.state = {
      step: 1,
      editStep: null,
      editContent: "",
      title: this.props.recepieToEdit ? this.props.recepieToEdit.title : "",
      time: this.props.recepieToEdit ? this.props.recepieToEdit.extra.time : "",
      servings: this.props.recepieToEdit
        ? this.props.recepieToEdit.extra.servings
        : "",
      addInfo: this.props.recepieToEdit
        ? this.props.recepieToEdit.extra.info
        : "",
      unit: "-",
      meals: this.props.recepieToEdit ? this.props.recepieToEdit.category : [],
      ingredients: this.props.recepieToEdit
        ? this.props.recepieToEdit.ingredients
        : [],
      preparation: this.props.recepieToEdit
        ? this.props.recepieToEdit.preparation
        : [],
    };
    this.handleInputMeals = this.handleInputMeals.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
    this.handleAddPrepStep = this.handleAddPrepStep.bind(this);
    this.handleDeletePrepStep = this.handleDeletePrepStep.bind(this);
    this.handleEditPrepStep = this.handleEditPrepStep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: target.type === "number" ? Math.floor(parseInt(value)) : value,
    });
  }

  handleInputMeals(e) {
    const target = e.target;
    const value = target.checked;
    const name = target.name;
    if (value) {
      this.setState({
        meals: [...this.state.meals, name],
      });
    } else {
      const meals = this.state.meals.filter((meal) => !meal.includes(name));
      this.setState({
        meals,
      });
    }
  }

  handleAddIngredient() {
    const id = Math.floor(Math.random() * 1000);
    const ingredient = {
      id,
      title: this.state.ingredientTitle,
      amount: this.state.amount,
      unit: this.state.unit,
    };
    this.setState({
      ingredients: [...this.state.ingredients, ingredient],
    });
  }
  handleDeleteIngredient(item) {
    const ingredient = item;
    this.setState({
      ingredients: this.state.ingredients.filter(
        (item) => item.id !== ingredient.id
      ),
    });
  }

  handleAddPrepStep() {
    let step;
    if (this.state.editStep) {
      step = {
        step: this.state.editStep,
        content: this.state.content,
      };
    } else {
      step = {
        step: this.state.step,
        content: this.state.content,
      };
    }

    const preparation = this.state.preparation.filter((item) => {
      return item.step !== this.state.editStep && item.step !== this.state.step;
    });
    const actualStep = this.state.editStep && this.state.step;

    this.setState((prevState) => {
      return {
        preparation: [...preparation, step],
        step: actualStep ? actualStep : prevState.step + 1,
        content: "",
        editContent: "",
        editStep: null,
      };
    });
  }
  handleDeletePrepStep(step) {
    this.setState({
      preparation: this.state.preparation.filter(
        (item) => item.step !== step.step
      ),
    });
  }

  handleEditPrepStep(item) {
    this.setState({
      editStep: item.step,
      content: item.content,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const id = Math.floor(Math.random() * 100);
    const recepie = {
      id,
      category: this.state.meals,
      title: this.state.title,
      ingredients: this.state.ingredients,
      preparation: this.state.preparation,
      extra: {
        time: this.state.time,
        servings: this.state.servings,
      },
    };
    this.props.createRecepie(recepie);
    this.props.toggle();
  }

  render() {
    const mealsOptions = ["breakfast", "lunch", "dinner", "snacks"];
    const { classOpen } = this.props;

    return (
      <FormAddTemplate classOpen={classOpen}>
        <form>
          <label htmlFor="title">Write a title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            className={styles.titleInput}
            onChange={this.handleInputChange}
          ></input>
          <p className={styles.paragraphLabel}>
            Choose categorie of the recepie?
          </p>
          <div className={styles.wrapper}>
            {mealsOptions.map((meal) => {
              return (
                <div className={styles.mealInput}>
                  <input
                    type="checkbox"
                    name={meal}
                    id={meal}
                    className={styles.hidden}
                    onChange={this.handleInputMeals}
                  ></input>
                  <label
                    htmlFor={meal}
                    className={cx(styles.label, {
                      [`${styles.selectedMeal}`]: this.state.meals.includes(
                        meal
                      ),
                    })}
                  >
                    {meal}
                  </label>
                </div>
              );
            })}
          </div>

          <div className={styles.container}>
            <p className={styles.paragraphLabel}>Ingredients</p>
            <div className={styles.ingredientWrapper}>
              <div>
                <label htmlFor="ingredientTitle">Type an ingredient:</label>
                <input
                  type="text"
                  name="ingredientTitle"
                  id="ingredientTitle"
                  className={styles.titleInput}
                  onChange={this.handleInputChange}
                ></input>
              </div>
              <div>
                <label htmlFor="amount">Amount:</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  onChange={this.handleInputChange}
                ></input>
              </div>
              <label>
                Choose unit:
                <select
                  value={this.state.unit}
                  name="unit"
                  onChange={this.handleInputChange}
                >
                  <option value="g">g</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="l">l</option>
                  <option value="-">-</option>
                </select>
              </label>
              <ButtonIconSmall
                bgImage="buttonAdd"
                btnSize="btn30"
                type="button"
                custom={styles.button}
                onClick={this.handleAddIngredient}
              ></ButtonIconSmall>
            </div>
            {this.state.ingredients.length !== 0 && (
              <ul className={styles.ingredientsList}>
                {this.state.ingredients.map((item) => {
                  return (
                    <li className={styles.listItem}>
                      <span>{item.title}</span>
                      <span>
                        {item.amount} {item.unit}
                      </span>
                      <ButtonIconSmall
                        bgImage="buttonDelete"
                        btnSize="btn20"
                        type="button"
                        custom={styles.button}
                        onClick={() => this.handleDeleteIngredient(item)}
                      ></ButtonIconSmall>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className={styles.preparationWrapper}>
            <p className={styles.paragraphLabel}>Preparation</p>
            <label htmlFor="content">
              Step
              <input
                name="step"
                type="number"
                value={
                  this.state.editStep ? this.state.editStep : this.state.step
                }
                max="100"
                maxLength="2"
                className={styles.inputStep}
                onChange={this.handleInputChange}
              ></input>
            </label>
            <textarea
              id="content"
              name="content"
              value={this.state.content}
              onChange={this.handleInputChange}
            ></textarea>
            <ButtonIconSmall
              bgImage="buttonAdd"
              btnSize="btn30"
              type="button"
              custom={styles.button}
              onClick={this.handleAddPrepStep}
            ></ButtonIconSmall>
            {this.state.preparation.length !== 0 && (
              <ul>
                {this.state.preparation
                  .sort((a, b) => a.step - b.step)
                  .map((item) => {
                    return (
                      <li>
                        <p className={styles.paragraphLabel}>
                          Step {item.step}
                          <ButtonIconSmall
                            bgImage="buttonEdit"
                            btnSize="btn20"
                            type="button"
                            custom={styles.button}
                            onClick={() => this.handleEditPrepStep(item)}
                          ></ButtonIconSmall>
                          <ButtonIconSmall
                            bgImage="buttonDelete"
                            btnSize="btn20"
                            type="button"
                            custom={styles.button}
                            onClick={() => this.handleDeletePrepStep(item)}
                          ></ButtonIconSmall>
                        </p>
                        {item.content}
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>
          <div className={styles.extraWrapper}>
            <p className={styles.paragraphLabel}>Extra info</p>
            <div className={styles.rowWrapper}>
              <div>
                <label htmlFor="time">Preparation time:</label>
                <input
                  type="text"
                  name="time"
                  id="time"
                  value={this.state.time}
                  onChange={this.handleInputChange}
                ></input>
              </div>
              <div>
                <label htmlFor="servings">Servings:</label>
                <input
                  type="text"
                  name="servings"
                  id="servings"
                  value={this.state.servings}
                  onChange={this.handleInputChange}
                ></input>
              </div>
            </div>
            <label htmlFor="addInfo">Additional info:</label>
            <textarea
              id="addInfo"
              name="addInfo"
              value={this.state.addInfo}
              onChange={this.handleInputChange}
            ></textarea>
          </div>
          <Button type="submit" bgColor="bgPrimary" onClick={this.handleSubmit}>
            Add
          </Button>
          <ButtonIconSmall
            bgImage="buttonDelete"
            btnSize="btn30"
            type="button"
            custom={styles.buttonClose}
            onClick={this.props.toggle}
          ></ButtonIconSmall>
        </form>
      </FormAddTemplate>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRecepie: (recepie) => dispatch(createRecepieAction(recepie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRecepieForm);
