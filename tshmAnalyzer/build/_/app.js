let CHOSENFUNC;
const mainInput = document.getElementById("mainInput");

const funcRadio = document.getElementsByName("funcToDo");
const outButton = document.getElementById("outButton");
const feedButton = document.getElementById("feedButton");

const regexInput = document.getElementById("regexInput");
const thresholdInput = document.getElementById("thresholdInput");
const mainOutput = document.getElementById("mainOutput");

// Collection of available functions as defined in helperFuncs
// Don't lint these because they're in a different file
/* eslint-disable no-undef */
const funcsToRun = {
  findByRegex,
  filterOutRegex,
  showTooLong,
  sectionWordCounter,
};
/* eslint-enable no-undef */

funcRadio.forEach(radio => {
  // Look for default checked
  if(radio.checked) CHOSENFUNC = radio.id;

  radio.addEventListener("change", e => {
  // Each radio button's id corresponds to function name in funcsToRun
    CHOSENFUNC = e.target.id;
  });
});

outButton.addEventListener("click", () => {
  // eslint-disable-next-line no-undef
  const text = paragraphsToArray(mainInput.value);
  const regex = regexInput.value;
  const threshold = thresholdInput.value;

  const arrToWrite = funcsToRun[CHOSENFUNC](text, regex, threshold);
  mainOutput.value = arrToWrite.join("\n\n");
});

feedButton.addEventListener("click", () => {
  if(mainOutput.value) mainInput.value = mainOutput.value;
});
