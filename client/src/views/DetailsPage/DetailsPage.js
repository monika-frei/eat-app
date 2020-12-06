import React, { useContext, useEffect, useState } from "react";
import styles from "./DetailsPage.module.scss";
import imageBg from "../../assets/2499038.jpg";
import Heading from "../../components/atoms/Heading/Heading";
import Paragraph from "../../components/atoms/Paragraph/Paragraph";
import Button from "../../components/atoms/Button/Button";
import ButtonIconSmall from "../../components/atoms/ButtonIconSmall/ButtonIconSmall";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import QuickAdd from "../../components/molecules/QuickAdd/QuickAdd";
import AddRecipe from "../../components/organisms/AddRecipe/AddRecipe";
import ToggleOpen from "../../providers/ToggleOpen";
import cx from "classnames";
import PopUpDelete from "../../components/molecules/PopUpDelete/PopUpDelete";
import { routes } from "../../routes/index";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";
import { RecipesContext } from "../../context/RecipesContext";
import { useLocation, useHistory, Redirect } from "react-router";
import PlanContextProvider from "../../context/PlanContext";
import { GlobalContext } from "../../context/GlobalContext";

const DetailsPage = () => {
  const [isOpenAdd, setOpenAdd] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const history = useHistory();
  const { userId, userLoggedIn } = useContext(GlobalContext);
  const { getSingleRecipe, recipe, deleteRecipe } = useContext(RecipesContext);

  useEffect(() => {
    getSingleRecipe(id);
  }, []);

  const handleCloseDelete = () => {
    setOpenDelete(!isOpenDelete);
  };
  const handleDelete = () => {
    deleteRecipe(id);
    setOpenDelete(!isOpenDelete);
    history.push(`${routes.recipes}`);
  };

  const generatePdf = () => {
    const input = document.getElementById("content");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };
  const imageUrlString = `http://localhost:4000/${recipe.recipeImage}`;
  const imageUrl =
    recipe.recipeImage !== ""
      ? imageUrlString.replace(/\\/g, "/")
      : `${imageBg}`;

  if (userLoggedIn === false) {
    return <Redirect to="/login" />;
  }

  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <UserPageTemplate border="borderPrimary" bgColorLight="bgPrimaryLight">
          <div className={styles.container} id="content">
            <div
              className={styles.header}
              style={{
                backgroundImage: `url(${imageUrl})`,
              }}
            >
              <div className={styles.headerVisible}>
                <Heading custom={styles.heading}>{recipe.title}</Heading>
                <Paragraph custom={styles.extraInfo}>
                  {recipe.time !== "" && (
                    <span>Preparation time: {recipe.time}</span>
                  )}
                  {recipe.servings !== "" && (
                    <span>Servings: {recipe.servings}</span>
                  )}
                  <ul>
                    <span>Good for: </span>
                    {recipe.category.map((item) => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </Paragraph>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "25rem",
                }}
              ></div>
            </div>
            <ButtonIconSmall
              bgImage="buttonPrint"
              custom={styles.btnPrint}
              onClick={() => generatePdf()}
            ></ButtonIconSmall>
            <section className={styles.recepie}>
              <section className={styles.ingredients}>
                <h2>Ingredients</h2>
                <ul>
                  {recipe.ingredients.map((item) => (
                    <li>
                      {item.title}
                      <span>
                        {item.amount}
                        {item.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className={styles.preparationWrapper}>
                <h2>Preparation</h2>
                <ul>
                  {recipe.preparation.map((item) => (
                    <li>
                      <em>Step {item.step}</em>
                      <p>{item.content}</p>
                    </li>
                  ))}
                </ul>
              </section>
              <div className={styles.horLine}></div>
              {recipe.info !== "" && (
                <section className={styles.addInfo}>
                  <h2>Some additional info</h2>
                  <p>{recipe.info}</p>
                </section>
              )}
              <div className={styles.buttons}>
                {userId === recipe.userId && (
                  <Button
                    bgColor="bgSecondary"
                    custom={cx(styles.btn, styles.btnSecondary)}
                    onClick={toggle}
                  >
                    Edit
                  </Button>
                )}

                <Button
                  bgColor="bgPrimary"
                  custom={cx(styles.btn, styles.btnPrimary)}
                  onClick={() => setOpenAdd(!isOpenAdd)}
                >
                  Add to plan
                </Button>
                {userId === recipe.userId && (
                  <Button
                    bgColor="bgGrey"
                    custom={cx(styles.btn, styles.btnGrey)}
                    onClick={() => setOpenDelete(!isOpenDelete)}
                  >
                    Delete
                  </Button>
                )}
              </div>
              {isOpenAdd && (
                <PlanContextProvider>
                  <QuickAdd
                    item={recipe}
                    setOpen={setOpenAdd}
                    custom={styles.quickAdd}
                  />
                </PlanContextProvider>
              )}
              <AddRecipe
                classOpen={classOpen}
                toggle={toggle}
                recepieToEdit={recipe}
              />
              {isOpenDelete && (
                <PopUpDelete
                  setOpen={handleCloseDelete}
                  deleteItem={handleDelete}
                  custom={styles.delete}
                />
              )}
            </section>
          </div>
        </UserPageTemplate>
      )}
    />
  );
};

export default DetailsPage;
