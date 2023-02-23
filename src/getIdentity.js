import { NICKNAMES } from "./constants";

export const getRandomNickname = () =>
  NICKNAMES[Math.floor(Math.random() * (NICKNAMES.length - 1))];

export const getRandomId = () => Math.ceil(Math.random() * 9999);
