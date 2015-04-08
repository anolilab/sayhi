#!/usr/bin/env node
(function (definition) {
    'use strict';

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats. In
    // Common/Node/RequireJS, the module exports the saysnoop API and when
    // executed as a simple <script>, it creates a saysnoop global instead.

    var pkg      = require('./package.json'),
        saysnoop = require('./manager.js'),
        taketalk = require('taketalk');

    // Montage Require
    if (typeof bootstrap === 'function') {
        bootstrap('saysnoop', definition(pkg, saysnoop, taketalk));

    // CommonJS
    } else if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = definition(pkg, saysnoop, taketalk);

    // RequireJS
    } else if (typeof define === 'function' && define.amd) {
        define(['pkg', 'saysnoop', 'taketalk'], definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== 'undefined') {
        if (!ses.ok()) {
            return;
        } else {
            ses.makesaysnoop = definition(pkg, saysnoop, taketalk);
        }

    // <script>
    } else if (typeof self !== 'undefined') {
        self.saysnoop = definition(pkg, saysnoop, taketalk);

    } else {
        throw new Error('This environment was not anticipated by saysnoop. Please file a bug.');
    }

})(function (pkg, saysnoop, taketalk) {
    taketalk({
        init: function (input, options) {
          console.log(saysnoop(input, options));
        },
        help: function () {
          console.log([
            '',
            '  ' + pkg.description,
            '',
            '  Usage',
            '    saysnoop <string>',
            '    saysnoop <string> --maxLength 8',
            '    echo <string> | saysnoop',
            '',
            '  Example',
            '    saysnoop "Have you ever seen a rabbit with glasses?"',
            saysnoop('Have you ever seen a rabbit with glasses?')
          ].join('\n'));
        },
        version: pkg.version
    });
});
