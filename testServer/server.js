/*
Based on Daniel Shiffman's Session 8: Building an API with Node.js and Express
https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Yyn-fBtGHfN0_xCtBwUkBp
*/

let words = {
	"hello": 3,
	"bye": 2
}

console.log("Server is starting");

const express = require("express");
const app = express();

const server = app.listen(3000, () => {
	console.log("listening...");
	console.log('ba')
});

app.use(express.static("website"));

// Show all
app.get("/all", (request, response) => {
	response.send(words);
});

// Add word: score pair
app.get("/add/:word/:score?", (request, response) => {
	const score = parseInt(request.params.score);
	let reply;

	if(!score) {
		reply = {"message": "Score is required."};
	
	} else {
		words[request.params.word] = score;
		reply = {"message": "Thank you for your word."};
	}

	response.send(reply);
});

// Search word
app.get("/search/:word", (request, response) => {
	const word = request.params.word;
	let reply;
	if(words[word]) {
		reply = {
			status: "found",
			word: word,
			score: words[word]
		}
	
	} else {
		reply = {
			status: "not found",
			word: word
		}
	}

	response.send(reply);
	
});





