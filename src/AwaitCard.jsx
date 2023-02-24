import { Box, Typography } from "@mui/material";

export const AwaitCard = () => {
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
        Please choose a card, the others are waiting for you
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img src="/cards.svg" width="30%" />
      </Box>
    </Box>
  );
};
