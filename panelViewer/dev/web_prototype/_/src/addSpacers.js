const addSpacers = elements => {
  elements.forEach(element => {
    const topL = document.createElement("DIV");
    const topR = document.createElement("DIV");
    const btmL = document.createElement("DIV");
    const btmR = document.createElement("DIV");
    
    topL.classList.add("spacers", "top", "left");
    topR.classList.add("spacers", "top", "right");
    btmL.classList.add("spacers", "btm", "left");
    btmR.classList.add("spacers", "btm", "right");
    
    element.appendChild(topL);
    element.appendChild(topR);
    element.appendChild(btmL);
    element.appendChild(btmR);
  });
};

export default addSpacers;
