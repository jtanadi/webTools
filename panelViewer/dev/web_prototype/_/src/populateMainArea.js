import makeCells from "./makeCells";
import { mainArea } from "./elements";
import addSpacers from "./addSpacers";

/* eslint-disable import/no-mutable-exports */
let SHOWNCELLS;

const populateMainArea = () => {
  mainArea.innerHTML = "";
  SHOWNCELLS = makeCells();
  addSpacers(SHOWNCELLS);
};

export { populateMainArea, SHOWNCELLS };
