/*
Based on Daniel Shiffman's Session 8: Building an API with Node.js and Express
https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Yyn-fBtGHfN0_xCtBwUkBp

vanilla JS implementation of front-end
*/

const nameInput = document.getElementById("name");
const scoreInput = document.getElementById("score");
const wordList = document.getElementById("wordList");

const newXHR = (action, word, score) => {
	/* (str[, str, num])
	
	This function deals with all XMLHttpRequest stuff:
	- Instantiate new XMLHttpRequest object
	- Open connection based on action parameter
	- Send data
	- Update wordList (if action === "all")
	*/
	const xhr = new XMLHttpRequest();

	if(typeof action === "undefined" || action === "all") {
		xhr.open("GET", `/all`);
		xhr.send();
		
		xhr.onreadystatechange = () => {
			if(xhr.readyState === 4) {
				const responseObject = JSON.parse(xhr.responseText);
				wordList.innerHTML = "<strong>Word list:</strong><br>";

				for(let key in responseObject) {
					wordList.innerHTML += `${key} — ${responseObject[key]} <br>`
				}
			} // end if xhr.readyState
		}; // end onreadystatechange

	} else {
		if(action === "search") {
			xhr.open("GET", `/search/${word}`);
		
		} else if(action === "add") {
			xhr.open("POST", "/add");
			xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			let objToSend = {
				word: word,
				score: score
			}
			xhr.send(JSON.stringify(objToSend));
		
		} else if(action === "remove") {
			xhr.open("GET", `/remove/${word}`);	
			xhr.send();
		}

		xhr.onreadystatechange = () => {
			if(xhr.readyState === 4) {
				console.log(xhr.responseText);
			}
		}; // end onreadystatechange		
	} // end else
}; // end newXHR()

newXHR("all");

document.querySelector("body")
	.addEventListener("click", (event) => {
		if(event.target.id === "submit") {
			newXHR("add", nameInput.value, scoreInput.value);
			nameInput.value = "";
			scoreInput.value = "";
			
		} else if(event.target.id === "remove") {
			newXHR("remove", nameInput.value);
			nameInput.value = "";
			scoreInput.value = "";
		}

		newXHR();
	});









