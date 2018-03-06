const contentProto = contentObj => { 
  return {
    get code() {
      return contentObj.code;
    },
    returnAsArray() {
      return [contentObj.code, contentObj.title, contentObj.body];
    }
  }; // end returned object
}; // end contentProto

const collectionProto = contentsArray => {
  return {
    get size() {
      return contentsArray.length;
    },
    get codes() {
      return contentsArray.map(content => content.code);
    },
    addContent(...newObjs) {
      contentsArray.push(...newObjs);
    }
  }; // end returned object
}; // end collectionProto

const contentObj = (code, title="", body) => {
  let obj = {code, title, body}
  return Object.assign(
    Object.create(contentProto(obj)), {
      hasTitle() {
        return (!title) ? false : true;
      }
    });
};

const contentCollection = (contentObjects, ...moreObjs) => {
  let contentsArray;  
  // Allow collection to be initialized a variety of ways
  if(typeof contentObjects === "undefined") {
    contentsArray = [];
  } else if(Array.isArray(contentObjects)) {
    contentsArray = contentObjects;
  } else {
    contentsArray = [contentObjects, ...moreObjs]
  }

  return Object.assign(
    Object.create(collectionProto(contentsArray)), 
    {
      checkDupes() {
        console.log("tk")
      },
      returnArrays() {
        return contentsArray.map(obj => obj.returnAsArray());
      }
    });
}; // end contentCollection

const p1 = contentObj("TH_EX01", "", "Lorem ipsum, 01, dolor");
const p2 = contentObj("TH_EX02", "Title 02", "Lorem ipsum, 02, dolor");
const p3 = contentObj("TH_EX03", "Title 03", "Lorem ipsum, 03, dolor");
const p4 = contentObj("TH_EX04", "Title 04", "Lorem ipsum, 04, dolor");

const collection = contentCollection(p1, p2, p3)

console.log(collection.size)
collection.addContent(p4);
console.log(collection.size)
console.log(collection.returnArrays())

