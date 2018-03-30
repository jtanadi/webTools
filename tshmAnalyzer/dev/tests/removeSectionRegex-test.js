const test = require("tape");
const removeSectionRegex = require("../removeSectionRegex.js");

test.only("remove selected sections", t => {
  const input = [
    "1.0_st01", "Lorem ipsum", "more text",
    "2.0_pt02", "Lipsum, bla bla", "bep bop", "bla belo",
    "2.1_pt03", "Text here",
    "3.0_la04", "Bla bla bla", "bla balablaa", "hello", "motto",
  ];
  const regex = "[0-9]\.[0-9]_[a-z]+[0-9]+";
  const regexToRemove = "[0-9]\.[0-9]_pt[0-9]+";

  const expected = [
    "1.0_st01\nLorem ipsum\n\nmore text",
    "3.0_la04\nBla bla bla\n\nbla balablaa\n\nhello\n\nmotto",
  ];

  const actual = removeSectionRegex(input, regex, regexToRemove);

  t.deepEqual(actual, expected);
  t.end();  
});
