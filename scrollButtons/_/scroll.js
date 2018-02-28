let windowHeight = window.innerHeight;
let pgIndex = 0;
const currentTransition = window.getComputedStyle(document.body).transition;

const scrollToHeightIndex = (height, index, cssTransition) => {
	/* (num, num, string)

	Using CSS's translate property, move the body to a target height 
	based on height * index. index works like page numbers if height = 1 "page"

	If cssTransition isn't specified, "none" is used
	*/
	document.body.style.transform = `translate(0, -${height * index}px)`;
	document.body.style.transition = cssTransition || "none";
}

window.addEventListener("resize", () => {
	windowHeight = window.innerHeight;

	// Prevent transition-scrolling while resizing.
	scrollToHeightIndex(windowHeight, pgIndex);
})

document.querySelector("body").addEventListener("click", (evt) => {
	if(evt.target.tagName === "SPAN") {
		if(evt.target.className.includes("down")) {
			pgIndex ++;
			scrollToHeightIndex(windowHeight, pgIndex, currentTransition);
		
		} else if(evt.target.className.includes("up")) {
			pgIndex --;
			scrollToHeightIndex(windowHeight, pgIndex, currentTransition);
		}
	}
});

