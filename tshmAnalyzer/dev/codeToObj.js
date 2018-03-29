const getIndices = require("./getIndices")

const codeToObj = function(inputArr, regex) {
  const codeIndices = getIndices(inputArr, regex)
  const retObj = {}
  
  // example codeIndices = [0, 3, 7, 9]

  for(let i = 0; i < codeIndices.length; i ++) {
    const code = inputArr[codeIndices[i]];
    const text = inputArr.slice(codeIndices[i] + 1, codeIndices[i + 1]);
    
    (!retObj[code]) ? retObj[code] = text : retObj[code].push(text);
  }
  return retObj;
}

module.exports = codeToObj;
