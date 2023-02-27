import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { MEDIAQUERY_MOBILE_GAP } from "../constants";

export const CardTitle = ({ title, subtitle, show, handleShow }) => {
  const moreButtonHide = useMediaQuery(MEDIAQUERY_MOBILE_GAP);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <Typography
        sx={{ fontSize: 20, fontWeight: "bold" }}
        color="text.primary"
      >
        {title}
      </Typography>
      {!show && !!subtitle && (
        <Typography sx={{ fontSize: 20 }} color="text.primary">
          {`[${subtitle}]`}
        </Typography>
      )}
      <IconButton
        size="small"
        onClick={handleShow}
        title={show ? "Hide" : "Show"}
      >
        {!moreButtonHide && (show ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </IconButton>
    </Box>
  );
};
