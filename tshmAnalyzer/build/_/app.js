let SAVEDTEXT = "";

let CHOSENFUNC = "findByRegex";
let GREYEDOUT = true;

const outButton = document.getElementById("outButton");
const feedButton = document.getElementById("feedButton");
const copyButton = document.getElementById("copyButton");
const pasteButton = document.getElementById("pasteButton");

const recipeDropdowns = document.querySelectorAll("select");

const findInput = document.getElementById("findInput");
const findDropdown = document.getElementById("findDropdown");
const filterCheck = document.getElementById("filterCheck");
const funcRadio = document.getElementsByName("funcToDo");
const radioLabels = document.querySelectorAll(".radioLabel");
const filterInput = document.getElementById("filterInput");
const filterDropdown = document.getElementById("filterDropdown");

const mainInput = document.getElementById("mainInput");
const mainOutput = document.getElementById("mainOutput");

const toggleDisabled = () => {
  GREYEDOUT = !GREYEDOUT;
  radioLabels.forEach(label => {
    if(GREYEDOUT) {
      label.style.color = "gray";
    } else {
      label.style.color = "black";
    }
  });
  funcRadio.forEach(radio => {
    radio.disabled = GREYEDOUT;
    if(GREYEDOUT) {
      CHOSENFUNC = "findByRegex";
    } else if(radio.checked) {
      CHOSENFUNC = radio.id;
    }
  });
  filterInput.disabled = GREYEDOUT;
  filterInput.classList.toggle("disabledText");
  filterDropdown.disabled = GREYEDOUT;
  filterDropdown.classList.toggle("disabledText");
};

const addToTextbox = (textbox, target) => {
  textbox.value += target.value;
  Array.from(target.options)
    .forEach(option => {
      if(option.value === "none") option.selected = true;
    });
};

recipeDropdowns.forEach(dropdown => {
  const appendOptGroup = (groupName, optObj) => {
    const optGroup = document.createElement("optgroup");
    optGroup.label = groupName;

    for(const val in optObj) {
      const optElmt = document.createElement("option");
      optElmt.value = val;
      optElmt.innerHTML = optObj[val];
      optGroup.appendChild(optElmt);
    }
    dropdown.appendChild(optGroup);
  };
  
  const optNone = document.createElement("option");
  optNone.value = "none";
  optNone.selected = true;

  const basicsObj = {
    ".": "Any character except newline",
    "[0-9]": "Any number",
    "[a-z]": "Any letter, lowercase",
    "[A-Z]": "Any letter, uppercase",
    "[A-z]": "Any letter, any case",
  };

  const repeatObj = {
    "*": "0 or more",
    "+": "1 or more",
    "?": "0 or 1",
    "|": "OR",
  };

  /* eslint-disable no-useless-escape */
  const escapedObj = {
    "\\.": "Period",
    "\\?": "Question mark",
    "\\\\": "Backslash",
    "\\n": "Newline",
    "\\t": "Tab",
  };
  /* eslint-enable no-useless-escape */
  
  dropdown.appendChild(optNone);
  appendOptGroup("Basics", basicsObj);
  appendOptGroup("Repeaters / boolean", repeatObj);
  appendOptGroup("Escaped characters", escapedObj);
});

findDropdown.addEventListener("change", e => {
  addToTextbox(findInput, e.target);
});

filterDropdown.addEventListener("change", e => {
  addToTextbox(filterInput, e.target);
});

filterCheck.addEventListener("change", toggleDisabled);

// Collection of available functions as defined in helperFuncs
// Any time a new radio-functionality is added, just add it here!
// Don't lint these because they're in a different file
const funcsToRun = {
  /* eslint-disable no-undef */
  findByRegex,
  removeItemsRegex,
  removeSectionRegex,
  showTooLong,
  showTooShort,
  sectionWordCounter,
  findDupes,
  /* eslint-enable no-undef */
};

funcRadio.forEach(radio => {
  radio.addEventListener("change", e => {
    // Each radio button's id corresponds to function name in funcsToRun
    CHOSENFUNC = e.target.id;
  });
});

// ///////////// //
// SERIOUS STUFF //
// ///////////// //

outButton.addEventListener("click", () => {
  try{
    // eslint-disable-next-line no-undef
    const text = paragraphsToArray(mainInput.value);
    const regex = findInput.value;
    const threshold = filterInput.value;
    
    const arrToWrite = funcsToRun[CHOSENFUNC](text, regex, threshold);
    mainOutput.value = arrToWrite.join("\n\n");
  } catch(err) {
    mainOutput.value = err.message;
  }
});

feedButton.addEventListener("click", () => {
  if(mainOutput.value) mainInput.value = mainOutput.value;
});

copyButton.addEventListener("click", () => {
  SAVEDTEXT = mainInput.value;
});

pasteButton.addEventListener("click", () => {
  mainInput.value = SAVEDTEXT;
});
