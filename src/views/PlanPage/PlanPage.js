import React from "react";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import WeekPlan from "../../components/organisms/WeekPlan/WeekPlan";
import styles from "./PlanPage.module.scss";
import ButtonIcon from "../../components/atoms/ButtonIcon/ButtonIcon";
import AddPlanForm from "../../components/organisms/AddPlanForm/AddPlanForm";
import ToggleOpen from "../../providers/ToggleOpen";
import AddRecepies from "../../providers/AddRecepies";

const PlanPage = (props) => {
  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <AddRecepies
          render={({
            day,
            setDay,
            meals,
            meal,
            savedRecepies,
            handleSaveRecepie,
            handleAddRecepie,
            handleDeleteRecepie,
            setOpen,
            open,
            setSavedRecepies,
            handleEdit,
          }) => (
            <UserPageTemplate
              bgColorLight="bgSecondaryLight"
              border="borderSecondary"
            >
              <div className={styles.wrapper}>
                <WeekPlan toggle={toggle} handleEdit={handleEdit} />
                <div className={styles.buttonWrapper}>
                  <ButtonIcon
                    bgColor="bgSecondary"
                    custom={styles.button}
                    onClick={toggle}
                  />
                </div>
              </div>
              <AddPlanForm
                classOpen={classOpen}
                day={day}
                setDay={setDay}
                meals={meals}
                meal={meal}
                savedRecepies={savedRecepies}
                setSavedRecepies={setSavedRecepies}
                handleSaveRecepie={handleSaveRecepie}
                handleAddRecepie={handleAddRecepie}
                handleDeleteRecepie={handleDeleteRecepie}
                setOpen={setOpen}
                open={open}
                toggle={toggle}
              />
            </UserPageTemplate>
          )}
        />
      )}
    />
  );
};

export default PlanPage;
