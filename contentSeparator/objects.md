# Content Separator Objects
Basic outline of objects to be implemented. We are using the factory function method of object creation. Notes on this & other methods can be found [here](https://github.com/jtanadi/webTools/blob/master/contentSeparator/notes.md).

## Prototypes
### contentProto
Delegate prototype for base content objects.

```contentProto``` is a function factory that returns an object with these properties:
- ```code``` getter: returns contentObj.code (contentObj attributes are private otherwise, to prevent attribute overwrites)
- ```returnAsArray()```: returns array of code, title, body


```javascript
const contentProto = contentObj => { 
  return {
    get code() {
      return contentObj.code;
    },
    returnAsArray() {
      return [contentObj.code, contentObj.title, contentObj.body];
    }
  }; // end returned object
}; // end contentProto
```

### collectionProto
Delegate prototype for base collection objects. 

```collectionProto``` is a function factory that returns and object with these properties:
- ```size``` getter: returns size of collection
- ```codes``` getter: returns content codes
- ```addContent()```: adds however many new content objects

```javascript
const collectionProto = contentsArray => {
  return {
    get size() {
      return contentsArray.length;
    },
    get codes() {
      return contentsArray.map(content => content.code);
    },
    addContent(...newObjs) {
      contentsArray.push(...newObjs);
    }
  }; // end returned object
}; // end collectionProto
```
## Objects
### contentObj
```contentObj``` is a factory function that returns a new object based on ```contentProto``` and takes in:
- code
- title
- body

```contentObj``` has:
- ```hasTitle()``` method
- Private attributes, so they can't be overwritten after instantiation

```javascript
const contentObj = (code, title="", body) => {
  let obj = {code, title, body}
  return Object.assign(
    Object.create(contentProto(obj)), {
      hasTitle() {
        return (!title) ? false : true;
      }
    });
};
```

## contentCollection
```contentCollection``` is a factory function that returns a new object based on ```collectionProto``` and takes in:
- a series of contObjs (obj1, obj2, obj3)
OR
- an array of contObjs ([obj1, obj2, obj3])
OR
- nothing at instantiation, with objects added later with ```addContent()```

```contentCollection``` has:
- ```checkDupes()``` (to be implemented)
- ```returnArrays()``` returns an array of contentObject as arrays

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

  return Object.assign(
    Object.create(collectionProto(contentsArray)), 
    {
      checkDupes() {
        console.log("tk")
      },
      returnArrays() {
        return contentsArray.map(obj => obj.returnAsArray());
      }
    });
}; // end contentCollection
```

## Basic Usage
### Instantiating
```javascript
const p1 = contentObj("TH_EX01", "", "Lorem ipsum, 01, dolor");
const p2 = contentObj("TH_EX02", "Title 02", "Lorem ipsum, 02, dolor");
const p3 = contentObj("TH_EX03", "Title 03", "Lorem ipsum, 03, dolor");
```

Adding contentObjs to a collection.

Method 1:
```javascript
const collection = contentCollection(p1, p2, p3)
```

Method 2:
```javascript
const collection = contentCollection([p1, p2, p3])
```

Method 3:
```javascript
const collection = contentCollection()
collection.addContent(p1)
collection.addContent(p2)
collection.addContent(p3)
```

### Other methods
Content object methods
```javascript
p1.code
// Returns "TH_EX01"

p2.returnAsArray()
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