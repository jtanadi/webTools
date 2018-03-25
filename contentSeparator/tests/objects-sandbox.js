const contentMethods = contentObj =>
  ({
    get code() {
      return contentObj.code;
    },
    getArray() {
      return Array.from(Object.values(contentObj));
    },
    hasTitle() {
      return (!!contentObj.title);
    },
  }); // end contentMethods

const contentObj = (code, title = "", body) => {
  const obj = { code, title, body };
  return Object.create(contentMethods(obj));
};

const collectionMethods = contentsArray =>
  ({
    get size() {
      return contentsArray.length;
    },
    get codes() {
      return contentsArray.map(content => content.code);
    },
    addContent(...newObjs) {
      contentsArray.push(...newObjs);
    },
    getArrays() {
      return contentsArray.map(obj => obj.getArray());
    },
  }); // end collectionMethods

const contentCollection = (...contentObjs) => {
  const flatten = arr => arr.reduce((retArr, item) => {
    if(Array.isArray(item)) {
      return retArr.concat(flatten(item));
    }
    retArr.push(item);
    return retArr;
  }, []);

  const contentsArray = flatten([...contentObjs]);
  return Object.create(collectionMethods(contentsArray));
}; // end contentCollection

const p1 = contentObj("TH_EX01", "", "Lorem ipsum, 01, dolor");
const p2 = contentObj("TH_EX02", "Title 02", "Lorem ipsum, 02, dolor");
const p3 = contentObj("TH_EX03", "Title 03", "Lorem ipsum, 03, dolor");

const collection = contentCollection(p1, p2, p3);
console.log(collection.codes);

const collection2 = contentCollection();
console.log(collection2.codes);

collection2.addContent(p1, p2, p3);
console.log(collection2.codes);

const collection3 = contentCollection([p1, p2, p3]);
console.log(collection3.codes);
