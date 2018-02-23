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

const filterRegEx = function (inputArr, regex) {
  /* (arr, str) -> arr of strings

  Returns an array filtered with the passed-in RegEx.

  */
}

const indexElement = function (inputArr, elmtToFind, regex) {
  /* (arr, str, bool) -> arr of nums

  Looks through input array and logs the index number(s)
  of the passed-in element. 
  If RegEx is true, the function will treat elmtToFind as 
  an expression.

  */
}