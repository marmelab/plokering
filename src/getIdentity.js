import { NICKNAMES } from "./constants";

export const getRandomNickname = () =>
  NICKNAMES[Math.floor(Math.random() * (NICKNAMES.length - 1))];

export const getRandomId = () => 1000 + Math.ceil(Math.random() * 8999);
