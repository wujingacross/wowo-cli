'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./utils/constants');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * wow commands
 *    - config
 *    - init
 *    - template
 *    - choose
 */

var actionMap = {
  init: {
    alias: 'i',
    description: 'generate a new project from a template',
    usages: ['wow init <template-name> <project-directory>']
  },
  config: {
    alias: 'cfg',
    description: 'config .wowrc',
    usages: ['wow config set <k> <v>', 'wow config get <k>', 'wow config remove <k>']
  },
  template: {
    alias: 'tpl',
    description: 'generate a new project from a direct template url',
    usages: ['wow template <template-registry-url> <project-directory>']
  },
  choose: {
    alias: 'cos',
    description: 'choose a new project from resources',
    usages: ['wow choose <project-directory>']
  }
  //other commands
};

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach(function (action) {
    actionMap[action].usages.forEach(function (usage) {
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
  console.log('  $ wow init https://github.com/wujingacross/mobile-tpl-rc.git mobile-fe');
  console.log('  $ wow template https://github.com/wujingacross/mobile-tpl-rc.git mobile-fe');
  console.log('  $ wow choose project-directory');
}

Object.keys(actionMap).forEach(function (action) {
  _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias) //别名
  .action(function () {
    if (handleArgv()) {
      switch (action) {
        case 'config':
          //配置
          _index2.default.apply(undefined, [action].concat((0, _toConsumableArray3.default)(process.argv.slice(3))));
          break;
        case 'init':
          _index2.default.apply(undefined, [action].concat((0, _toConsumableArray3.default)(process.argv.slice(3))));
          break;
        case 'template':
          _index2.default.apply(undefined, [action].concat((0, _toConsumableArray3.default)(process.argv.slice(3))));
          break;
        case 'choose':
          _index2.default.apply(undefined, [action].concat((0, _toConsumableArray3.default)(process.argv.slice(3))));
          break;
        default:
          break;
      }
    }
  });
});

_commander2.default.name('wow').usage('<command> [options]');
_commander2.default.on('-h', help);
_commander2.default.on('--help', help);
_commander2.default.version(_constants.VERSION, '-v --version').parse(process.argv);

/**
 *  判断执行命令是的参数，最少3个参数，命令名和每个命令至少两个参数
 * */
function handleArgv() {
  if (process.argv.slice(2).length < 2) {
    _commander2.default.outputHelp(make_green);
    return false;
  }
  return true;
}

function make_green(txt) {
  return _chalk2.default.green(txt);
}