const path = require("path");
const fs = require("fs-extra");

const convertFile = (directory, options) => {
  fs.readFile(directory, "utf8", (err, data) => {
    if (err) throw err;    
    
    // handler
    if(options.type !== "text") return console.error("sorry did you mean 'text' ?")
    if(options.type && path.extname(directory).split('.')[1] === options.type) return console.error('cannot convert file to the same format')
    if(options.option && options.type === 'text' && path.extname(options.option).split(".")[1] !== "txt") return console.error('error in the new directory, ext must be txt')
    if(options.option && options.type === 'json' && path.extname(options.option).split(".")[1] !== "json") return console.error('error in the new directory, ext must be json')
    
    const file = path.basename(directory)
    const new_name = file.split(".")[0]
    const dest = options.type === "json" ? path.join(path.dirname(directory), `${new_name}.json`):path.join(path.dirname(directory), `${new_name}.txt`);
    // convert type value
    const content = options.type === "json" ? JSON.parse(data) : JSON.stringify(data);

    
    fs.writeFile(options.option??dest, content, "utf8")
      .then(() => {
        console.log(`File Convert to ${options.type??path.extname(dest).split('.')[1]}:` + path.basename(options.option??dest));
      })
      .catch((err) => {
        console.error(err);
      });
  });
};

module.exports = {
  convertFile,
};
