import { DROPDOWNSTATE, changeImgVisibility } from "./stateManager";
import { panelImgs } from "./elements";

const updateDropdowns = function() {
  DROPDOWNSTATE[this.id] = this.value;
  panelImgs.forEach(img => {
    changeImgVisibility(img);
  });
};

export default updateDropdowns;
