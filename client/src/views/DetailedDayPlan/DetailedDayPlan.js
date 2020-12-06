import React, { useContext, useEffect, useState } from "react";
import styles from "./DetailedDayPlan.module.scss";
import ToggleOpen from "../../providers/ToggleOpen";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import Heading from "../../components/atoms/Heading/Heading";
import Paragraph from "../../components/atoms/Paragraph/Paragraph";
import ButtonIconSmall from "../../components/atoms/ButtonIconSmall/ButtonIconSmall";
import RecipeCard from "../../components/molecules/RecipeCard/RecipeCard";
import { PlanContext } from "../../context/PlanContext";
import { useHistory, useLocation, Redirect } from "react-router";
import { meals } from "../../constans/index";
import AddPlan from "../../components/organisms/AddPlan/AddPlan";
import PopUpDelete from "../../components/molecules/PopUpDelete/PopUpDelete";
import QuickAdd from "../../components/molecules/QuickAdd/QuickAdd";
import PlanContextProvider from "../../context/PlanContext";
import { GlobalContext } from "../../context/GlobalContext";

const DetailedDayPlan = () => {
  const {
    getPlanById,
    sendPlan,
    dayPlan,
    setPlanToEdit,
    planToEdit,
    deletePlan,
  } = useContext(PlanContext);
  const { userLoggedIn } = useContext(GlobalContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const history = useHistory();
  const [isOpenDelete, setOpenDelete] = useState(false);
  const [isOpenQuickAdd, setOpenQuickAdd] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState({});
  const [refresh, setRefresh] = useState(false);

  const handleToggleDeletePopUp = () => {
    setOpenDelete(!isOpenDelete);
  };

  useEffect(() => {
    getPlanById(id);
  }, [refresh]);

  const handleQuickAdd = (item) => {
    setOpenQuickAdd(!isOpenQuickAdd);
    setActiveRecipe(item);
  };

  const handleDeletePlan = () => {
    deletePlan(id);
    setOpenDelete(!isOpenDelete);
    history.push("/plan");
  };

  if (userLoggedIn === false) {
    return <Redirect to="/login" />;
  }

  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <UserPageTemplate
          border="borderSecondary"
          bgColorLight="bgSecondaryLight"
        >
          <div className={styles.container} id="content">
            <div className={styles.header}>
              <Heading custom={styles.heading}>
                {dayPlan && dayPlan.day}
              </Heading>
              <Paragraph custom={styles.heading}>
                {dayPlan && dayPlan.date}
              </Paragraph>
              <div className={styles.buttons}>
                <ButtonIconSmall
                  bgImage="buttonDelete"
                  btnSize="btn20"
                  onClick={() => setOpenDelete(!isOpenDelete)}
                  type="button"
                  custom={styles.button}
                ></ButtonIconSmall>
                <ButtonIconSmall
                  bgImage="buttonAdd"
                  btnSize="btn30"
                  onClick={() => {
                    toggle();
                    setPlanToEdit(dayPlan);
                  }}
                  type="button"
                  custom={styles.button}
                ></ButtonIconSmall>
              </div>
            </div>
            <div className={styles.planWrapper}>
              {dayPlan &&
                meals.map((meal) => {
                  if (dayPlan.plan[meal].length !== 0) {
                    return (
                      <div key={meal} className={styles.mealPlanWrapper}>
                        <h2>{meal}</h2>
                        <div className={styles.recepiesContainer}>
                          {dayPlan.plan[meal].map((recipe) => (
                            <div key={`${meal}-${recipe._id}`}>
                              <RecipeCard
                                item={recipe}
                                handleQuickAdd={handleQuickAdd}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <AddPlan
            toggle={toggle}
            classOpen={classOpen}
            planToEdit={planToEdit}
            setRefresh={setRefresh}
            sendPlan={sendPlan}
          />
          {isOpenQuickAdd && (
            <PlanContextProvider>
              <QuickAdd
                item={activeRecipe}
                setOpen={setOpenQuickAdd}
                custom={styles.quickAdd}
              />
            </PlanContextProvider>
          )}
          {isOpenDelete && (
            <PopUpDelete
              deleteItem={handleDeletePlan}
              setOpen={handleToggleDeletePopUp}
            />
          )}
        </UserPageTemplate>
      )}
    />
  );
};

export default DetailedDayPlan;
