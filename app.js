var fs = require("fs");
var inquirer = require("inquirer");

var ClozeDeletion = require("./ClozeDeletion");
var BasicFlashcard = require("./BasicFlashcard");
var cardArray = [];

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
    var question = "";
    var answer = "";
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
        console.log(answer);
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
                }
            }]).then(function(answer) {
                question = answer.front;
                inquirer.prompt([{
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
                }]).then(function(answer) {
                    var newBasic = new BasicFlashcard(question, answer.back);
                    cardArray.push(newBasic);
                    next();
                });
            });
        } else if (answer.cardType === "cloze-flashcard") {
            var fullText = "";
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
                }
            }]).then(function(answer) {
                fullText = answer.information;
                inquirer.prompt([{
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
                    console.log(answers);
                    var hidden = answers.hidden;
                    if (fullText.includes(hidden)) {
                        var newHidden = new ClozeDeletion(fullText, hidden);
                        cardArray.push(newHidden);
                        next();
                    } else {
                        console.log("The hidden part you provided is not in the information. Please try again.");
                        addCards();
                    }

                });
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
            showCards(0);
        } else if (answer.next === "nothing") {
            return;
        }
    });
};

var showCards = function(index) {
    card = cardArray[index];

    var questionText;
    var correctResponse;

    if (card.type === "basic") {
        questionText = card.front;
        correctResponse = card.back;
    } else if (card.type === "cloze") {
        questionText = card.clozeDeleted;
        correctResponse = card.cloze;
    }
    inquirer.prompt([{
        name: "response",
        message: questionText
    }]).then(function(answer) {
        if (answer.response === correctResponse) {
            console.log("Correct!")
            if (index < cardArray.length - 1) {
                showCards(index + 1);
            }
        } else {
            console.log("Wrong!");
            if (index < cardArray.length - 1) {
                showCards(index + 1)
            }
        }

    });
};
