import React, { useContext, useEffect, useState } from "react";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import WeekPlan from "../../components/organisms/WeekPlan/WeekPlan";
import styles from "./PlanPage.module.scss";
import ButtonIcon from "../../components/atoms/ButtonIcon/ButtonIcon";
import ToggleOpen from "../../providers/ToggleOpen";
import { PlanContext } from "../../context/PlanContext";
import { GlobalContext } from "../../context/GlobalContext";
import AddPlan from "../../components/organisms/AddPlan/AddPlan";
import { Redirect } from "react-router";

const PlanPage = () => {
  const [refresh, setRefresh] = useState(false);
  const { sendPlan, planToEdit } = useContext(PlanContext);
  const { getPlan,  userLoggedIn } = useContext(GlobalContext);
  
  useEffect(() => {
    getPlan();
  }, [refresh]);

  if (userLoggedIn === false) {
    return <Redirect to="/login" />;
  }

  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <UserPageTemplate border="borderSecondary">
          <div className={styles.wrapper}>
            <WeekPlan toggle={toggle} />
            <div className={styles.buttonWrapper}>
              <ButtonIcon
                bgColor="bgSecondary"
                custom={styles.button}
                onClick={toggle}
              />
            </div>
          </div>
          <AddPlan
            toggle={toggle}
            classOpen={classOpen}
            planToEdit={planToEdit}
            sendPlan={sendPlan}
            setRefresh={setRefresh}
          />
        </UserPageTemplate>
      )}
    />
  );
};

export default PlanPage;
