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

const contentCollection = (contentObjects) => {
  // Needs this in case no contentObjects are passed
  // Because all the returned 'methods' are run no matter what
  let contentsArray = [];
  if(contentObjects) {
    contentsArray = [contentObjects];
  } 
  
  return {
    contents: contentsArray,
    size: contentsArray.length,
    addContent: (...objs) => {
      contentsArray.push(...objs)
    },
    getDupes: () => {
      let seen = [];
      return contentsArray.reduce((dupeList, content) => {
        if(seen.includes(content)) {
          dupeList.push(content);
        } else {
          seen.push(content);
        }
        return dupeList;
      }, []);
    },
    returnCodes: () => {
      // if(typeof contentsArray === "undefined")
      return contentsArray.reduce((codesList, content) => {
        codesList.push(content.contentCode);
        return codesList;
      }, []);
    } // end returnCodes()
  }; // end return object
} // end factory function

// Test functions... keeping things private w/ IIFEs
!function() {
  const expected = ["TH_EX01_GP01", "TH_EX01_GP02", "TH_EX01_GP03"]

  const actual1 = function() {
    /*() -> arr of strings

    This test creates 3 instances of ContentObj, passes them into an instance
    of ContentCollect, and returns an array of content codes.
    */
    const story1 = contentObj("TH_EX01_GP01", "The War", "Lorem ipsum dolor, bla");
    const story2 = contentObj("TH_EX01_GP02", "Post War", "Lorem ipsum dolor, bla");
    const story3 = contentObj("TH_EX01_GP03", "Post War", "Lorem ipsum dolor, bla");
  
    const collection = contentCollection();
    collection.addContent(story1, story2, story3);
    return collection.returnCodes();
  }();
  
  
  // const actual2 = function() {
  //   /*() -> arr of strings

  //   This test reduces an input array into an array of ContentObj,
  //   which is then passed into an instance of ContentCollection.
  //   The test returns an array of content codes.
  //   */
  //   const input = [
  //     ["TH_EX01_GP01", "Title 1", "Lorem ipsum dolor, bla"],
  //     ["TH_EX01_GP02", "Title 2", "Lorem ipsum dolor, bla"],
  //     ["TH_EX01_GP03", "Title 3", "Lorem ipsum dolor, bla"]
  //   ]
    
  //   const collection = Object.create(contentCollection);
  //   collection.addContent(input);
  //   return collection.returnCodes();
  // }();
  
  
  for(let i = 0; i < actual1.length; i++) {
    console.assert(actual1[i] === expected[i], "actual1 failed");
    // console.assert(actual2[i] === expected[i], "actual2 failed");
  }    
}();
