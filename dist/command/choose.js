'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require('../utils/get');

var _constants = require('../utils/constants');

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(projectName) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //项目不存在
            if (!_fs2.default.existsSync(projectName)) {
              //命令行交互
              _inquirer2.default.prompt([{
                type: 'list',
                name: 'type',
                message: 'Which template do you want?',
                choices: ['toC', { name: 'improve mobile experience', disabled: '--description' }, 'toB', {
                  name: 'improve PC experience',
                  disabled: '--description'
                }]
              }]).then(function (_ref2) {
                var type = _ref2.type;

                var curTpl = _constants.TPLS.find(function (_ref3) {
                  var name = _ref3.name;

                  return name == type;
                });
                console.log('==curTpl==', curTpl.url);
                _inquirer2.default.prompt(_constants.DEFAULTPROMPT).then(function () {
                  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(values) {
                    var loading;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            //下载模板 选择模板
                            //通过配置文件，获取模板信息
                            loading = (0, _ora2.default)('downloading template ...');

                            loading.start();
                            (0, _get.downloadByTemplateUrl)(curTpl.url, projectName).then(function () {
                              loading.succeed();
                              var fileName = projectName + '/package.json';
                              if (_fs2.default.existsSync(fileName)) {
                                var data = _fs2.default.readFileSync(fileName).toString();
                                var json = JSON.parse(data);
                                json.name = projectName;
                                json.author = values.author;
                                json.description = values.description;
                                //修改项目文件夹中 package.json 文件
                                _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                                console.log(_logSymbols2.default.success, _chalk2.default.green('Project initialization finished!'));
                              }
                            }, function () {
                              loading.fail();
                            });

                          case 3:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, undefined);
                  }));

                  return function (_x2) {
                    return _ref4.apply(this, arguments);
                  };
                }());
              });
            } else {
              //项目已经存在
              console.log(_logSymbols2.default.error, _chalk2.default.red('The project already exists'));
            }

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = init;