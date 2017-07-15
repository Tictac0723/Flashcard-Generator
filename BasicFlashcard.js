var fs = require('fs');
var inquirer = require("inquirer");

var BasicFlashcard = function(front, back) {
    this.front = front;
    this.back = back;
    this.type = "basic"
}

module.exports = BasicFlashcard;
