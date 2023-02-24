import { Box, Typography } from "@mui/material";

export const AwaitRegistering = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          paddingTop: "50px",
          paddingBottom: "50px",
          textAlign: "center",
        }}
        color="text.primary"
        gutterBottom
      >
        Please choose an id and register
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src="/login.svg" width="30%" />
      </Box>
    </Box>
  );
};
