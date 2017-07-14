var fs = require("fs");

module.exports = clozeDeletion;

function clozeDeletion(text, cloze) {
    this.text = text;
    this.cloze = cloze;
    this.clozeDeleted = this.text.replace(this.cloze, "__________");
    this.create = function() {
        var data = {
            text: this.text,
            cloze: this.cloze,
            clozeDeleted: this.clozeDeleted,
            type: "cloze"
        };
        fs.appendFile("log.txt", JSON.stringfy(data) + ";", "utf8", function(error) {
            if (error) {
                console.log(error);
            }
        })
    }
}
