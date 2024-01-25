
var fs = require("fs");
var path = require("path");

var root = "./src/pages";
const pages = fs.readdirSync(path.join(__dirname, '../src/pages'))
console.log(pages)

function genPagesDir(){
    var dirs = {}
    for(var i = 0 ; i <pages.length;i++){
        var a = pages[i]
        dirs[a] = `${root}/${a}`
    }
    return dirs
}
module.exports = genPagesDir()
