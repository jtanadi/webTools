const getIndices = function(inputArr, itemToIndex) {
  if(!Array.isArray(inputArr)) throw new Error("First argument must be an array");
  const exp = new RegExp(itemToIndex);

  // Early exit when item isn't in array
  if(!inputArr.find(item => exp.test(item))) return [-1];
  
  return inputArr.reduce((returnIndices, item, index) => {
    if(exp.test(item)) returnIndices.push(index);
    return returnIndices;
  }, []);
};

const flatten = arr => arr.reduce((retArr, item) => {
  if(Array.isArray(item)) {
    return retArr.concat(flatten(item));
  }
  retArr.push(item);
  return retArr;
}, []);

const codeToObj = function (inputArr, regex) {
  const codeIndices = getIndices(inputArr, regex);
  const retObj = {};
  for(let i = 0; i < codeIndices.length; i++) {
    const code = inputArr[codeIndices[i]];
    const text = inputArr.slice(codeIndices[i] + 1, codeIndices[i + 1]);
    
    // (!retObj[code]) ? retObj[code] = text : retObj[code].push(text);
    retObj[code] = text;
  }
  return retObj;
};

const getWordCountFromArray = inputArr => inputArr.reduce((sum, item) => {
  return sum += item.split(" ").length;
}, 0);

// /////////////////////////////////////
// Functions directly used by app below
// /////////////////////////////////////

const paragraphsToArray = function(textInput, trimmed = true) {
  const retArr = textInput.split("\n")
    .filter(item => item);
  if(!trimmed) return retArr;
  return retArr.map(item => item.trim());
};

const filterOutRegex = function(inputArr, expression) {
  let exp = expression;
  if(typeof expression === "string") exp = new RegExp(expression);

  return inputArr.filter(item => !exp.test(item));
};

const findByRegex = function(inputArr, expression) {
  let exp = expression;
  if(typeof expression === "string") exp = new RegExp(expression);
  
  return inputArr.filter(item => exp.test(item));
};

const showTooLong = function (inputArr, regex, threshold) {
  const contentObj = codeToObj(inputArr, regex);

  const longCodes = [];
  for(const key in contentObj) {
    // SOMETHING WEIRD HERE. WHY DO I NEED TO FLATTEN?
    const contentArray = flatten(contentObj[key]);
    
    const wordCount = getWordCountFromArray(contentArray);
    if(wordCount > threshold) longCodes.push(key);
  }

  return longCodes.map(code => `${code}\n${contentObj[code].join("\n\n")}`);
};
