const buttonDiff = document.getElementById("button_diff");
const buttonSame = document.getElementById("button_same");
const buttonDupes = document.getElementById("button_dupes");
const buttonReset = document.getElementById("reset");

const list1 = document.getElementById("list1_text");
const list2 = document.getElementById("list2_text");
const output = document.getElementById("output_text");

const list1Label = document.querySelector("label[for='list1_text']");
const list2Label = document.querySelector("label[for='list2_text']");
const outputLabel = document.querySelector("label[for='output_text']");

buttonDiff.addEventListener("click", () => {  
  let list1Text = list1.value.split("\n");
  let list2Text = list2.value.split("\n");

  let list1Diff = `From List 1:\n${findDifference(list1Text, list2Text)
                  .join("\n")}`;

  let list2Diff = `From List 2:\n${findDifference(list2Text, list1Text)
                  .join("\n")}`;

  output.value = `${list1Diff}\n\n${list2Diff}`;

})

buttonSame.addEventListener("click", () => {
  output.value = findSame(list1.value.split("\n"), list2.value.split("\n"))
                  .join("\n");
})

buttonDupes.addEventListener("click", () => {
  let dupesResults = removeDupes(list1.value.split("\n"));

  outputLabel.innerHTML = "Clean list";
  output.value = dupesResults[0]
  .join("\n");
  
  
  list2Label.innerHTML = "Duplicated items";
  list2.value = dupesResults[1]
                .sort()
                .join("\n"); 
})

buttonReset.addEventListener("click", () => {
  list2Label.innerHTML = "List 1";
  list2Label.innerHTML = "List 2";
  outputLabel.innerHTML = "Output";
})