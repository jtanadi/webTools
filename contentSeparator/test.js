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
}

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
}


const story1 = new ContentObj("TH_EX01_GP01", "The War", "Lorem ipsum dolor, bla");
const story2 = new ContentObj("TH_EX01_GP02", "Post War", "Lorem ipsum dolor, bla");

const collection = new ContentCollection([story1, story2]);
console.log(collection.returnCodes());

story1.contentCode = "BEEP"
console.log(collection.returnCodes());