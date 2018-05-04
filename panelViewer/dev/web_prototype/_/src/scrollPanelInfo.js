let timeOut;

const scrollPanelInfo = evt => {
  const shownInfo = document.querySelector(".panel_info.show");

  if(evt.type === "click" && shownInfo) {
    shownInfo.style.top = `${window.scrollY - 2}px`;
    return;
  }

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

export default scrollPanelInfo;
