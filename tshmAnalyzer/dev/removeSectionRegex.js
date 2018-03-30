const codeToObj = require("./codeToObj")

const removeSectionRegex = (inputArr, regexToFollow, regexToRemove) => {
  const contentObj = codeToObj(inputArr, regexToFollow);
  const contentCodes = Object.keys(contentObj);
  const regexRemove = new RegExp(regexToRemove);

  return contentCodes.reduce((collection, code) => {
    if(!regexRemove.test(code)) {
      collection.push(`${code}\n${contentObj[code].join("\n\n")}`);
    }
    return collection;
  }, []);
}

module.exports = removeSectionRegex
