import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from "@mui/material";

import { CARDS_SET_LIST } from "../constants";
import { isRegistered } from "../tools";
import { MobileCard } from "../uiComponents/Card";

export const ConnectionZone = ({
  peerId,
  peerName,
  handlePeerId,
  handlePeerName,
  peerManager,
  register,
  unRegister,
  setCardsSet,
  isHost,
  setHost,
  spectateOnly,
  setSpectateOnly,
}) => {
  const isRegisteredOk = isRegistered(peerManager);

  const handleHostSwitch = () => {
    setHost(!isHost);
  };

  const handleSpectateOnly = () => {
    setSpectateOnly(!spectateOnly);
  };

  const handleCardsSet = (event) => {
    setCardsSet(CARDS_SET_LIST[event.target.value]);
  };

  const cardsSetKeys = Object.keys(CARDS_SET_LIST);

  return (
    <MobileCard
      title="Connection"
      subtitle={`My id: ${peerId}`}
      content={
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            sx={{ marginBottom: "10px" }}
            control={
              <Switch
                checked={isHost}
                onChange={handleHostSwitch}
                disabled={isRegisteredOk}
              />
            }
            label="Host the game"
          />
          <TextField
            sx={{ marginBottom: "15px" }}
            type="number"
            step="1"
            label={isHost ? "Serveur id" : "My Id"}
            disabled={isRegisteredOk}
            value={peerId}
            onChange={handlePeerId}
            onFocus={(event) => {
              event.target.select();
            }}
          />
          <TextField
            label="My nickname"
            value={peerName}
            inputProps={{ maxLength: 9 }}
            onChange={handlePeerName}
            onFocus={(event) => {
              event.target.select();
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={spectateOnly}
                onChange={handleSpectateOnly}
                disabled={isRegisteredOk}
              />
            }
            label="Spectate only"
          />
          <Box
            sx={{ display: isHost ? "flex" : "none", flexDirection: "column" }}
          >
            <FormControl sx={{ marginTop: "10px" }}>
              <FormLabel id="cards-set-label">Cards set</FormLabel>
              <RadioGroup
                aria-labelledby="cards-set-label"
                defaultValue={cardsSetKeys[0]}
                name="cards-set-radio-buttons-group"
                disabled={isRegisteredOk}
                onChange={handleCardsSet}
              >
                {cardsSetKeys.map((cardSet) => (
                  <FormControlLabel
                    key={cardSet}
                    value={cardSet}
                    control={<Radio />}
                    label={CARDS_SET_LIST[cardSet].join(" - ")}
                    disabled={isRegisteredOk}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      }
      actions={
        //sx={{ justifyContent: "space-between" }}
        <>
          <Button size="small" disabled={isRegisteredOk} onClick={register}>
            Register to server
          </Button>
          <Button size="small" disabled={!isRegisteredOk} onClick={unRegister}>
            Unregister
          </Button>
        </>
      }
    ></MobileCard>
  );
};
