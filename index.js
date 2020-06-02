const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Title"
        }
    ]);
}

const questions = [

];

function generateMarkdown(data) {
    return `
  # ${data.title}
  
  `;
}

promptUser()
    .then(function (answers) {
        const md = generateMarkdown(answers);
        return writeFileAsync("README.md", md)
    })
    .then(function () {
        console.log("Success")
    })
    .catch(function (error) {
        console.log(error)
    });
