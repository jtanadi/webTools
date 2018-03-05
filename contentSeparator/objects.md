# Content Separator Objects
Basic outline of objects to be implemented. We are using the factory function method of object creation. Notes on this & other methods can be found [here](https://github.com/jtanadi/webTools/blob/master/contentSeparator/notes.md).

## Content Objects
### Base Content Object
The base content object holds:
- getArray() function: returns [code, title, body]
```javascript
const baseContentObj = {
  getArray() {
    return [this.code, this.title, this.body]
  }
}
```

### Content Object
This object is composed of baseContentObj & is extended by adding these info:
- Code (either from museum or made up in-house)
- Title (has default param in case no title is passed in)
- Body

We are composing with baseContentObj so that getArray() is prototypically delegated.

```javascript
const contentObj = (code, title="", body) => {
  return Object.assign(Object.create(baseContentObj),
    {
      code,
      title,
      body
    });
}
```

## Content Collections
More tk.
