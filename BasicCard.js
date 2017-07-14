var fs = require('fs');
var inquirer = require("inquirer");

module.exports = basicFlashcard;

function basicFlashcard(front, back) {
    this.front = front;
    this.back = back;
    this.create = function() {
        var data = {
            front: this.front,
            back: this.back,
            type: "basic"
        };
        fs.appendFile("log.txt", JSON.stringify(data) + ";", "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        });
    };
}

// inquirer.prompt([{
                //     name: "command",
                //     message: "What would you like to do?",
                //     type: "list",
                //     choices: [{
                //         name: "add-flashcard"
                //     }, {
                //         name: "show-flashcards"
                //     }]
                // }]).then(function(answer) {
                //     if (answer.command === "add-flashcard") {
                //         addCards();
                //     } else if (answer.command === "show-flashcards") {
                //         showCards();
                //     }
                // });

                // function addCards() {
                //     inquirer.prompt([{
                //         name: "cardType",
                //         message: "What kind of card would you like to make?",
                //         type: "list",
                //         choices: [{
                //             name: "basic-flashcard"
                //         }, {
                //             name: "cloze-flashcard"
                //         }]
                //     }]).then(function(answer) {
                //         if (answer.cardType === "basic-flashcard") {
                //             inquirer.prompt([{
                //                 name: "front",
                //                 message: "What is the question?",
                //                 validate: function(input) {
                //                     if (input === "") {
                //                         console.log("You need to input a question");
                //                         return false;
                //                     } else {
                //                         return true;
                //                     }
                //                 },
                //                 name: "back",
                //                 message: "What is the answer?",
                //                 validate: function(input) {
                //                     if (input === "") {
                //                         console.log("You need to input an answer");
                //                         return false;
                //                     } else {
                //                         return true;
                //                     }
                //                 }
                //             }]).then(function(answers) {
                //                 var newBasic = new basicCards(answers.front, answers.back);
                //                 newBasic.create();

                //                 next();
                //             })
                //         }
                //     });
                // }
