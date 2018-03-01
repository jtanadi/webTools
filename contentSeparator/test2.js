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

console.log(mainGallery.returnCodes());

// for(let obj in mainGallery) {
//   console.log(obj.contentCode)
// }

