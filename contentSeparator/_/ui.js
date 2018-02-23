const contentInput = document.getElementById("rawContent"); 

document.querySelector("input[type='button']").addEventListener("click", () =>{
  let arrToWrite = textToArray(contentInput.value)
                    .filter(item => item.includes("_"));
  
  
  document.querySelector("#codes").value = arrToWrite.join("\n\n");
});
