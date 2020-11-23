import React, { useEffect, useState } from "react";

const ToggleOpen = (props) => {
  const [open, setOpen] = useState(false);
  const [classOpen, setClassOpen] = useState("");

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      setClassOpen("activeForm");
    } else {
      setClassOpen("");
    }
  });

  const renderProps = {
    classOpen,
    toggle,
  };

  return props.render(renderProps);
};

export default ToggleOpen;
