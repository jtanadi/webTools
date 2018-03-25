/* eslint-disable no-console */
const flatten = require("../../../3-jsFuncs/arrFuncs/flatten");
const lib = require("./objectsLibFuncs-sandbox");

// Object setup
const contentObj = (code, title = "", body) => ({ code, title, body });
const contentCollection = (...contentObjs) => flatten([...contentObjs]);

// Instantiation
const p1 = contentObj("TH_EX01", "", "Lorem ipsum, 01, dolor");
const p2 = contentObj("TH_EX02", "Title 02", "Lorem ipsum, 02, dolor");
const p3 = contentObj("TH_EX03", "Title 03", "Lorem ipsum, 03, dolor");

// Testing
const collection = contentCollection(p1, p2, p3);
console.log("col1", lib.getCodes(collection));
console.log(collection.length);
console.log(lib.getArray(p1));
console.log(lib.hasTitle(p1));

const collection2 = contentCollection();
console.log("col2 before", lib.getCodes(collection2));

collection2.push(p1, p2, p3);
console.log("col2 after", collection2.map(obj => obj.code));
console.log(lib.getArrays(collection2));

const collection3 = contentCollection([p1, p2, p3]);
console.log("col 3", lib.getCodes(collection3));
