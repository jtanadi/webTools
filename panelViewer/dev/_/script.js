const panelCells = document.querySelectorAll(".panel_cell");
const panelImgs = document.querySelectorAll(".panel_cell img");
const mainArea = document.getElementById("main_area");
const statusText = document.getElementById("status_container");
const topText = document.querySelector("#top span");

const selector0 = document.getElementById("selector_0");

const resetStyles = (elmt) => {
  elmt.style.width = "";
  elmt.style.height = "";
  elmt.style.padding = "";
}

// Attaching listener to container div
// instead of using panelCells.forEach
let opened = null;
mainArea.addEventListener("click", evt => {
  const clickedObj = evt.target;
  
  // Early break in case user clicks on non-cell items
  if(!Array.from(panelCells).includes(clickedObj)) {
    return
  }

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
    
    opened = clickedObj;
    
  } else if(clickedObj === opened) {
    // If clicked object is opened, reset everything
    panelCells.forEach(cell => {
      resetStyles(cell);
    });
    opened = null;
  } 
});

let timeOut;
window.addEventListener("scroll", e => {
  // This will set a timeout of 100 ms and only then run
  // the actual callback function. If the scroll event
  // is fired again and the 100 ms have not passed yet,
  // it will clear the pending timeout and set a new one.

  // The effect is that the callback is only run once every 100ms.
  if(timeOut) clearTimeout(timeOut);

  timeOut = setTimeout(() => {
    statusText.style.top = `${window.scrollY - 2}px`;
  }, 100);
})

// Super janky... refactor & make a lot more flexible
let STATE = {
  selector_0: "",
  selector_1: "",
  selector_2: "",
}

const checkImg = image => {
  if(
    image.dataset["selector-0"].includes(STATE.selector_0)
    && image.dataset["selector-1"].includes(STATE.selector_1)
    && image.dataset["selector-2"].includes(STATE.selector_2)
  ) {
    image.parentElement.style.display = ""
  } else {
    image.parentElement.style.display = "none"
  }
}

selector_0.addEventListener("change", function() {
  STATE.selector_0 = this.value
  panelImgs.forEach(img => {
    checkImg(img)
  })
})

selector_1.addEventListener("change", function() {
  STATE.selector_1 = this.value
  panelImgs.forEach(img => {
    checkImg(img)
  })
})

selector_2.addEventListener("change", function() {
  STATE.selector_2 = this.value
  panelImgs.forEach(img => {
    checkImg(img)
  })
})