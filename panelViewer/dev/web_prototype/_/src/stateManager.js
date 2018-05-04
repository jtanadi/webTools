const DROPDOWNSTATE = {};

const loadState = elmtWithData => {
  elmtWithData.forEach(elmt => {
    Object.keys(elmt.dataset)
      .map(data => DROPDOWNSTATE[data] = "");
  });
};

const changeImgVisibility = image => {
  let show = true;
  const selectorsArray = Object.keys(image.dataset);

  selectorsArray.forEach(key => {
    if(!image.dataset[key].includes(DROPDOWNSTATE[key])) show = false;
    image.parentElement.style.display = (!show)
      ? "none"
      : "";
  });
};

export { DROPDOWNSTATE, loadState, changeImgVisibility };
