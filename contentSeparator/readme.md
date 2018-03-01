# Content Separator
Some notes for a work-in-progress content separator web app for RAA.
The original implementation of this project is a Python script.


## Potential objects:
```javascript
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
```

### Basic use:
```javascript
const story1 = new ContentObj("TH_EX01_GP01", "Title 1", "Lorem ipsum dolor, bla");
const story2 = new ContentObj("TH_EX01_GP02", "Title 2", "Lorem ipsum dolor, bla");

const collection = new ContentCollection([story1, story2]);
console.log(collection.returnCodes()); // ["TH_EX02_GP01", "TH_EX02_GP02"]
```

### Other uses:
If "input" is an array of arrays of unlabelled strings, but with repeating the pattern:
  - input[i][0] = Content code
  - input[i][1] = Content title
  - input[i][2] = Content body

then we can pass all the contents into a ContentCollection object, with each pattern "group" as a ContentObj.
Each ContentObj would have appropriate labels & methods for easier handling.

```javascript
const input = [
  ["TH_EX01_GP01", "Title 1", "Lorem ipsum dolor, bla"],
  ["TH_EX01_GP02", "Title 2", "Lorem ipsum dolor, bla"],
  ["TH_EX01_GP03", "Title 3", "Lorem ipsum dolor, bla"]
]

// Basic for loop method...
const contentArray = [];
for(let i = 0; i < input.length; i++) {
  const code = input[i][0];
  const title = input[i][1];
  const body = input[i][2];

  contentArray.push(new ContentObj(code, title, body))
}

const mainGallery = new ContentCollection(contentArray);
console.log(mainGallery.returnCodes()); // ["TH_EX01_GP01", "TH_EX01_GP02", "TH_EX01_GP03"]

// Reduce...
const contentArray = input.reduce((arr, item) => {
  const content = new ContentObj(item[0], item[1], item[2]);
  arr.push(content);  
  return arr;
}, []);

const mainGallery = new ContentCollection(contentArray);
console.log(mainGallery.returnCodes()); // ["TH_EX01_GP01", "TH_EX01_GP02", "TH_EX01_GP03"]

// Or a little shorter...
const mainGallery = new ContentCollection(
  input.reduce((arr, item) => {
    arr.push(new ContentObj(item[0], item[1], item[2]));
    return arr;
  }, [])
);
console.log(mainGallery.returnCodes()); // ["TH_EX01_GP01", "TH_EX01_GP02", "TH_EX01_GP03"]
```