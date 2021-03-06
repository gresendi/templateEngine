const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const {writeFile} = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = []
let managerCount =0
let employeeQuestion = [
  {
    type: 'input',
    name: 'name',
    message: "Enter employee's name"

  },
  {
    type: 'number',
    name: 'id',
    message: "Enter employee's id"

  },
  {
    type: 'input',
    name: 'email',
    message: "Enter employee's email"

  }

]

function createManager() {
  let name = ''
  let id = ''
  let email = ''

  prompt(employeeQuestion

  ).then(({ name, id, email }) => {
    name = name
    id = id
    email = email
    prompt({
      type: 'input',
      name: 'officeNumber',
      message: "What is their office number?"
    }).then(({ officeNumber }) => {
      let manager = new Manager(name, id, email, officeNumber)
      employees.push(manager)
      menu()
    })

  }).catch(err => console.error(err))


}


function createEngineer() {
  let name = ''
  let id = ''
  let email = ''

  prompt(employeeQuestion

  ).then(({ name, id, email }) => {
    name = name
    id = id
    email = email
    prompt({
      type: 'input',
      name: 'github',
      message: "What is their github username?"
    }).then(({ github }) => {
      let engineer = new Engineer(name, id, email, github)
      employees.push(engineer)
      menu()
    })

  }).catch(err => console.error(err))


}

function createIntern() {
  let name = ''
  let id = ''
  let email = ''

  prompt(employeeQuestion

  ).then(({ name, id, email }) => {
    name = name
    id = id
    email = email
    prompt({
      type: 'input',
      name: 'github',
      message: "What is their school named?"
    }).then(({ github }) => {
      let intern = new Intern(name, id, email, github)
      employees.push(intern)
      menu()
    })

  }).catch(err => console.error(err))


}

function menu(){
  prompt({
    type:'list',
    name: 'employee',
    message: 'Which type of employee would you like to add',
    choices: ['Manager','Engineer','Intern','All Done']
  }).then( ({employee})=>{
    
    switch(employee){
      case 'Manager':
        managerCount++
        if(managerCount<=1){
          createManager()
        }else{
          console.log("You can only have one manager!")
          menu()
        }
        
        
        break
      case 'Engineer':
        createEngineer()
       
        break
      case 'Intern':
        createIntern()
        
        break
      case 'All Done':
        writeFile('./output/index.html', render(employees), err => {
          if (err) { console.log(err) }
          console.log('Team Built!')
        })
        

        break
    }
    
  })
  
}

function init(){

  menu()
  
}
init()
// createManager()
// createEngineer()


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
