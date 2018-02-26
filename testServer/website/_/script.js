/*
Based on Daniel Shiffman's Session 8: Building an API with Node.js and Express
https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Yyn-fBtGHfN0_xCtBwUkBp

vanilla JS implementation of front-end
*/

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const submit = document.getElementById("submit");

const wordList = document.getElementById("wordList");

const newXHR = (action, word, score) => {
	const xhr = new XMLHttpRequest();
	if(action === "all") {
		xhr.open("GET", `http://localhost:3000/all`);
		xhr.send();
		
		xhr.onreadystatechange = () => {
			if(xhr.readyState === 4) {
				const responseObject = JSON.parse(xhr.responseText);
				wordList.innerHTML = "<strong>Word list:</strong><br>";

				for(let key in responseObject) {
					wordList.innerHTML += `${key} = ${responseObject[key]} <br>`
				}
			} // end if xhr.readyState
		}; // end onreadystatechange

	} else {
		if(action === "search") {
			xhr.open("GET", `http://localhost:3000/search/${word}`);
		
		} else if(action === "add") {
			xhr.open("GET", `http://localhost:3000/add/${word}/${score}`);
		}

		xhr.send();
		xhr.onreadystatechange = () => {
			if(xhr.readyState === 4) {
				console.log(xhr.responseText);
			}
		}; // end onreadystatechange		
	} // end else
}; // end newXHR()

newXHR("all");

submit.addEventListener("click", () => {
	newXHR("add", nameInput.value, scoreInput.value);
	newXHR("all");
})