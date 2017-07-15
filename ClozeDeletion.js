var fs = require("fs");

var ClozeDeletion = function(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = this.text.replace(this.cloze, "__________");
    this.type = "cloze";
}

module.exports = ClozeDeletion;
