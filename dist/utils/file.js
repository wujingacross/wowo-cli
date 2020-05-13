'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateJsonFile = undefined;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateJsonFile = exports.updateJsonFile = function updateJsonFile(projectName, answer) {
  var fileName = projectName + '/package.json';
  if (_fs2.default.existsSync(fileName)) {
    var data = _fs2.default.readFileSync(fileName).toString();
    var json = JSON.parse(data);
    json.name = projectName;
    json.author = answer.author;
    json.description = answer.description;
    //修改项目文件夹中 package.json 文件
    _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
  }
};