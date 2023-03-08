import { Box, Typography } from "@mui/material";

export const Container = ({ children, text }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: "20px",
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
        {text}
      </Typography>
      {children}
    </Box>
  );
};
