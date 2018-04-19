const panelCells = document.querySelectorAll(".panel_cell");
const cellsContainer = document.getElementById("cells_container");

let opened = null;

const resetStyles = (elmt) => {
  elmt.style.width = "";
  elmt.style.height = "";
  elmt.style.padding = "";
}

// Attaching listener to container div
// instead of using panelCells.forEach
cellsContainer.addEventListener("click", evt => {
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

