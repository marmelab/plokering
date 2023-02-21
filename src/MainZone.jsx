import { Box } from "@mui/material";

export const MainZone = ({ chosenCards, messages }) => {
  return (
    <>
      Cards:
      <br />
      {JSON.stringify(chosenCards)}
      <br />
      <br />
      Messages:
      <br />
      <Box component="p" sx={{ whiteSpace: "pre-line" }}>
        {messages}
      </Box>
    </>
  );
};
