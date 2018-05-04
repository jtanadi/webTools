import panelsObj from "./panelsObj";

const makePanelRow = () => {
  // const retHTML = "<div class=\"panel_row\">";

  let row;
  Object.entries(panelsObj).forEach((panel, index) => {
    let show = true;
    const{ code, selectors } = panel[1];

    Object.entries(selectors).forEach(selector => {
      const[selectorIndex, selectorVal] = selector;
      const dropdownValue = document.getElementById(selectorIndex).value;

      if(!selectorVal.includes(dropdownValue)) show = false;
    });

    if(!show) return;

    if(index % 5 === 0) {
      row = document.createElement("DIV");
      row.classList.add("panel_row");
    }

    const cell = document.createElement("DIV");
    cell.classList.add("panel_cell");
    
    const img = document.createElement("IMG");
    img.src = `./_testImages/${code}.jpg`;
    img.alt = `${code}`;
    img.classList.add("panel");

    cell.appendChild(img);
    row.appendChild(cell);
  });
  
  return row;
};

export default makePanelRow;
