const chalk = require('chalk');
const figlet = require('figlet');

const generateModule = require('./generateModule');

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('MAMASTOP', {
        font: 'Bulbhead',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      })
    )
  );
  const passedArg = process.argv.slice(2);
  if (passedArg.length > 2) {
    help('Too many arguments!');
  } else if (passedArg[0] != 'component') {
    help('Flag should be component!');
  } else {
    const componentName = passedArg[1];
    console.log(chalk.yellow('\nGenerating component -->   ' + componentName));
    console.log(
      chalk.yellow('\nComponent Generated Successfully -->   ' + componentName)
    );
    console.log(chalk.yellow('\nHappy Coding '));
    generateModule(componentName, 'v1');
  }
};

const help = async (message) => {
  console.log(chalk.red('WRONG INPUT: ') + `${message}`);
  console.log(
    chalk.white('TO CREATE MODULE: ') +
      chalk.yellow('npm run create -- component component_name')
  );
};

(function runArgument() {
  init();
})();
