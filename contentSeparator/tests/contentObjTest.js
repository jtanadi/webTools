const ContentObj = function(code, title = "", body) {
  /* (str, str, str)
  Content object constructor function.
  Each object holds content code, title, and body.
  Title defaults to empty string.
  */
  
  this.contentCode = code;
  this.contentTitle = title;
  this.contentBody = body;
}

ContentObj.prototype.returnAsArray = function() {
  return [this.contentCode, this.contentTitle, this.contentBody];
}

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
    returnAsArray() {
      return [contentCode, contentTitle, contentBody];
    }
  };
}



// Test functions... keeping things private w/ IIFEs
!function() {
  const expected = ["TH_EX01_GP01", "TH_EX01_GP02", "TH_EX01_GP03"];
  
  const actual1 = function() {
    /*() -> arr of strings

    This test creates 3 instances of ContentObj (constructor function)
    checks each contentObj.contentCode matches the expected codes.
    */
    const story1 = new ContentObj("TH_EX01_GP01", "The War", "Lorem ipsum dolor, bla");
    const story2 = new ContentObj("TH_EX01_GP02", "Post War", "Lorem ipsum dolor, bla");
    const story3 = new ContentObj("TH_EX01_GP03", "Post War", "Lorem ipsum dolor, bla");
    
    return [story1.contentCode, story2.contentCode, story3.contentCode];
  }();
  
  
  const actual2 = function() {
    /*() -> arr of strings

    This test creates 3 instances of contentObj (factory function)
    checks each contentObj.contentCode matches the expected codes.
    */
    const story1 = contentObj("TH_EX01_GP01", "The War", "Lorem ipsum dolor, bla");
    const story2 = contentObj("TH_EX01_GP02", "Post War", "Lorem ipsum dolor, bla");
    const story3 = contentObj("TH_EX01_GP03", "Post War", "Lorem ipsum dolor, bla");
    
    return [story1.contentCode, story2.contentCode, story3.contentCode];
  }();
  
  
  for(let i = 0; i < actual1.length; i++) {
    console.assert(actual1[i] === expected[i], "actual1 failed");
    // console.assert(actual2[i] === expected[i], "actual2 failed");
  }    
}();
