const ContentObj = function(code, title, body) {
  /* (str, str, str)
  Content object constructor function.
  Each object holds content code, title, and body.
  */
  
  this.contentCode = code;
  this.contentTitle = title;
  this.contentBody = body;

  // Privileged function. Keep here? Make public?
  this.returnAsArray = () => {
    return [this.contentCode, this.contentTitle, this.contentBody];
  }
};

const ContentCollection = function(contents) {
  /* (arr of ContentObj)
  */
  this.contentObjs = contents;
  
  // Privileged function. Keep here? Make public?
  this.returnCodes = () => {
    return this.contentObjs.reduce((list, code) => {
      list.push(code.contentCode);
      return list;
    }, []);
  }
};

// Test functions... keeping things private w/ IIFEs
!function() {
  const expected = ["TH_EX01_GP01", "TH_EX01_GP02", "TH_EX01_GP03"]

  const actual1 = function() {
    /*() -> arr of strings

    This test creates 3 instances of ContentObj, passes them into an instance
    of ContentCollect, and returns an array of content codes.
    */
    const story1 = new ContentObj("TH_EX01_GP01", "The War", "Lorem ipsum dolor, bla");
    const story2 = new ContentObj("TH_EX01_GP02", "Post War", "Lorem ipsum dolor, bla");
    const story3 = new ContentObj("TH_EX01_GP03", "Post War", "Lorem ipsum dolor, bla");
  
    const collection = new ContentCollection([story1, story2, story3]);
  
    return collection.returnCodes();
  }();
  
  
  const actual2 = function() {
    /*() -> arr of strings

    This test reduces an input array into an array of ContentObj,
    which is then passed into an instance of ContentCollection.
    The test returns an array of content codes.
    */
    const input = [
      ["TH_EX01_GP01", "Title 1", "Lorem ipsum dolor, bla"],
      ["TH_EX01_GP02", "Title 2", "Lorem ipsum dolor, bla"],
      ["TH_EX01_GP03", "Title 3", "Lorem ipsum dolor, bla"]
    ]
  
    const mainGallery = new ContentCollection(
      input.reduce((arr, item) => {
        arr.push(new ContentObj(item[0], item[1], item[2]));
        return arr;
      }, [])
    );
    return mainGallery.returnCodes();
  }();
  
  
  for(let i = 0; i < actual2.length; i++) {
    console.assert(actual1[i] === expected[i], "actual1 failed");
    console.assert(actual2[i] === expected[i], "actual2 failed");
  }    
}();
