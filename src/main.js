import program from 'commander';
import { VERSION } from './utils/constants';
import apply from './index';
import chalk from 'chalk';

/**
 * wow commands
 *    - config
 *    - init
 *    - template
 *    - choose
 */

let actionMap = {
  init: {
    alias: 'i',
    description: 'generate a new project from a template',
    usages: ['wow init <template-name> <project-directory>'],
  },
  config: {
    alias: 'cfg',
    description: 'config .wowrc',
    usages: [
      'wow config set <k> <v>',
      'wow config get <k>',
      'wow config remove <k>',
    ],
  },
  template: {
    alias: 'tpl',
    description: 'generate a new project from a direct template url',
    usages: ['wow template <template-registry-url> <project-directory>'],
  },
  choose: {
    alias: 'cos',
    description: 'choose a new project from resources',
    usages: ['wow choose <project-directory>'],
  },
  //other commands
};

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach((action) => {
    actionMap[action].usages.forEach((usage) => {
      console.log('  - ' + usage);
    });
  });
  console.log('\r');
  console.log('Example call:');
  console.log('  $ wow config get');
  console.log('  $ wow config set type users');
  console.log('  $ wow config set registry wujingacross');
  console.log('  $ wow init mobile-tpl-rc mobile-fe');
  console.log('  $ wow config set type directRegistry');
  console.log(
    '  $ wow init https://github.com/wujingacross/mobile-tpl-rc.git mobile-fe'
  );
  console.log(
    '  $ wow template https://github.com/wujingacross/mobile-tpl-rc.git mobile-fe'
  );
  console.log('  $ wow choose project-directory');
}

Object.keys(actionMap).forEach((action) => {
  program
    .command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias) //别名
    .action(() => {
      if (handleArgv()) {
        switch (action) {
          case 'config':
            //配置
            apply(action, ...process.argv.slice(3));
            break;
          case 'init':
            apply(action, ...process.argv.slice(3));
            break;
          case 'template':
            apply(action, ...process.argv.slice(3));
            break;
          case 'choose':
            apply(action, ...process.argv.slice(3));
            break;
          default:
            break;
        }
      }
    });
});

program.name('wow').usage('<command> [options]');
program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-v --version').parse(process.argv);

/**
 *  判断执行命令是的参数，最少3个参数，命令名和每个命令至少两个参数
 * */
function handleArgv() {
  if (process.argv.slice(2).length < 2) {
    program.outputHelp(make_green);
    return false;
  }
  return true;
}

function make_green(txt) {
  return chalk.green(txt);
}
