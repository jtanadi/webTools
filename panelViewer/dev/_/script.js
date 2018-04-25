let opened = null;
let timeOut;
const DROPDOWNSTATE = {};

const panelCells = document.querySelectorAll(".panel_cell");
const panelImgs = document.querySelectorAll(".panel_cell img");
const mainArea = document.getElementById("main_area");
const dropdowns = document.querySelectorAll("select");

const loadState = (elmtWithData, stateContainer) => {
  elmtWithData.forEach(elmt => {
    Object.keys(elmt.dataset)
      .map(data => stateContainer[data] = "");
  });
};

const checkState = image => {
  let show = true;
  const selectorsArray = Object.keys(image.dataset);
  
  selectorsArray.forEach(key => {
    if(!image.dataset[key].includes(DROPDOWNSTATE[key])) show = false;

    image.parentElement.style.display = (!show)
      ? "none"
      : "";
  });
};

const scrollPanelInfo = () => {
  const shownInfo = document.querySelector(".panel_info.show");

  // This will set a timeout of 100 ms and only then run
  // the actual callback function. If the scroll event
  // is fired again and the 100 ms have not passed yet,
  // it will clear the pending timeout and set a new one.

  // The effect is that the callback is only run once every 100ms.
  if(timeOut) clearTimeout(timeOut);
  
  timeOut = setTimeout(() => {
    if(!shownInfo) return;
    shownInfo.style.top = `${window.scrollY - 2}px`;
  }, 100);
};

const updateDropdowns = function() {
  DROPDOWNSTATE[this.id] = this.value;
  panelImgs.forEach(img => {
    checkState(img);
  });
};

const updatePanelInfo = (target, classToRemove = "", classToAdd = "") => {
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

const enlargeOnFocus = evt => {
  const clickedObj = evt.target;
  const resetStyles = elmt => {
    elmt.style.width = "";
    elmt.style.height = "";
    elmt.style.padding = "";
  };

  // Early break in case user clicks on non-cell items
  if(!Array.from(panelCells).includes(clickedObj)) return;

  if(clickedObj !== opened) {
    // If clicked object is not open,
    // enlarge clicked object & make everything else smaller
    const newDivisions = 100 / 6;
    const newWidth = newDivisions * 2;
    panelCells.forEach(cell => {
      cell.style.width = `${newDivisions}%`;
      cell.style.height = "";
    });
    clickedObj.style.width = `${newWidth}%`;
    clickedObj.style.height = "30vw";
    clickedObj.style.padding = "1vw";
    
    updatePanelInfo(clickedObj, "show", "show");
    opened = clickedObj;
  } else if(clickedObj === opened) {
    // If clicked object is opened, reset everything
    panelCells.forEach(cell => {
      resetStyles(cell);
    });
    updatePanelInfo(clickedObj, "show");
    opened = null;
  }
};

loadState(panelImgs, DROPDOWNSTATE);

dropdowns.forEach(dropdown => {
  dropdown.addEventListener("change", updateDropdowns);
});

// Attaching listener to container div
// instead of using panelCells.forEach. not sure why?
mainArea.addEventListener("click", enlargeOnFocus);

window.addEventListener("scroll", scrollPanelInfo);
