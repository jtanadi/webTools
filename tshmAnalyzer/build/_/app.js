// Because some funcs are made available through HTML imports...
/* eslint-disable no-undef */

let CHOSENFUNC;
const funcRadio = document.getElementsByName("funcToDo");
const mainInput = document.getElementById("mainInput");
const regexInput = document.getElementById("regexInput");
const thresholdInput = document.getElementById("thresholdInput");
const mainOutput = document.getElementById("mainOutput");
const outButton = document.getElementById("outButton");
const feedButton = document.getElementById("feedButton");

// Collection of available functions
const funcsToRun = {
  findByRegex,
  filterOutRegex,
  showTooLong,
};

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
