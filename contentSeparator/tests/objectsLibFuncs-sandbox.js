// Content object functions
const getArray = contentObj => Array.from(Object.values(contentObj));
const hasTitle = contentObj => !!contentObj.title;

// Colletion functions
const getCodes = collection => collection.map(contentObj => contentObj.code);
const getArrays = collection => collection.map(contentObj => getArray(contentObj));

module.exports = {
  getArray,
  hasTitle,
  getCodes,
  getArrays,
};

