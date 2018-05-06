import scrollPanelInfo from "./scrollPanelInfo";

let openedCell = null;

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

const getNumCellsForBorder = (target, cells, nonEmpties) => {
  const cellsPerRow = 5;
  const numCellsInLastRow = nonEmpties.length % cellsPerRow;

  const targetIndexInRow = cells.indexOf(target) % cellsPerRow;
  const cellsToWatch = cells.slice(-(numCellsInLastRow + cellsPerRow));

  return (cellsToWatch.includes(target)
    && targetIndexInRow > numCellsInLastRow)
    ? targetIndexInRow - numCellsInLastRow
    : 0;
};

const enlargeOnFocus = (evt, cellsArr) => {
  const clickedObj = evt.target;

  const nonEmptyCells = cellsArr.filter(cell => {
    return !cell.classList.contains("empty_cell");
  });
  const emptyCells = cellsArr.filter(cell => {
    return cell.classList.contains("empty_cell");
  });

  const numCellsForBorder =
    getNumCellsForBorder(clickedObj, cellsArr, nonEmptyCells);

  // Early break in case user clicks on non-cell items
  if(
    !cellsArr.includes(clickedObj)
    || clickedObj.classList.contains("empty_cell")
  ) return;

  // Reset all cell styles to start
  cellsArr.forEach(cell => {
    cell.style = "";
  });

  if(clickedObj !== openedCell) {
    // If clicked object is not open,
    // enlarge clicked object & make everything else smaller
    const newDivisions = 100 / 6;
    const newWidth = newDivisions * 2;
    nonEmptyCells.forEach(cell => {
      cell.style.width = `${newDivisions}%`;
      cell.style.height = "";
    });
    emptyCells.forEach((cell, index) => {
      if(index < numCellsForBorder) {
        cell.style.borderTop = "1px solid black";
      }
    });

    clickedObj.style.width = `${newWidth}%`;
    clickedObj.style.height = "30vw";
    clickedObj.style.padding = "1vw";

    togglePanelInfo(clickedObj, "show", "show");
    openedCell = clickedObj;
  } else {
    togglePanelInfo(clickedObj, "show");
    openedCell = null;
  }
  scrollPanelInfo(evt);
};

export default enlargeOnFocus;
