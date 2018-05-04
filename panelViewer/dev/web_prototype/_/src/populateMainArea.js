import makeCells from "./makeCells";
import { mainArea } from "./elements";

const populateMainArea = () => {
  mainArea.innerHTML = "";
  makeCells();
};

export default populateMainArea;
