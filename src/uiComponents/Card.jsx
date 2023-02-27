import { Card, CardActions, CardContent } from "@mui/material";
import { useState } from "react";

import { CardTitle } from "./CardTitle";

export const MobileCard = ({
  title,
  subtitle,
  content,
  actions,
  shouldBeHidden,
}) => {
  const [show, setShow] = useState(shouldBeHidden ? false : true);

  const handleShow = () => {
    setShow(!show);
  };
  return (
    <Card elevation={4} sx={{ marginBottom: "20px" }}>
      <CardTitle
        title={title}
        subtitle={subtitle}
        show={show}
        handleShow={handleShow}
      />

      {show && <CardContent> {content}</CardContent>}
      {show && !!actions && <CardActions> {actions}</CardActions>}
    </Card>
  );
};
