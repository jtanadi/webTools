/*
Based on Daniel Shiffman's Session 8: Building an API with Node.js and Express
https://www.youtube.com/playlist?list=PLRqwX-V7Uu6Yyn-fBtGHfN0_xCtBwUkBp
*/

console.log("Server is starting");

const express = require("express"),
	cors = require("cors"),
	bodyParser = require('body-parser'),
	fs = require("fs");

const app = express();
let words = JSON.parse(fs.readFileSync("words.json"));

app.use(express.static("website"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const server = app.listen(3000, () => {
	console.log("Server started at http://localhost:3000");
	console.log("Listening . . .");
});

// Show all
app.get("/all", (request, response) => {
	response.send(words);
});

// Add using post
app.post("/add", (request, response) => {
	const word = request.body.word;
	const score = parseInt(request.body.score);
	let reply;

	if(!score) {
		reply = {
			status: "Failed. Score is required",
			word: word
		};
		response.send(reply);
	
	} else {
		words[word] = score;

		fs.writeFile("words.json", JSON.stringify(words, null, 2), (err) => {
			console.log("Word added");	
			reply = {
				status: "success",
				word: word,
				score: score
			};
			response.send(reply);
		}); // end writeFile's callback		
	} //end else
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





