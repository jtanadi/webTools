import { dropdowns, mainArea } from "./src/elements";
import { populateMainArea, SHOWNCELLS } from "./src/populateMainArea";
import enlargeOnFocus from "./src/enlargeOnFocus";
import scrollPanelInfo from "./src/scrollPanelInfo";

populateMainArea();

dropdowns.forEach(dropdown => {
  dropdown.addEventListener("change", populateMainArea);
});

mainArea.addEventListener("click", evt => {
  enlargeOnFocus(evt, SHOWNCELLS);
});

window.addEventListener("scroll", scrollPanelInfo);
