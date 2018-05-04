import { dropdowns, mainArea } from "./src/elements";
import populateMainArea from "./src/populateMainArea";
import addSpacers from "./src/addSpacers";
import enlargeOnFocus from "./src/enlargeOnFocus";
import scrollPanelInfo from "./src/scrollPanelInfo";

const panelCells = document.querySelectorAll(".panel_cell");

populateMainArea();
addSpacers(panelCells);

dropdowns.forEach(dropdown => {
  dropdown.addEventListener("change", populateMainArea);
});

mainArea.addEventListener("click", enlargeOnFocus);

window.addEventListener("scroll", scrollPanelInfo);
