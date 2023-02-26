import { Card as MuiCard, CardActions, CardContent } from "@mui/material";
import { useState } from "react";

import { CardTitle } from "./CardTitle";

export const Card = ({ children }) => (
  <MuiCard elevation={4} sx={{ marginBottom: "20px" }}>
    {children}
  </MuiCard>
);

export const MobileCard = ({ title, subtitle, content, actions }) => {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <MuiCard elevation={4} sx={{ marginBottom: "20px" }}>
      <CardTitle
        title={title}
        subtitle={subtitle}
        show={show}
        handleShow={handleShow}
      />

      {show && <CardContent> {content}</CardContent>}
      {show && !!actions && <CardActions> {actions}</CardActions>}
    </MuiCard>
  );
};
