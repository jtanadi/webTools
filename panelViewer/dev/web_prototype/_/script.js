import { dropdowns, panelCells, mainArea } from "./src/elements";
import makePanelRow from "./src/makePanelRow";
import addSpacers from "./src/addSpacers";
// import updateDropdowns from "./src/updateDropdowns";
import enlargeOnFocus from "./src/enlargeOnFocus";
import scrollPanelInfo from "./src/scrollPanelInfo";

addSpacers(panelCells);
// loadState(panelImgs);
if(makePanelRow()) mainArea.appendChild(makePanelRow());

dropdowns.forEach(dropdown => {
  dropdown.addEventListener("change", () => {
    mainArea.innerHTML = "";
    if(makePanelRow()) mainArea.appendChild(makePanelRow());
  });
});

mainArea.addEventListener("click", enlargeOnFocus);

window.addEventListener("scroll", scrollPanelInfo);
