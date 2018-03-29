const test = require("tape")
const getIndices = require("../getIndices")
const codeToObj = require("../codeToObj")

test("indices found", t => {
  const input = [
    "1.0_st01", "Lorem ipsum", "more text",
    "2.0_pt02", "Lipsum, bla bla", "bep bop", "bla belo",
    "2.1_pt03", "Text here",
    "3.0_la04", "Bla bla bla", "bla balablaa"
  ];

  const expected = [0, 3, 7, 9]
  const actual = getIndices(input, /[0-9]\.[0-9]_/);

  t.deepEqual(actual, expected);
  t.end();
})

test("split array into obj", t => {
  const input = [
    "1.0_st01", "Lorem ipsum", "more text",
    "2.0_pt02", "Lipsum, bla bla", "bep bop", "bla belo",
    "2.1_pt03", "Text here",
    "3.0_la04", "Bla bla bla", "bla balablaa", "hello", "motto"
  ];

  const expected = {
    "1.0_st01": ["Lorem ipsum", "more text"],
    "2.0_pt02": ["Lipsum, bla bla", "bep bop", "bla belo"],
    "2.1_pt03": ["Text here"],
    "3.0_la04": ["Bla bla bla", "bla balablaa", "hello", "motto"]
  };

  const actual = codeToObj(input, /[0-9]\.[0-9]_/);

  t.deepEqual(actual, expected);
  t.end();
})