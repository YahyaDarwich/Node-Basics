/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */

var fs = require("fs");

function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (text === "list\n") {
    list();
  } else if (text.startsWith("add")) {
    add(text);
  } else if (text.startsWith("edit")) {
    edit(text);
  } else if (text.startsWith("remove")) {
    remove(text);
  } else if (text.startsWith("check")) {
    check(text);
  } else if (text.startsWith("uncheck")) {
    uncheck(text);
  } else if (text === "help\n") {
    help();
  } else if (text.startsWith("hello")) {
    text = text.trim();
    if (text.substring(0, 5) == "hello") {
      hello(text.substring(5));
    } else {
      unknownCommand(text);
    }
  } else {
    unknownCommand(text);
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(x) {
  console.log("hello" + x + "!");
}

/**
 * Exits the application
 *
 * @returns {void}
 */
// function quit() {
//   console.log("Quitting now, goodbye!");
//   process.exit();
// }

// The following line starts the application
startApp("Yahya Darwich");

/**
 * Show all possible commands
 *
 * @returns {void}
 */
function help() {
  fs.writeFile(
    "database.json",
    'The possible commands:\nhello\nhello "add anything"\nlist\nadd\nedit\nremove\ncheck\nuncheck\nquit\nexit\nhelp ',
    function (err) {
      if (err) throw err;
      console.log("Replaced!");
    }
  );
}

// var tasks = ["get milk"];

var prop;
var array = [
  {
    prop: "get milk",
    done: "",
  },
];

/**
 * list of commands
 */
function list() {
  console.log(array);
  console.log("available tasks:\n");

  for (let i = 0; i < array.length; i++) {
    if (array[i].done == "true") {
      console.log(i + 1 + " - [✓] " + array[i].prop);
    } else if (array[i].done == "false") {
      console.log(i + 1 + " - [ ] " + array[i].prop);
    } else {
      console.log(i + 1 + " - [ ] " + array[i].prop);
    }
  }
}

/**
 * check tasks
 */

function check(x) {
  var y = x.substring(6, x.length);
  var z = parseInt(y);

  if (y == "") {
    console.log("error: enter the number of task you need checked");
  } else if (z >= 1) {
    array[z - 1].done = "true";

    console.log(array);
  }
}

/**
 * uncheck tasks
 */
function uncheck(x) {
  var y = x.substring(8, x.length);
  var z = parseInt(y);

  if (y == "") {
    console.log("error: enter the number of task you need unchecked");
  } else if (z >= 1) {
    array[z - 1].done = "false";

    console.log(array);
  }
}

/**
 * add tasks
 */
function add(x) {
  var y = x.substring(4, x.length);
  if (y == "") {
    console.log("error: add a task to command add");
  } else {
    array.push({ prop: y.trim(), done: "" });
  }
}

/**
 * remove tasks
 */
function remove(x) {
  var y = parseInt(x.substring(7));
  if (y >= 1 && y <= array.length) {
    array.splice(y - 1, 1);
  } else if (y > array.length) {
    console.log("THe number entered does not exist");
  } else {
    array.splice(array.length - 1, 1);
  }
}

/**
 * edit tasks
 */
function edit(x) {
  var y = x.substring(5, x.length);
  var z = parseInt(x.substring(5, 7));
  var x = x.substring(6);
  if (y == "") {
    console.log("error: specific the task you want to edit");
  } else if (y != null && z >= 1) {
    array[z - 1].prop = x.trim();
  } else if (y != null) {
    array[array.length - 1].prop = y.trim();
  }
}

//   // function quit(){
//   //   console.log("Quitting now, goodbye!");

//   //   try {
//   //     fs.writeFileSync("data.json", JSON.stringify(tasks, null, 5))
//   //     // console.log(JSON.parse(tasks.toString()));
//   //   } catch (error) {
//   //     console.error(`Got an error trying to write the file: ${error.message}`);
//   //   }

//   //   process.exit();

//   // }

const { argv } = require("process");
let file = process.argv[2];
if (argv.length < 3) {
  file = "database.json";
}

let newData = fs.readFileSync(file);
let realdata = JSON.parse(newData);
let details = Object.values(realdata);
details.forEach((value) => {
  array = Object.values(details);
});

function quit() {
  console.log("Quitting now, goodbye!");
  try {
    var fs = require("fs");
    const MyObject = Object.assign({}, array);
    fs.writeFile(file, JSON.stringify(MyObject), function (err) {
      if (err) throw err;
      console.log("Replaced! Data Saved!");
      process.exit();
    });
  } catch (error) {
    console.error('Data not saved! check it');
  }
}
