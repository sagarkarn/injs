import * as fs from 'fs';
function choice(li) {
    return li[
      Math.floor(Math.random() * li.length)
    ];
  }
let path = choice(fs.readdirSync("data/images"));
console.log(path);