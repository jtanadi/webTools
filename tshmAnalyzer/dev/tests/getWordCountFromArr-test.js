const test = require("tape");
const getWordCount = require("../getWordCountFromArr");

test("counts words in an array", t => {
  const input = ["hello how are you great", "that's cool, not so bad", "yay thank you!"];
  const actual = getWordCount(input);
  const expected = 13;

  t.equal(actual, expected);
  t.end();
});
