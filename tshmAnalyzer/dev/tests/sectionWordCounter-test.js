const test = require("tape");
const sectionWordCounter = require("../sectionWordCounter");

test("counts words by section", t => {
  const input = [
    "1.0_st01", "Lorem ipsum", "more text",
    "2.0_pt02", "Lipsum, bla bla", "bep bop", "bla belo",
    "2.1_pt03", "Text here",
    "3.0_la04", "Bla bla bla", "bla balablaa", "hello", "motto",
  ];
  const regex = "[0-9]\.[0-9]_[a-z]+[0-9]+";

  const expected = [
    "1.0_st01:\n4 words",
    "2.0_pt02:\n7 words",
    "2.1_pt03:\n2 words",
    "3.0_la04:\n7 words",
  ];
  const actual = sectionWordCounter(input, regex);

  t.deepEqual(actual, expected);
  t.end();
});
