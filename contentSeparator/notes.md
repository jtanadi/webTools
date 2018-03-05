# Notes

### Archived 3/5/2018
# Content Separator
Some notes for a work-in-progress content separator web app for RAA.<br>
The original implementation of this project is a Python script with no UI & lots of duct tape.


## Potential objects
### Content object
Typically holds:
  - A content code (ie. "TH_EX01_PT01")
  - Title for that content
  - Body text for that content

**Constructor function**
```javascript
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
```

**Factory function**<br>
Seems a bit simpler for this use-case.
```javascript
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
  }; // end return object
} // end factory function
```

### Content collection
Maybe a gallery, or just a convenient way to group a bunch of content objects. Has some methods to help analyze the collection (size, if there are dupes, etc.). There might be more that can be pulled from [here](https://github.com/jtanadi/jsFuncs).

The collection can be expressed in a couple of different ways. Not sure which is best yet.

**Constructor function**<br>
Might need several instances? Not sure if that's true.

```javascript
const ContentCollection = function(contents) {
  /* (arr of ContentObj)
  A collection object that holds script objects
  */
  this.contentObjs = contents;
  this.size = this.contentObjs.length;
}

ContentCollection.prototype = {
  addContent(obj) {
    this.contentObjs.push(obj);
  },
  getDupes() {
    let seen = [];
    return this.contentObjs.reduce((dupes, content) => {
      if(seen.includes(content)) {
        dupes.push(content);
      } else {
        seen.push(content);
      }

      return dupes;
    }, []);
  },
  returnCodes() {
    return this.contentObjs.map(content => content.contentCode);
  }
}
```

**Object literal**<br>
Is this more JS-style? We can use Object.create() to create new objects with the same prototype. But we still have to "initialize" this object...

```javascript
const contentCollection = {
  init: function(contents) {
    this.contents = [contents];
    
    // Some catches that overwrite this.contents
    if(Array.isArray(contents)) this.contents = [...contents];
    if(typeof contents === "undefined") this.contents = [];
    
    return this; // return object (for chaining .init())
  },
  get size() {
    return this.contents.length
  },
  addContent(...objs) {
    this.contents.push(...objs);
  },
  getDupes() {
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
  returnCodes() {
    return this.contents.map(content => content.contentCode);
  }
} // end contentCollection obj
```

**Factory function**<br>
Again, a little easier to use?

```javascript
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
    get size() {return contentsArray.length},
    addContent(...objs) {
      contentsArray.push(...objs)
    },
    getDupes() {
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
    returnCodes() {
      return contentsArray.map(content => content.contentCode);
    }
  }; // end return object
} // end factory function
```

**Map object?**<br>
Similar to a Python dictionary... and already has built-in properties and methods, some of which might be useful for this project:
  - Map.prototype.size
  - Map.prototype.clear()
  - Map.prototype.delete()
  - Map.prototype.has()
  - Map.prototype.get() / set()


## Usage
**_Need to spread this over the object creation methods above_**
Some notes / thoughts on how these objects should / could be used

### Basic use
```javascript
const story1 = new ContentObj("TH_EX01_GP01", "Title 1", "Lorem ipsum dolor, bla");
const story2 = new ContentObj("TH_EX01_GP02", "Title 2", "Lorem ipsum dolor, bla");

const collection = new ContentCollection([story1, story2]);
console.log(collection.returnCodes());
// ["TH_EX02_GP01", "TH_EX02_GP02"]
```

### Other uses
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

## Extras

### Additional properties & methods
  - ```ContentCollection.size``` -> Returns size of collection
  - ```ContentCollection.prototype.checkCodeDupes()``` -> Checks whether there are duplicated content codes
  - ```ContentCollection.prototype.addContent()``` -> Add content to collection
  - ```ContentObj.prototype.hasTitle()``` -> Helper function; returns true if this.contentTitle exists.
  - RegEx stuff for content collection? Filtering, etc.?

### Other questions
  - How many times will ContentCollection be instantiated per run?
  - Should ContentCollection be a Map instead?
  - Should ContentCollection be an object literal instead?