# Content Separator Objects (OOP Approach)
Basic OOP outline of objects to be implemented. We are using the factory function method of object creation. Notes on this & other methods can be found [here](https://github.com/jtanadi/webTools/blob/master/contentSeparator/notes.md).

## Content Objects
### Base object (contentObj)
```contentObj``` is a factory function that returns a new object with methods inhertited from ```contentMethods```.

```contentObj``` takes in:
- code
- title
- body

The above are private attributes, so they can't be overwritten after instantiation

```javascript
const contentObj = (code, title = "", body) => {
  const obj = { code, title, body };
  return Object.create(contentMethods(obj));
};
```

### Prototype methods (contentMethods)
Delegate prototype for base content objects.

```contentMethods``` is a function factory that returns an object with these properties:
- ```code``` getter: returns contentObj.code (contentObj attributes are private otherwise, to prevent attribute overwrites)
- ```getArray()```: returns array of code, title, body
- ```hasTitle()```: checks if a content object has a title or not (true / false)

```javascript
const contentMethods = contentObj =>
  ({
    get code() {
      return contentObj.code;
    },
    getArray() {
      return Array.from(Object.values(contentObj));
    },
    hasTitle() {
      return (!!contentObj.title);
    },
  }); // end contentMethods
```

## Content Collections
### Base Collection (contentCollection)
```contentCollection``` is a factory function that returns a new object with methods inhertied from ```collectionMethods```

```contentCollection``` takes in:
- a series of contObjs (obj1, obj2, obj3)
OR
- an array of contObjs ([obj1, obj2, obj3])
OR
- nothing at instantiation, with objects added later with ```addContent()```

```flatten()``` is a private method to flatten input array.

```javascript
const contentCollection = (...contentObjs) => {
  const flatten = arr => arr.reduce((retArr, item) => {
    if(Array.isArray(item)) {
      return retArr.concat(flatten(item));
    }
    retArr.push(item);
    return retArr;
  }, []);

  const contentsArray = flatten([...contentObjs]);
  return Object.create(collectionMethods(contentsArray));
}; // end contentCollection
```

### Prototype Methods (collectionMethods)
Delegate prototype for base collection objects. 

```collectionMethods``` is a function factory that returns an object with these properties:
- ```size``` getter: returns size of collection
- ```codes``` getter: returns content codes
- ```addContent()```: adds however many new content objects
- ```returnArrays()``` returns an array of contentObject as arrays

```javascript
const collectionMethods = contentsArray =>
  ({
    get size() {
      return contentsArray.length;
    },
    get codes() {
      return contentsArray.map(content => content.code);
    },
    addContent(...newObjs) {
      contentsArray.push(...newObjs);
    },
    getArrays() {
      return contentsArray.map(obj => obj.getArray());
    },
  }); // end collectionMethods
```

## Basic Usage
### Instantiating
```javascript
const p1 = contentObj("TH_EX01", "", "Lorem ipsum, 01, dolor");
const p2 = contentObj("TH_EX02", "Title 02", "Lorem ipsum, 02, dolor");
const p3 = contentObj("TH_EX03", "Title 03", "Lorem ipsum, 03, dolor");
```

Adding contentObjs to a collection.

Option 1:
```javascript
const collection = contentCollection(p1, p2, p3)
```

Option 2:
```javascript
const collection = contentCollection([p1, p2, p3])
```

Option 3:
```javascript
const collection = contentCollection()
collection.addContent(p1)
collection.addContent(p2, p3)
```

### Using methods
Content object methods
```javascript
p1.code
// Returns "TH_EX01"

p2.getArray()
// Returns ["TH_EX02", "Title 02", "Lorem ipsum, 02, dolor"]

p3.hasTitle()
// Returns true
```

Content collection methods
```javascript
collection.codes
// Returns ["TH_EX01", "TH_EX02", "TH_EX03"]

collection.size
// Returns 3

collection.returnArrays()
// Returns [["TH_EX02", "Title 02", "Lorem ipsum, 02, dolor"],
//          ["TH_EX02", "Title 02", "Lorem ipsum, 02, dolor"],
//          ["TH_EX02", "Title 02", "Lorem ipsum, 02, dolor"]]
```

## Notes
- Is this unnecessarily complicated? Are methods cumbersome?
- Should we migrate to FP?