import React, { useContext, useEffect, useState } from "react";
import styles from "./DetailsPage.module.scss";
import imageBg from "../../assets/2499038.jpg";
import Heading from "../../components/atoms/Heading/Heading";
import Paragraph from "../../components/atoms/Paragraph/Paragraph";
import Button from "../../components/atoms/Button/Button";
import ButtonIconSmall from "../../components/atoms/ButtonIconSmall/ButtonIconSmall";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import QuickAdd from "../../components/molecules/QuickAdd/QuickAdd";
import AddRecepie from "../../components/organisms/AddRecepie/AddRecepie";
import ToggleOpen from "../../providers/ToggleOpen";
import cx from "classnames";
import { connect } from "react-redux";
import { deleteRecepie as deleteRecepieAction } from "../../redux/actions/index";
import PopUpDelete from "../../components/molecules/PopUpDelete/PopUpDelete";
import { routes } from "../../routes/index";
import { Document, Page } from "react-pdf";
import { jsPDF } from "jspdf";
import * as html2canvas from "html2canvas";
import { RecepiesContext } from "../../context/RecepiesContext";
import { useLocation, useHistory } from "react-router";
import PlanContextProvider from "../../context/PlanContext";

const DetailsPage = () => {
  const [isOpenAdd, setOpenAdd] = useState(false);
  const [isOpenDelete, setOpenDelete] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const history = useHistory();
  const { getSingleRecepie, recepie, deleteRecepie } = useContext(
    RecepiesContext
  );

  useEffect(() => {
    getSingleRecepie(id);
  }, []);

  const handleCloseDelete = () => {
    setOpenDelete(!isOpenDelete);
  };
  const handleDelete = () => {
    deleteRecepie(id);
    setOpenDelete(!isOpenDelete);
    history.push(`${routes.recepies}`);
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

  // const id = location.pathname.slice(10, location.pathname.length);
  // const [recepie] = recepies && recepies.filter((item) => item.id === id);

  // const title = recepie ? recepie.title : "";
  // const preparationTime = recepie ? recepie.extra.time : "";
  // const servings = recepie ? recepie.extra.servings : "";
  // const meals = recepie ? recepie.category : [];
  // const ingredients = recepie ? recepie.ingredients : [];
  // const preparation = recepie ? recepie.preparation : [];
  // const addInfo = recepie ? recepie.extra.info : "";
  const imageUrlString = `http://localhost:4000/${recepie.recepieImage}`;
  const imageUrl =
    recepie.recepieImage !== ""
      ? imageUrlString.replace(/\\/g, "/")
      : `${imageBg}`;
  return (
    <ToggleOpen
      render={({ toggle, classOpen }) => (
        <UserPageTemplate border="borderPrimary" bgColorLight="bgPrimaryLight">
          <div className={styles.container} id="content">
            <div
              className={styles.header}
              style={{
                backgroundImage: `url(${imageUrl}), url(${imageUrl})`,
              }}
            >
              <div className={styles.headerVisible}>
                <Heading custom={styles.heading}>{recepie.title}</Heading>
                <Paragraph custom={styles.extraInfo}>
                  {recepie.time !== "" && (
                    <span>Preparation time: {recepie.time}</span>
                  )}
                  {recepie.servings !== "" && (
                    <span>Servings: {recepie.servings}</span>
                  )}
                  <ul>
                    Good for:
                    {recepie.category.map((item) => (
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
                  {recepie.ingredients.map((item) => (
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
                  {recepie.preparation.map((item) => (
                    <li>
                      <em>Step {item.step}</em>
                      <p>{item.content}</p>
                    </li>
                  ))}
                </ul>
              </section>
              <div className={styles.horLine}></div>
              {recepie.info !== "" && (
                <section className={styles.addInfo}>
                  <h3>Some additional info</h3>
                  {recepie.info}
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
                <PlanContextProvider>
                  <QuickAdd
                    item={recepie}
                    setOpen={setOpenAdd}
                    custom={styles.quickAdd}
                  />
                </PlanContextProvider>
              )}
              {classOpen === "activeForm" && (
                <AddRecepie
                  classOpen={classOpen}
                  toggle={toggle}
                  recepieToEdit={recepie}
                />
              )}
              {isOpenDelete && (
                <PopUpDelete
                  setOpen={handleCloseDelete}
                  deleteItem={handleDelete}
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
