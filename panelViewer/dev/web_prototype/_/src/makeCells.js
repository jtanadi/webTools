import panelsObj from "./panelsObj";
import { mainArea } from "./elements";

const getShownPanels = () => {
  return Object.entries(panelsObj).reduce((shownArr, panel) => {
    let show = true;
    const{ code, selectors } = panel[1];

    Object.entries(selectors).forEach(selector => {
      const[selectorIndex, selectorVal] = selector;
      const dropdownValue = document.getElementById(selectorIndex).value;

      if(!selectorVal.includes(dropdownValue)) show = false;
    });

    if(show) shownArr.push(code);
    return shownArr;
  }, []);
};

const makeCells = () => {
  let row;
  const panelsToShow = getShownPanels();

  const shownCells = panelsToShow.reduce((allCells, panelCode, index) => {
    if(index % 5 === 0) {
      row = document.createElement("DIV");
      row.classList.add("panel_row");
      mainArea.appendChild(row);
    }
    
    const cell = document.createElement("DIV");
    cell.classList.add("panel_cell");

    const img = document.createElement("IMG");
    img.src = `./_testImages/${panelCode}.jpg`;
    img.alt = `${panelCode}`;
    img.classList.add("panel");

    if(panelCode.toLowerCase().includes("new")) {
      const newSymbol = document.createElement("DIV");
      newSymbol.classList.add("new_panel");
      newSymbol.innerHTML = "&#9737;";
      cell.appendChild(newSymbol);
    }
    
    cell.appendChild(img);
    row.appendChild(cell);

    allCells.push(cell);
    return allCells;
  }, []);

  if(shownCells.length % 5 !== 0) {
    const numCellsToAdd = 5 - shownCells.length % 5
    let emptyCell;
    for(let i = 0; i < numCellsToAdd; i++) {
      emptyCell = document.createElement("DIV");
      emptyCell.classList.add("panel_cell", "empty_cell");
      row.appendChild(emptyCell);
      shownCells.push(emptyCell);
    }
  }
  return shownCells;
};

export default makeCells;
