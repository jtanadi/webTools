let CHOSENFUNC;
const funcRadio = document.getElementsByName("funcToDo");
const contentInput = document.getElementById("rawContent"); 
const regexInput = document.getElementById("regexInput");
const thresholdInput = document.getElementById("thresholdInput");
const button = document.querySelector("input[type='button']")

// Collection of available functions
const funcsToRun = {
  findByRegex,
  filterOutRegex,
  showTooLong,
};

const radioChecked = (radioGroup) => {
  let answer = false;
  radioGroup.forEach(radio => {
    if(radio.checked) answer = true;
  })
  return answer;
};

funcRadio.forEach(radio => radio.addEventListener("change", (e) => {
  // Each radio button's id corresponds to function name in funcsToRun
  CHOSENFUNC = e.target.id;
}))

button.addEventListener("click", () =>{
  const text = paragraphsToArray(contentInput.value);
  let threshold;

  if(CHOSENFUNC === "showTooLong" && regexInput.value) {
    threshold = thresholdInput.value;
  } 

  if(radioChecked(funcRadio) && regexInput.value) {
    let arrToWrite = funcsToRun[CHOSENFUNC](text, regexInput.value, threshold);
    document.querySelector("#output").value = arrToWrite.join("\n\n");
  }
});