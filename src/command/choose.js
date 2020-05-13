import { downloadByTemplateUrl } from '../utils/get';
import { DEFAULTPROMPT, TPLS } from '../utils/constants';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';

let init = async (projectName) => {
  //项目不存在
  if (!fs.existsSync(projectName)) {
    //命令行交互
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Which template do you want?',
          choices: [
            'toC',
            { name: 'improve mobile experience', disabled: '--description' },
            'toB',
            {
              name: 'improve PC experience',
              disabled: '--description',
            },
          ],
        },
      ])
      .then(({ type }) => {
        const curTpl = TPLS.find(({ name }) => {
          return name == type;
        });
        console.log('==curTpl==', curTpl.url);
        inquirer.prompt(DEFAULTPROMPT).then(async (values) => {
          //下载模板 选择模板
          //通过配置文件，获取模板信息
          let loading = ora('downloading template ...');
          loading.start();
          downloadByTemplateUrl(curTpl.url, projectName).then(
            () => {
              loading.succeed();
              const fileName = `${projectName}/package.json`;
              if (fs.existsSync(fileName)) {
                const data = fs.readFileSync(fileName).toString();
                let json = JSON.parse(data);
                json.name = projectName;
                json.author = values.author;
                json.description = values.description;
                //修改项目文件夹中 package.json 文件
                fs.writeFileSync(
                  fileName,
                  JSON.stringify(json, null, '\t'),
                  'utf-8'
                );
                console.log(
                  symbol.success,
                  chalk.green('Project initialization finished!')
                );
              }
            },
            () => {
              loading.fail();
            }
          );
        });
      });
  } else {
    //项目已经存在
    console.log(symbol.error, chalk.red('The project already exists'));
  }
};

module.exports = init;
