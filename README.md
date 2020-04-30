# wowo-cli
Download and extract a git repository (GitHub, Bitbucket, GitLab) from node CLI.

> See [wowo](https://github.com/wujingacross/wowo-cli) for the API and issue tracker.

## Install

Require [Node.js](https://nodejs.org/en/) and [Git](https://git-scm.com/).

```bash
$ npm install wowo-cli -g
```


## Usage

```bash
  Usage
    $ wow init <template-name> <project-directory>
    $ wow config get
    $ wow config set <k> <v>
    $ wow template <template-registry-url> <project-directory>

  Example
    $ wow -h
    $ wow config get
    $ wow config set type directRegistry
    $ wow init https://github.com/wujingacross/mobile-tpl-rc.git mobile-fe
    $ wow config set type users
    $ wow config set registry wujingacross
    $ wow init mobile-tpl-rc mobile-fe
    $ wow template https://github.com/wujingacross/mobile-tpl-rc.git mobile-fe

  Options
    -v --version        Output the version number
    -h, --help          Display help for command
```


## License

MIT
