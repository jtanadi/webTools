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

const radioChecked = radioGroup => {
  let answer = false;
  radioGroup.forEach(radio => {
    if(radio.checked) answer = true;
  });
  return answer;
};

funcRadio.forEach(radio => radio.addEventListener("change", e => {
  // Each radio button's id corresponds to function name in funcsToRun
  CHOSENFUNC = e.target.id;
}));

outButton.addEventListener("click", () => {
  // eslint-disable-next-line no-undef
  const text = paragraphsToArray(mainInput.value);
  let threshold;

  if(CHOSENFUNC === "showTooLong" && regexInput.value) {
    threshold = thresholdInput.value;
  }

  if(radioChecked(funcRadio) && regexInput.value) {
    const arrToWrite = funcsToRun[CHOSENFUNC](text, regexInput.value, threshold);
    mainOutput.value = arrToWrite.join("\n\n");
  }
});

feedButton.addEventListener("click", () => {
  if(mainOutput.value) mainInput.value = mainOutput.value;
});
