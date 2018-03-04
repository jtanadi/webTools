const contentObj = (contentCode, contentTitle = "", contentBody) => {
  /* (str, str, str) -> {str, str, str}
  Content object factory function.
  Each object holds content code, title, and body.
  Title defaults to empty string.
  */
  return {
    contentCode,
    contentTitle,
    contentBody,
    returnAsArray: () => {
      return [contentCode, contentTitle, contentBody];
    }
  }; // end return object
} // end factory function

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
  
  return {
    contents: contentsArray,
    get size () {return contentsArray.length},
    addContent: (...objs) => {
      contentsArray.push(...objs)
    },
    getDupes: () => {
      let seen = [];
      return contentsArray.reduce((dupeList, content) => {
        if(seen.includes(content.contentCode)) {
          dupeList.push(content.contentCode);
        } else {
          seen.push(content.contentCode);
        }
        return dupeList;
      }, []);
    },
    returnCodes: () => {
      return contentsArray.reduce((codesList, content) => {
        codesList.push(content.contentCode);
        return codesList;
      }, []);
    } 
  }; // end return object
} // end factory function

// Test functions... keeping things private w/ IIFEs
!function() {
  const expected = ["TH_EX01_GP01", "TH_EX01_GP02", "TH_EX01_GP03"]

  const actual1 = function() {
    /*() -> arr of strings

    This test creates 3 instances of contentObj, passes them into
    an instance of contentCollect, and returns it.
    */
    const story1 = contentObj("TH_EX01_GP01", "The War", "Lorem ipsum dolor, bla");
    const story2 = contentObj("TH_EX01_GP02", "Post War", "Lorem ipsum dolor, bla");
    const story3 = contentObj("TH_EX01_GP03", "Post War", "Lorem ipsum dolor, bla");
  
    const collection = contentCollection(story1, story2, story3);
    console.log(collection.contents)
    console.log(collection.returnCodes())
    return collection;
  }();
  
  
  const actual2 = function() {
    /*() -> arr of strings

    This test reduces an input array into an array of contentObj,
    passes them into an instance of contentCollection,which is returned.
    */
    const input = [
      ["TH_EX01_GP01", "Title 1", "Lorem ipsum dolor, bla"],
      ["TH_EX01_GP02", "Title 2", "Lorem ipsum dolor, bla"],
      ["TH_EX01_GP03", "Title 3", "Lorem ipsum dolor, bla"]
    ]
    
    const collection = contentCollection();
    for(let content of input) {
      collection.addContent(
        contentObj(content[0], content[1], content.slice(2)));
    }
    console.log(collection.contents)
    console.log(collection.returnCodes())
    return collection;
  }();
  
  console.assert(actual1.size === expected.length, "actual1 size !== expected");
  console.assert(actual2.size === expected.length, "actual2 size !== expected");
  
  const codes1 = actual1.returnCodes();
  const codes2 = actual2.returnCodes();
  for(let i = 0; i < codes1.length; i++) {
    console.assert(codes1[i] === expected[i], "codes1 !== expected");
    console.assert(codes2[i] === expected[i], "codes2 !== expected");
  }    
}();