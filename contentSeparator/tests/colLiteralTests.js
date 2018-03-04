const ContentObj = function(code, title, body) {
  /* (str, str, str)
  Content object constructor function.
  Each object holds content code, title, and body.
  */
  
  this.contentCode = code;
  this.contentTitle = title;
  this.contentBody = body;
};

ContentObj.prototype.returnAsArray = function() {
  return [this.contentCode, this.contentTitle, this.contentBody];
}

const contentCollection = {
  init: function(contents) {
    this.contents = contents;

    // Some catches that overwrite this.contents
    if(Array.isArray(contents)) this.contents = [...contents];
    if(typeof contents === "undefined") this.contents = [];

    return this; // return object (for chaining .init())
  },
  get size () {
    return this.contents.length
  },
  addContent: function(...objs) {
    this.contents.push(...objs);
  },
  getDupes: function() {
    let seen = [];
    return this.contents.reduce((dupes, content) => {
      if(seen.includes(content)) {
        dupes.push(content);
      } else {
        seen.push(content);
      }

      return dupes;
    }, []);
  },
  returnCodes: function() {
    return this.contents.reduce((codesList, code) => {
      codesList.push(code.contentCode);
      return codesList;
    }, []);
  }
}

// Test functions... keeping things private w/ IIFEs
!function() {
  const expected = ["TH_EX01_GP01", "TH_EX01_GP02", "TH_EX01_GP03"]

  const actual1 = (function() {
    /*() -> arr of strings

    This test creates 3 instances of ContentObj, passes them into an instance
    of ContentCollect, and returns an array of content codes.
    */
    const story1 = new ContentObj("TH_EX01_GP01", "The War", "Lorem ipsum dolor, bla");
    const story2 = new ContentObj("TH_EX01_GP02", "Post War", "Lorem ipsum dolor, bla");
    const story3 = new ContentObj("TH_EX01_GP03", "Post War", "Lorem ipsum dolor, bla");
  
    // Initialize with array of ContentObjs
    const collection = 
      Object.create(contentCollection).init([story1, story2, story3]);

    console.log(collection.contents);
    return collection;
  })();
  
  
  const actual2 = (function() {
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
    
    // Initialize with nothing & add ContentObj one by one
    const collection = Object.create(contentCollection).init();
    for(let content of input) {
      collection.addContent(
        new ContentObj(content[0], content[1], content[2])
      )
    }
    console.log(collection.contents);
    return collection;
  })();

  console.assert(actual1.size === expected.length,
    "actual1 size !== expected length");

  console.assert(actual2.size === expected.length,
    "actual2 size !== expected length");

  const codes1 = actual1.returnCodes();
  const codes2 = actual2.returnCodes();
  for(let i = 0; i < codes1.length; i++) {
    console.assert(codes1[i] === expected[i], "codes1 failed");
    console.assert(codes2[i] === expected[i], "codes2 failed");
  }    
}();
