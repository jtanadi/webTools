const panelCellImgs = document.querySelectorAll(".panel_cell img");
const panelCells = document.querySelectorAll(".panel_cell");
// const cellsContainer = document.getElementById("cells_container");

const clicked = false;
let opened;

// panelCellImgs.forEach(cellImg => {
//   cellImg.addEventListener("click", function() {
//     if(!clicked && this !== opened) {
//       this.parentElement.style.flex = "1 0 30vw";
//       this.parentElement.style.maxWidth = "30vw";
//       this.parentElement.style.height = "30vw";
//       clicked = true;
//       opened = this;
//     } else if(clicked && this !== opened) {
//       panelCells.forEach(cell => {
//         cell.style.flex = "1 0 12vw";
//         cell.style.maxWidth = "12vw";
//         cell.style.height = "12vw";
//       });
//       this.parentElement.style.flex = "1 0 30vw";
//       this.parentElement.style.maxWidth = "30vw";
//       this.parentElement.style.height = "30vw";
//       clicked = true;
//       opened = this;
//     } else if(clicked && this === opened) {
//       panelCells.forEach(cell => {
//         cell.style.flex = "1 0 12vw";
//         cell.style.maxWidth = "12vw";
//         cell.style.height = "12vw";
//       });
//       clicked = false;
//       opened = null;
//     }
//   });
// });

// panelCells.forEach(cellImg => {
//   cellImg.addEventListener("click", function() {
//     if(!clicked) {
//       // this.parentElement.style.display = "block";
//       // this.style.display = "inline-flex";
//       this.style.position = "absolute";
//       this.style.maxWidth = "50vw";
//       this.style.width = "50vw";
//       this.style.height = "50vw";
//       this.style.zIndex = 99;
//       this.style.top = 0;
//       this.style.flex = "5 5 auto";
//       clicked = true;
//     } else {
//       this.style.position = "static";
//       this.style.maxWidth = "12vw";
//       this.style.width = "12vw";
//       this.style.height = "12vw";
//       this.style.zIndex = 0;
//       this.style.flex = "1 0 12vw";
//       clicked = false;
//     }
//   });
// });

// panelCellImgs.forEach(cell => {
//   cell.addEventListener("click", () => {
//     panelCells.forEach(panelCell => {
//       panelCell.style.flex = "1 0 12vw";
//       panelCell.style.maxWidth = "12vw";
//       panelCell.style.height = "12vw";
//     });
//   });
// });
