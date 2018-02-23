const listContainer = document.querySelector("ul.listContainer");

listContainer.addEventListener("click", (event) => {
  if(event.target.className.includes("listItem")) {
    let listItem = event.target;
    let listData = listItem.firstElementChild;

    listData.classList.toggle("hide");
  }
});