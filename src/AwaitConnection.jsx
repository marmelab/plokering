import { Box, Typography } from "@mui/material";

export const AwaitConnection = () => {
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
        Please connect with people
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src="/team.svg" width="30%" />
      </Box>
    </Box>
  );
};
