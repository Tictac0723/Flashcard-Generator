var fs = require("fs");
var inquirer = require("inquirer");

var clozeCards = ("./ClozeCard.js");
var basicCards = ("./BasicCard.js");

inquirer.prompt([{
    name: "command",
    message: "What would you like to do?",
    type: "list",
    choices: [{
        name: "add-flashcard"
    }, {
        name: "show-flashcards"
    }]
}]).then(function(answer) {
    if (answer.command === "add-flashcard") {
        addCards();
    } else if (answer.command === "show-flashcards") {
        showCards();
    }
});

function addCards() {
    inquirer.prompt([{
        name: "cardType",
        message: "What kind of card would you like to make?",
        type: "list",
        choices: [{
            name: "basic-flashcard"
        }, {
            name: "cloze-flashcard"
        }]
    }]).then(function(answer) {
        if (answer.cardType === "basic-flashcard") {
            inquirer.prompt([{
                name: "front",
                message: "What is the question?",
                validate: function(input) {
                    if (input === "") {
                        console.log("You need to input a question");
                        return false;
                    } else {
                        return true;
                    }
                },
                name: "back",
                message: "What is the answer?",
                validate: function(input) {
                    if (input === "") {
                        console.log("You need to input an answer");
                        return false;
                    } else {
                        return true;
                    }
                }
            }]).then(function(answers) {
                var newBasic = new basicCards(answers.front, answers.back);
                newBasic.create();

                next();
            })
        } else if (answer.cardType === "cloze-flashcard") {
            inquirer.prompt([{
                name: "information",
                message: "What is the full text?",
                validate: function(input) {
                    if (input === "") {
                        console.log('You need to input your flashcard information.');
                        return false;
                    } else {
                        return true;
                    }
                },
                name: "hidden",
                message: "What is the hidden portion of your information?",
                validate: function(input) {
                    if (input === "") {
                        console.log("Please input the hidden portion of your flashcard.");
                        return false;
                    } else {
                        return true;
                    }
                }
            }]).then(function(answers) {
                var text = answers.text;
                var cloze = answers.cloze;
                if (text.includes(cloze)) {
                    var newHidden = new ClozeCard(information, cloze);
                    newHidden.create();
                    next();
                } else {
                    console.log("The hidden part you provided is not in the information. Please try again.");
                    addCards();
                }
            });
        }
    });
};


var next = function() {
    inquirer.prompt([{
        name: "next",
        message: "Now what do you want to do?",
        type: "list",
        choices: [{
            name: "add-flashcard",
        }, {
            name: "show-flashcards",
        }, {
            name: "nothing"
        }]
    }]).then(function(answer) {
        if (answer.next === "add-flashcard") {
            addCards();
        } else if (answer.next === "show-flashcards") {
            showCards();
        } else if (answer.next === "nothing") {
            return;
        }
    })
};

var showCards = function() {
    question = array[index];
    var parsedQuestion = JSON.parse(question);
    var questionText;
    var correctResponse;

    if (parsedQuestion.type === "basic") {
        questionText = parsedQuestion.front;
        correctResponse = parsedQuestion.back;
    } else if (parsedQuestion.type === "cloze") {
        questionText = parsedQuestion.clozeDeleted;
        correctResponse = parsedQuestion.cloze;
    }
    inquirer.prompt([{
        name: "response",
        message: questionText
    }]).then(function(answers) {
        if (answer.response === correctResponse) {
            console.log("Correct!")
            if (index < array.length - 1) {
                showCards(array, index + 1);
            }
        } else {
            console.log("Wrong!");
            if (index < array.length - 1) {
                showCards(array, index + 1)
            }
        }

    });
};
