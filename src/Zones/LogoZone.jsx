import { Box, Typography } from "@mui/material";

export const LogoZone = () => {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src="/icon.svg" width="20%" />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography
          sx={{ fontSize: 30, fontWeight: "bold", paddingBottom: "15px" }}
          color="text.primary"
          gutterBottom
        >
          Plokering
        </Typography>
      </Box>
    </>
  );
};
