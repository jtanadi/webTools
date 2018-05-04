import makePanelRow from "./makePanelRow";
import { mainArea } from "./elements";

const populateMainArea = () => {
  mainArea.innerHTML = "";
  if(makePanelRow()) mainArea.appendChild(makePanelRow());
};

export default populateMainArea;
