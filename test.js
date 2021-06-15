"use strict";
exports.__esModule = true;
var fs = require("fs");
function choice(li) {
    return li[Math.floor(Math.random() * li.length)];
}
var path = choice(fs.readdirSync("data/images"));
console.log(path);
