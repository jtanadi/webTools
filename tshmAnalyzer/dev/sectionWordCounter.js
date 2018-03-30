const codeToObj = require("./codeToObj");
const getWordCountFromArray = require("./getWordCountFromArr");

const sectionWordCounter = (inputArr, regex) => {
  const contentObj = codeToObj(inputArr, regex);
  const contentCodes = Object.keys(contentObj);

  return contentCodes.reduce((container, code) => {
    const count = getWordCountFromArray(contentObj[code]);
    container.push(`${code}:\n${count} words`);
    return container;
  }, []);
};

module.exports = sectionWordCounter;
