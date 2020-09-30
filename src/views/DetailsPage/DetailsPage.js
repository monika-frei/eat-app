import React, { useEffect, useState } from "react";
import styles from "./DetailsPage.module.scss";
import Heading from "../../components/atoms/Heading/Heading";
import Paragraph from "../../components/atoms/Paragraph/Paragraph";
import Button from "../../components/atoms/Button/Button";
import ButtonIconSmall from "../../components/atoms/ButtonIconSmall/ButtonIconSmall";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import QuickAdd from "../../components/molecules/QuickAdd/QuickAdd";
import AddRecepieForm from "../../components/organisms/AddRecepieForm/AddRecepieForm";
import ToggleOpen from "../../providers/ToggleOpen";
import cx from "classnames";
import { connect } from "react-redux";
import { deleteRecepie as deleteRecepieAction } from "../../redux/actions/index";
import PopUpDelete from "../../components/molecules/PopUpDelete/PopUpDelete";
import { routes } from "../../routes/index";
import { Document, Page } from "react-pdf";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";

const DetailsPage = ({ history, recepies, location, deleteRecepie }) => {
  const [isOpenAdd, setOpenAdd] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => {
    setOpenDelete(!isOpenDelete);
  };
  const handleDelete = (recepie) => {
    history.push(`${routes.recepies}`);
    deleteRecepie(recepie);
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

  const id = location.pathname.slice(10, location.pathname.length);
  const [recepie] = recepies && recepies.filter((item) => item.id === id);

  const title = recepie ? recepie.title : "";
  const preparationTime = recepie ? recepie.extra.time : "";
  const servings = recepie ? recepie.extra.servings : "";
  const meals = recepie ? recepie.category : [];
  const ingredients = recepie ? recepie.ingredients : [];
  const preparation = recepie ? recepie.preparation : [];
  const addInfo = recepie ? recepie.extra.info : "";

  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <UserPageTemplate border="borderPrimary" bgColorLight="bgPrimaryLight">
          <div className={styles.container} id="content">
            <Heading custom={styles.heading}>{title}</Heading>
            <Paragraph custom={styles.extraInfo}>
              {preparationTime !== "" && (
                <span>Preparation time: {preparationTime}</span>
              )}
              {servings !== "" && <span>Servings: {servings}</span>}
              <ul>
                Good for:{" "}
                {meals.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </Paragraph>
            <ButtonIconSmall
              bgImage="buttonPrint"
              btnSize="btn30"
              custom={styles.btnPrint}
              onClick={() => generatePdf()}
            ></ButtonIconSmall>
            <div className={styles.horLine}></div>
            <section className={styles.ingredients}>
              <h2>Ingredients</h2>
              <ul>
                {ingredients.map((item) => (
                  <li>
                    {item.title}{" "}
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
                {preparation.map((item) => (
                  <li>
                    <em>Step {item.step}</em>
                    <p>{item.content}</p>
                  </li>
                ))}
              </ul>
            </section>
            <div className={styles.horLine}></div>
            {addInfo !== "" && (
              <section className={styles.addInfo}>
                <h3>Some additional info</h3>
                {addInfo}
              </section>
            )}
            <div className={styles.buttons}>
              <Button
                bgColor="bgSecondary"
                custom={cx(styles.btn, styles.btnSecondary)}
                onClick={toggle}
              >
                Edit
              </Button>
              <Button
                bgColor="bgPrimary"
                custom={cx(styles.btn, styles.btnPrimary)}
                onClick={() => setOpenAdd(!isOpenAdd)}
              >
                Add to plan
              </Button>
              <Button
                bgColor="bgGrey"
                custom={cx(styles.btn, styles.btnGrey)}
                onClick={() => setOpenDelete(!isOpenDelete)}
              >
                Delete
              </Button>
            </div>
            {isOpenAdd && (
              <QuickAdd
                item={recepie}
                setOpen={setOpenAdd}
                custom={styles.quickAdd}
              />
            )}
            {classOpen === "activeForm" && (
              <AddRecepieForm
                classOpen={classOpen}
                toggle={toggle}
                recepieToEdit={recepie}
              />
            )}
            {isOpenDelete && (
              <PopUpDelete
                setOpen={handleCloseDelete}
                recepie={recepie}
                deleteRecepie={() => handleDelete(recepie)}
              />
            )}
          </div>
        </UserPageTemplate>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    recepies: state.recepies,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteRecepie: (recepie) => dispatch(deleteRecepieAction(recepie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
