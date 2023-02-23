import { Box, CircularProgress, Typography } from "@mui/material";

export const AwaitVoters = () => {
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
        Waiting for others players
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    </Box>
  );
};
