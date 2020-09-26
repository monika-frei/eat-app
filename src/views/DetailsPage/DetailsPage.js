import React from "react";
import styles from "./DetailsPage.module.scss";
import Heading from "../../components/atoms/Heading/Heading";
import Paragraph from "../../components/atoms/Paragraph/Paragraph";
import Button from "../../components/atoms/Button/Button";
import ButtonIconSmall from "../../components/atoms/ButtonIconSmall/ButtonIconSmall";
import UserPageTemplate from "../../templates/UserPageTemplate/UserPageTemplate";
import cx from "classnames";

const DetailsPage = () => {
  return (
    <UserPageTemplate border="borderPrimary" bgColorLight="bgPrimaryLight">
      <div className={styles.container}>
        <Heading custom={styles.heading}>Ryż z ziemniakami</Heading>
        <Paragraph custom={styles.extraInfo}>
          <span>Preparation time: 30min</span>
          <span>Servings: 4</span>
        </Paragraph>
        <ButtonIconSmall
          bgImage="buttonPrint"
          btnSize="btn30"
          custom={styles.btnPrint}
        ></ButtonIconSmall>
        <div className={styles.horLine}></div>
        <section className={styles.ingredients}>
          <h2>Ingredients</h2>
          <ul>
            <li>
              ryż <span>100g</span>
            </li>
            <li>
              ziemniaki <span>100g</span>
            </li>
            <li>
              cukinia <span>100g</span>
            </li>
            <li>
              marchewka <span>100g</span>
            </li>
          </ul>
        </section>
        <section className={styles.preparationWrapper}>
          <h2>Preparation</h2>
          <ul>
            <li>
              <em>Step 1</em>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                ornare dapibus magna vitae ultricies. Vestibulum sit amet ex
                orci. Pellentesque tincidunt mi a aliquet faucibus. Quisque ut
                felis ante. Sed finibus sodales ligula, vel placerat ipsum
                pharetra vulputate. Aenean varius pulvinar malesuada. Donec nec
                blandit arcu. Integer ac ante luctus erat rutrum sollicitudin
                sed eu massa. Integer placerat ante sed dui feugiat sagittis.
                Pellentesque lacinia condimentum mi, ut egestas tortor porttitor
                sed. Praesent nisi sapien, luctus sit amet pretium et, tristique
                nec erat. Pellentesque sit amet elit iaculis, volutpat neque ut,
                congue magna. Donec nec purus lorem. Praesent justo massa,
                rutrum vel ante at, hendrerit imperdiet velit. Cras venenatis
                diam est.
              </p>
            </li>
            <li>
              <em>Step 2</em>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                ornare dapibus magna vitae ultricies. Vestibulum sit amet ex
                orci. Pellentesque tincidunt mi a aliquet faucibus. Quisque ut
                felis ante. Sed finibus sodales ligula, vel placerat ipsum
                pharetra vulputate. Aenean varius pulvinar malesuada. Donec nec
                blandit arcu. Integer ac ante luctus erat rutrum sollicitudin
                sed eu massa. Integer placerat ante sed dui feugiat sagittis.
                Pellentesque lacinia condimentum mi, ut egestas tortor porttitor
                sed. Praesent nisi sapien, luctus sit amet pretium et, tristique
                nec erat. Pellentesque sit amet elit iaculis, volutpat neque ut,
                congue magna. Donec nec purus lorem. Praesent justo massa,
                rutrum vel ante at, hendrerit imperdiet velit. Cras venenatis
                diam est.
              </p>
            </li>
            <li>
              <em>Step 3</em>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                ornare dapibus magna vitae ultricies. Vestibulum sit amet ex
                orci. Pellentesque tincidunt mi a aliquet faucibus. Quisque ut
                felis ante. Sed finibus sodales ligula, vel placerat ipsum
                pharetra vulputate. Aenean varius pulvinar malesuada. Donec nec
                blandit arcu. Integer ac ante luctus erat rutrum sollicitudin
                sed eu massa. Integer placerat ante sed dui feugiat sagittis.
                Pellentesque lacinia condimentum mi, ut egestas tortor porttitor
                sed. Praesent nisi sapien, luctus sit amet pretium et, tristique
                nec erat. Pellentesque sit amet elit iaculis, volutpat neque ut,
                congue magna. Donec nec purus lorem. Praesent justo massa,
                rutrum vel ante at, hendrerit imperdiet velit. Cras venenatis
                diam est.
              </p>
            </li>
          </ul>
        </section>
        <div className={styles.horLine}></div>
        <section className={styles.addInfo}>
          <h3>Some additional info</h3>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare
          dapibus magna vitae ultricies. Vestibulum sit amet ex orci.
          Pellentesque tincidunt mi a aliquet faucibus. Quisque ut felis ante.
        </section>
        <div className={styles.buttons}>
          <Button
            bgColor="bgSecondary"
            custom={cx(styles.btn, styles.btnSecondary)}
          >
            Edit
          </Button>
          <Button
            bgColor="bgPrimary"
            custom={cx(styles.btn, styles.btnPrimary)}
          >
            Add to plan
          </Button>
          <Button bgColor="bgGrey" custom={cx(styles.btn, styles.btnGrey)}>
            Delete
          </Button>
        </div>
      </div>
    </UserPageTemplate>
  );
};

export default DetailsPage;
