const inquirer = require("inquirer");
const fs = require("fs");
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt(questions);
}

const questions = [
    {
        type: "input",
        name: "title",
        message: "Title: "
    },

    {
        type: "editor",
        name: "mainDescription",
        message: "Enter README description: "
    },

    {
        type: "editor",
        name: "installation",
        message: "Enter instruction for installation of application: "
    },

    {
        type: "editor",
        name: "usage",
        message: "Provide examples/describe usage of application: "
    },

    {
        type: "list",
        name: "license",
        message: "Select a license:",
        choices: [
            "MIT License",
            "GNU GPLv3",
            "ISC License"
        ]
    },

    {
        type: "input",
        name: "contributing",
        message: "List any contributing users here (or enter 'None'): "
    },

    {
        type: "editor",
        name: "tests",
        message: "Please paste any tests for your application: "
    },

    {
        type: "input",
        name: "questions",
        message: "Please Enter your GitHub username: "
    }


];

function generateMarkdown(data) {
    return `
  # ${data.title}

  ##  Description
  
  ${data.mainDescription}

  ## Table of Contents

  * [Installation](#Installation)
  * [Usage](#Usage)
  * [License](#License)
  * [Contributing](#Contributing)
  * [Tests](#Tests)
  * [Questions](#Questions)


  ## Installation

  ${data.installation}

  ## Usage
  
  ${data.usage}


  ## License
  
  ${data.license}


  ## Contributing
  
  ${data.contributing}

  ## Tests

  ${data.tests}


  ## Questions

![alt text](https://avatars.githubusercontent.com/${data.questions}?size=200 " 's Profile Avatar")


[https://github.com/${data.questions}](https://github.com/${data.questions})


  `;
}

promptUser()
    .then(function (answers) {
        const md = generateMarkdown(answers);
        return writeFileAsync("README.md", md)
    })
    .then(function () {
        console.log("Your README has been generated!")
    })
    .catch(function (error) {
        console.log(error)
    });