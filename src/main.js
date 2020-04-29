import program from 'commander';
import { VERSION } from './utils/constants';
import apply from './index';
import chalk from 'chalk';

/**
 * wow commands
 *    - config
 *    - init 
 *    - template
 */

let actionMap = {
    init: {
        alias: 'i',
        description: 'generate a new project from a template',
        usages: [
            'wow init templateName projectName'
        ]
    },
    config: {
        alias: 'cfg',
        description: 'config .wowrc',
        usages: [
            'wow config set <k> <v>',
            'wow config get <k>',
            'wow config remove <k>'
        ]
        
    },
    template: {
        alias: 'tpl',
        description: 'generate a new project from a direct template url',
        usages: [
            'wow template https://github.com/xxx/xxx.git',
        ]
        
    },
    //other commands
}

Object.keys(actionMap).forEach((action) => {
    program.command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias) //别名
    .action(() => {
        switch (action) {
            case 'config': 
                //配置
                apply(action, ...process.argv.slice(3));
                break;
            case 'init':
                apply(action, ...process.argv.slice(3));
                break;
            default:
                break;
        }
    });
});

function help() {
    console.log('\r\nUsage:');
    Object.keys(actionMap).forEach((action) => {
        actionMap[action].usages.forEach(usage => {
            console.log('  - ' + usage);
        });
    });
    console.log('\r');
}


program.usage('<command> [options]');
program.on('-h', help);
program.on('--help', help);
program.version(VERSION, '-V --version').parse(process.argv);

// wow 不带参数时
if (!process.argv.slice(2).length) {
    program.outputHelp(make_green);
}
function make_green(txt) {
    return chalk.green(txt); 
}