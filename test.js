"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = fs.readdirSync("data/video").filter(function (path) { return path.includes('mp4'); });
console.log(path);
