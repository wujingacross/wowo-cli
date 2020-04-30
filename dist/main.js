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
 */

var actionMap = {
  init: {
    alias: 'i',
    description: 'generate a new project from a template',
    usages: ['wow init templateName projectName']
  },
  config: {
    alias: 'cfg',
    description: 'config .wowrc',
    usages: ['wow config set <k> <v>', 'wow config get <k>', 'wow config remove <k>']
  },
  template: {
    alias: 'tpl',
    description: 'generate a new project from a direct template url',
    usages: ['wow template https://github.com/xxx/xxx.git <project-directory>']
  }
  //other commands
};

Object.keys(actionMap).forEach(function (action) {
  _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias) //别名
  .action(function () {
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
      default:
        break;
    }
  });
});

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach(function (action) {
    actionMap[action].usages.forEach(function (usage) {
      console.log('  - ' + usage);
    });
  });
  console.log('\r');
}

_commander2.default.usage('<command> [options]');
_commander2.default.on('-h', help);
_commander2.default.on('--help', help);
_commander2.default.version(_constants.VERSION, '-V --version').parse(process.argv);

// wow 不带参数时
if (!process.argv.slice(2).length) {
  _commander2.default.outputHelp(make_green);
}
function make_green(txt) {
  return _chalk2.default.green(txt);
}