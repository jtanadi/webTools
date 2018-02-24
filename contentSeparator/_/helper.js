const textToArray = function (textInput) {
  /* (str) -> arr of strings

  Returns an array of non-empty strings split at \n and
  stripped of empty before and after spaces.

  >>> textToArray("Hello\n How are you?\n\n Great!")
  ["Hello", "How are you", "Great"]
  */

  return textInput.split("\n")
          .filter(item => item)
          .map(item => item.trim());
};

const filterRegEx = function (inputArr, expression) {
  /* (arr, str or regex obj) -> arr of strings

  Returns an array filtered with the passed-in RegEx.
  */
  let exp;
  if(typeof expression === "string") {
    exp = new RegExp(expression);
  } else {
    exp = expression;
  }

  return inputArr.filter(item => {
    return exp.test(item);
  });

}

const indexElement = function (inputArr, itemToFind, useRegex) {
  /* (arr, str or regex obj[, bool]) -> arr of nums

  Looks through input array and logs the index number(s)
  of the passed-in element. 
  If useRegex is true, the function will treat itemToFind as 
  an expression. useRegex is false by default.
  */
  useRegex = useRegex || false;
  let exp;

  if(useRegex) {
    if(typeof itemToFind === "string") {
      exp = new RegExp(itemToFind);
    
    } else {
      exp = itemToFind;
    }
  }
  
  return inputArr.reduce((itemIndex, item) => {
    if(useRegex) {
      if(exp.test(item)) {
        itemIndex.push(inputArr.indexOf(item));
      }
    
    } else {
      if(item === itemToFind) {
        itemIndex.push(inputArr.indexOf(item));
      }
    }
    return itemIndex;
  }, []);

}
