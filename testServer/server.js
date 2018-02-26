/*
Based on Daniel Shiffman's Session 8: Building an API with Node.js and Express
https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Yyn-fBtGHfN0_xCtBwUkBp
*/

console.log("Server is starting");

const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");

const app = express();

let words = JSON.parse(fs.readFileSync("words.json"));

const server = app.listen(3000, () => {
	console.log("listening...");
});

app.use(express.static("website"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Show all
app.get("/all", (request, response) => {
	response.send(words);
});

// Add word: score pair
// app.get("/add/:word/:score?", (request, response) => {
// 	const score = parseInt(request.params.score);
// 	let reply;

// 	if(!score) {
// 		reply = {
// 			status: "Failed. Score is required",
// 			word: request.params.word
// 		};
// 		response.send(reply);
	
// 	} else {
// 		words[request.params.word] = score;

// 		fs.writeFile("words.json", JSON.stringify(words, null, 2), (err) => {
// 			console.log("Word added");	
// 			reply = {
// 				status: "success",
// 				word: request.params.word,
// 				score: words[request.params.word]
// 			};
// 			response.send(reply);
// 		}); // end writeFile's callback
// 	} // end else
// }); // end add

app.post("/add", (request, response) => {
	console.log(request.body);
	let reply = {
		status: "works"
	}

	response.send(reply);
}); // end post


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

// Delete word
app.get("/remove/:word", (request, response) => {
	const word = request.params.word;
	let reply;

	if(!words[word]) {
		reply = {
			status: "Failed. Word not found",
			word: request.params.word
		};
		response.send(reply);
	
	} else {
		delete words[request.params.word];

		fs.writeFile("words.json", JSON.stringify(words, null, 2), (err) => {
			console.log("Word deleted");
			reply = {
				status: "success",
				word: request.params.word,
			};
			response.send(reply);
		}); //end writeFile's callback
	} // end else
}); // end delete





