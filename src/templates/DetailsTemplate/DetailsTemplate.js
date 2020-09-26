import React from "react";
import Heading from "../../components/atoms/Heading/Heading";
import Paragraph from "../../components/atoms/Paragraph/Paragraph";
import Button from "../../components/atoms/Button/Button";
import UserPageTemplate from "../UserPageTemplate/UserPageTemplate";

const DetailsTemplate = () => {
  return (
    <UserPageTemplate>
      <Heading>Ryż z ziemniakami</Heading>
      <Paragraph>
        <span>Preparation time: 30min</span>
        <span>Servings: 4</span>
      </Paragraph>
      <div>
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
      </div>
      <div>
        <ul>
          <li>
            Step 1
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              ornare dapibus magna vitae ultricies. Vestibulum sit amet ex orci.
              Pellentesque tincidunt mi a aliquet faucibus. Quisque ut felis
              ante. Sed finibus sodales ligula, vel placerat ipsum pharetra
              vulputate. Aenean varius pulvinar malesuada. Donec nec blandit
              arcu. Integer ac ante luctus erat rutrum sollicitudin sed eu
              massa. Integer placerat ante sed dui feugiat sagittis.
              Pellentesque lacinia condimentum mi, ut egestas tortor porttitor
              sed. Praesent nisi sapien, luctus sit amet pretium et, tristique
              nec erat. Pellentesque sit amet elit iaculis, volutpat neque ut,
              congue magna. Donec nec purus lorem. Praesent justo massa, rutrum
              vel ante at, hendrerit imperdiet velit. Cras venenatis diam est.
            </p>
          </li>
          <li>
            Step 2
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              ornare dapibus magna vitae ultricies. Vestibulum sit amet ex orci.
              Pellentesque tincidunt mi a aliquet faucibus. Quisque ut felis
              ante. Sed finibus sodales ligula, vel placerat ipsum pharetra
              vulputate. Aenean varius pulvinar malesuada. Donec nec blandit
              arcu. Integer ac ante luctus erat rutrum sollicitudin sed eu
              massa. Integer placerat ante sed dui feugiat sagittis.
              Pellentesque lacinia condimentum mi, ut egestas tortor porttitor
              sed. Praesent nisi sapien, luctus sit amet pretium et, tristique
              nec erat. Pellentesque sit amet elit iaculis, volutpat neque ut,
              congue magna. Donec nec purus lorem. Praesent justo massa, rutrum
              vel ante at, hendrerit imperdiet velit. Cras venenatis diam est.
            </p>
          </li>
          <li>
            Step 3
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              ornare dapibus magna vitae ultricies. Vestibulum sit amet ex orci.
              Pellentesque tincidunt mi a aliquet faucibus. Quisque ut felis
              ante. Sed finibus sodales ligula, vel placerat ipsum pharetra
              vulputate. Aenean varius pulvinar malesuada. Donec nec blandit
              arcu. Integer ac ante luctus erat rutrum sollicitudin sed eu
              massa. Integer placerat ante sed dui feugiat sagittis.
              Pellentesque lacinia condimentum mi, ut egestas tortor porttitor
              sed. Praesent nisi sapien, luctus sit amet pretium et, tristique
              nec erat. Pellentesque sit amet elit iaculis, volutpat neque ut,
              congue magna. Donec nec purus lorem. Praesent justo massa, rutrum
              vel ante at, hendrerit imperdiet velit. Cras venenatis diam est.
            </p>
          </li>
        </ul>
      </div>
      <div>
        <Button>Add to plan</Button>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    </UserPageTemplate>
  );
};

export default DetailsTemplate;
