const getWordCountFromArray = (inputArr) => {
  /* (arr) -> int

  Very basic... doesn't know what "words" really are.
  */
  return inputArr.reduce((sum, item) => {
    return sum += item.split(" ").length
  }, 0)
}

module.exports = getWordCountFromArray
