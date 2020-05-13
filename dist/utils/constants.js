'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULTS = exports.RC = exports.TPLS = exports.DEFAULTPROMPT = exports.VERSION = undefined;

var _package = require('../../package.json');

//当前 package.json 的版本号
var VERSION = exports.VERSION = _package.version;

var DEFAULTPROMPT = exports.DEFAULTPROMPT = [{
  name: 'description',
  message: 'Please enter the project description: '
}, {
  name: 'author',
  message: 'Please enter the author name: '
}, {
  name: 'homepage',
  message: 'Please enter the homepage: ',
  default: '.'
}];

var TPLS = exports.TPLS = [{
  name: 'toC',
  description: 'improve mobile experience',
  url: 'https://github.com/wujingacross/mobile-tpl-rc.git',
  zipUrl: 'https://github.com/wujingacross/mobile-tpl-rc/archive/master.zip',
  homepage: '.'
}, {
  name: 'toB',
  description: 'improve PC experience',
  url: 'http://git.1d1d100.com/FRONTEND/rc-admin-tpl.git',
  zipUrl: '',
  homepage: '.'
}];

// 用户的根目录
var HOME = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];

// 配置文件目录
var RC = exports.RC = HOME + '/.wowrc';

// RC 配置下载模板的地方，给 github 的 api 使用
// https://api.github.com/users/YvetteLau/repos
// https://api.github.com/${type}/${registry}/repos
// 模板下载地址可配置
var DEFAULTS = exports.DEFAULTS = {
  registry: 'wujingacross',
  type: 'users'
};