let windowHeight = window.innerHeight;
let pgIndex = 0;
const currentTransition = window.getComputedStyle(document.body).transition;

const scrollToHeightIndex = (height, index, cssTransition = "none") => {
	/* (num, num, string)

	Using CSS's translate property, move the body to a target height 
	based on height * index. index works like page numbers if height = 1 "page"

	cssTransition defaults to "none"
	*/
	document.body.style.transform = `translate(0, -${height * index}px)`;
	document.body.style.transition = cssTransition;
}

window.addEventListener("resize", () => {
	windowHeight = window.innerHeight;

	// Prevent transition-scrolling while resizing.
	scrollToHeightIndex(windowHeight, pgIndex);
})

document.body.addEventListener("click", (evt) => {
	if(evt.target.tagName === "P") {
		if(evt.target.className.includes("down")) {
			pgIndex ++;
			scrollToHeightIndex(windowHeight, pgIndex, currentTransition);
		
		} else if(evt.target.className.includes("up")) {
			pgIndex --;
			scrollToHeightIndex(windowHeight, pgIndex, currentTransition);
		}
	}
});

document.querySelector(".top").addEventListener("click", (evt) => {
  pgIndex = 0;
  scrollToHeightIndex(windowHeight, pgIndex, currentTransition);
})