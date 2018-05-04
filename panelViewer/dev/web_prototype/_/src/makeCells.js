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

  return panelsToShow.reduce((allCells, panelCode, index) => {
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
    
    cell.appendChild(img);
    row.appendChild(cell);

    allCells.push(cell);
    return allCells;
  }, []);
};

export default makeCells;
