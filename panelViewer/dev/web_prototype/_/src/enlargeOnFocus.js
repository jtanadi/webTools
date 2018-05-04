import scrollPanelInfo from "./scrollPanelInfo";

let opened = null;

const togglePanelInfo = (target, classToRemove = "", classToAdd = "") => {
  const panelInfo = document.querySelectorAll("#sidebar .panel_info");
  const panelCode = target.querySelector("img").alt;

  panelInfo.forEach(info => {
    if(info.classList.contains(classToRemove)) {
      info.classList.remove(classToRemove);
    } else if(classToAdd && info.id === panelCode) {
      info.classList.add(classToAdd);
    }
  });
};

const enlargeOnFocus = (evt, cellsArr) => {
  const clickedObj = evt.target;
  const resetStyles = elmt => {
    elmt.style.width = "";
    elmt.style.height = "";
    elmt.style.padding = "";
  };

  // Early break in case user clicks on non-cell items
  if(!cellsArr.includes(clickedObj)) return;

  if(clickedObj !== opened) {
    // If clicked object is not open,
    // enlarge clicked object & make everything else smaller
    const newDivisions = 100 / 6;
    const newWidth = newDivisions * 2;
    cellsArr.forEach(cell => {
      cell.style.width = `${newDivisions}%`;
      cell.style.height = "";
    });
    clickedObj.style.width = `${newWidth}%`;
    clickedObj.style.height = "30vw";
    clickedObj.style.padding = "1vw";
    
    togglePanelInfo(clickedObj, "show", "show");
    opened = clickedObj;
  } else {
    // If clicked object is opened, reset everything
    cellsArr.forEach(cell => {
      resetStyles(cell);
    });
    togglePanelInfo(clickedObj, "show");
    opened = null;
  }
  scrollPanelInfo(evt);
};

export default enlargeOnFocus;
