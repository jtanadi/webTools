const getIndices = function (inputArr, itemToIndex) {
  /* (arr, str || num || regex obj) -> arr of nums
  Like Array.prototype.indexOf(), but returns all
  indices instead of first index

  Looks through input array and logs the index number(s)
  of itemToIndex. Returns [-1] if inputArr doesn't contain itemToIndex
  */

  if(!Array.isArray(inputArr)) throw new Error("First argument must be an array");
  
  const exp = new RegExp(itemToIndex);

  // Early exit when item isn't in array
  if(!inputArr.find(item => exp.test(item))) return [-1];
  
  return inputArr.reduce((returnIndices, item, index) => {
    if(exp.test(item)) returnIndices.push(index);
    return returnIndices;
  }, []);
};

module.exports = getIndices;
