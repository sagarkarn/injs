import * as fs from 'fs'

let path = fs.readdirSync("data/video").filter(path => { return path.includes('mp4')})
console.log(path)