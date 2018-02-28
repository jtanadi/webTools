/*
Deprecated as of 2/23/18

The tool uses functions in jsFuncs repo on gitHub instead 

Only here for a good time (as an archive)
*/

const findDifference = (list1, list2) => {
  /* (arr, arr) -> arr
  Returns an array of items in list1 NOT in list2
  */
  let notMatched = list1.reduce((collection, item1) => {
    if(!list2.includes(item1)) {
      collection.push(item1);
    }
    return collection;
  }, [])
  return notMatched;
};

const findSame = (list1, list2) => {
  /* (arr, arr) -> arr
  Returns an array of items in list1 ALSO in list2
  */

  let filtered = list1.reduce((collection, item1) => {
    if(list2.includes(item1)) {
      collection.push(item1);
    }
    return collection;
  }, [])
  return filtered;
};

const removeDupes = (list, checkCase) => {
  /* (arr[, bool]) -> arr, arr
  Returns an array of 2 arrays:
  - The first is the original list, with duplicated items removed;
  - The second is a list of duplicate items.
  checkCase is an optional bool parameter, false by default
  If checkCase is true, the checker is case-sensitive
    (ie. "foo" !== "Foo")
  */

  let seen = [];
  let dupes = [];

  let clean = list.reduce((collection, listItem) => {
    if(!checkCase && typeof listItem === "string") {
      listItem = listItem.toLowerCase();
    }

    if(!seen.includes(listItem)) {
      seen.push(listItem);
      collection.push(listItem);
    
    } else {
      dupes.push(listItem);
    }
    
    return collection;
  }, [])

  return [clean, dupes];
};
