
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
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
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
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
else if(text === 'list\n'){
  list();
}
  else if (text === 'help\n'){
    help();
  }
  else if(text.startsWith("hello")){
  text = text.trim();
  if(text.substring(0,5) == "hello"){
    hello(text.substring(5));
  }
  else{
    unknownCommand(text);
  }
 
  }
  else{
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
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(x){
  console.log("hello"+x+"!");
}



/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Yahya Darwich")

/**
 * Show all possible commands
 *
 * @returns {void}
 */
function help(){
  console.log('The possible commands:\nhello\nhello "add anything"\nquit\nexit\nhelp ');
}

function list(){
  var tasks = ["sw","wda"];
  console.log("available tasks:\n");

  for(let i=0;i<tasks.length;i++){

    console.log(i+1+" - [ ] "+tasks[i]);
  }
}