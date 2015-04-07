## Narrowspark Rising
Beautiful Grunt task for narrowspark

[![Author](http://img.shields.io/badge/author-@anolilab-blue.svg?style=flat-square)](https://twitter.com/anolilab)
[![Source Code](http://img.shields.io/badge/source-narrowspark/rising-blue.svg?style=flat-square)](https://github.com/narrowspark/rising)
[![npm](https://img.shields.io/npm/v/narrowspark-rising.svg?style=flat-square)](https://www.npmjs.com/package/narrowspark-rising)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

## Master
[![Build Status](https://travis-ci.org/narrowspark/rising.svg)](https://travis-ci.org/narrowspark/rising)
[![David](https://img.shields.io/david/narrowspark/rising.svg?style=flat-square)](https://github.com/narrowspark/rising)

## Develop

## Introduction
Rising is a Grunt library that allows you to break up your Gruntfile config by task. For most small projects a single Gruntfile.js is perfect. But as a project grows, the Gruntfile.js can quickly become unmanagable.

##Features
- Each task has its own config file. Example: jshint.js, mocha.js, etc. (TODO, find a faster way to load config files)
- Auto load all grunt plugins. Thanks to jit-grunt (TODO, add support for top level node_modules folder).
- Easy task debug (run ```shell grunt debug [task] ```).
- Display the elapsed execution time of grunt tasks.
- Check the existence of all files before run a task (soon).
- Many predefined grunt plugins for php, js, sass, css, fonts, etc. (run ```shell grunt install-[extension] ```)
- Supports notify, rising notify you, if a grunt task is completed (soon).
- Supports shell and npm-install through grunt.
- Supports [CSS Testing with PhantomCSS, PhantomJS, CasperJS)(http://www.phase2technology.com/blog/css-testing-with-phantomcss-phantomjs-casperjs-and-grunt/)

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install narrowspark-rising --save-dev
npm install grunt-load-gruntfile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
// Gruntfile.js
'use strict';

module.exports = function(grunt) {
  require("grunt-load-gruntfile")(grunt);

  grunt.loadGruntfile("./node_modules/narrowspark-rising/Gruntfile.js");
};
```

## Official Documentation

Documentation for the entire framework can be found on the [Narrowspark website](http://narrowspark.de/rising).

## Contributing

All code contributions - including those of people having commit access -
must go through a pull request and approved by a core developer before being
merged. This is to ensure proper review of all the code.

Fork the project, create a feature branch, and send us a pull request.

If you would like to help take a look at the [list of issues](http://github.com/narrowspark/framework/issues).

## Requirements
grunt, grunt-cli, grunt-contrib-clean, grunt-contrib-nodeunit, grunt-contrib-watch, grunt-debug-task, grunt-extend, grunt-mkdir, grunt-newer, grunt-notify, grunt-npm-install, grunt-shell, jit-grunt, load-grunt-config, load-grunt-tasks, time-grunt

## Authors

Daniel Bannert - <d.bannert@anolilab.de> - <http://www.anolilab.de><br />

### License

The Narrowspark framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
