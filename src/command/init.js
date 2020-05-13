import { downloadLocal } from '../utils/git';
import { DEFAULTPROMPT } from '../utils/constants';
import { updateJsonFile } from '../utils/file';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';

let init = async (templateName, projectName) => {
  //项目不存在
  if (!fs.existsSync(projectName)) {
    //命令行交互
    inquirer.prompt(DEFAULTPROMPT).then(async (answer) => {
      //下载模板 选择模板
      //通过配置文件，获取模板信息
      let loading = ora('downloading template ...');
      loading.start();
      downloadLocal(templateName, projectName).then(
        () => {
          loading.succeed();
          updateJsonFile(projectName, answer);
          console.log(
            symbol.success,
            chalk.green('Project initialization finished!')
          );
        },
        () => {
          loading.fail();
        }
      );
    });
  } else {
    //项目已经存在
    console.log(symbol.error, chalk.red('The project already exists'));
  }
};

module.exports = init;
