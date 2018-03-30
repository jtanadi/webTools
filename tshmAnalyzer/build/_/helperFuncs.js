const getIndices = (inputArr, itemToIndex) => {
  if(!Array.isArray(inputArr)) throw new Error("First argument must be an array");
  const exp = new RegExp(itemToIndex);

  // Early exit when item isn't in array
  if(!inputArr.find(item => exp.test(item))) return [-1];
  
  return inputArr.reduce((returnIndices, item, index) => {
    if(exp.test(item)) returnIndices.push(index);
    return returnIndices;
  }, []);
};

const codeToObj = (inputArr, regex) => {
  const codeIndices = getIndices(inputArr, regex);
  const retObj = {};
  for(let i = 0; i < codeIndices.length; i++) {
    const code = inputArr[codeIndices[i]];
    const text = inputArr.slice(codeIndices[i] + 1, codeIndices[i + 1]);
    
    // This part doesn't work so well when there are dupes.
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

const paragraphsToArray = (textInput, trimmed = true) => {
  const retArr = textInput.split("\n")
    .filter(item => item);
  if(!trimmed) return retArr;
  return retArr.map(item => item.trim());
};

const findByRegex = (inputArr, regex) => {
  let actualExp = regex;
  if(typeof regex === "string") actualExp = new RegExp(regex);
  
  return inputArr.filter(item => actualExp.test(item));
};

const findDupes = list => {
  const seen = [];

  return list.reduce((dupes, listItem) => {
    // Make a copy of the item to transform it
    const listItemCopy = listItem.toLowerCase();
    if(!seen.includes(listItemCopy)) {
      seen.push(listItemCopy);
    } else {
      dupes.push(listItem);
    }
    
    return dupes;
  }, []);
};

const filterOutRegex = (inputArr, regex) => {
  let actualExp = regex;
  if(typeof regex === "string") actualExp = new RegExp(regex);

  return inputArr.filter(item => !actualExp.test(item));
};


const showTooLong = (inputArr, regex, threshold) => {
  const contentObj = codeToObj(inputArr, regex);

  const longCodes = [];
  for(const key in contentObj) {
    const contentArray = contentObj[key];
    
    const wordCount = getWordCountFromArray(contentArray);
    if(wordCount > threshold) longCodes.push(key);
  }

  return longCodes.map(code => `${code}\n${contentObj[code].join("\n\n")}`);
};

const sectionWordCounter = (inputArr, regex) => {
  const contentObj = codeToObj(inputArr, regex);
  const contentCodes = Object.keys(contentObj);

  return contentCodes.reduce((container, code) => {
    const count = getWordCountFromArray(contentObj[code]);
    container.push(`${code}:\n${count} words`);
    return container;
  }, []);
};
